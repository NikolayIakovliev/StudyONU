using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace StudyONU.Core.Migrations
{
    public partial class StudentQueueCourseMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "StudentQueue",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentQueue_CourseId",
                table: "StudentQueue",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentQueue_Courses_CourseId",
                table: "StudentQueue",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentQueue_Courses_CourseId",
                table: "StudentQueue");

            migrationBuilder.DropIndex(
                name: "IX_StudentQueue_CourseId",
                table: "StudentQueue");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "StudentQueue");
        }
    }
}
