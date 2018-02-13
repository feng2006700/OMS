using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public static class StringUtility
    {
        public static string TrimColon(this string text)
        {
            if (text.EndsWith(":") || text.EndsWith("："))
            {
                return text.Substring(0, text.Length - 1);
            }
            return text;
        }
    }
}
