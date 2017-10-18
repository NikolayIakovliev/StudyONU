using Microsoft.AspNetCore.Authorization;
using LogicRoles = StudyONU.Logic.Infrastructure.Roles;

namespace StudyONU.Admin.Filters
{
    public class AdminAuthorizeAttribute : AuthorizeAttribute
    {
        public AdminAuthorizeAttribute()
        {
            Roles = LogicRoles.Admin;
        }
    }
}