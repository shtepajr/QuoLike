﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuoLike.Server.Data;

#nullable disable

namespace QuoLike.Server.Migrations
{
    [DbContext(typeof(QuoLikeDbContext))]
    [Migration("20240701080754_updateQuoteWithQuotable")]
    partial class updateQuoteWithQuotable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("QuoLike.Server.Models.Quote", b =>
                {
                    b.Property<string>("QuoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("AuthorSlug")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateAdded")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateModified")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("IsArchived")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("IsFavorite")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Length")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tags")
                        .HasColumnType("TEXT");

                    b.Property<string>("_id")
                        .HasColumnType("TEXT");

                    b.HasKey("QuoteId");

                    b.ToTable("Quotes", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}