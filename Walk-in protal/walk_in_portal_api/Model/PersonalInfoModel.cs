namespace walk_in_portal_api.Model
{
    public class PersonalInfoModel
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email_id { get; set; }
        public string phone_number { get; set; }
        public string country_code { get; set; }
        public string referrer_name { get; set; }
        public string portfolio_url { get; set; }
        public string is_subscribed_to_email { get; set; }

        public string resume { get; set; }
        public string user_image { get; set; }
        public string password { get; set; }

        public List<JobRoleRegistrationModel> preferred_job_roles { get; set; } = new List<JobRoleRegistrationModel> { };
    }
}
