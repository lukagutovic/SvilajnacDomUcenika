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

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Pol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("NazivPola");

                    b.HasKey("Id");

                    b.ToTable("Polovi");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.PostanskiBroj", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Broj");

                    b.Property<int>("OpstinaId");

                    b.HasKey("Id");

                    b.HasIndex("OpstinaId");

                    b.ToTable("PostanskiBrojevi");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Telefon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Kucni");

                    b.Property<string>("Mobilni");

                    b.HasKey("Id");

                    b.ToTable("BrojeviTelefona");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Ucenik", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adresa");

                    b.Property<DateTime>("DatumRodjenja");

                    b.Property<int>("DrzavaRodjenjaId");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasMaxLength(13);

                    b.Property<string>("MestoPrebivalista");

                    b.Property<string>("MestoRodjenja");

                    b.Property<int?>("OpstinaId");

                    b.Property<int?>("OpstinaPrebivalistaId");

                    b.Property<int>("PolId");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("TelefonId");

                    b.HasKey("Id");

                    b.HasIndex("DrzavaRodjenjaId");

                    b.HasIndex("OpstinaId");

                    b.HasIndex("OpstinaPrebivalistaId");

                    b.HasIndex("PolId");

                    b.HasIndex("TelefonId");

                    b.ToTable("Ucenici");
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.PostanskiBroj", b =>
                {
                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DomUcenikaSvilajnac.Common.Models.Ucenik", b =>
                {
                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Drzava", "DrzavaRodjenja")
                        .WithMany()
                        .HasForeignKey("DrzavaRodjenjaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaId");

                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Opstina", "OpstinaPrebivalista")
                        .WithMany()
                        .HasForeignKey("OpstinaPrebivalistaId");

                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Pol", "Pol")
                        .WithMany()
                        .HasForeignKey("PolId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DomUcenikaSvilajnac.Common.Models.Telefon", "Telefon")
                        .WithMany()
                        .HasForeignKey("TelefonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
