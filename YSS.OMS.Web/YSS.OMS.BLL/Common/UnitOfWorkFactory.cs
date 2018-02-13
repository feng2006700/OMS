using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.DAL;
using YSS.OMS.IDAL;

namespace YSS.OMS.BLL
{
    public class UnitOfWorkFactory
    {
        private static UnitOfWorkFactory _instance;

        static UnitOfWorkFactory()
        {
            _instance = new UnitOfWorkFactory();
        }

        private UnitOfWorkFactory()
        {

        }

        public static UnitOfWorkFactory Instance
        {
            get
            {
                return _instance;
            }
        }

        public IUnitOfWork GetUnitOfWork()
        {
            return new EFUnitOfWork();
        }
    }
}
