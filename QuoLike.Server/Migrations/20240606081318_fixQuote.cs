using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuoLike.Server.Migrations
{
    /// <inheritdoc />
    public partial class fixQuote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Quotes",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "Action",
                table: "Quotes",
                newName: "IsFavorite");

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Quotes",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Quotes",
                table: "Quotes",
                column: "QuoteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Quotes",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "IsFavorite",
                table: "Quotes",
                newName: "Action");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Quotes",
                table: "Quotes",
                column: "QuoteSelectId");
        }
    }
}
