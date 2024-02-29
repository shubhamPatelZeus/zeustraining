using System.ComponentModel.DataAnnotations;

namespace walk_in_portal_api.Model
{
    public class JobRoleSpecificationModel
    {
       
        public string? name { get; set; }
        public string? id { get; set; }

        public string? grossCompensationPackage { get; set; }

        public string? roleDescription { get; set; }

        public string? requirements { get; set; }
    }
}
