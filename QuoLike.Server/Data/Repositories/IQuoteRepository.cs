using QuoLike.Server.Models;

namespace QuoLike.Server.Data.Repositories
{
    public interface IQuoteRepository
    {
        Task<IEnumerable<Quote>> GetAllAsync();
        Task<Quote> GetAsync(string id);
        Task<Quote> AddAsync(Quote quote);
        Task<Quote> UpdateAsync(Quote quoteSelect);
        Task<Quote?> DeleteAsync(string id);
    }
}