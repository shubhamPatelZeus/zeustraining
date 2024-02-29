namespace walk_in_portal_api.Model
{
    public class RegisterModel
    {
      public PersonalInfoModel? personalInfoForm { get; set; } = new   PersonalInfoModel();
      public QualificationModel? qualificationForm { get; set; } = new QualificationModel();
      
    }
}
