using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Comment;

namespace StudyONU.Logic.Mappings
{
    class CommentProfile : ProfileBase
    {
        public CommentProfile()
        {
            CreateMap<CommentCreateDTO, CommentEntity>();
            CreateMap<CommentEntity, CommentListDTO>()
                .ForMember(dest => dest.SenderPhoto, opts => opts.MapFrom(src => src.Sender.PhotoPath))
                .ForMember(dest => dest.SenderFullName, opts => opts.MapFrom(src => GetFullName(src.Sender)))
                .ForMember(dest => dest.SenderEmail, opts => opts.MapFrom(src => src.Sender.Email));
        }
    }
}
