using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskFlow.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tasks",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    column = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "todo"),
                    priority = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "medium"),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tasks", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "tasks",
                columns: new[] { "id", "column", "created_at", "description", "priority", "title" },
                values: new object[,]
                {
                    { 1, "todo", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Aprender useState e useEffect", "high", "Estudar React Hooks" },
                    { 2, "doing", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Instalar e configurar Tailwind CSS", "medium", "Configurar Tailwind" },
                    { 3, "todo", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Desenvolver componentes reutilizáveis", "high", "Criar componentes" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tasks");
        }
    }
}
