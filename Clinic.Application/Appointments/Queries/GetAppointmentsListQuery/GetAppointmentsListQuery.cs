
using Clinic.Application.Appointments.Queries.GetAppointmentsListQuery;
using Clinic.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TodoItems.Queries.GetTodoItemsWithPagination
{
    public record GetAppointmentsListQuery : IRequest<List<AppointmentDto>>
    {

    }

    public class GetTodoItemsWithPaginationQueryHandler : IRequestHandler<GetAppointmentsListQuery, List<AppointmentDto>>
    {
        private readonly IClinicDbContext _context;

        public GetTodoItemsWithPaginationQueryHandler(IClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<AppointmentDto>> Handle(GetAppointmentsListQuery request, CancellationToken cancellationToken)
        {
            return await _context.Appointments
                .OrderByDescending(x => x.Id)
                .Select(x => new AppointmentDto()
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Notes = x.Notes,
                    Date = x.Date,
                    PhoneNumber = x.PhoneNumber
                }).ToListAsync();
        }
    }
}
