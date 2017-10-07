using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    class StudentQueueConfiguration : IEntityTypeConfiguration<StudentQueueEntity>
    {
        public void Configure(EntityTypeBuilder<StudentQueueEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.FirstName)
                .IsRequired()
                .HasMaxLength(20);
            builder.Property(entity => entity.LastName)
                .IsRequired()
                .HasMaxLength(20);
            builder.Property(entity => entity.Patronymic)
                .IsRequired()
                .HasMaxLength(20);
            builder.Property(entity => entity.Email)
                .IsRequired()
                .HasMaxLength(254);
            builder.Property(entity => entity.PhotoPath)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(entity => entity.CourseNumber)
                .HasColumnType("tinyint")
                .HasMaxLength(1);
        }
    }
}
