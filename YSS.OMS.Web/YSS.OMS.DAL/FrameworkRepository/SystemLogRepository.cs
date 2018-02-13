using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class SystemLogRepository : EFRepository<SystemLog>, ISystemLogRepository
    {
        public SystemLogRepository(OMSEntities Context)
            : base(Context)
        {
        }

    }
}
