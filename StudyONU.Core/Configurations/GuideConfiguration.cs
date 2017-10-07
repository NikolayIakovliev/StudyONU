using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class GuideConfiguration : IEntityTypeConfiguration<GuideEntity>
    {
        public void Configure(EntityTypeBuilder<GuideEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(entity => entity.FilePath)
                .IsRequired()
                .HasMaxLength(400);
            builder.Property(entity => entity.DateCreated)
                .IsRequired()
                .HasDefaultValueSql("GETDATE()");

            builder.HasOne(entity => entity.Course)
                .WithMany(entity => entity.Guides)
                .HasForeignKey(entity => entity.CourseId);
        }
    }
}
