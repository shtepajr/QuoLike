using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuoLike.Server.Data;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.DTOs;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;

namespace QuoLike.Server.Controllers
{
    [Route("api/quotes")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly ILogger<QuotesController> _logger;
        private readonly IQuoteRepository _quoteRepository;
        public QuotesController(ILogger<QuotesController> logger, IQuoteRepository quoteSelectRepository)
        {
            _logger = logger;
            _quoteRepository = quoteSelectRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quotes = await _quoteRepository.GetAllAsync();

            var quoteDtos = quotes.Select(s => s.ToQuoteDTO());

            return Ok(quoteDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var q = await _quoteRepository.GetAsync(id);

            if (q is null)
                return NotFound();

            return Ok(q.ToQuoteDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuoteCreateDTO quote)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var q = await _quoteRepository.AddAsync(quote.ToQuote());

            return CreatedAtAction(nameof(Get), new { id = q.QuoteId }, q.ToQuoteDTO());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] QuoteUpdateDTO quote)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var q = await _quoteRepository.UpdateAsync(quote.ToQuote());

            if (q == null)
            {
                return NotFound("Quote not found");
            }

            return Ok(q.ToQuoteDTO());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var q = await _quoteRepository.DeleteAsync(id);

            if (q == null)
            {
                return NotFound("Quote not found");
            }

            return Ok(q.ToQuoteDTO());
        }
    }
}
