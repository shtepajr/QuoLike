using QuoLike.Server.Models.Quotable;

namespace QuoLike.Server.DTOs
{
    public class QuoteDTO : QuotableQuote
    {
        public string QuoteId { get; set; }
        public bool? isFavorite { get; set; }
        public bool? isArchived { get; set; }
    }
}
