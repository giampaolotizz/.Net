using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MicroUser.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "login",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(type: "varchar(45)", nullable: false),
                    password = table.Column<string>(type: "varchar(45)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_login", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(type: "varchar(45)", nullable: false),
                    password = table.Column<string>(type: "varchar(45)", nullable: false),
                    usertype = table.Column<string>(type: "varchar(45)", nullable: false),
                    email = table.Column<string>(type: "varchar(45)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "login",
                columns: new[] { "id", "password", "username" },
                values: new object[,]
                {
                    { 1, "admin", "admin" },
                    { 2, "user", "user" }
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "id", "email", "password", "username", "usertype" },
                values: new object[,]
                {
                    { 1, "admin@admin.it", "admin", "admin", "ADMIN" },
                    { 2, "user@user.it", "user", "user", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "login");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
