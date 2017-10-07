using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class ReportConfiguration : IEntityTypeConfiguration<ReportEntity>
    {
        public void Configure(EntityTypeBuilder<ReportEntity> builder)
        {
            builder.HasKey(entity => new
            {
                entity.TaskId,
                entity.StudentId
            });

            builder.Property(entity => entity.FilePath)
                .IsRequired()
                .HasMaxLength(400);
            builder.Property(entity => entity.DateCreated)
                .IsRequired()
                .HasDefaultValueSql("GETDATE()");
            builder.Property(entity => entity.DateModified)
                .IsRequired()
                .HasDefaultValueSql("GETDATE()");

            builder.HasOne(entity => entity.Task)
                .WithMany(entity => entity.Reports)
                .HasForeignKey(entity => entity.TaskId);

            builder.HasOne(entity => entity.Student)
                .WithMany(entity => entity.Reports)
                .HasForeignKey(entity => entity.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
