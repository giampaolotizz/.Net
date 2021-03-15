using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MicroUser.DBContexts;
using MicroUser.Repository;
using Consul;
using MicroUser.Services;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Consul;

namespace MicroUser
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerDocument();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<UserContext>(o => o.UseSqlServer(Configuration.GetConnectionString("UserDB")));
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddHttpClient();
            services.AddSingleton<UserRepository>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin();
                });
            });

            //Aggiunta configurazione consul service
            services.AddConsulConfig(Configuration);

            //Aggiunta ocelot
           
            services.AddOcelot().AddConsul();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {

                    //Convalida del server che genera il token 
                    ValidateIssuer = true,
                    //Convalida che il destinatario del token è autorizzato a ricevere 
                    ValidateAudience = true,
                    //Controlla che il token non sia scaduto e la chiave del server sia valida 
                    ValidateLifetime = true,
                    //Convalida la firma del token 
                    ValidateIssuerSigningKey = true,
                    //Con le successive tre righe settiamo
                    //server (issuer), destinatario (audience) e singinkey del token,
                    //che, fatto così, possiamo settare da appsetting.json 
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //aggiunta consul service
            app.UseConsul(Configuration);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            //app.useRouting();
            app.UseOpenApi();
            
            app.UseAuthentication();
            app.UseMvc();
            app.UseCors();
            app.UseSwaggerUi3();
            
        }
    }
}
