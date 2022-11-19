using CleanArchitecture.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using Clinic.Api.Common;
using Clinic.Application.Appointments.Commands.CreateAppointment;
using Clinic.Application.Appointments.Queries.GetAppointmentsListQuery;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Clinic.Api.Controllers
{
    [EnableCors("CORSPolicy")]
    public class AppointmentsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<List<AppointmentDto>> GetTodoItemsWithPagination()
        {
            return await Mediator.Send(new GetAppointmentsListQuery());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateAppointmentCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
