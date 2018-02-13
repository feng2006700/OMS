using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public interface ICreation
    {
        DateTime CreateTime { get; set; }

        string CreateBy { get; set; }
    }
}
