using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AjustandoRelacionamentosEntidades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Encomendas_Apartamentos_ApartamentoId",
                table: "Encomendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_UsuarioId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Encomendas_ApartamentoId",
                table: "Encomendas");

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
                name: "DataNascimento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "DataInicio",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "UsuarioCriadorId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "ApartamentoId",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Condominios");

            migrationBuilder.DropColumn(
                name: "Endereco",
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

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Reservas",
                newName: "VinculoResidencialId");

            migrationBuilder.RenameColumn(
                name: "DataTermino",
                table: "Reservas",
                newName: "Data");

            migrationBuilder.RenameIndex(
                name: "IX_Reservas_UsuarioId",
                table: "Reservas",
                newName: "IX_Reservas_VinculoResidencialId");

            migrationBuilder.RenameColumn(
                name: "UsuarioCriadorId",
                table: "Encomendas",
                newName: "VinculoResidencialId");

            migrationBuilder.RenameColumn(
                name: "UsuarioCriadorId",
                table: "Condominios",
                newName: "EnderecoId");

            migrationBuilder.RenameColumn(
                name: "IdentificadorBloco",
                table: "Blocos",
                newName: "Nome");

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "Reservas",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "HoraInicio",
                table: "Reservas",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "HoraTermino",
                table: "Reservas",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "Encomendas",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NomeRetirante",
                table: "Encomendas",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "AreasComuns",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Endereco",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Logradouro = table.Column<string>(type: "text", nullable: false),
                    Numero = table.Column<string>(type: "text", nullable: false),
                    Complemento = table.Column<string>(type: "text", nullable: false),
                    Bairro = table.Column<string>(type: "text", nullable: false),
                    Cidade = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    Cep = table.Column<string>(type: "text", nullable: false),
                    Pais = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Endereco", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Encomendas_VinculoResidencialId",
                table: "Encomendas",
                column: "VinculoResidencialId");

            migrationBuilder.CreateIndex(
                name: "IX_Condominios_EnderecoId",
                table: "Condominios",
                column: "EnderecoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Condominios_Endereco_EnderecoId",
                table: "Condominios",
                column: "EnderecoId",
                principalTable: "Endereco",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Encomendas_VinculosResidenciais_VinculoResidencialId",
                table: "Encomendas",
                column: "VinculoResidencialId",
                principalTable: "VinculosResidenciais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_VinculosResidenciais_VinculoResidencialId",
                table: "Reservas",
                column: "VinculoResidencialId",
                principalTable: "VinculosResidenciais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Condominios_Endereco_EnderecoId",
                table: "Condominios");

            migrationBuilder.DropForeignKey(
                name: "FK_Encomendas_VinculosResidenciais_VinculoResidencialId",
                table: "Encomendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_VinculosResidenciais_VinculoResidencialId",
                table: "Reservas");

            migrationBuilder.DropTable(
                name: "Endereco");

            migrationBuilder.DropIndex(
                name: "IX_Encomendas_VinculoResidencialId",
                table: "Encomendas");

            migrationBuilder.DropIndex(
                name: "IX_Condominios_EnderecoId",
                table: "Condominios");

            migrationBuilder.DropColumn(
                name: "HoraInicio",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HoraTermino",
                table: "Reservas");

            migrationBuilder.RenameColumn(
                name: "VinculoResidencialId",
                table: "Reservas",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Reservas",
                newName: "DataTermino");

            migrationBuilder.RenameIndex(
                name: "IX_Reservas_VinculoResidencialId",
                table: "Reservas",
                newName: "IX_Reservas_UsuarioId");

            migrationBuilder.RenameColumn(
                name: "VinculoResidencialId",
                table: "Encomendas",
                newName: "UsuarioCriadorId");

            migrationBuilder.RenameColumn(
                name: "EnderecoId",
                table: "Condominios",
                newName: "UsuarioCriadorId");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Blocos",
                newName: "IdentificadorBloco");

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
                name: "DataNascimento",
                table: "Usuarios",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioCriadorId",
                table: "Usuarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "Reservas",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Reservas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataInicio",
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

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "Encomendas",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NomeRetirante",
                table: "Encomendas",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "ApartamentoId",
                table: "Encomendas",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Encomendas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Condominios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Endereco",
                table: "Condominios",
                type: "text",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.AlterColumn<string>(
                name: "Observacoes",
                table: "AreasComuns",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

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

            migrationBuilder.CreateIndex(
                name: "IX_Encomendas_ApartamentoId",
                table: "Encomendas",
                column: "ApartamentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Encomendas_Apartamentos_ApartamentoId",
                table: "Encomendas",
                column: "ApartamentoId",
                principalTable: "Apartamentos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_UsuarioId",
                table: "Reservas",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
