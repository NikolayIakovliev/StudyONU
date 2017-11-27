using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;
using StudyONU.Logic.Extensions;
using StudyONU.Web.Authentication;
using StudyONU.Web.Extensions;
using StudyONU.Web.Mappings;

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
            services.AddAutoMapper(config =>
            {
                config.AddProfile<BindingModelProfile>();
            });
            services.AddLogic(configuration);

            // TODO
            // Move Authentication to Logic
            services.AddAuthentication(JwtBearerSettings.Issuer, JwtBearerSettings.Key);
            services.AddDomain(configuration);

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
                    ConfigFile = "webpack.config.development.js",
                    HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
                });
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
