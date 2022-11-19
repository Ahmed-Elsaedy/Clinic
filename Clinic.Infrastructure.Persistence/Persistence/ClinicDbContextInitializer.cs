using Clinic.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinic.Infrastructure.Persistence
{
    public class ClinicDbContextInitializer
    {
        private readonly ILogger<ClinicDbContextInitializer> _logger;
        private readonly ClinicDbContext _dbContext;

        public ClinicDbContextInitializer(ILogger<ClinicDbContextInitializer> logger, ClinicDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                await _dbContext.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        private async Task TrySeedAsync()
        {
            if (!_dbContext.Doctors.Any())
            {
                _dbContext.Doctors.Add(new Doctor
                {
                    FirstName = "Ahmed",
                    LastName = "Mahmoud",
                });

                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
