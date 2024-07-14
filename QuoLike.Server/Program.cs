
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Controllers;
using QuoLike.Server.Data;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.Services;
using System.Text;

namespace QuoLike.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IQuoteRepository, QuoteRepository>();
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
            app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager,
                [FromBody] object empty) =>
            {
                if (empty != null)
                {
                    await signInManager.SignOutAsync();
                    return Results.Ok();
                }
                return Results.Unauthorized();
            })
            .WithOpenApi()
            .RequireAuthorization();
            app.MapPost("/forgotPasswordCustom", async (IEmailSender emailSender, UserManager<IdentityUser> userManager, ForgotPasswordRequest forgotPassword) =>
            {
                var user = await userManager.FindByEmailAsync(forgotPassword.Email);

                if (user == null)
                    return Results.NotFound();

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                if (token == null)
                    return Results.NotFound();

                var resetLink = $"https://localhost:5173/resetPassword?resetCode={encodedToken}&email={forgotPassword.Email}";             
                await emailSender.SendEmailAsync(forgotPassword.Email, "Reset Password", $"Please reset your password by clicking <a href=\"{resetLink}\">here</a>");

                return Results.Ok();
            })
            .WithOpenApi();
            app.MapPost("/manage/delete", [Authorize] async (HttpContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager) =>
            {
                var user = await userManager.GetUserAsync(context.User);
                if (user == null)
                {
                    context.Response.StatusCode = 404; // Not Found
                    await context.Response.WriteAsync("User not found");
                    return;
                }

                var deleteResult = await userManager.DeleteAsync(user);
                if (deleteResult.Succeeded)
                {
                    context.Response.StatusCode = 200; // OK
                    await signInManager.SignOutAsync();
                    await context.Response.WriteAsync("Account deleted successfully");
                }
                else
                {
                    context.Response.StatusCode = 500; // Internal Server Error
                    await context.Response.WriteAsync("Failed to delete account");
                }
            })
                .WithOpenApi()
                .RequireAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
