using System.ComponentModel.DataAnnotations;

namespace walk_in_portal_api.Model
{
    public class WalkInApplicationModel
    {
        [Required(ErrorMessage = "User id required")]
        public int? userId {  get; set; }

        [Required(ErrorMessage = "Job opening id required")]
        public int? jobOpeningId { get; set; }

        [Required(ErrorMessage = "time slot id required")]
        public int? jobOpeningTimeSlotId { get; set; }

        [Required(ErrorMessage = "job role id required")]
        public List<int>? jobRoleId { get; set; } = [];
        public string? resumeUrl { get; set; }
    }
}
