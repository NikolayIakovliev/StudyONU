using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace StudyONU.Core.Migrations
{
    public partial class StudentQueueSpeciality : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpecialityId",
                table: "StudentQueue",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentQueue_SpecialityId",
                table: "StudentQueue",
                column: "SpecialityId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentQueue_Specialities_SpecialityId",
                table: "StudentQueue",
                column: "SpecialityId",
                principalTable: "Specialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentQueue_Specialities_SpecialityId",
                table: "StudentQueue");

            migrationBuilder.DropIndex(
                name: "IX_StudentQueue_SpecialityId",
                table: "StudentQueue");

            migrationBuilder.DropColumn(
                name: "SpecialityId",
                table: "StudentQueue");
        }
    }
}
