using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class IEntity<TEntity>
    {
        public void Create()
        {
            var entity = this as ICreation;
            var loginInfo = Operator.GetOperator();
            if (loginInfo != null)
            {
                entity.CreateBy = loginInfo.TrueName;
            }
            entity.CreateTime = DateTime.Now;
        }
        public void Modify()
        {
            var entity = this as IModification;
            var loginInfo = Operator.GetOperator();
            if (loginInfo != null)
            {
                entity.LastUpdateBy = loginInfo.TrueName;
            }
            entity.LastUpdateTime = DateTime.Now;
        }
        public void Remove()
        {
            var entity = this as IDelete;
            var loginInfo = Operator.GetOperator();
            if (loginInfo != null)
            {
                entity.LastUpdateBy = loginInfo.TrueName;
            }
            entity.IsDelete = true;
        }
    }
}
