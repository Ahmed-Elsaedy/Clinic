using Clinic.Application.Common.Interfaces;
using Clinic.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Clinic.Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ClinicDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("ClinicDbContext"),
                builder => builder.MigrationsAssembly(typeof(ClinicDbContext).Assembly.FullName)));
            
            services.AddScoped<IClinicDbContext>(provider=> provider.GetRequiredService<ClinicDbContext>());
            
            services.AddScoped<ClinicDbContextInitializer>();
            
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}