using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Logging;
using Moq;
using QuoLike.Server;
using QuoLike.Server.Controllers;
using QuoLike.Server.Data.Repositories;
using QuoLike.Server.DTOs;
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

        public QuotesTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _loggerMock = new Mock<ILogger<QuotesController>>();
            _quoteRepositoryMock = new Mock<IQuoteRepository>();
            _httpClientMock = new Mock<HttpClient>();
            _userManagerMock = MockUserManager<IdentityUser>();
        }
        [Fact]
        public async Task GetsQuote_ReturnsOkResult_WhenQuoteExists()
        {
            // Arrange
            var quoteId = "1";
            var userId = "user123";
            var quote = new Quote { _id = quoteId, UserId = userId, Content = "Test Quote" };
            _quoteRepositoryMock.Setup(repo => repo.GetAsync(quoteId, userId))
                                .ReturnsAsync(quote);
            _userManagerMock.Setup(um => um.GetUserId(It.IsAny<ClaimsPrincipal>()))
                            .Returns(userId);

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

        private Mock<UserManager<TUser>> MockUserManager<TUser>() where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var userManager = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            return userManager;
        }
    }
}