﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldCup_Simulator.Migrations
{
    public partial class addGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Group",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Teams");
        }
    }
}
