using Microsoft.AspNetCore.Identity;

namespace QuoLike.Server.Data.Repositories
{
    public interface IAuthRepository
    {
        Task<IdentityResult?> DeleteUser(IdentityUser user);
    }
}
