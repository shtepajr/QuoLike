using QuoLike.Server.Helpers;
using QuoLike.Server.Models;

namespace QuoLike.Server.Data.Repositories
{
    public interface IQuoteRepository
    {
        Task<IEnumerable<Quote>> GetPaginatedAsync(QueryObject queryObject);
        Task<IEnumerable<Quote>> GetAllAsync(QueryObject queryObject);
        Task<int> GetTotalAsync();
        Task<Quote?> GetAsync(string id);
        Task<Quote?> GetByExternalIdAsync(string externalId);
        Task<Quote?> AddAsync(Quote quote);
        Task<Quote?> UpdateAsync(Quote quoteSelect);
        Task<Quote?> DeleteAsync(string id);
    }
}