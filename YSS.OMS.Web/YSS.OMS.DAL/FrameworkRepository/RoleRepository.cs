using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class RoleRepository : EFRepository<Role>, IRoleRepository
    {
        public RoleRepository(OMSEntities context)
            : base(context)
        {
        }
    }
}
