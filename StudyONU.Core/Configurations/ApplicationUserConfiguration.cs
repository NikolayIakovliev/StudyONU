using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Identity;

namespace StudyONU.Core.Configurations
{
    class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
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
        }
    }
}
