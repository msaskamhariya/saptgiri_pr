using System;

namespace BackendApi.Models
{
    public class ExternalReferral
    {
        public int Id { get; set; }
        public string ReferenceNumber { get; set; }
        public string PatientName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Department { get; set; }
        public string Priority { get; set; }
        public string Notes { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public int AgentId { get; set; }
        public decimal? CommissionAmount { get; set; }
        public string CommissionStatus { get; set; }
        public string ClinicName { get; set; }
        public string AgentName { get; set; }
    }

    public class ReferralCreateDto
    {
        public string PatientName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Department { get; set; }
        public string Priority { get; set; }
        public string Notes { get; set; }
        public int AgentId { get; set; }
        public string ClinicName { get; set; }
    }
}
