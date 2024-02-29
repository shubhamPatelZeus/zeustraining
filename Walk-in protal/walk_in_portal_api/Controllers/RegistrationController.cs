using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Security.Cryptography;
using System.Text;
using walk_in_portal_api.Model;
using walk_in_portal_api.Services;

namespace walk_in_portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly ICacheService _cacheService;
        public RegistrationController(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }
        [HttpGet]
        [Route("job-roles")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<JobRoleRegistrationModel>>> GetJobRolesController([FromServices] MySqlConnection connection)
        {
            try
            {

                List<JobRoleRegistrationModel> cacheData = _cacheService.GetData<List<JobRoleRegistrationModel>>("jobRoles");
                if (cacheData != null) 
                    return Ok(cacheData);
                 

                IEnumerable<JobRoleRegistrationModel> jobRoles = await connection.QueryAsync<JobRoleRegistrationModel>("select job_role_name as name,job_role_id as id from job_role");
                List<JobRoleRegistrationModel> jobRolesList = jobRoles.ToList();
                _cacheService.SetData<List<JobRoleRegistrationModel>>("jobRoles",jobRolesList, DateTimeOffset.Now.AddHours(1));

                return Ok(jobRolesList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        [HttpGet]
        [Route("qualifications")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<QualificationRegistrationModel>>> GetQualificationsController([FromServices] MySqlConnection connection)
        {
            try
            {

                List<QualificationRegistrationModel> cacheData = _cacheService.GetData<List<QualificationRegistrationModel>>("qualifications");
                if (cacheData != null)
                    return Ok(cacheData);

                IEnumerable<QualificationRegistrationModel> qualifications = await connection.QueryAsync<QualificationRegistrationModel>("select qualification_type as name,enum_qualification_type_id as id from enum_qualification_type");
                List<QualificationRegistrationModel> qualificationsList = qualifications.ToList();
                _cacheService.SetData<List<QualificationRegistrationModel>>("qualifications", qualificationsList, DateTimeOffset.Now.AddHours(1));

                return Ok(qualificationsList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        } 
        

        [HttpGet]
        [Route("colleges")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<CollegeRegistrationModel>>> GetCollegesController([FromServices] MySqlConnection connection)
        {
            try
            {
                List<CollegeRegistrationModel> cacheData = _cacheService.GetData<List<CollegeRegistrationModel>>("colleges");
                if (cacheData != null)
                    return Ok(cacheData);

                IEnumerable<CollegeRegistrationModel> colleges = await connection.QueryAsync<CollegeRegistrationModel>("select college_name as name,enum_college_id as id from enum_college");
                List<CollegeRegistrationModel> collegesList = colleges.ToList();
                _cacheService.SetData<List<CollegeRegistrationModel>>("colleges", collegesList, DateTimeOffset.Now.AddHours(1));


                return Ok(collegesList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }
        
        [HttpGet]
        [Route("streams")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<StreamRegistrationModel>>> GetStreamsController([FromServices] MySqlConnection connection)
        {
            try
            {
                List<StreamRegistrationModel> cacheData = _cacheService.GetData<List<StreamRegistrationModel>>("streams");
                if (cacheData != null)
                    return Ok(cacheData);

                IEnumerable<StreamRegistrationModel> streams = await connection.QueryAsync<StreamRegistrationModel>("select stream_type as name,enum_stream_type_id as id from enum_stream_type");
                List<StreamRegistrationModel> streamsList = streams.ToList();
                _cacheService.SetData<List<StreamRegistrationModel>>("streams", streamsList, DateTimeOffset.Now.AddHours(1));


                return Ok(streamsList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        } 
        
        [HttpGet]
        [Route("applicant-types")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<ApplicantTypeRegistrationModel>>> GetApplicantTypeController([FromServices] MySqlConnection connection)
        {
            try
            {

                List<ApplicantTypeRegistrationModel> cacheData = _cacheService.GetData<List<ApplicantTypeRegistrationModel>>("applicantTypes");
                if (cacheData != null)
                    return Ok(cacheData);

                IEnumerable<ApplicantTypeRegistrationModel> applicantTypes = await connection.QueryAsync<ApplicantTypeRegistrationModel>("select applicant_type_name as name,enum_applicant_type_id as id from enum_applicant_type");
                List<ApplicantTypeRegistrationModel> applicantTypesList = applicantTypes.ToList();
                _cacheService.SetData<List<ApplicantTypeRegistrationModel>>("applicantTypes", applicantTypesList, DateTimeOffset.Now.AddHours(1));


                return Ok(applicantTypesList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }
        
        [HttpGet]
        [Route("technologies")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<TechnologyRegistrationModel>>> GetTechnologiesController([FromServices] MySqlConnection connection)
        {
            try
            {
                List<TechnologyRegistrationModel> cacheData = _cacheService.GetData<List<TechnologyRegistrationModel>>("technologies");
                if (cacheData != null)
                    return Ok(cacheData);

                IEnumerable<TechnologyRegistrationModel> technologies = await connection.QueryAsync<TechnologyRegistrationModel>("select technology_name as name,enum_technologies_id as id from enum_technologies");
                List<TechnologyRegistrationModel> technologiesList = technologies.ToList();
                _cacheService.SetData<List<TechnologyRegistrationModel>>("technologies", technologiesList, DateTimeOffset.Now.AddHours(1));

                return Ok(technologiesList);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        [HttpPost]
        [Route("")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> registerController([FromServices] MySqlConnection connection,[FromBody] RegisterModel registerModel)
        {
            try
            {
                int is_appeared_previously = 0, is_there_notice_period = 0, is_subscribed_to_email = 0;
                if(registerModel?.qualificationForm.professionalQualification.is_appeared_previously == "true")
                    is_appeared_previously= 1;
                if(registerModel.qualificationForm.professionalQualification.is_there_notice_period == "true")
                    is_there_notice_period= 1;
                if(registerModel.personalInfoForm.is_subscribed_to_email == "true")
                    is_subscribed_to_email = 1;

                string preferredJobRoleIds = "";
                for (int i = 0; i < registerModel.personalInfoForm.preferred_job_roles.Count; ++i)
                {
                    if (i < registerModel.personalInfoForm.preferred_job_roles.Count - 1)
                        preferredJobRoleIds += registerModel.personalInfoForm.preferred_job_roles[i].id + ",";
                    else
                        preferredJobRoleIds += registerModel.personalInfoForm.preferred_job_roles[i].id;
                }

                string userFamiliarTechnologyIds = "";
                for (int i = 0; i < registerModel.qualificationForm.professionalQualification.user_familiar_technology.Count; ++i)
                {
                    if (i < registerModel.qualificationForm.professionalQualification.user_familiar_technology.Count - 1)
                        userFamiliarTechnologyIds += registerModel.qualificationForm.professionalQualification.user_familiar_technology[i].id + ",";
                    else
                        userFamiliarTechnologyIds += registerModel.qualificationForm.professionalQualification.user_familiar_technology[i].id;
                }

                string userExpertTechnologyIds = "";
                for (int i = 0; i < registerModel.qualificationForm.professionalQualification.user_expert_technology.Count; ++i)
                {
                    if (i < registerModel.qualificationForm.professionalQualification.user_expert_technology.Count - 1)
                        userExpertTechnologyIds += registerModel.qualificationForm.professionalQualification.user_expert_technology[i].id + ",";
                    else
                        userExpertTechnologyIds += registerModel.qualificationForm.professionalQualification.user_expert_technology[i].id;
                }

                string hash = HashPasword(registerModel.personalInfoForm.password, out var salt);
                await connection.ExecuteAsync("call user_registration('" + hash + "','" + registerModel.personalInfoForm.first_name + "','" + registerModel.personalInfoForm.last_name + "','" + registerModel.personalInfoForm.email_id + "','" + registerModel.personalInfoForm.phone_number + "','" + registerModel.personalInfoForm.resume + "','" + registerModel.personalInfoForm.portfolio_url + "','" + registerModel.personalInfoForm.user_image + "','" + registerModel.personalInfoForm.referrer_name + "','" + is_subscribed_to_email + "','" + preferredJobRoleIds + "','" + registerModel.qualificationForm.educationalQualification.aggregate_percentage + "','" + registerModel.qualificationForm.educationalQualification.year_of_passing + "','" + registerModel.qualificationForm.educationalQualification.college_name.id + "','" + registerModel.qualificationForm.educationalQualification.stream_type.id + "','" + registerModel.qualificationForm.educationalQualification.qualification_type.id + "','" + registerModel.qualificationForm.professionalQualification.years_of_experience + "','" + registerModel.qualificationForm.professionalQualification.current_ctc + "','" + registerModel.qualificationForm.professionalQualification.expected_ctc + "','" + is_there_notice_period + "','" + registerModel.qualificationForm.professionalQualification.notice_period_end_date?.ToString("yyyy-MM-dd") + "','" + registerModel.qualificationForm.professionalQualification.notice_period_length_in_months + "','" + is_appeared_previously + "','" + registerModel.qualificationForm.professionalQualification.role_applied_for + "','" + registerModel.qualificationForm.professionalQualification.applicant_type.id + "','" + userFamiliarTechnologyIds + "','" + userExpertTechnologyIds + "');");

                await Console.Out.WriteLineAsync("hi");

                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        private static string HashPasword(string password, out byte[] salt)
        {
            const int keySize = 64;
            const int iterations = 30000;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
            salt = HashService.salt;
            Console.Out.WriteLine(salt);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }
    }
}
