using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class ModelCopierAduitLog
    {
        private class EntityDescription
        {
            public string PropertysName { get; set; }

            public string DisplaysName { get; set; }

            public string OrginalValue { get; set; }

            public string ChangeValue { get; set; }
        }

        private IList<EntityDescription> _list;

        internal ModelCopierAduitLog()
        {
            _list = new List<EntityDescription>();
        }

        internal void AddChangeAduitLog(string property, string displayName, string orginalValue, string changeValue)
        {
            _list.Add(new EntityDescription() { PropertysName = property, DisplaysName = displayName, OrginalValue = orginalValue, ChangeValue = changeValue });
        }

        public string[] ChangedPropertysName
        {
            get
            {
                return _list.Select(p => p.PropertysName).ToArray();
            }
        }

        public string[] ChangedDisplaysName
        {
            get
            {
                return _list.Select(p => p.DisplaysName).ToArray();
            }
        }

        public Dictionary<string, string> BeforeChangedPropertys
        {
            get
            {
                return _list.ToDictionary(p => p.DisplaysName, p => p.OrginalValue);
            }
        }

        public Dictionary<string, string> AfterChangedPropertys
        {
            get
            {
                return _list.ToDictionary(p => p.DisplaysName, p => p.ChangeValue);
            }
        }
        /// <summary>
        /// 为了给外界使用
        /// </summary>
        /// <param name="propertysName"></param>
        /// <returns></returns>
        public static string FormatChangedPropertysName(string[] propertysName)
        {
            if (propertysName.Length > 0)
            {
                StringBuilder builder = new StringBuilder();
                builder.AppendFormat("\"{0}\"", String.Join("\",\"", propertysName));
                return builder.ToString();
            }
            else
                return string.Empty;
        }

        public string FormatChangedPropertysName()
        {
            return FormatChangedPropertysName(this.ChangedPropertysName);
        }

        /// <summary>
        /// 为了给外界使用
        /// </summary>
        /// <param name="displayName"></param>
        /// <returns></returns>
        public static string FormatChangedDisplaysName(string[] displayName)
        {
            if (displayName.Length > 0)
            {
                StringBuilder builder = new StringBuilder();
                builder.AppendFormat("\"{0}\"", String.Join("\",\"", displayName));
                return builder.ToString();
            }
            else
                return string.Empty;
        }

        public string FormatChangedDisplaysName()
        {
            return FormatChangedDisplaysName(this.ChangedDisplaysName);
        }
        /// <summary>
        /// 为了给外界使用
        /// </summary>
        /// <param name="displayName"></param>
        /// <returns></returns>
        public static string FormatBeforeChangedValues(Dictionary<string, string> beforeChangedPropertys)
        {
            if (beforeChangedPropertys.Count > 0)
                return JsonConvert.SerializeObject(beforeChangedPropertys, new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore });
            else
                return string.Empty;
        }

        public string FormatBeforeChangedValues()
        {
            return FormatBeforeChangedValues(BeforeChangedPropertys);
        }
        /// <summary>
        /// 为了给外界使用
        /// </summary>
        /// <param name="displayName"></param>
        /// <returns></returns>
        public static string FormatAfterChangedValues(Dictionary<string, string> afterChangedPropertys)
        {
            if (afterChangedPropertys.Count > 0)
                return JsonConvert.SerializeObject(afterChangedPropertys, new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore });
            else
                return string.Empty;
        }

        public string FormatAfterChangedValues()
        {
            return FormatAfterChangedValues(AfterChangedPropertys);
        }
    }
}
