using Microsoft.Extensions.DependencyInjection;

namespace Clinic.Infrastructure.Persistence
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            return services;
        }
    }
}