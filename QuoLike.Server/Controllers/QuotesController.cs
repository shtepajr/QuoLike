using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Data;
using QuoLike.Server.Models;

namespace QuoLike.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly ILogger<QuotesController> _logger;
        private readonly QuoLikeDbContext _context;
        public QuotesController(ILogger<QuotesController> logger, QuoLikeDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<QuoteSelect> Get()
        {
            var quotes = _context.Quotes.ToList();
            return quotes;
        }

        [HttpGet]
        [Route("TestGetPost")]
        public IEnumerable<QuoteSelect> TestGetPost()
        {
            _context.Quotes.Add(new QuoteSelect()
            {
                QuoteSelectId  = "NTseDGDXOuo8",
                QuoteId = "QpXN5tJQwW5M",
                Action = SelectAction.Archive
            });
            _context.SaveChanges();
            return _context.Quotes.ToArray();
        }
    }
}
