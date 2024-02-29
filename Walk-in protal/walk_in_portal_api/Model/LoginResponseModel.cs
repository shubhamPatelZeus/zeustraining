namespace walk_in_portal_api.Model
{
    public class LoginResponseModel
    {
        public string first_name {  get; set; }
        public string last_name {  get; set; }
        public int id {  get; set; }

        public string? token { get; set; }
        public string? password { get; set; }
    }
}
