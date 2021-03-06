﻿using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;
using StudyONU.Data.Contracts;
using StudyONU.Data.Contracts.Repositories;
using System;
using System.Threading.Tasks;

namespace StudyONU.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StudyONUDbContext context;
        private readonly IServiceProvider serviceProvider;
        private Lazier<IAdminRepository> admins;
        private Lazier<ICommentRepository> comments;
        private Lazier<ICourseRepository> courses;
        private Lazier<IGuideRepository> guides;
        private Lazier<ILecturerRepository> lecturers;
        private Lazier<IReportRepository> reports;
        private Lazier<IRoleRepository> roles;
        private Lazier<ISpecialityRepository> specialities;
        private Lazier<IStudentCourseRepository> studentCourse;
        private Lazier<IStudentQueueRepository> studentQueue;
        private Lazier<IStudentRepository> students;
        private Lazier<ITaskRepository> tasks;
        private Lazier<IUserRepository> users;

        public IAdminRepository Admins => admins.Value;

        public ICommentRepository Comments => comments.Value;

        public ICourseRepository Courses => courses.Value;

        public IGuideRepository Guides => guides.Value;

        public ILecturerRepository Lecturers => lecturers.Value;

        public IReportRepository Reports => reports.Value;

        public IRoleRepository Roles => roles.Value;

        public ISpecialityRepository Specialities => specialities.Value;

        public IStudentCourseRepository StudentCourse => studentCourse.Value;

        public IStudentQueueRepository StudentQueue => studentQueue.Value;

        public IStudentRepository Students => students.Value;

        public ITaskRepository Tasks => tasks.Value;

        public IUserRepository Users => users.Value;

        public UnitOfWork(
            StudyONUDbContext context,
            IServiceProvider serviceProvider,
            Lazier<IAdminRepository> admins,
            Lazier<ICommentRepository> comments,
            Lazier<ICourseRepository> courses,
            Lazier<IGuideRepository> guides,
            Lazier<ILecturerRepository> lecturers,
            Lazier<IReportRepository> reports,
            Lazier<IRoleRepository> roles,
            Lazier<ISpecialityRepository> specialities,
            Lazier<IStudentCourseRepository> studentCourse,
            Lazier<IStudentQueueRepository> studentQueue,
            Lazier<IStudentRepository> students,
            Lazier<ITaskRepository> tasks,
            Lazier<IUserRepository> users)
        {
            this.admins = admins;
            this.context = context;
            this.serviceProvider = serviceProvider;
            this.users = users;
            this.comments = comments;
            this.courses = courses;
            this.guides = guides;
            this.lecturers = lecturers;
            this.reports = reports;
            this.roles = roles;
            this.specialities = specialities;
            this.studentCourse = studentCourse;
            this.studentQueue = studentQueue;
            this.students = students;
            this.tasks = tasks;
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class =>
            serviceProvider.GetService<IRepository<TEntity>>();

        public Task CommitAsync() => context.SaveChangesAsync();

        public void Dispose() => context.Dispose();
    }
}
