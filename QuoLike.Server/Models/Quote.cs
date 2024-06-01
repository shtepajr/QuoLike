namespace QuoLike.Server.Models
{
    public class Quote
    {
        public string QuoteSelectId { get; set; }
        public string QuoteId { get; set; }
        public bool isFavorite { get; set; }
        public bool isArchived { get; set; }
    }
}
