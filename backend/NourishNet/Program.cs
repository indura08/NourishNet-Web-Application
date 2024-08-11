using Microsoft.EntityFrameworkCore;
using NourishNet.Data;
using NourishNet.Models;
using NourishNet.Controllers;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Data.Services;

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

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IFoodListing, FoodListingsService>();
builder.Services.AddScoped<INOtificationDonorService, NotificationDonorService>();
builder.Services.AddScoped<INotificationRecipeintService, NotificationRecipientService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

