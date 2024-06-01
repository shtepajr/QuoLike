using Microsoft.EntityFrameworkCore;
using QuoLike.Server.DTOs;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;

namespace QuoLike.Server.Data.Repositories
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly QuoLikeDbContext _context;

        public QuoteRepository(QuoLikeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quote>> GetAllAsync()
        {
            return await _context.Quotes.ToListAsync();
        }

        public Task<Quote> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Quote> UpdateAsync(Quote quote)
        {
            var existingQuote = await _context.Quotes.FindAsync(quote.QuoteSelectId);

            if (existingQuote == null)
            {
                return null;
            }

            existingQuote.isArchived = quote.isArchived;
            existingQuote.isFavorite = quote.isFavorite;

            await _context.SaveChangesAsync();

            return existingQuote;
        }
    }
}
