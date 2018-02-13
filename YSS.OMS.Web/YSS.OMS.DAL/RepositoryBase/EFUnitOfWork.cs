using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private OMSEntities _context;
        private bool disposed = false;
        private IMenuRepository _MenuRepository;
        private IRoleRepository _RoleRepository;
        private IRoleAuthorizeRepository _RoleAuthorizeRepository;
        private ISystemLogRepository _SystemLogRepository;
        private IToDoRepository _ToDoRepository;
        private IUserRepository _UserRepository;
        private IUserRoleRepository _UserRoleRepository;

        private ICustomerRepository _CustomerRepository;
        private IGatheringRepository _GatheringRepository;
        private IOrderRepository _OrderRepository;
        private IOrderItemRepository _OrderItemRepository;
        private IProductRepository _ProductRepository;
        private IProductPriceRepository _ProductPriceRepository;
        private IProductPriceItemRepository _ProductPriceItemRepository;
        private IPurchaseRepository _PurchaseRepository;
        private IPurchaseItemRepository _PurchaseItemRepository;

        public OMSEntities Context
        {
            get
            {
                if (_context == null)
                    _context = new OMSEntities();
                return _context;
            }
        }

        public EFUnitOfWork()
        {
            _context = new OMSEntities();
        }

        public void Save()
        {
            Context.SaveChanges();
        }

        public bool LazyLoadingEnabled
        {
            get
            {
                return Context.Configuration.LazyLoadingEnabled;
            }
            set
            {
                Context.Configuration.LazyLoadingEnabled = value;
            }
        }

        public bool ProxyCreationEnabled
        {
            get
            {
                return Context.Configuration.ProxyCreationEnabled;
            }
            set
            {
                Context.Configuration.ProxyCreationEnabled = value;
            }
        }

        public IMenuRepository MenuRep
        {
            get 
            { 
                if(this._MenuRepository == null)
                {
                    this._MenuRepository = new MenuRepository(Context);
                }
                return this._MenuRepository;
            }
        }

        public IRoleRepository RoleRep
        {
            get
            {
                if (this._RoleRepository == null)
                {
                    this._RoleRepository = new RoleRepository(Context);
                }
                return this._RoleRepository;
            }
        }

        public IRoleAuthorizeRepository RoleAuthorizeRep
        {
            get
            {
                if (this._RoleAuthorizeRepository == null)
                {
                    this._RoleAuthorizeRepository = new RoleAuthorizeRepository(Context);
                }
                return this._RoleAuthorizeRepository;
            }
        }

        public ISystemLogRepository SystemLogRep
        {
            get
            {
                if (this._SystemLogRepository == null)
                {
                    this._SystemLogRepository = new SystemLogRepository(Context);
                }
                return this._SystemLogRepository;
            }
        }

        public IToDoRepository ToDoRep
        {
            get
            {
                if (this._ToDoRepository == null)
                {
                    this._ToDoRepository = new ToDoRepository(Context);
                }
                return this._ToDoRepository;
            }
        }

        public IUserRepository UserRep
        {
            get
            {
                if (this._UserRepository == null)
                {
                    this._UserRepository = new UserRepository(Context);
                }
                return this._UserRepository;
            }
        }

        public IUserRoleRepository UserRoleRep
        {
            get
            {
                if (this._UserRoleRepository == null)
                {
                    this._UserRoleRepository = new UserRoleRepository(Context);
                }
                return this._UserRoleRepository;
            }
        }

        public ICustomerRepository CustomerRep
        {
            get
            {
                if (this._CustomerRepository == null)
                {
                    this._CustomerRepository = new CustomerRepository(Context);
                }
                return this._CustomerRepository;
            }
        }

        public IGatheringRepository GatheringRep
        {
            get
            {
                if (this._GatheringRepository == null)
                {
                    this._GatheringRepository = new GatheringRepository(Context);
                }
                return this._GatheringRepository;
            }
        }

        public IOrderRepository OrderRep
        {
            get
            {
                if (this._OrderRepository == null)
                {
                    this._OrderRepository = new OrderRepository(Context);
                }
                return this._OrderRepository;
            }
            
        }

        public IOrderItemRepository OrderItemRep
        {
            get
            {
                if (this._OrderItemRepository == null)
                {
                    this._OrderItemRepository = new OrderItemRepository(Context);
                }
                return this._OrderItemRepository;
            }
        }

        public IProductRepository ProductRep
        {
            get
            {
                if (this._ProductRepository == null)
                {
                    this._ProductRepository = new ProductRepository(Context);
                }
                return this._ProductRepository;
            }
        }

        public IProductPriceRepository ProductPriceRep
        {
            get
            {
                if (this._ProductPriceRepository == null)
                {
                    this._ProductPriceRepository = new ProductPriceRepository(Context);
                }
                return this._ProductPriceRepository;
            }
        }

        public IProductPriceItemRepository ProductPriceItemRep
        {
            get
            {
                if (this._ProductPriceItemRepository == null)
                {
                    this._ProductPriceItemRepository = new ProductPriceItemRepository(Context);
                }
                return this._ProductPriceItemRepository;
            }
        }

        public IPurchaseRepository PurchaseRep
        {
            get
            {
                if (this._PurchaseRepository == null)
                {
                    this._PurchaseRepository = new PurchaseRepository(Context);
                }
                return this._PurchaseRepository;
            }
        }

        public IPurchaseItemRepository PurchaseItemRep
        {
            get
            {
                if (this._PurchaseItemRepository == null)
                {
                    this._PurchaseItemRepository = new PurchaseItemRepository(Context);
                }
                return this._PurchaseItemRepository;
            }
        }

        public void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
