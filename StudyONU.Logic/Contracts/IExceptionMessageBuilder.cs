using System;
using System.Collections.Generic;

namespace StudyONU.Logic.Contracts
{
    public interface IExceptionMessageBuilder
    {
        void FillErrors(Exception exception, ICollection<string> errorContainer);
    }
}
