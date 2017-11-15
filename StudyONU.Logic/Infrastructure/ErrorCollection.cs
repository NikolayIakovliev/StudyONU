using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public class ErrorCollection : Dictionary<string, string>
    {
        private const string ExceptionKey = "exception";
        private const string AccessKey = "access";
        private const string CommonKey = "common";

        public void AddExceptionError(string message = "")
        {
            Add(ExceptionKey, message);
        }

        public void AddAccessError(string message = "")
        {
            Add(AccessKey, message);
        }

        public void AddCommonError(string message = "")
        {
            Add(CommonKey, message);
        }
    }
}
