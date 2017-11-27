﻿using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;
using StudyONU.Admin.Authentication;
using StudyONU.Admin.Builder;
using StudyONU.Admin.Mappings;
using StudyONU.Logic.Extensions;
using System;

namespace StudyONU.Admin
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(config =>
            {
                config.AddProfile<BindingModelProfile>();
            });
            services.AddLogic(configuration);

            // TODO
            // Move Authentication to Logic
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

            return services.BuildServiceProvider();
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

            app.UseDatabaseSeedMiddleware();

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "downloadGuide",
                    template: "download/guides/{id}",
                    defaults: new { controller = "File", action = "DownloadGuide" }
                    );

                routes.MapRoute(
                    name: "downloadTask",
                    template: "download/courses/{courseId:int}/{taskName}",
                    defaults: new { controller = "File", action = "DownloadTask" }
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
