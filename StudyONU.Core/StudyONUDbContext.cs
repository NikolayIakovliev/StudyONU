using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudyONU.Core.Configurations;
using StudyONU.Core.Entities;
using StudyONU.Core.Identity;

namespace StudyONU.Core
{
    public class StudyONUDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public DbSet<CommentEntity> Comments { get; set; }

        public DbSet<CourseEntity> Courses { get; set; }

        public DbSet<GuideEntity> Guides { get; set; }

        public DbSet<LecturerEntity> Lecturers { get; set; }

        public DbSet<ReportEntity> Reports { get; set; }

        public DbSet<SpecialityEntity> Specialities { get; set; }

        public DbSet<StudentEntity> Students { get; set; }

        public DbSet<StudentQueueEntity> StudentQueue { get; set; }

        public DbSet<TaskEntity> Tasks { get; set; }

        public StudyONUDbContext(DbContextOptions options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ApplicationUserConfiguration());
            builder.ApplyConfiguration(new CommentConfiguration());
            builder.ApplyConfiguration(new CourseConfiguration());
            builder.ApplyConfiguration(new GuideConfiguration());
            builder.ApplyConfiguration(new LecturerConfiguration());
            builder.ApplyConfiguration(new ReportConfiguration());
            builder.ApplyConfiguration(new SpecialityConfiguration());
            builder.ApplyConfiguration(new StudentConfiguration());
            builder.ApplyConfiguration(new StudentQueueConfiguration());
            builder.ApplyConfiguration(new TaskConfiguration());
        }
    }
}
