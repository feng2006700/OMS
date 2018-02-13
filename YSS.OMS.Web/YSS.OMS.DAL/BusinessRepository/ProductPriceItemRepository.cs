using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class ProductPriceItemRepository : EFRepository<ProductPriceItem>, IProductPriceItemRepository
    {
        public ProductPriceItemRepository(OMSEntities Context)
            : base(Context)
        {
        }
    }
}
