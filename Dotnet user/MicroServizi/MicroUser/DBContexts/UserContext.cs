using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MicroUser.Models;

namespace MicroUser.DBContexts
{
    public class UserContext : DbContext 
    {
        public UserContext() { }

        public UserContext(DbContextOptions<UserContext> options) : base(options){
        }

        public virtual DbSet<Login> Login { get; set; }

        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>(entity =>
            {

            entity.ToTable("login");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Password)
                .IsRequired()
                .HasColumnName("password")
                .HasColumnType("varchar(45)");

            entity.Property(e => e.Username)
                 .IsRequired()
                 .HasColumnName("username")
                 .HasColumnType("varchar(45)");

            });

            modelBuilder.Entity<User>(entity =>
            {

                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Username)
                     .IsRequired()
                     .HasColumnName("username")
                     .HasColumnType("varchar(45)");

                entity.Property(e => e.Usertype)
                   .IsRequired()
                   .HasColumnName("usertype")
                   .HasColumnType("varchar(45)");

                entity.Property(e => e.Email)
                     .IsRequired()
                     .HasColumnName("email")
                     .HasColumnType("varchar(45)");

            });

            modelBuilder.Entity<Login>().HasData(new Login
            {
                Id = 1,
                Username = "admin",
                Password = "admin",
            },
           new Login
           {
               Id = 2,
               Username = "user",
               Password = "user",
           }
       );
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                Password = "admin",
                Usertype = "ADMIN",
                Email = "admin@admin.it"
            },
           new User
           {
               Id = 2,
               Username = "user",
               Password = "user",
               Usertype = "USER",
               Email = "user@user.it"
           }
       );

        }




        }
}
