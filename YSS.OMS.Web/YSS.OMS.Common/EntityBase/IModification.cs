using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public interface IModification
    {
        Nullable<System.DateTime> LastUpdateTime { get; set; }

        string LastUpdateBy { get; set; }
    }
}
