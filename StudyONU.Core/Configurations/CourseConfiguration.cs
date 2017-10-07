using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<CourseEntity>
    {
        public void Configure(EntityTypeBuilder<CourseEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(entity => entity.DateCreated)
                .IsRequired()
                .HasDefaultValueSql("GETDATE()");
            builder.Property(entity => entity.CourseNumber)
                .HasColumnType("tinyint")
                .HasMaxLength(1);

            builder.HasOne(entity => entity.Speciality)
                .WithMany(entity => entity.Courses)
                .HasForeignKey(entity => entity.SpecialityId);

            builder.HasOne(entity => entity.Lecturer)
                .WithMany(entity => entity.Courses)
                .HasForeignKey(entity => entity.LecturerId);
        }
    }
}
