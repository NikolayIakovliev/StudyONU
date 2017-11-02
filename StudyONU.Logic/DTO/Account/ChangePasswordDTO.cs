namespace StudyONU.Logic.DTO.Account
{
    public class ChangePasswordDTO
    {
        public string Email { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

        public string Confirm { get; set; }
    }
}
