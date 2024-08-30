using Microsoft.AspNetCore.Http.HttpResults;
using QuoLike.Server.DTOs;
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
                _id = updateDTO._id,
                IsArchived = updateDTO.IsArchived,
                IsFavorite = updateDTO.IsFavorite            
            };
        }

        public static QuoteUpdateDTO ToUpdateDTO(this Quote updateDTO)
        {
            return new QuoteUpdateDTO()
            {
                QuoteId = updateDTO.QuoteId,
                _id = updateDTO._id,
                IsArchived = updateDTO.IsArchived,
                IsFavorite = updateDTO.IsFavorite
            };
        }

        public static QuoteDTO ToQuoteDTO(this Quote quoteModel)
        {
            return new QuoteDTO()
            {
                QuoteId = quoteModel.QuoteId,
                _id = quoteModel._id,
                Author = quoteModel.Author,
                AuthorSlug = quoteModel.AuthorSlug,
                Content = quoteModel.Content,
                DateAdded = quoteModel.DateAdded,
                DateModified = quoteModel.DateModified,
                Length = quoteModel.Length,
                Tags = quoteModel.Tags,
                isArchived = quoteModel.IsArchived,
                isFavorite = quoteModel.IsFavorite
            };
        }

        public static Quote ToQuote(this QuoteCreateDTO createDTO)
        {
            return new Quote()
            {
                _id = createDTO._id,
                Author = createDTO.Author,
                AuthorSlug = createDTO.AuthorSlug,
                Content = createDTO.Content,
                DateAdded = createDTO.DateAdded,
                DateModified = createDTO.DateModified,
                Length = createDTO.Length,
                Tags = createDTO.Tags,
                IsArchived = createDTO.IsArchived,
                IsFavorite = createDTO.IsFavorite
            };
        }
        public static MergedQuoteDTO ToMergedQuoteDTO(this Quote quoteModel)
        {
            return new MergedQuoteDTO()
            {
                QuoteId = quoteModel.QuoteId,
                _id = quoteModel._id,
                Author = quoteModel.Author,
                AuthorSlug = quoteModel.AuthorSlug,
                Content = quoteModel.Content,
                DateAdded = quoteModel.DateAdded,
                DateModified = quoteModel.DateModified,
                Length = quoteModel.Length,
                Tags = quoteModel.Tags,
                IsArchived = quoteModel.IsArchived,
                IsFavorite = quoteModel.IsFavorite,
                UserId = quoteModel.UserId,
            };
        }
    }
}
