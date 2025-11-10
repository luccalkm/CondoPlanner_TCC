using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddingCommonAreaPhotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AreaComumFoto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConteudoZip = table.Column<byte[]>(type: "bytea", nullable: false),
                    TipoConteudo = table.Column<string>(type: "text", nullable: false),
                    NomeArquivoOriginal = table.Column<string>(type: "text", nullable: false),
                    TamanhoOriginal = table.Column<long>(type: "bigint", nullable: false),
                    HashSha256 = table.Column<string>(type: "text", nullable: false),
                    AreaComumId = table.Column<int>(type: "integer", nullable: false),
                    DataCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaComumFoto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AreaComumFoto_AreasComuns_AreaComumId",
                        column: x => x.AreaComumId,
                        principalTable: "AreasComuns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AreaComumFoto_AreaComumId",
                table: "AreaComumFoto",
                column: "AreaComumId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AreaComumFoto");
        }
    }
}
