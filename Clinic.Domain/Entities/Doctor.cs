using Clinic.Domain.Common;

namespace Clinic.Domain.Entities
{
    public class Doctor : BaseAuditableEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public ICollection<Appointment> Appointments { get; set; }
    }
}
