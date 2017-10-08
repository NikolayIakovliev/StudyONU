using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class ReportRepository : RepositoryBase<ReportEntity>, IReportRepository
    {
        public ReportRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
