using QuoLike.Server.Helpers;
using QuoLike.Server.Models;

namespace QuoLike.Server.Data.Repositories
{
    public interface IQuoteRepository
    {
        Task<IEnumerable<Quote>> GetPaginatedAsync(QueryObject queryObject, string userId);
        Task<int> GetTotalAsync(string userId);
        Task<Quote?> GetAsync(string id, string userId);
        Task<Quote?> GetByExternalIdAsync(string externalId, string userId);
        Task<Quote?> AddAsync(Quote quote);
        Task<Quote?> UpdateAsync(Quote quoteSelect);
        Task<Quote?> DeleteAsync(string id, string userId);
    }
}