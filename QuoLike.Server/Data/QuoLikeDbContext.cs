using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Models;

namespace QuoLike.Server.Data
{
    public class QuoLikeDbContext : DbContext
    {
        public DbSet<QuoteSelect> Quotes { get; set; }
        public QuoLikeDbContext(DbContextOptions<QuoLikeDbContext> options) : base(options)
        {
        }
    }
}
