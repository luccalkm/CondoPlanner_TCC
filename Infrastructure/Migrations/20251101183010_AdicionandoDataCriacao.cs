using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoDataCriacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Usuarios");

            migrationBuilder.RenameColumn(
                name: "TipoUsuario",
                table: "Usuarios",
                newName: "UsuarioCriadorId");

            migrationBuilder.RenameColumn(
                name: "Cargo",
                table: "UsuarioCondominio",
                newName: "UsuarioCriadorId");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "VinculosResidenciais",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "VinculosResidenciais",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Usuarios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "UsuarioCondominio",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "TipoUsuario",
                table: "UsuarioCondominio",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "VinculosResidenciais");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "VinculosResidenciais");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "UsuarioCondominio");

            migrationBuilder.DropColumn(
                name: "TipoUsuario",
                table: "UsuarioCondominio");

            migrationBuilder.RenameColumn(
                name: "UsuarioCriadorId",
                table: "Usuarios",
                newName: "TipoUsuario");

            migrationBuilder.RenameColumn(
                name: "UsuarioCriadorId",
                table: "UsuarioCondominio",
                newName: "Cargo");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Usuarios",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
