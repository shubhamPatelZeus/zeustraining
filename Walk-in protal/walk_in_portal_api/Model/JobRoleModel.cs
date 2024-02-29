namespace walk_in_portal_api.Model
{
    public class JobRoleModel
    {
        public JobRoleModel(string name,string image_url)
        {
            this.name = name;
            this.image_url = image_url;

        }
        public string name {get; set;}
        public string image_url {get; set;}
    }
}
