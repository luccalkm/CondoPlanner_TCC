using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCondominiumInvites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConvitesCondominio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    CondominioId = table.Column<int>(type: "integer", nullable: false),
                    TipoUsuario = table.Column<int>(type: "integer", nullable: false),
                    ExpiraEm = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UsoUnico = table.Column<bool>(type: "boolean", nullable: false),
                    ContagemUso = table.Column<int>(type: "integer", nullable: false),
                    LimiteUso = table.Column<int>(type: "integer", nullable: false),
                    UsuarioCriadorId = table.Column<int>(type: "integer", nullable: false),
                    RevogadoEm = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Nonce = table.Column<Guid>(type: "uuid", nullable: true),
                    DataCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConvitesCondominio", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConvitesCondominio_Token",
                table: "ConvitesCondominio",
                column: "Token",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConvitesCondominio");
        }
    }
}
