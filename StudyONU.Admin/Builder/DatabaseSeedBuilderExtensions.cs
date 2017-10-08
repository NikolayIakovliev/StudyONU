using Microsoft.AspNetCore.Builder;
using StudyONU.Admin.Middleware;

namespace StudyONU.Admin.Builder
{
    static class DatabaseSeedBuilderExtensions
    {
        public static IApplicationBuilder UseDatabaseSeedMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<RoleMiddleware>();
            app.UseMiddleware<UserMiddleware>();

            return app;
        }
    }
}
