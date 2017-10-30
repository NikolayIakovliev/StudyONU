using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace StudyONU.Core.Migrations
{
    public partial class StudentToSpeciality : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpecialityId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Students_SpecialityId",
                table: "Students",
                column: "SpecialityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Specialities_SpecialityId",
                table: "Students",
                column: "SpecialityId",
                principalTable: "Specialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Specialities_SpecialityId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_SpecialityId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "SpecialityId",
                table: "Students");
        }
    }
}
