using Microsoft.AspNetCore.Mvc;
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

        public async Task<Quote?> GetAsync(string id)
        {
            return await _context.Quotes.FindAsync(id);
        }
        public async Task<Quote> AddAsync(Quote quote)
        {
            var createdQuote = await _context.Quotes.AddAsync(quote);
            await _context.SaveChangesAsync();
            return createdQuote.Entity;
        }

        public async Task<Quote?> UpdateAsync(Quote quote)
        {
            _context.Entry(quote).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return quote;
        }

        public async Task<Quote?> DeleteAsync(string id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
                return null;

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();
            return quote;
        }
    }
}
