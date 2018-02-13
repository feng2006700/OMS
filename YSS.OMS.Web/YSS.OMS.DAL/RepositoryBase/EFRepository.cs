using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.Common;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class EFRepository<TEntity> : IRepositoryBase<TEntity> where TEntity : class, new()
    {
        private OMSEntities _context;
        private DbSet<TEntity> _objectset;

        public EFRepository(OMSEntities context)
        {
            _context = context;
            _objectset = context.Set<TEntity>();
        }

        protected OMSEntities DbContext
        {
            get
            {
                return _context;
            }
        }

        protected DbSet<TEntity> ObjectSet
        {
            get
            {
                if (_objectset == null)
                {
                    _objectset = DbContext.Set<TEntity>();
                }
                return _objectset;
            }
        }

        public int Delete(Expression<Func<TEntity, bool>> predicate)
        {
            return ObjectSet.Where(predicate).Delete();
        }

        public void Delete(TEntity entity)
        {
            if (DbContext.Entry(entity).State == EntityState.Detached)
            {
                ObjectSet.Attach(entity);
            }
            ObjectSet.Remove(entity);
        }

        public TEntity Find(Expression<Func<TEntity, bool>> predicate)
        {
            return ObjectSet.FirstOrDefault(predicate);
        }

        public TEntity Find(object keyValue)
        {
            return ObjectSet.Find(keyValue);
        }

        public List<TEntity> FindList(Expression<Func<TEntity, bool>> predicate)
        {
            return ObjectSet.Where(predicate).ToList<TEntity>();
        }

        public List<TEntity> FindList(string strSql)
        {
            return DbContext.Database.SqlQuery<TEntity>(strSql).ToList<TEntity>();
        }

        public List<TEntity> FindList(string strSql, DbParameter[] dbParameter)
        {
            return DbContext.Database.SqlQuery<TEntity>(strSql, dbParameter).ToList<TEntity>();
        }

        public IQueryable<TEntity> GetQueryable()
        {
            return ObjectSet;
        }

        public IQueryable<TEntity> GetQueryable(Expression<Func<TEntity, bool>> predicate)
        {
            return ObjectSet.Where(predicate);
        }

        public void Insert(List<TEntity> entitys)
        {
            foreach (var entity in entitys)
            {
                ObjectSet.Add(entity);
            }
        }

        public void Insert(TEntity entity)
        {
            ObjectSet.Add(entity);
        }

        public void Update(List<TEntity> entitys)
        {
            foreach (var entity in entitys)
            {
                ObjectSet.Attach(entity);
                DbContext.Entry(entity).State = EntityState.Modified;
            }
        }

        public void Update(TEntity entity)
        {
            ObjectSet.Attach(entity);
            DbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
