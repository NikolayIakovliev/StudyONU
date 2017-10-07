using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudyONU.Core.Entities;

namespace StudyONU.Core.Configurations
{
    public class SpecialityConfiguration : IEntityTypeConfiguration<SpecialityEntity>
    {
        public void Configure(EntityTypeBuilder<SpecialityEntity> builder)
        {
            builder.HasKey(entity => entity.Id);

            builder.Property(entity => entity.Name)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
