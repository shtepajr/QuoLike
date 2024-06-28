namespace QuoLike.Server.DTOs
{
    public class QuoteUpdateDTO
    {
        public string QuoteId { get; set; }
        public string ExternalId { get; set; }
        public bool? IsFavorite { get; set; }
        public bool? IsArchived { get; set; }
    }
}