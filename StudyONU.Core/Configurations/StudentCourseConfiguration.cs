using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    class StudentCourseConfiguration : IEntityTypeConfiguration<StudentCourseEntity>
    {
        public void Configure(EntityTypeBuilder<StudentCourseEntity> builder)
        {
            builder.HasKey(entity => new
            {
                entity.StudentId,
                entity.CourseId
            });

            builder.HasOne(entity => entity.Student)
                .WithMany(entity => entity.Courses)
                .HasForeignKey(entity => entity.StudentId);

            builder.HasOne(entity => entity.Course)
                .WithMany(entity => entity.Students)
                .HasForeignKey(entity => entity.CourseId);
        }
    }
}
