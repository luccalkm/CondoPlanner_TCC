using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoVinculoUsuarioCondominio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Condominios_CondominioId",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_CondominioId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "CondominioId",
                table: "Usuarios");

            migrationBuilder.CreateTable(
                name: "UsuarioCondominio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UsuarioId = table.Column<int>(type: "integer", nullable: false),
                    CondominioId = table.Column<int>(type: "integer", nullable: false),
                    Cargo = table.Column<int>(type: "integer", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataFim = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioCondominio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsuarioCondominio_Condominios_CondominioId",
                        column: x => x.CondominioId,
                        principalTable: "Condominios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UsuarioCondominio_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCondominio_CondominioId",
                table: "UsuarioCondominio",
                column: "CondominioId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCondominio_UsuarioId",
                table: "UsuarioCondominio",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsuarioCondominio");

            migrationBuilder.AddColumn<int>(
                name: "CondominioId",
                table: "Usuarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_CondominioId",
                table: "Usuarios",
                column: "CondominioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Condominios_CondominioId",
                table: "Usuarios",
                column: "CondominioId",
                principalTable: "Condominios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
