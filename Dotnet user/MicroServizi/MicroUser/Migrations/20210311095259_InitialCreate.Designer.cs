﻿// <auto-generated />
using MicroUser.DBContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MicroUser.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20210311095259_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MicroUser.Models.Login", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnName("password")
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnName("username")
                        .HasColumnType("varchar(45)");

                    b.HasKey("Id");

                    b.ToTable("login");

                    b.HasData(
                        new { Id = 1, Password = "admin", Username = "admin" },
                        new { Id = 2, Password = "user", Username = "user" }
                    );
                });

            modelBuilder.Entity("MicroUser.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("email")
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnName("password")
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnName("username")
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Usertype")
                        .IsRequired()
                        .HasColumnName("usertype")
                        .HasColumnType("varchar(45)");

                    b.HasKey("Id");

                    b.ToTable("user");

                    b.HasData(
                        new { Id = 1, Email = "admin@admin.it", Password = "admin", Username = "admin", Usertype = "ADMIN" },
                        new { Id = 2, Email = "user@user.it", Password = "user", Username = "user", Usertype = "USER" }
                    );
                });
#pragma warning restore 612, 618
        }
    }
}
