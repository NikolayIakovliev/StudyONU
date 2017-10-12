using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    class AdminConfiguration : IEntityTypeConfiguration<AdminEntity>
    {
        public void Configure(EntityTypeBuilder<AdminEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.HasOne(entity => entity.User)
                .WithMany(entity => entity.Admins)
                .HasForeignKey(entity => entity.UserId);
        }
    }
}
