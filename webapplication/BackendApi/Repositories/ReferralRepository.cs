using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using BackendApi.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace BackendApi.Repositories
{
    public interface IReferralRepository
    {
        Task<IEnumerable<ExternalReferral>> GetAllReferralsAsync(int agentId);
        Task<(int Id, string ReferenceNumber)> CreateReferralAsync(ReferralCreateDto dto);
    }

    public class ReferralRepository : IReferralRepository
    {
        private readonly string _connectionString;

        public ReferralRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<ExternalReferral>> GetAllReferralsAsync(int agentId)
        {
            const string sql = @"
                SELECT 
                    Id, ReferenceNumber, PatientName, Age, Gender, Phone, 
                    Department, Priority, Notes, Status, CreatedAt, AgentId,
                    CommissionAmount, CommissionStatus, ClinicName, AgentName
                FROM 
                    External_Referrals
                WHERE 
                    AgentId = @AgentId
                ORDER BY 
                    CreatedAt DESC";

            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<ExternalReferral>(sql, new { AgentId = agentId });
            }
        }

        public async Task<(int Id, string ReferenceNumber)> CreateReferralAsync(ReferralCreateDto dto)
        {
            const string sql = @"
                DECLARE @NewId INT;
                DECLARE @NewRef NVARCHAR(50);
                DECLARE @AgentName NVARCHAR(100);

                -- Look up Agent Name
                SELECT @AgentName = UserName FROM New_Users WHERE UserId = @AgentId;

                INSERT INTO External_Referrals (
                    ReferenceNumber, PatientName, Age, Gender, Phone, 
                    Department, Priority, Notes, Status, CreatedAt, AgentId,
                    ClinicName, AgentName
                ) 
                VALUES (
                    CAST(NEWID() AS NVARCHAR(50)), @PatientName, @Age, @Gender, @Phone, 
                    @Department, @Priority, @Notes, 'Pending', GETDATE(), @AgentId,
                    @ClinicName, @AgentName
                );

                SET @NewId = SCOPE_IDENTITY();
                -- Format: YYYY/MM/0001 (using ID as serial)
                SET @NewRef = LEFT(CONVERT(VARCHAR(10), GETDATE(), 111), 7) + '/' + RIGHT('0000' + CAST(@NewId AS VARCHAR(10)), 4);

                UPDATE External_Referrals 
                SET ReferenceNumber = @NewRef
                WHERE Id = @NewId;

                SELECT @NewId AS Id, @NewRef AS ReferenceNumber;";

            using (var connection = new SqlConnection(_connectionString))
            {
                var result = await connection.QuerySingleAsync(sql, new 
                { 
                    dto.PatientName,
                    dto.Age,
                    dto.Gender,
                    dto.Phone,
                    dto.Department,
                    Priority = dto.Priority ?? "Normal",
                    Notes = dto.Notes ?? "",
                    dto.AgentId,
                    dto.ClinicName
                });
                return (result.Id, result.ReferenceNumber);
            }
        }
    }
}
