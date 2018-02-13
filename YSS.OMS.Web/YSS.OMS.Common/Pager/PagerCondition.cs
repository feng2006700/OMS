using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class PagerCondition
    {
        /// <summary>
        /// 一页多少条
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 当前第几页
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// 排序方式
        /// </summary>
        public string Order { get; set; }

        /// <summary>
        /// 排序列
        /// </summary>
        public string Sort { get; set; }

        /// <summary>
        /// 总条数
        /// </summary>
        public int TotalCount { get; set; }
    }
}
