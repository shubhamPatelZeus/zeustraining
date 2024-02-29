namespace walk_in_portal_api.Model
{
    public class ProfessionalQualificationModel
    {
        public ApplicantTypeRegistrationModel applicant_type { get; set; } = new ApplicantTypeRegistrationModel();  
        public int? current_ctc { get; set; }
        public int? expected_ctc { get; set; }
        public int? years_of_experience { get; set; }

        public List<TechnologyRegistrationModel>? user_expert_technology { get; set; } = new List<TechnologyRegistrationModel> { };
        public List<TechnologyRegistrationModel> user_familiar_technology { get; set; } = new List<TechnologyRegistrationModel> { };

        public string is_there_notice_period { get; set; }
        public int? notice_period_length_in_months { get; set; }
        public DateTime? notice_period_end_date { get; set; }
        public string is_appeared_previously {  get; set; }

        public string? role_applied_for {  get; set; }


    }
}
