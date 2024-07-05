using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Models;

namespace QuoLike.Server.Data
{
    public class QuoLikeDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Quote> Quotes { get; set; }
        public QuoLikeDbContext(DbContextOptions<QuoLikeDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quote>()
                .ToTable("Quotes")
                .HasKey(q => q.QuoteId);
            modelBuilder.Entity<Quote>()
                .Property(q => q.QuoteId)
                .ValueGeneratedOnAdd();
            base.OnModelCreating(modelBuilder);
        }
    }
}
