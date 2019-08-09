using Microsoft.EntityFrameworkCore.Migrations;

namespace All_Assignments.Migrations
{
    public partial class increasedpopcapforcountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Population",
                table: "Countries",
                maxLength: 14,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 12);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Population",
                table: "Countries",
                maxLength: 12,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 14);
        }
    }
}
