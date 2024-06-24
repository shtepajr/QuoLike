using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuoLike.Server.Data;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.DTOs;
using QuoLike.Server.DTOs.Quotable;
using QuoLike.Server.Helpers;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;
using System.Collections.Generic;
using System.Text.Json;

namespace QuoLike.Server.Controllers
{
    [Route("api/quotes")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly ILogger<QuotesController> _logger;
        private readonly IQuoteRepository _quoteRepository;
        private readonly HttpClient _httpClient;
        public QuotesController(ILogger<QuotesController> logger, IQuoteRepository quoteSelectRepository, HttpClient httpClient)
        {
            _logger = logger;
            _quoteRepository = quoteSelectRepository;
            _httpClient = httpClient;
        }

        [HttpGet("merged")]
        public async Task<IActionResult> GetQuotableMerged([FromQuery] QueryObject queryObject)
        {
            string requestUrl = $"https://api.quotable.io/quotes?page={queryObject.Page}&limit={queryObject.Limit}";
            var response = await _httpClient.GetAsync(requestUrl);
            var data = await response.Content.ReadAsStringAsync();
            var quotableQuotes = JsonConvert.DeserializeObject<QuotableQuoteConnection>(data);

            // Find all quotes in database (by quotable page quotes)
            List<Quote> dbQuotes = new();

            int dbPage = 1;
            int totalDbPages = (int)Math.Ceiling(await _quoteRepository.GetTotalAsync() / (double)queryObject.Limit);
            do
            {
                var quotes = await _quoteRepository.GetPaginatedAsync(new QueryObject() { Page = dbPage, Limit = 6 });

                if (quotes.Count() == 0)
                {
                    break;
                }
                else
                {
                    dbQuotes.AddRange(quotes
                        .Where(q => quotableQuotes.Results.Any(qtb => qtb._id == q.ExternalId)));
                }
                dbPage++;
            } while (dbPage <= totalDbPages);

            // Merge quotables with db quotes (left join)
            var merged = from qtb in quotableQuotes.Results
                         join q in dbQuotes on qtb._id equals q.ExternalId into gj
                         from subgroup in gj.DefaultIfEmpty()
                         select new
                         {
                             qtb.Tags,
                             qtb._id,
                             qtb.Content,
                             qtb.Author,
                             qtb.AuthorSlug,
                             qtb.Length,
                             qtb.DateAdded,
                             qtb.DateModified,
                             isFavorite = subgroup is null ? false : subgroup.IsFavorite,
                             isArchived = subgroup is null ? false : subgroup.IsArchived,
                         };

            return Ok(new
            {
                Page = queryObject.Page,
                Count = merged.Count(),
                TotalCount = quotableQuotes.TotalCount,
                TotalPages = (int)Math.Ceiling(quotableQuotes.TotalCount / (double)queryObject.Limit),
                Results = merged
            });

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject queryObject)
        {
            var dbQuotes = await _quoteRepository.GetPaginatedAsync(queryObject);
            int totalDbQuotes = await _quoteRepository.GetTotalAsync();
            int totalDbPages = (int)Math.Ceiling(totalDbQuotes / (double)queryObject.Limit);

            List<QuotableQuote> quotables = new();

            // Find quotable matches
            int qtbPage = 1;
            int qtbTotalPages = 0;
            do
            {
                string requestUrl = $"https://api.quotable.io/quotes?page={qtbPage}&limit={queryObject.Limit}";
                var response = await _httpClient.GetAsync(requestUrl);
                var data = await response.Content.ReadAsStringAsync();

                var quotableQuotes = JsonConvert.DeserializeObject<QuotableQuoteConnection>(data);

                if (quotableQuotes is null || quotableQuotes?.Count < 1)
                {
                    break;
                }
                else
                {
                    qtbTotalPages = quotableQuotes.TotalPages;
                    var matches = quotableQuotes.Results
                        .Where(qtb => dbQuotes.Any(q => q.ExternalId == qtb._id));

                    quotables.AddRange(matches);
                    // remove quotable duplicates
                    quotables = quotables.GroupBy(qtb => qtb._id).Select(qtb => qtb.First()).ToList();


                    if (quotables.Count() == dbQuotes.Count())
                    {
                        break;
                    }
                }
                qtbPage++;
            } while (qtbPage <= qtbTotalPages);

            // Merge db quotes with quotables (inner join)
            var merged = from q in dbQuotes
                         join qtb in quotables on q.ExternalId equals qtb._id
                         select new
                         {
                             qtb.Tags,
                             qtb._id,
                             qtb.Content,
                             qtb.Author,
                             qtb.AuthorSlug,
                             qtb.Length,
                             qtb.DateAdded,
                             qtb.DateModified,
                             q.IsFavorite,
                             q.IsArchived,
                         };

            return Ok(new
            {
                Page = queryObject.Page,
                Count = merged.Count(),
                TotalCount = totalDbQuotes,
                TotalPages = totalDbPages,
                Results = merged
            });
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

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] QuoteCreateDTO quote)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var q = await _quoteRepository.AddAsync(quote.ToQuote());

            return CreatedAtAction(nameof(Get), new { id = q.QuoteId }, q.ToQuoteDTO());
        }

        [HttpPut("edit/{id}")]
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

        [HttpDelete("delete/{id}")]
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

        //[HttpGet]
        //public async Task<IActionResult> GetAll([FromQuery] QueryObject queryObject)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    var quotes = await _quoteRepository.GetAllAsync(queryObject);

        //    var quoteDtos = quotes.Select(s => s.ToQuoteDTO());

        //    return Ok(new
        //    {
        //        TotalCount = quotes.Count(),
        //        TotalPages = (int)Math.Ceiling(quotes.Count() / (double)queryObject.Limit),
        //        Results = quoteDtos
        //    });
        //}
    }
}
