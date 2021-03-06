﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Storage.Internal;
using StudyONU.Core;
using StudyONU.Core.Infrastructure;
using System;

namespace StudyONU.Core.Migrations
{
    [DbContext(typeof(StudyONUDbContext))]
    [Migration("20180204114824_StudentQueueCourseMigration")]
    partial class StudentQueueCourseMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("StudyONU.Core.Entities.AdminEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.CommentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("SenderId");

                    b.Property<int>("StudentId");

                    b.Property<int>("TaskId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(1000);

                    b.HasKey("Id");

                    b.HasIndex("SenderId");

                    b.HasIndex("StudentId");

                    b.HasIndex("TaskId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.CourseEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte>("CourseNumber")
                        .HasColumnType("tinyint")
                        .HasMaxLength(1);

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<bool>("IsPublished");

                    b.Property<int>("LecturerId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("SpecialityId");

                    b.HasKey("Id");

                    b.HasIndex("LecturerId");

                    b.HasIndex("SpecialityId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.GuideEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CourseId");

                    b.Property<DateTime?>("DateAvailable");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Guides");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.LecturerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Lecturers");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.LecturerQueueEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool?>("Approved");

                    b.Property<DateTime?>("DateApproved");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(254);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("Patronymic")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("PhotoPath")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.ToTable("LecturerQueue");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.ReportEntity", b =>
                {
                    b.Property<int>("TaskId");

                    b.Property<int>("StudentId");

                    b.Property<DateTime?>("DateAccepted");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("DateModified")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("FilePaths")
                        .IsRequired();

                    b.Property<decimal?>("Mark");

                    b.Property<int>("State");

                    b.HasKey("TaskId", "StudentId");

                    b.HasIndex("StudentId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.RoleEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.SpecialityEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Specialities");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentCourseEntity", b =>
                {
                    b.Property<int>("StudentId");

                    b.Property<int>("CourseId");

                    b.HasKey("StudentId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("StudentsInCourses");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte>("CourseNumber")
                        .HasColumnType("tinyint")
                        .HasMaxLength(1);

                    b.Property<int>("SpecialityId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SpecialityId");

                    b.HasIndex("UserId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentQueueEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool?>("Approved");

                    b.Property<int>("CourseId");

                    b.Property<byte>("CourseNumber")
                        .HasColumnType("tinyint")
                        .HasMaxLength(1);

                    b.Property<DateTime?>("DateApproved");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(254);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("Patronymic")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("PhotoPath")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("SpecialityId");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("SpecialityId");

                    b.ToTable("StudentQueue");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.TaskEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CourseId");

                    b.Property<DateTime?>("DateAvailable");

                    b.Property<DateTime?>("DateOverdue");

                    b.Property<string>("Description");

                    b.Property<string>("FilePaths");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(254);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("Patronymic")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("PhotoPath")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("StudyONU.Core.Entities.AdminEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.UserEntity", "User")
                        .WithMany("Admins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.CommentEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.UserEntity", "Sender")
                        .WithMany("Comments")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.StudentEntity", "Student")
                        .WithMany("Comments")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.TaskEntity", "Task")
                        .WithMany("Comments")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.CourseEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.LecturerEntity", "Lecturer")
                        .WithMany("Courses")
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.SpecialityEntity", "Speciality")
                        .WithMany("Courses")
                        .HasForeignKey("SpecialityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.GuideEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.CourseEntity", "Course")
                        .WithMany("Guides")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.LecturerEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.UserEntity", "User")
                        .WithMany("Lecturers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.ReportEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.StudentEntity", "Student")
                        .WithMany("Reports")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.TaskEntity", "Task")
                        .WithMany("Reports")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentCourseEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.CourseEntity", "Course")
                        .WithMany("Students")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.StudentEntity", "Student")
                        .WithMany("Courses")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.SpecialityEntity", "Speciality")
                        .WithMany("Students")
                        .HasForeignKey("SpecialityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.UserEntity", "User")
                        .WithMany("Students")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.StudentQueueEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.CourseEntity", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("StudyONU.Core.Entities.SpecialityEntity", "Speciality")
                        .WithMany("StudentQueue")
                        .HasForeignKey("SpecialityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.TaskEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.CourseEntity", "Course")
                        .WithMany("Tasks")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StudyONU.Core.Entities.UserEntity", b =>
                {
                    b.HasOne("StudyONU.Core.Entities.RoleEntity", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
