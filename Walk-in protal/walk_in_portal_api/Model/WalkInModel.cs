namespace walk_in_portal_api.Model
{
    public class WalkInModel
    {
        public WalkInModel(int id, string title,string location,DateTime start_date, DateTime end_date, int is_internship_opportunity_for_mca, JobRoleModel jobRole)
        {
            this.id = id; 
            this.title = title;
            this.location = location;
            this.start_date = start_date;
            this.end_date = end_date;
            this.is_internship_opportunity_for_mca = is_internship_opportunity_for_mca;
            this.JobRoles = [jobRole];
        }
        public int id { get; set; }
        public string title { get; set; }
        public string location { get; set; }
        
        public DateTime start_date { get; set; }

        public DateTime end_date { get; set; }
        public int is_internship_opportunity_for_mca { get; set; }
        public List<JobRoleModel> JobRoles { get; set; }
    }
}
