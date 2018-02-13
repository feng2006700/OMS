using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class GatheringRepository : EFRepository<Gathering>, IGatheringRepository
    {
        public GatheringRepository(OMSEntities Context)
            : base(Context)
        {
        }
    }
}
