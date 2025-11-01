using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovendoIdUsuarioRastreamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "VinculosResidenciais");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "UsuarioCondominio");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Condominios");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Blocos");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "AreasComuns");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Apartamentos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "VinculosResidenciais",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Usuarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "UsuarioCondominio",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Reservas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Endereco",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Encomendas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Condominios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Blocos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "AreasComuns",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Apartamentos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
