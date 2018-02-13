using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class OrderItemRepository : EFRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(OMSEntities Context)
            : base(Context)
        {
        }
    }
}
