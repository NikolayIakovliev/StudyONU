using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class LecturerConfiguration : IEntityTypeConfiguration<LecturerEntity>
    {
        public void Configure(EntityTypeBuilder<LecturerEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.HasOne(entity => entity.User)
                .WithMany(entity => entity.Lecturers)
                .HasForeignKey(entity => entity.UserId);
        }
    }
}
