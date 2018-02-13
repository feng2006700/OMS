using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public interface IDelete
    {
        Nullable<System.DateTime> LastUpdateTime { get; set; }

        string LastUpdateBy { get; set; }

        bool IsDelete { get; set; }
    }
}
