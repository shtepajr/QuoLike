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

        public async Task<IEnumerable<Quote>> GetAllAsync(QueryObject queryObject)
        {
            var quotes = _context.Quotes.AsQueryable();

            // Tabs
            if (queryObject.isFavorite.HasValue)
            {
                quotes = quotes.Where(q => q.IsFavorite == queryObject.isFavorite);
            }
            else if (queryObject.isArchived.HasValue)
            {
                quotes = quotes.Where(q => q.IsArchived == queryObject.isArchived);
            }

            return await quotes.ToListAsync();
        }

        public async Task<IEnumerable<Quote>> GetPaginatedAsync(QueryObject queryObject)
        {
            var quotes = _context.Quotes.AsQueryable();

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

        public async Task<int> GetTotalAsync()
        {
            return await _context.Quotes.CountAsync();
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
