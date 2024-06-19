namespace QuoLike.Server.DTOs
{
    public class QuoteUpdateDTO
    {
        public string QuoteId { get; set; }
        public string ExternalId { get; set; }
        public bool isFavorite { get; set; }
        public bool isArchived { get; set; }
    }
}