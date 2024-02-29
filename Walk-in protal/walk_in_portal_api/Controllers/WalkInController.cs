using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Text.Json;
using walk_in_portal_api.Model;

namespace walk_in_portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WalkInController : ControllerBase
    {
        [HttpGet("list", Name = "GetWalkInListController")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<WalkInModel>>> Get([FromServices] MySqlConnection connection)
        {
            try
            {

                var walkIns = await connection.QueryAsync<dynamic>("select JO.job_opening_id AS id, JO.job_title as title , JO.start_date, JO.end_date, JO.office_location as location,JO.is_internship_opportunity_for_mca, JR.job_role_name, JR.job_role_image_url from job_opening AS JO join job_opening_job_role_map AS JRM on JO.job_opening_id = JRM.job_opening_id  join job_role AS JR on JR.job_role_id = JRM.job_role_id group by JO.job_opening_id;");
                List<dynamic> walkInList = walkIns.ToList();
                Dictionary<int,WalkInModel> modiefiedResponse = new Dictionary<int,WalkInModel>();
                for (int i = 0; i < walkInList.Count; ++i)
                {
                    if (modiefiedResponse.ContainsKey(walkInList[i].id))
                    {
                        modiefiedResponse[walkInList[i].id].jobRoles.Add(new JobRoleModel(walkInList[i].job_role_name, walkInList[i].job_role_image_url));
                    }
                    else
                    { 
           
                        modiefiedResponse.Add(walkInList[i].id, new WalkInModel(walkInList[i].id, walkInList[i].title, walkInList[i].location,walkInList[i].start_date, walkInList[i].end_date, walkInList[i].is_internship_opportunity_for_mca, new JobRoleModel(walkInList[i].job_role_name, walkInList[i].job_role_image_url)));
                    }
                }

                List<WalkInModel> finalResponse = new List<WalkInModel>();
                foreach(var walkIn in modiefiedResponse)
                {
                    finalResponse.Add(walkIn.Value);
                }
                return Ok(finalResponse);

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        [HttpGet("{id}", Name = "GetWalkInDetailsController")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<WalkInModel>> Get([FromServices] MySqlConnection connection,int id)
        {
            try
            {

                WalkInDetailsModel? walkIn = await connection.QueryFirstOrDefaultAsync<WalkInDetailsModel>("select JO.job_opening_id AS id, job_title as title , start_date, end_date, office_location as location, is_internship_opportunity_for_mca,process, venue_of_walk_in, general_instructions as generalInstructions, exam_instructions as instructionsForTheExam, system_requirements as minimumSystemRequirements from job_opening JO join job_opening_additional_details JD on JO.job_opening_id = JD.job_opening_id where JO.job_opening_id = '" + id  + "';");
                if(walkIn == null) return BadRequest("Walk-In is does not exist.");
                await Console.Out.WriteLineAsync("ji " + walkIn.id);
 
                IEnumerable<JobRoleSpecificationModel> jobRolesResponse = await connection.QueryAsync<JobRoleSpecificationModel>("select job_role_name as name, JRM.job_role_id as id, requirements,roleDescription,grossCompensationPackage  from job_opening_job_role_map as JRM join job_role as JR on JRM.job_role_id = JR.job_role_id where job_opening_id = '"+id+"';");
                List<JobRoleSpecificationModel> jobRoles = jobRolesResponse.ToList();
                walkIn.JobRoles = jobRoles;
                IEnumerable<TimeSlotModel> timeSlotsResponse = await connection.QueryAsync<TimeSlotModel>("select job_opening_time_slot_id as id, time_slot_start as timeSlotStart, time_slot_end as timeSlotEnd from job_opening_time_slot where job_opening_id = '"+id+"'");
                List<TimeSlotModel> timeSlots = timeSlotsResponse.ToList();
                walkIn.TimeSlots = timeSlots;
                return Ok(walkIn);

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        [HttpPost("apply", Name = "ApplyForWalkInController")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Post([FromServices] MySqlConnection connection, [FromBody] WalkInApplicationModel walkInApplication)
        {
            try
            {
                string jobRoleIds = "";
                for(int i = 0;i < walkInApplication.jobRoleId.Count; ++i)
                {
                    if (i < walkInApplication.jobRoleId.Count - 1)
                        jobRoleIds += walkInApplication.jobRoleId[i] + ",";
                    else
                        jobRoleIds += walkInApplication.jobRoleId[i];
                }
                
                await connection.ExecuteAsync("call add_walk_in_application('" + walkInApplication.userId + "','" + walkInApplication.jobOpeningId+"','"+walkInApplication.jobOpeningTimeSlotId +"','" + jobRoleIds +"','"+ walkInApplication.resumeUrl+"');");
                int id = await connection.QueryFirstAsync<int>("select walk_in_application_id as id from walk_in_application where user_id = '" + walkInApplication.userId + "' and job_opening_id = '" + walkInApplication.jobOpeningId + "';");
                return Ok(JsonSerializer.Serialize(new { id }));

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }
        [HttpGet("success/{id}", Name = "WalkInApplicationSuccessController")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> WalkInApplicationSuccessController([FromServices] MySqlConnection connection, int id)
        {
            try
            {
                ApplicationSuccessModel response =  await connection.QueryFirstAsync<ApplicationSuccessModel>("select JT.time_slot_start, JT.time_slot_end,JD.venue_of_walk_in, JO.start_date,WP.things_to_remember from walk_in_application WP join job_opening_time_slot JT on WP.job_opening_time_slot_id = JT.job_opening_time_slot_id join \r\njob_opening JO on JO.job_opening_id = WP.job_opening_id join job_opening_additional_details JD on JD.job_opening_id = JO.job_opening_id where \r\nWP.walk_in_application_id ='" + id + "';");
                return Ok(response);

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error retrieving data from the backend");
            }
        }

        
    }
}
