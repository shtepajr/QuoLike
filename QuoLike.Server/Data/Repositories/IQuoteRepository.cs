using QuoLike.Server.Models;

namespace QuoLike.Server.Data.Repositories
{
    public interface IQuoteRepository
    {
        Task<IEnumerable<Quote>> GetAllAsync();
        Task<Quote> GetByIdAsync(int id);
        Task<Quote> UpdateAsync(Quote quoteSelect);
    }
}
