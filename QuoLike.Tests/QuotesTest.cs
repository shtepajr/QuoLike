using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Logging;
using Moq;
using QuoLike.Server;
using QuoLike.Server.Controllers;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.DTOs;
using QuoLike.Server.Mappers;
using QuoLike.Server.Models;
using System;
using System.Security.Claims;

namespace QuoLike.Tests
{
    public class QuotesTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly Mock<ILogger<QuotesController>> _loggerMock;
        private readonly Mock<IQuoteRepository> _quoteRepositoryMock;
        private readonly Mock<HttpClient> _httpClientMock;
        private readonly Mock<UserManager<IdentityUser>> _userManagerMock;
        private string userId;
        public QuotesTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _loggerMock = new Mock<ILogger<QuotesController>>();
            _quoteRepositoryMock = new Mock<IQuoteRepository>();
            _httpClientMock = new Mock<HttpClient>();
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
            var quoteId = "1";
            var quote = new Quote { _id = quoteId, UserId = userId, Content = "Test Quote" };
            _quoteRepositoryMock.Setup(repo => repo.GetAsync(quoteId, userId))
                                .ReturnsAsync(quote);


            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClientMock.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Get(quoteId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<QuoteDTO>(okResult.Value);
            Assert.Equal(quote._id, returnValue._id);
            Assert.Equal(quote.Content, returnValue.Content);
        }

        [Fact]
        public async Task GetQuote_ShouldReturnNotFoundResult_WhenQuoteDoesNotExist()
        {
            // Arrange
            var quoteId = "1";

            var controller = new QuotesController(_loggerMock.Object, _quoteRepositoryMock.Object,
                _httpClientMock.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Get(quoteId);

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
                _httpClientMock.Object, _userManagerMock.Object);

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
                _httpClientMock.Object, _userManagerMock.Object);

            // Act
            var result = await controller.Create(quoteCreateDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result); 
        }
    }
}