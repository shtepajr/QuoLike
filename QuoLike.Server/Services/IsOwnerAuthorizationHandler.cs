using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace QuoLike.Server.Services
{
    public static class EntityOperations
    {
        public static OperationAuthorizationRequirement FullAccess = new OperationAuthorizationRequirement()
        {
            Name = Constants.FullAccessOperationName
        };
    }
    public class Constants
    {
        public static readonly string FullAccessOperationName = "FullAccess";
    }

    public class IsOwnerAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, object>
    {
        public IsOwnerAuthorizationHandler()
        {
            
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, object resource)
        {
            throw new NotImplementedException();
        }
    }
}
