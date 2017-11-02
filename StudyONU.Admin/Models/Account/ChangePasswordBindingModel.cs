namespace StudyONU.Admin.Models.Account
{
    public class ChangePasswordBindingModel
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

        public string Confirm { get; set; }
    }
}
