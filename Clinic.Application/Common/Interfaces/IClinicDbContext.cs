using Clinic.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinic.Application.Common.Interfaces
{
    public interface IClinicDbContext
    {
        DbSet<Doctor> Doctors { get; }
        DbSet<Appointment> Appointments { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
