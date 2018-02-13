using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace YSS.OMS.Common
{
    public class AppConfig
    {
        public static string ServerPath
        {
            get
            {
                return Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, @"Temp");
            }
        }

        public static string IconFolderPath 
        {
            get
            {
                return Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, @"FlowCloud\jquery-easyui-theme\icons");
            }
        }

    }
}
