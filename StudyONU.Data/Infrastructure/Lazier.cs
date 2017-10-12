using Microsoft.Extensions.DependencyInjection;
using System;

namespace StudyONU.Data.Infrastructure
{
    public class Lazier<T> : Lazy<T>
    {
        public Lazier(IServiceProvider serviceProvider)
            : base(() => serviceProvider.GetRequiredService<T>()) { }
    }
}
