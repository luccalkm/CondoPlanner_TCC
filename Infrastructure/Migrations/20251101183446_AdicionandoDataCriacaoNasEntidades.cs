using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoDataCriacaoNasEntidades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Reservas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Reservas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Endereco",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Endereco",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Encomendas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Encomendas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Condominios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Condominios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Blocos",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Blocos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "AreasComuns",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "AreasComuns",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Apartamentos",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Apartamentos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Condominios");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Condominios");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Blocos");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Blocos");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "AreasComuns");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "AreasComuns");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Apartamentos");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Apartamentos");
        }
    }
}
