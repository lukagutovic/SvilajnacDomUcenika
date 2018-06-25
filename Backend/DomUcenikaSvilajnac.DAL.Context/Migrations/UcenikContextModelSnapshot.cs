﻿// <auto-generated />
using DomUcenikaSvilajnac.DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace DomUcenikaSvilajnac.DAL.Context.Migrations
{
    [DbContext(typeof(UcenikContext))]
    partial class UcenikContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Drzava", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("NazivDrzave");

                    b.HasKey("Id");

                    b.ToTable("Drzave");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Opstina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("NazivOpstine");

                    b.HasKey("Id");

                    b.ToTable("Opstine");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Ucenik", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DatumRodjenja");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasMaxLength(13);

                    b.Property<string>("MestoRodjenja");

                    b.Property<int>("OpstinaId");

                    b.Property<string>("Pol")
                        .IsRequired();

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("OpstinaId");

                    b.ToTable("Ucenici");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Ucenik", b =>
                {
                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
