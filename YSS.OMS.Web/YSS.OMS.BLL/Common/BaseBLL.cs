using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.IDAL;

namespace YSS.OMS.BLL
{
    public abstract class BaseBLL
    {
        private IUnitOfWork _unitOfWork;

        public BaseBLL(IUnitOfWork unitOfWork)
        {
            if (unitOfWork == null)
                _unitOfWork = UnitOfWorkFactory.Instance.GetUnitOfWork();
            else
                _unitOfWork = unitOfWork;
        }

        protected IUnitOfWork UnitOfWork
        {
            get
            {
                return _unitOfWork;
            }
        }
    }
}
