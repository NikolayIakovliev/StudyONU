using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
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

            builder.HasOne(entity => entity.Role)
                .WithMany(entity => entity.Users)
                .HasForeignKey(entity => entity.RoleId);
        }
    }
}
