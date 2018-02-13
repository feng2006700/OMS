using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace YSS.OMS.Common
{
    public class LogFactory
    {
        private static string _defaultLogString;

        static LogFactory()
        {
            FileInfo configFile = new FileInfo(HttpContext.Current.Server.MapPath("/Configs/log4net.config"));
            log4net.Config.XmlConfigurator.Configure(configFile);
        }

        public static string DefaultLogString
        {
            get
            {
                if (string.IsNullOrEmpty(_defaultLogString))
                    _defaultLogString = "YSS.OMS";
                return _defaultLogString;
            }
            set
            {
                _defaultLogString = value;
            }
        }

        public static Log DefaultLogger
        {
            get
            {
                return GetLogger(DefaultLogString);
            }
        }

        public static Log GetLogger(Type type)
        {
            return new Log(LogManager.GetLogger(type));
        }

        public static Log GetLogger(string str)
        {
            return new Log(LogManager.GetLogger(str));
        }
    }
}
