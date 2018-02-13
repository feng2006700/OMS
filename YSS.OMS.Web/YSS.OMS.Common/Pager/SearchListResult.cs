using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class SearchListResult<T> where T : class
    {
        public SearchListResult()
        {

        }

        public SearchListResult(int totalCount, List<T> resultList)
        {
            this.total = totalCount;
            this.rows = resultList;
        }

        public int total { get; set; }

        public List<T> rows { get; set; }
    }
}
