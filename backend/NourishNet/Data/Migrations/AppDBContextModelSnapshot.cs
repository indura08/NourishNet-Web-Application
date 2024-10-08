﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NourishNet.Data;

#nullable disable

namespace NourishNet.Data.Migrations
{
    [DbContext(typeof(AppDBContext))]
    partial class AppDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("NourishNet.Models.Admin", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("NourishNet.Models.DonationHistory", b =>
                {
                    b.Property<int>("DonationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DataReceived")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FoodListingId")
                        .HasColumnType("int");

                    b.Property<string>("RecipientId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("DonationId");

                    b.HasIndex("FoodListingId");

                    b.HasIndex("RecipientId");

                    b.ToTable("DonationHistories");
                });

            modelBuilder.Entity("NourishNet.Models.Donor", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BaseDistrict")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BaseProvince")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPerson")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("OperatingHours")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OrganizaTionName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OrganizationType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Donors");
                });

            modelBuilder.Entity("NourishNet.Models.FoodListing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CurrentStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DonorId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ExpiryDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FoodType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PostedDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Quantity")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("DonorId");

                    b.ToTable("FoodListings");
                });

            modelBuilder.Entity("NourishNet.Models.NotificationDonor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Createtime")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DonorId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("DonorId");

                    b.ToTable("DonorNotifications");
                });

            modelBuilder.Entity("NourishNet.Models.NotificationRecipient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedTime")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RecipientId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.ToTable("RecipientNotifications");
                });

            modelBuilder.Entity("NourishNet.Models.Recipient", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BaseDistrict")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BaseProvince")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPerson")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("RecipientName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RecipientType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Recipients");
                });

            modelBuilder.Entity("NourishNet.Models.DonationHistory", b =>
                {
                    b.HasOne("NourishNet.Models.FoodListing", "FoodListing")
                        .WithMany()
                        .HasForeignKey("FoodListingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("NourishNet.Models.Recipient", "Recipient")
                        .WithMany()
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FoodListing");

                    b.Navigation("Recipient");
                });

            modelBuilder.Entity("NourishNet.Models.FoodListing", b =>
                {
                    b.HasOne("NourishNet.Models.Donor", "Donor")
                        .WithMany()
                        .HasForeignKey("DonorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Donor");
                });

            modelBuilder.Entity("NourishNet.Models.NotificationDonor", b =>
                {
                    b.HasOne("NourishNet.Models.Donor", "Donor")
                        .WithMany()
                        .HasForeignKey("DonorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Donor");
                });

            modelBuilder.Entity("NourishNet.Models.NotificationRecipient", b =>
                {
                    b.HasOne("NourishNet.Models.Recipient", "Recipient")
                        .WithMany()
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipient");
                });
#pragma warning restore 612, 618
        }
    }
}
