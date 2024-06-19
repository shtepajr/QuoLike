using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuoLike.Server.Migrations
{
    /// <inheritdoc />
    public partial class fixQuoteId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuoteSelectId",
                table: "Quotes",
                newName: "ExternalId");

            migrationBuilder.RenameColumn(
                name: "QuoteId",
                table: "Quotes",
                newName: "QuoteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExternalId",
                table: "Quotes",
                newName: "QuoteSelectId");

            migrationBuilder.RenameColumn(
                name: "QuoteId",
                table: "Quotes",
                newName: "QuoteId");
        }
    }
}
