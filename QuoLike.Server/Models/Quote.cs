namespace QuoLike.Server.Models
{
    public class Quote
    {
        public string QuoteId { get; set; }
        public string ExternalId { get; set; }
        public bool isFavorite { get; set; }
        public bool isArchived { get; set; }
    }
}
