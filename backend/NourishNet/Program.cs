using Microsoft.EntityFrameworkCore;
using NourishNet.Data;
using NourishNet.Models;
using NourishNet.Controllers;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Data.Services;
using NourishNet.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDBContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddDbContext<DonorDbContext>(options =>
{

    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddDbContext<RecipeintDbContext>(options =>
{

    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddDbContext<SharedDbContext>(options =>
{

    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

//add identity JWT authentication for donor accounts

//builder.Services.AddIdentity<Donor, IdentityRole>().AddEntityFrameworkStores<DonorDbContext>()
//                                                    .AddSignInManager()
//                                                    .AddRoles<IdentityRole>();

builder.Services.AddIdentityCore<Donor>().AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<DonorDbContext>()
        .AddSignInManager<SignInManager<Donor>>();

builder.Services.AddIdentityCore<Recipient>().AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<RecipeintDbContext>()
        .AddSignInManager<SignInManager<Recipient>>();

//add identity JWT authentication for recipient account
//builder.Services.AddIdentity<Recipient, IdentityRole>()
//        .AddEntityFrameworkStores<RecipeintDbContext>()
//        .AddSignInManager()
//        .AddRoles<IdentityRole>();

//jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer( options => 
{
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            var exception = context.Exception;
            Console.WriteLine($"Token validation failed: {exception.Message}");
            return Task.CompletedTask;
        }
    };

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,

        ValidateAudience = true,

        ValidateIssuerSigningKey = true,

        ValidateLifetime = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),

        RoleClaimType = ClaimTypes.Role
    };
});

//add authenticaton to swagger ui
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth", new OpenApiSecurityScheme
    {

        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();

});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IFoodListing, FoodListingsService>();
builder.Services.AddScoped<INOtificationDonorService, NotificationDonorService>();
builder.Services.AddScoped<INotificationRecipeintService, NotificationRecipientService>();
builder.Services.AddScoped<IDonorService, DonorService>();
builder.Services.AddScoped<IRecipientService, RecipientService>();
builder.Services.AddScoped<IDonationHistory, DonationHistoryService>();

builder.Services.AddScoped<IDonorUserAccount, AccountRepositories>();
builder.Services.AddScoped<IRecipientUserAccount, RecipientRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

