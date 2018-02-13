using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.IDAL
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();

        bool LazyLoadingEnabled { get; set; }

        bool ProxyCreationEnabled { get; set; }

        IMenuRepository MenuRep { get; }

        IRoleRepository RoleRep { get; }

        IRoleAuthorizeRepository RoleAuthorizeRep { get; }

        ISystemLogRepository SystemLogRep { get; }

        IToDoRepository ToDoRep { get; }

        IUserRepository UserRep { get; }

        IUserRoleRepository UserRoleRep { get; }

        ICustomerRepository CustomerRep { get; }

        IGatheringRepository GatheringRep { get; }

        IOrderRepository OrderRep { get; }

        IOrderItemRepository OrderItemRep { get; }

        IProductRepository ProductRep { get; }

        IProductPriceRepository ProductPriceRep { get; }

        IProductPriceItemRepository ProductPriceItemRep { get; }

        IPurchaseRepository PurchaseRep { get; }

        IPurchaseItemRepository PurchaseItemRep { get; }
    }
}
