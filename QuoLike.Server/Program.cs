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

            builder.Services.AddScoped<IQuoteRepository, QuoteRepository>();
            builder.Services.AddScoped<IAuthRepository, AuthRepository>();
            builder.Services.AddScoped<IAuthorizationHandler, IsOwnerAuthorizationHandler>();

            // Configure the SQLite database
            builder.Services.AddDbContext<QuoLikeDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("QuoLikeDbContext")));

            builder.Services.AddHttpClient();

            // Add Identity API endpoints and use EF Core stores
            builder.Services.AddIdentityApiEndpoints<IdentityUser>()
                .AddEntityFrameworkStores<QuoLikeDbContext>();

            // Email configuration
            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true; // Require email confirmation for Identity API
            });

            builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);
            builder.Services.AddTransient<IEmailSender, EmailSender>();

            builder.Services.AddControllers();

            // Swagger configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Apply migrations on app startup
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<QuoLikeDbContext>();
                dbContext.Database.Migrate();
            }

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

            // Map Identity API with a custom path
            app.MapGroup("/api/auth")
                .MapIdentityApi<IdentityUser>(); // Identity API 2/2

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
