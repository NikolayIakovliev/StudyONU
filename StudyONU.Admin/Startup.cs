﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using StudyONU.Admin.Authentication;
using StudyONU.Admin.Builder;
using StudyONU.Admin.Mappings;
using StudyONU.Logic.Extensions;
using System.Text;

namespace StudyONU.Admin
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

            app.UseDatabaseSeedMiddleware();
        }
    }
}
