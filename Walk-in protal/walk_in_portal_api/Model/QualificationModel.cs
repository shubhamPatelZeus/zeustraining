namespace walk_in_portal_api.Model
{
    public class QualificationModel
    {
        public EducationalQualificationModel educationalQualification { get; set; } = new EducationalQualificationModel();
        public ProfessionalQualificationModel professionalQualification { get; set; } = new ProfessionalQualificationModel();   

    }
}
