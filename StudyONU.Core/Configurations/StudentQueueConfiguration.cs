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
                .HasMaxLength(40);
            builder.Property(entity => entity.LastName)
                .IsRequired()
                .HasMaxLength(40);
            builder.Property(entity => entity.Patronymic)
                .IsRequired()
                .HasMaxLength(40);
            builder.Property(entity => entity.Email)
                .IsRequired()
                .HasMaxLength(254);
            builder.Property(entity => entity.PhotoPath)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(entity => entity.CourseNumber)
                .HasColumnType("tinyint")
                .HasMaxLength(1);
            builder.Property(entity => entity.DateCreated)
                .IsRequired()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.HasOne(entity => entity.Speciality)
                .WithMany(entity => entity.StudentQueue)
                .HasForeignKey(entity => entity.SpecialityId);
            builder.HasOne(entity => entity.Course)
                .WithMany()
                .HasForeignKey(entity => entity.CourseId);
        }
    }
}
