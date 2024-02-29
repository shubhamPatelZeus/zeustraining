namespace walk_in_portal_api.Model
{
    public class EducationalQualificationModel
    {
        public float aggregate_percentage { get; set; }
        public CollegeRegistrationModel college_name  { get; set; } = new CollegeRegistrationModel();
        public string college_location { get; set; }
        public QualificationRegistrationModel qualification_type { get; set; } = new QualificationRegistrationModel();  
        public StreamRegistrationModel stream_type { get; set; } = new StreamRegistrationModel();   
        public int year_of_passing { get; set; }


        
    }

}
