using Microsoft.Extensions.Options;
using StudyONU.Web.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudyONU.Web.Helpers
{
    public class DomainHelper
    {
        private readonly Uri baseUri;

        public DomainHelper(IOptions<DomainOptions> options)
        {
            this.baseUri = new Uri(options.Value.Url);
        }

        public IEnumerable<string> PrependDomain(IEnumerable<string> paths)
        {
            return paths.Select(path => PrependDomain(path));
        }

        public string PrependDomain(string path)
        {
            Uri uri = new Uri(baseUri, path);

            return uri.ToString();
        }
    }
}
