using QuoLike.Server.Models.Quotable;

namespace QuoLike.Server.Models
{
    public class Quote : QuotableQuote
    {
        public string QuoteId { get; set; }
        public bool? IsFavorite { get; set; }
        public bool? IsArchived { get; set; }
    }
}
