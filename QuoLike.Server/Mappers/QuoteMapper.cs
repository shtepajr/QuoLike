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
                IsArchived = updateDTO.IsArchived,
                IsFavorite = updateDTO.IsFavorite            
            };
        }

        public static QuoteUpdateDTO ToUpdateDTO(this Quote updateDTO)
        {
            return new QuoteUpdateDTO()
            {
                QuoteId = updateDTO.QuoteId,
                ExternalId = updateDTO.ExternalId,
                IsArchived = updateDTO.IsArchived,
                IsFavorite = updateDTO.IsFavorite
            };
        }

        public static QuoteDTO ToQuoteDTO(this Quote quoteModel)
        {
            return new QuoteDTO()
            {
                QuoteId = quoteModel.QuoteId,
                ExternalId = quoteModel.ExternalId,
                isArchived = quoteModel.IsArchived,
                isFavorite = quoteModel.IsFavorite
            };
        }

        public static Quote ToQuote(this QuoteCreateDTO createDTO)
        {
            return new Quote()
            {
                ExternalId = createDTO.ExternalId,
                IsArchived = createDTO.IsArchived,
                IsFavorite = createDTO.IsFavorite
            };
        }
    }
}
