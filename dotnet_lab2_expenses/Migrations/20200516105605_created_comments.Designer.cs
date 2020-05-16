﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dotnet_lab2_expenses.Models;

namespace dotnet_lab2_expenses.Migrations
{
    [DbContext(typeof(ExpenseContext))]
    [Migration("20200516105605_created_comments")]
    partial class created_comments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("dotnet_lab2_expenses.Models.Comment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long?>("ExpenseItemId")
                        .HasColumnType("bigint");

                    b.Property<bool>("Important")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Text")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseItemId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("dotnet_lab2_expenses.Models.ExpenseItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<decimal>("Sum")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("ExpenseItem");
                });

            modelBuilder.Entity("dotnet_lab2_expenses.Models.Comment", b =>
                {
                    b.HasOne("dotnet_lab2_expenses.Models.ExpenseItem", "ExpenseItem")
                        .WithMany("Comments")
                        .HasForeignKey("ExpenseItemId");
                });
#pragma warning restore 612, 618
        }
    }
}
