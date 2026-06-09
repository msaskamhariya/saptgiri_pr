using System.Collections.Generic;
using System.Threading.Tasks;
using BackendApi.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace BackendApi.Repositories
{
    public class ClinicRepository : IClinicRepository
    {
        private readonly string _connectionString;

        public ClinicRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Clinic>> GetAllClinicsAsync()
        {
            const string sql = @"
                SELECT ClinicId, ClinicName
                FROM clinic_master
                ORDER BY ClinicName ASC";

            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Clinic>(sql);
            }
        }
    }
}
