using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.IDAL
{
    public interface IRepositoryBase<TEntity> where TEntity : class, new()
    {
        void Insert(TEntity entity);

        void Insert(List<TEntity> entitys);

        void Update(TEntity entity);

        void Update(List<TEntity> entitys);

        void Delete(TEntity entity);

        int Delete(Expression<Func<TEntity, bool>> predicate);

        TEntity Find(object keyValue);

        TEntity Find(Expression<Func<TEntity, bool>> predicate);

        IQueryable<TEntity> GetQueryable();

        IQueryable<TEntity> GetQueryable(Expression<Func<TEntity, bool>> predicate);

        List<TEntity> FindList(string strSql);

        List<TEntity> FindList(string strSql, DbParameter[] dbParameter);

        List<TEntity> FindList(Expression<Func<TEntity, bool>> predicate);

    }
}
