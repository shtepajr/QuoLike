namespace QuoLike.Server.DTOs
{
    public class QuoteCreateDTO
    {
        public string ExternalId { get; set; }
        public bool isFavorite { get; set; }
        public bool isArchived { get; set; }
    }
}
