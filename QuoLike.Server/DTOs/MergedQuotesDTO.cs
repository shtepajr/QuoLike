namespace QuoLike.Server.DTOs
{
    public class MergedQuotesDTO
    {
        public int Page { get; set; }
        public int Count { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<MergedQuoteDTO> Results { get; set; }
    }
}
