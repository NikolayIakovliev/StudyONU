using AutoMapper;
using Newtonsoft.Json;
using StudyONU.Core.Entities;
using System.Collections.Generic;

namespace StudyONU.Logic.Mappings
{
    abstract class ProfileBase : Profile
    {
        protected string GetFullName(UserEntity userEntity) =>
            $"{userEntity.LastName} {userEntity.FirstName} {userEntity.Patronymic}";

        protected IEnumerable<string> Deserialize(string filePaths)
        {
            return JsonConvert.DeserializeObject<IEnumerable<string>>(filePaths);
        }

        protected string Serialize(IEnumerable<string> filePaths)
        {
            return JsonConvert.SerializeObject(filePaths);
        }
    }
}
