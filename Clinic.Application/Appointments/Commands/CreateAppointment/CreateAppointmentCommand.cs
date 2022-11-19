using Clinic.Application.Common.Exceptions;
using Clinic.Application.Common.Interfaces;
using Clinic.Domain.Entities;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Clinic.Application.Appointments.Commands.CreateAppointment
{
    public record CreateAppointmentCommand : IRequest<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
    }

    public class CreateAppointmentCommandHandler : IRequestHandler<CreateAppointmentCommand, int>
    {
        private readonly IClinicDbContext _dbContext;
        public CreateAppointmentCommandHandler(IClinicDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
        {
            var defaultDoctor = await _dbContext.Doctors.FirstOrDefaultAsync();

            if (defaultDoctor == null)
            {
                throw new EntityNotFoundException();
            }

            var datePerHour = new DateTime(request.Date.Year, request.Date.Month, request.Date.Day, request.Date.Hour, 0, 0, DateTimeKind.Utc);

            var conflicts = await _dbContext.Appointments.CountAsync(x => x.DoctorId == defaultDoctor.Id && x.Date == datePerHour);
            if (conflicts == 2)
            {
                throw new ValidationException(new List<ValidationFailure>
                {
                    new ValidationFailure(nameof(request.Date), "The doctor already has an appointment at the provided date, please choose another date")
                });
            }

            var appointment = new Appointment()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                Notes = request.Notes,
                Date = datePerHour,
                DoctorId = defaultDoctor.Id
            };

            await _dbContext.Appointments.AddAsync(appointment);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return appointment.Id;
        }
    }
}
