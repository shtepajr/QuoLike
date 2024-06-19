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
                newName: "isFavorite");

            migrationBuilder.AddColumn<bool>(
                name: "isArchived",
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
                name: "isArchived",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "isFavorite",
                table: "Quotes",
                newName: "Action");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Quotes",
                table: "Quotes",
                column: "QuoteSelectId");
        }
    }
}
