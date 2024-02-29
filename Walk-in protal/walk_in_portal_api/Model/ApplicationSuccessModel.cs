namespace walk_in_portal_api.Model
{
    public class ApplicationSuccessModel
    {
        public DateTime? time_slot_start {  get; set; } 
        public DateTime? time_slot_end { get; set; }
        public string? venue_of_walk_in {  get; set; }
        public DateTime start_date { get; set; }

        public string? things_to_remember {  get; set; }
    }
}
