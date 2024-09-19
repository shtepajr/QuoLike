using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using QuoLike.Server.Services;
using System.Text;

namespace QuoLike.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<AuthController> _logger;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(UserManager<IdentityUser> userManager, IEmailSender emailSender, 
            ILogger<AuthController> logger, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _logger = logger;
            _signInManager = signInManager;
        }

        [HttpPost("forgotPasswordCustom")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest forgotPassword)
        {
            var user = await _userManager.FindByEmailAsync(forgotPassword.Email);

            if (user == null)
                return NotFound();

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            if (token == null)
                return NotFound();

            var resetLink = $"https://localhost:5173/resetPassword?resetCode={encodedToken}&email={forgotPassword.Email}";
            await _emailSender.SendEmailAsync(forgotPassword.Email, "Reset Password", $"Please reset your password by clicking <a href=\"{resetLink}\">here</a>");

            return Ok();
        }

        [HttpPost("manage/delete")]
        public async Task<IActionResult> Delete()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var deleteResult = await _userManager.DeleteAsync(user);
            if (deleteResult.Succeeded)
            {
                await _signInManager.SignOutAsync();
                return Ok("Account deleted successfully");
            }

            return BadRequest(deleteResult.Errors); // Failed to delete account
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(object empty)
        {
            if (empty != null)
            {
                await _signInManager.SignOutAsync();
                return Ok("Logged out successfully");
            }

            return Unauthorized();
        }
    }
}
