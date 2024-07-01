using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuoLike.Server.Migrations
{
    /// <inheritdoc />
    public partial class updateQuoteWithQuotable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "_id",
                table: "Quotes",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AuthorSlug",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateAdded",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateModified",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Quotes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Quotes",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "AuthorSlug",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DateAdded",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DateModified",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Quotes");

            migrationBuilder.AlterColumn<string>(
                name: "_id",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
