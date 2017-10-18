using Microsoft.AspNetCore.Authorization;
using LogicRoles = StudyONU.Logic.Infrastructure.Roles;

namespace StudyONU.Admin.Filters
{
    public class LecturerAuthorizeAttribute : AuthorizeAttribute
    {
        public LecturerAuthorizeAttribute()
        {
            Roles = LogicRoles.Lecturer;
        }
    }
}
