using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Logging;
using Moq;
using Newtonsoft.Json;
using QuoLike.Server;
using QuoLike.Server.Controllers;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.DTOs;
using QuoLike.Server.Helpers;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;
using QuoLike.Server.Models.Quotable;
using QuoLike.Server.Services;
using RichardSzalay.MockHttp;
using System;
using System.Security.Claims;

namespace QuoLike.Tests
{
    public class QuotesTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly Mock<ILogger<QuotesController>> _loggerMock;
        private readonly Mock<IQuoteRepository> _quoteRepositoryMock;
        private MockHttpMessageHandler _mockHttpMessageHandler;
        private readonly Mock<HttpClient> _httpClient;
        private readonly Mock<UserManager<IdentityUser>> _userManagerMock;
        private string userId;
        public QuotesTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _loggerMock = new Mock<ILogger<QuotesController>>();
            _quoteRepositoryMock = new Mock<IQuoteRepository>();
            _mockHttpMessageHandler = new MockHttpMessageHandler();
            _httpClient = new Mock<HttpClient>(_mockHttpMessageHandler);
            _userManagerMock = MockUserManager<IdentityUser>();

            userId = "test-user-id";
            _userManagerMock.Setup(um => um.GetUserId(It.IsAny<ClaimsPrincipal>()))
                .Returns(userId);
        }

        private Mock<UserManager<TUser>> MockUserManager<TUser>() where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var userManager = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            return userManager;
        }

        [Fact]
        public async Task GetQuote_ShouldReturnOkResult_WhenQuoteExists()
        {
            // Arrange
            var internalId = Guid.NewGuid().ToString();
            var quote = new Quote { QuoteId = internalId, Content = "Test Quote" };
            _quoteRepositoryMock.Setup(repo => repo.GetAsync(internalId, userId))
                                .ReturnsAsync(quote);


            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Get(internalId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<QuoteDTO>(okResult.Value);
            Assert.Equal(quote.QuoteId, returnValue.QuoteId);
            Assert.Equal(quote.Content, returnValue.Content);
        }

        [Fact]
        public async Task GetQuote_ShouldReturnNotFoundResult_WhenQuoteDoesNotExist()
        {
            // Arrange
            var internalId = Guid.NewGuid().ToString();

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Get(internalId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task CreateQuote_ShouldReturnCreatedResult_WhenQuoteSuccessfullyCreated()
        {
            // Arrange
            var quoteId = "1";
            var quoteContent = "Test Quote";

            var quoteCreateDTO = new QuoteCreateDTO { _id = quoteId, Content = quoteContent };
            var quote = new Quote { _id = quoteId, Content = quoteContent };
            // no existing quote
            _quoteRepositoryMock.Setup(repo => repo.GetByExternalIdAsync(quoteId, userId)).ReturnsAsync((Quote)null);
            _quoteRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Quote>())).ReturnsAsync(quote);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Create(quoteCreateDTO);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnValue = Assert.IsType<QuoteDTO>(createdAtActionResult.Value);
            Assert.Equal(quoteId, returnValue._id);
            Assert.Equal(quoteContent, returnValue.Content);
        }

        [Fact]
        public async Task CreateQuote_ShouldReturnUpdatedResult_WhenQuoteAlreadyExists()
        {
            // Arrange
            var quoteId = "1";
            var quoteContent = "Test Quote";

            var existingQuote = new Quote { _id = quoteId, Content = quoteContent };
            var quoteCreateDTO = new QuoteCreateDTO { _id = quoteId, Content = quoteContent };

            _quoteRepositoryMock.Setup(repo => repo.GetByExternalIdAsync(quoteId, userId)).ReturnsAsync(existingQuote);
            _quoteRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Quote>())).ReturnsAsync(existingQuote);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Create(quoteCreateDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetQuotableMerged_ShouldReturnMergedResults()
        {
            // Arrange
            var queryObject = new QueryObject { Page = 1, Limit = 6 };
            var requestUrl = $"https://api.quotable.io/quotes?page={queryObject.Page}&limit={queryObject.Limit}";

            // Quotable API response
            var quotableQuotes = new QuotableQuoteConnection
            {
                Results = new List<QuotableQuote>
                {
                    new QuotableQuote { _id = "1", Content = "Quotable Quote 1" },
                    new QuotableQuote { _id = "2", Content = "Quotable Quote 2" },
                    new QuotableQuote { _id = "3", Content = "Quotable Quote 3" },
                    new QuotableQuote { _id = "4", Content = "Quotable Quote 4" },
                    new QuotableQuote { _id = "5", Content = "Quotable Quote 5" },
                    new QuotableQuote { _id = "6", Content = "Quotable Quote 6" }
                },
                Count = 6,
                TotalCount = 999,
                Page = 1,
                TotalPages = (int)Math.Ceiling(999 / (double)queryObject.Limit)
            };
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(quotableQuotes))
            };

            //_httpClient.Setup(client => client.GetAsync(requestUrl)).ReturnsAsync(httpResponse);
            _mockHttpMessageHandler.When(requestUrl).Respond(httpResponse);

            _quoteRepositoryMock.Setup(repo => repo.GetTotalAsync(userId)).ReturnsAsync(2);
            _quoteRepositoryMock.Setup(repo => repo.GetPaginatedAsync(It.IsAny<QueryObject>(), userId))
                .ReturnsAsync(new List<Quote>
                {
                    new Quote { _id = "1", Content = "Quotable Quote 1", IsFavorite = true, IsArchived = false },
                    new Quote { _id = "3", Content = "Quotable Quote 3", IsFavorite = false, IsArchived = false },

                });

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.GetQuotableMerged(queryObject);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = okResult.Value as MergedQuotesDTO;

            Assert.Equal(6, returnValue.Count);

            var mergedResults = returnValue.Results;
            Assert.Equal(6, mergedResults.Count());

            var firstQuote = mergedResults.First();
            Assert.Equal("1", firstQuote._id);
            Assert.True(firstQuote.IsFavorite);
            Assert.False(firstQuote.IsArchived);

            var secondQuote = mergedResults.Last();
            Assert.Equal("6", secondQuote._id);
            Assert.False(secondQuote.IsFavorite);
            Assert.False(secondQuote.IsArchived);
        }

        [Fact]
        public async Task GetAllFavorite_ShouldReturnFavoriteResults()
        {
            // Arrange
            var queryObject = new QueryObject { Page = 1, Limit = 6, isFavorite = true };
            _quoteRepositoryMock.Setup(repo => repo.GetTotalAsync(userId)).ReturnsAsync(2);
            _quoteRepositoryMock.Setup(repo => repo.GetPaginatedAsync(It.IsAny<QueryObject>(), userId))
                .ReturnsAsync(new List<Quote>
                {
                    new Quote { _id = "1", Content = "Quotable Quote 1", IsFavorite = true, IsArchived = false },
                    new Quote { _id = "3", Content = "Quotable Quote 3", IsFavorite = true, IsArchived = true },

                });

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.GetAll(queryObject);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = okResult.Value as MergedQuotesDTO;

            Assert.Equal(2, returnValue.Count);

            var favoriteResults = returnValue.Results;
            Assert.Equal(2, favoriteResults.Count());

            var firstQuote = favoriteResults.First();
            Assert.Equal("1", firstQuote._id);
            Assert.True(firstQuote.IsFavorite);

            var secondQuote = favoriteResults.Last();
            Assert.Equal("3", secondQuote._id);
            Assert.True(secondQuote.IsFavorite);
        }

        [Fact]
        public async Task UpdateQuote_ShouldReturnUpdatedResult_WhenQuoteAlreadyExists()
        {
            // Arrange
            var quoteId = "1";
            var quoteContent = "Test Quote";

            var existingQuote = new Quote { QuoteId = quoteId, _id = quoteId, Content = quoteContent };
            var quoteUpdateDTO = new QuoteUpdateDTO { QuoteId = quoteId, _id = quoteId, IsFavorite = true, IsArchived = false };

            _quoteRepositoryMock.Setup(repo => repo.GetByExternalIdAsync(quoteId, userId)).ReturnsAsync(existingQuote);
            _quoteRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Quote>())).ReturnsAsync(existingQuote);
            _quoteRepositoryMock.Setup(repo => repo.DeleteAsync(quoteId, userId)).ReturnsAsync(existingQuote);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Update(quoteUpdateDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = okResult.Value as QuoteDTO;

            Assert.Equal(quoteId, returnValue.QuoteId);
            Assert.Equal(quoteContent, returnValue.Content);
            Assert.True(returnValue.isFavorite);
            Assert.False(returnValue.isArchived);
        }

        [Fact]
        public async Task UpdateQuote_ShouldReturnNotFoundResult_WhenQuoteDoesNotExist()
        {
            // Arrange
            var quoteId = "1";
            var quoteContent = "Test Quote";
            var quoteUpdateDTO = new QuoteUpdateDTO { QuoteId = quoteId, _id = quoteId, IsFavorite = true, IsArchived = false };

            _quoteRepositoryMock.Setup(repo => repo.GetByExternalIdAsync(quoteId, userId)).ReturnsAsync((Quote)null);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Update(quoteUpdateDTO);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task DeleteQuote_ShouldReturnOkResult_WhenQuoteSuccessfullyDeleted()
        {
            // Arrange
            var quoteId = "1";
            var quoteContent = "Test Quote";
            var existingQuote = new Quote { QuoteId = quoteId, _id = quoteId, Content = quoteContent };

            _quoteRepositoryMock.Setup(repo => repo.DeleteAsync(quoteId, userId)).ReturnsAsync(existingQuote);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Delete(quoteId);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task DeleteQuote_ShouldReturnNotFoundResult_WhenQuoteDoesNotExist()
        {
            // Arrange
            string quoteId = "1";

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Delete(quoteId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetQuotableRandom_ShouldReturnRandomQuote()
        {
            // Arrange
            string requestUrl = "https://api.quotable.io/random";

            var quotableQuote = new QuotableQuote
            {
                _id = "1",
                Content = "Quotable Quote 1"
            };

            var httpResponse = new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(quotableQuote))
            };

            _mockHttpMessageHandler.When(requestUrl).Respond(httpResponse);

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClient.Object, _userManagerMock.Object);

            // Act
            var result = await controller.GetQuotableRandom();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<QuotableQuote>(okResult.Value);

            Assert.NotNull(returnValue);
            Assert.NotNull(returnValue?._id);
        }
    }
}