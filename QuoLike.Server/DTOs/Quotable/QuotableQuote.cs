namespace QuoLike.Server.DTOs.Quotable
{
    public class QuotableQuote
    {
        public List<string>? Tags { get; set; }
        public string? _id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string AuthorSlug { get; set; }
        public int Length { get; set; }
        public DateOnly DateAdded { get; set; }
        public DateOnly DateModified { get; set; }
    }
}

//{
//    "tags": [
//      "famous-quotes",
//    "inspirational"
//    ],
//  "_id": "8pxScew8Z6Fg",
//  "content": "Nothing great was ever achieved without enthusiasm.",
//  "author": "Ralph Waldo Emerson",
//  "authorSlug": "ralph-waldo-emerson",
//  "length": 51,
//  "dateAdded": "2019-01-08",
//  "dateModified": "2019-01-08"
//}