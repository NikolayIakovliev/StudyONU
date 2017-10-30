using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    class TaskConfiguration : IEntityTypeConfiguration<TaskEntity>
    {
        public void Configure(EntityTypeBuilder<TaskEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasOne(entity => entity.Course)
                .WithMany(entity => entity.Tasks)
                .HasForeignKey(entity => entity.CourseId);
        }
    }
}
