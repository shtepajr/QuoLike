namespace QuoLike.Server.DTOs.Quotable
{
    public class QuotableQuoteConnection
    {
        public int Count { get; set; }
        public int TotalCount {  get; set; }
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public List<QuotableQuote>? Results { get; set; }
    }
}

//{
//    "count": 20,
//  "totalCount": 193,
//  "page": 1,
//  "totalPages": 10,
//  "results": [
//    {
//        "tags": [
//          "famous-quotes",
//        "inspirational"
//        ],
//      "_id": "8pxScew8Z6Fg",
//      "content": "Nothing great was ever achieved without enthusiasm.",
//      "author": "Ralph Waldo Emerson",
//      "authorSlug": "ralph-waldo-emerson",
//      "length": 51,
//      "dateAdded": "2019-01-08",
//      "dateModified": "2019-01-08"
//    }
//  ]
//}