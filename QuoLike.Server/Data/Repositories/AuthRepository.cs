using Microsoft.AspNetCore.Identity;

namespace QuoLike.Server.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly QuoLikeDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public AuthRepository(QuoLikeDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<IdentityResult?> DeleteUser(IdentityUser user)
        {
            return await _userManager.DeleteAsync(user);
        }
    }
}
