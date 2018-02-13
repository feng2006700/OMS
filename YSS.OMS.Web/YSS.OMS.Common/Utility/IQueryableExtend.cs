using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public static class IQueryableExtend
    {
        static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            string[] properties = property.Split('.');
            Type type = typeof(T);
            ParameterExpression pe = Expression.Parameter(type, "x");
            Expression expression = pe;
            foreach (string prop in properties)
            {
                PropertyInfo pi = type.GetProperty(prop);
                expression = Expression.Property(expression, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            LambdaExpression lambda = Expression.Lambda(delegateType, expression, pe);

            object result = typeof(Queryable).GetMethods().Single(
                    method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                    .MakeGenericMethod(typeof(T), type)
                    .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable<T>)result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string sortExpression)
        {
            return source.OrderBy(sortExpression, "ASC");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <param name="sortDirection"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string sortExpression, string sortDirection)
        {
            string sortingDir = string.Empty;
            if (string.IsNullOrEmpty(sortDirection))
            {
                sortingDir = "OrderBy";
            }
            else
            {
                if (sortDirection.ToUpper().Trim() == "ASC")
                    sortingDir = "OrderBy";
                else if (sortDirection.ToUpper().Trim() == "DESC")
                    sortingDir = "OrderByDescending";
            }

            return ApplyOrder<T>(source, sortExpression, sortingDir);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string sortExpression)
        {
            return ApplyOrder<T>(source, sortExpression, "OrderByDescending");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string sortExpression)
        {
            return source.ThenBy(sortExpression, "ASC");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <param name="sortDirection"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string sortExpression, string sortDirection)
        {
            string sortingDir = string.Empty;
            if (string.IsNullOrEmpty(sortDirection))
            {
                sortingDir = "OrderBy";
            }
            else
            {
                if (sortDirection.ToUpper().Trim() == "ASC")
                    sortingDir = "OrderBy";
                else if (sortDirection.ToUpper().Trim() == "DESC")
                    sortingDir = "OrderByDescending";
            }

            return ApplyOrder<T>(source, sortExpression, sortingDir);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <returns></returns>
        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string sortExpression)
        {
            return ApplyOrder<T>(source, sortExpression, "ThenByDescending");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="sortExpression"></param>
        /// <param name="sortDirection"></param>
        /// <param name="pagesize"></param>
        /// <param name="pageno"></param>
        /// <returns></returns>
        public static IQueryable<T> SortAndPage<T>(this IQueryable<T> source, string sortExpression, string defaultSort, string sortDirection, int pageSize, int pageNo, int totalCount)
        {
            return SortAndPage(source, string.Empty, sortExpression, defaultSort, sortDirection, pageSize, pageNo, totalCount);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="sortPrefix"></param>
        /// <param name="sortExpression"></param>
        /// <param name="defaultSort"></param>
        /// <param name="sortDirection"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageNo"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public static IQueryable<T> SortAndPage<T>(this IQueryable<T> source, string sortPrefix, string sortExpression, string defaultSort, string sortDirection, int pageSize, int pageNo, int totalCount)
        {
            string sortString = defaultSort;

            if (!string.IsNullOrEmpty(sortExpression))
                sortString = sortExpression;

            if (!string.IsNullOrEmpty(sortPrefix))
            {
                if (sortPrefix.EndsWith("."))
                    sortString = sortPrefix + sortString;
                else
                    sortString = string.Format("{0}.{1}", sortPrefix, sortString);
            }

            IOrderedQueryable<T> sortQuery = source.OrderBy(sortString, sortDirection);

            int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            int startSkipIndex = 0;
            if (pageNo > 0)
                startSkipIndex = pageNo - 1;
            if (startSkipIndex >= totalPages)
                startSkipIndex = totalPages - 1;
            if (startSkipIndex < 0)
                startSkipIndex = 0;
            return sortQuery.Skip(startSkipIndex * pageSize).Take(pageSize);
        }
        /// <summary>
        /// Or的扩展
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="predicates"></param>
        /// <returns></returns>
        public static IQueryable<T> WhereOr<T>(this IQueryable<T> source, params Expression<Func<T, bool>>[] predicates)
        {
            if (source == null) throw new ArgumentNullException("source");
            if (predicates == null) throw new ArgumentNullException("predicates");
            if (predicates.Length == 0) return source.Where(x => false); // no matches!
            if (predicates.Length == 1) return source.Where(predicates[0]); // simple

            var param = Expression.Parameter(typeof(T), "x");
            Expression body = Expression.Invoke(predicates[0], param);
            for (int i = 1; i < predicates.Length; i++)
            {
                body = Expression.OrElse(body, Expression.Invoke(predicates[i], param));
            }
            var lambda = Expression.Lambda<Func<T, bool>>(body, param);
            return source.Where(lambda);
        }
    }
}
