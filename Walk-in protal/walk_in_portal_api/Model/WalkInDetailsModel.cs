namespace walk_in_portal_api.Model
{
    public class WalkInDetailsModel
    {
        public int? id { get; set; }
        public string? title { get; set; }
        public string? location { get; set; }

        public DateTime? start_date { get; set; }

        public DateTime? end_date { get; set; }
        public int? is_internship_opportunity_for_mca { get; set; }

        public string? generalInstructions { get; set; }

        public string? instructionsForTheExam { get; set; }


        public string? minimumSystemRequirements { get; set; }


        public string? process { get; set; }

        public string? venue_of_walk_in { get; set; }
        public List<JobRoleSpecificationModel>? JobRoles { get; set; } = new List<JobRoleSpecificationModel> { };
        public List<TimeSlotModel>? TimeSlots { get; set; } = new List<TimeSlotModel>();
    }
}
