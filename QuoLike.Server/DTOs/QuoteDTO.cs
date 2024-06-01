namespace QuoLike.Server.DTOs
{
    public class QuoteDTO
    {
        public string QuoteSelectId { get; set; }
        public string QuoteId { get; set; }
        public bool isFavorite { get; set; }
        public bool isArchived { get; set; }
    }
}
