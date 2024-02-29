namespace test.Models
{
    public class ResponseModel
    {
        public string? msg { get; set; }
        public ResponseModel(string msg)
        {
            this.msg = msg;
        }
    }
}
