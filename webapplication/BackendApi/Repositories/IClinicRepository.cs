using System.Collections.Generic;
using System.Threading.Tasks;
using BackendApi.Models;

namespace BackendApi.Repositories
{
    public interface IClinicRepository
    {
        Task<IEnumerable<Clinic>> GetAllClinicsAsync();
    }
}
