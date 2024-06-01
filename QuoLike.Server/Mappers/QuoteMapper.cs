using QuoLike.Server.DTOs;
using QuoLike.Server.Models;

namespace QuoLike.Server.Mappers
{
    public static class QuoteMapper
    {
        public static Quote ToQuote(this QuoteUpdateDTO quoteSelectUpdateDTO)
        {
            return new Quote()
            {
                QuoteSelectId = quoteSelectUpdateDTO.QuoteSelectId,
                QuoteId = quoteSelectUpdateDTO.QuoteId,
                isArchived = quoteSelectUpdateDTO.isArchived,
                isFavorite = quoteSelectUpdateDTO.isFavorite            
            };
        }

        public static QuoteDTO ToQuoteDTO(this Quote quoteSelect)
        {
            return new QuoteDTO()
            {
                QuoteSelectId = quoteSelect.QuoteSelectId,
                QuoteId = quoteSelect.QuoteId,
                isArchived = quoteSelect.isArchived,
                isFavorite = quoteSelect.isFavorite
            };
        }
    }
}
