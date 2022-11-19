using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinic.Application.Appointments.Queries.GetAppointmentsListQuery
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Notes { get; set; }
        public DateTime Date { get; set; }
        public string PhoneNumber { get; set; }
    }
}
