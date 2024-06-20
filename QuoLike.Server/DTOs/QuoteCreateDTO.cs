namespace QuoLike.Server.DTOs
{
    public class QuoteCreateDTO
    {
        public string ExternalId { get; set; }
        public bool? IsFavorite { get; set; }
        public bool? IsArchived { get; set; }
    }
}
