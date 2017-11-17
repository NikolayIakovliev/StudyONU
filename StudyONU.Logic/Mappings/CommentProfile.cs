using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Comment;

namespace StudyONU.Logic.Mappings
{
    class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CommentEntity, CommentListDTO>()
                .ForMember(dest => dest.SenderFullName, opts => opts.MapFrom(src => GetFullName(src.Sender)))
                .ForMember(dest => dest.SenderEmail, opts => opts.MapFrom(src => src.Sender.Email));
        }

        private string GetFullName(UserEntity userEntity) =>
            $"{userEntity.LastName} {userEntity.FirstName} {userEntity.Patronymic}";
    }
}
