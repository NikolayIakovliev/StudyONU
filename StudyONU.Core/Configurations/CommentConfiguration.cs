using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<CommentEntity>
    {
        public void Configure(EntityTypeBuilder<CommentEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.Text)
                .IsRequired()
                .HasMaxLength(600);

            builder.HasOne(entity => entity.Sender)
                .WithMany(entity => entity.Comments)
                .HasForeignKey(entity => entity.SenderId);

            builder.HasOne(entity => entity.Task)
                .WithMany(entity => entity.Comments)
                .HasForeignKey(entity => entity.TaskId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
