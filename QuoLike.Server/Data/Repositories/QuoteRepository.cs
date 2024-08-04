using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.DTOs;
using QuoLike.Server.Helpers;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QuoLike.Server.Data.Repositories
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly QuoLikeDbContext _context;

        public QuoteRepository(QuoLikeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quote>> GetPaginatedAsync(QueryObject queryObject, string userId)
        {
            var quotes = _context.Quotes.Where(q => q.UserId == userId).AsQueryable();

            // Tabs
            if (queryObject.isFavorite.HasValue)
            {
                quotes = quotes.Where(q => q.IsFavorite == queryObject.isFavorite);
            }
            else if (queryObject.isArchived.HasValue)
            {
                quotes = quotes.Where(q => q.IsArchived == queryObject.isArchived);
            }

            // Pagination
            var totalItems = await quotes.CountAsync();
            var skipNumber = (queryObject.Page - 1) * queryObject.Limit;
            quotes = quotes.Skip(skipNumber).Take(queryObject.Limit);

            return await quotes.ToListAsync();
        }

        public async Task<int> GetTotalAsync(string userId)
        {
            return await _context.Quotes.Where(q => q.UserId == userId).CountAsync();
        }
        public async Task<Quote?> GetAsync(string id, string userId)
        {
            return await _context.Quotes.FirstOrDefaultAsync(q => q.QuoteId == id && q.UserId == userId);
        }
        public async Task<Quote?> GetByExternalIdAsync(string externalId, string userId)
        {
            return await _context.Quotes.FirstOrDefaultAsync(q => q._id == externalId && q.UserId == userId);
        }
        public async Task<Quote?> AddAsync(Quote quote)
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

        public async Task<Quote?> DeleteAsync(string id, string userId)
        {
            var quote = await _context.Quotes.FirstOrDefaultAsync(q => q.QuoteId == id && q.UserId == userId);
            if (quote == null)
                return null;

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();
            return quote;
        }
    }
}
