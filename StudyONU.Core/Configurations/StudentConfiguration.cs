using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class StudentConfiguration : IEntityTypeConfiguration<StudentEntity>
    {
        public void Configure(EntityTypeBuilder<StudentEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.HasOne(entity => entity.ApplicationUser)
                .WithMany(entity => entity.Students)
                .HasForeignKey(entity => entity.ApplicationUserId);
            builder.Property(entity => entity.CourseNumber)
                .HasColumnType("tinyint")
                .HasMaxLength(1);
        }
    }
}
