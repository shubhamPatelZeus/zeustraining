using System.ComponentModel.DataAnnotations;

namespace walk_in_portal_api.Model
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email address required")]
        [EmailAddress(ErrorMessage = "Not an email address")]
        public string? email { get; set; }

        [Required(ErrorMessage = "Password required")]
        public string? password {get; set;}

        public bool rememberMe { get; set; }
    }
}
