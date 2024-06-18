using QuoLike.Server.DTOs;
using QuoLike.Server.DTOs.Quotable;
using QuoLike.Server.Models;

namespace QuoLike.Server.Mappers
{
    public static class QuoteMapper
    {
        public static Quote ToQuote(this QuoteUpdateDTO updateDTO)
        {
            return new Quote()
            {
                QuoteId = updateDTO.QuoteId,
                ExternalId = updateDTO.ExternalId,
                isArchived = updateDTO.isArchived,
                isFavorite = updateDTO.isFavorite            
            };
        }

        public static QuoteDTO ToQuoteDTO(this Quote quoteModel)
        {
            return new QuoteDTO()
            {
                QuoteId = quoteModel.QuoteId,
                ExternalId = quoteModel.ExternalId,
                isArchived = quoteModel.isArchived,
                isFavorite = quoteModel.isFavorite
            };
        }

        public static Quote ToQuote(this QuoteCreateDTO createDTO)
        {
            return new Quote()
            {
                ExternalId = createDTO.ExternalId,
                isArchived = createDTO.isArchived,
                isFavorite = createDTO.isFavorite
            };
        }
    }
}
