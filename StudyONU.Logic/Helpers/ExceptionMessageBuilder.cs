using StudyONU.Logic.Contracts;
using System;
using System.Collections.Generic;

namespace StudyONU.Logic.Helpers
{
    class ExceptionMessageBuilder : IExceptionMessageBuilder
    {
        public void FillErrors(Exception exception, ICollection<string> errorContainer)
        {
            do
            {
                errorContainer.Add(exception.Message);
                exception = exception.InnerException;
            } while (exception != null);
        }
    }
}
