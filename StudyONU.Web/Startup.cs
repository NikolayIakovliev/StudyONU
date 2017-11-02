using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;
using StudyONU.Logic.Extensions;
using StudyONU.Web.Authentication;

namespace StudyONU.Web
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogic(configuration);
            services.AddAuthentication(JwtBearerSettings.Issuer, JwtBearerSettings.Key);

            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    IsoDateTimeConverter converter = new IsoDateTimeConverter
                    {
                        DateTimeFormat = "yyyy'.'MM'.'dd"
                    };
                    options.SerializerSettings.Converters.Add(converter);
                });
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true,
                    ConfigFile = "webpack.config.development.js"
                });
                // TODO
                // implement logging
            }

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "download",
                    template: "download/{id}",
                    defaults: new { controller = "File", action = "DownloadGuide" }
                    );

                routes.MapRoute(
                    name: "default",
                    template: "{*.}",
                    defaults: new { controller = "Home", action = "Index" }
                    );
            });
        }
    }
}
