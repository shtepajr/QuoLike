using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Data;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.Services;

namespace QuoLike.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IQuoteRepository, QuoteRepository>();
            builder.Services.AddScoped<IAuthRepository, AuthRepository>();
            builder.Services.AddScoped<IAuthorizationHandler, IsOwnerAuthorizationHandler>();

            builder.Services.AddDbContext<QuoLikeDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("QuoLikeDbContext")));
            builder.Services.AddHttpClient();

            builder.Services.AddIdentityApiEndpoints<IdentityUser>() // Identity API 1/2
                .AddEntityFrameworkStores<QuoLikeDbContext>();

            // Email
            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true; // turn on email for Identity API
            });

            builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration); // email sender
            builder.Services.AddTransient<IEmailSender, EmailSender>();

            // Cors policy 1/2
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("https://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy"); // Cors policy 2/2

            app.UseAuthorization();

            app.MapIdentityApi<IdentityUser>(); // Identity API 2/2
 
            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
