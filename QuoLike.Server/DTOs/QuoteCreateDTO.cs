using QuoLike.Server.Models;
using QuoLike.Server.Models.Quotable;

namespace QuoLike.Server.DTOs
{
    public class QuoteCreateDTO : QuotableQuote
    {
        public bool? IsFavorite { get; set; }
        public bool? IsArchived { get; set; }
    }
}