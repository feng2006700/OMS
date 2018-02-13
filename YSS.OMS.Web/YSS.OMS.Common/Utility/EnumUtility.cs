using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class EnumItem
    {
        /// <summary>
        /// 描述
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// 值（一般为枚举的int值）
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Int类型的值
        /// </summary>
        public int IntValue
        {
            get
            {
                return int.Parse(Value);
            }
            set
            {
                Value = value.ToString();
            }
        }
        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }
    }

    public class EnumUtility
    {
        protected static Dictionary<string, IList<EnumItem>> _EnumList;
        protected static object listLockOb = new object();

        static EnumUtility()
        {
            _EnumList = new Dictionary<string, IList<EnumItem>>();
        }

        /// <summary>
        /// 获取Enum
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static TEnum GetEnum<TEnum>(string value) where TEnum : struct
        {
            return (TEnum)Enum.Parse(typeof(TEnum), value);
        }

        /// <summary>
        /// 获取一条描述信息的代码如下：
        /// string desc = EnumUtility.GetEnumDescription  &lt;EmployeeType &gt;(EmployeeType.DepartmentManager);
        /// </summary>
        /// <param name="enumObj"></param>
        /// <returns></returns>
        public static string GetEnumDescription<TEnum>(TEnum enumValue) where TEnum : struct
        {
            FieldInfo fieldInfo = typeof(TEnum).GetField(enumValue.ToString());
            if (fieldInfo == null)
            {
                return String.Empty;
            }
            object[] attribArray = fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), false);
            if (attribArray.Length == 0)
                return String.Empty;
            else
            {
                DisplayAttribute attrib = attribArray[0] as DisplayAttribute;
                if (attrib != null)
                    return attrib.Name;
                else
                    return string.Empty;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="enumValue"></param>
        /// <returns></returns>
        public static string GetEnumDescription<TEnum>(string enumValue) where TEnum : struct
        {
            TEnum enumObj = default(TEnum);
            if (Enum.IsDefined(typeof(TEnum), enumValue))
            {
                if (Enum.TryParse<TEnum>(enumValue, true, out enumObj))
                {
                    return GetEnumDescription<TEnum>(enumObj);
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// 将枚举转换成列表
        /// Key-Value：描述-枚举值
        /// </summary>
        /// <param name="enumType">枚举类型</param>
        /// <param name="includeUnDisplayVisiable">是否包含不应该显示的枚举</param>
        /// <param name="useIntOrString">是否包含不应该显示的枚举</param>
        /// <returns></returns>
        public static IList<EnumItem> EnumToList<TEnum>(bool useIntValue, string groupName = null) where TEnum : struct
        {
            Type enumType = typeof(TEnum);
            //枚举缓存池            
            string keyName = string.IsNullOrEmpty(groupName) ? enumType.FullName + "_" + useIntValue.ToString() : enumType.FullName + "_" + groupName + "_" + useIntValue.ToString();

            if (!_EnumList.ContainsKey(keyName))
            {
                groupName = groupName ?? string.Empty;
                string[] groupNameArray = groupName.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                List<EnumItem> list = new List<EnumItem>();
                foreach (int i in Enum.GetValues(enumType))
                {
                    string name = Enum.GetName(enumType, i);
                    //取显示名称
                    string showName = string.Empty;
                    int orderValue = i;
                    string enumGroupName = string.Empty;
                    object[] atts = enumType.GetField(name).GetCustomAttributes(typeof(DisplayAttribute), false);
                    if (atts.Length > 0)
                    {
                        DisplayAttribute attr = atts[0] as DisplayAttribute;
                        showName = attr.GetName();
                        enumGroupName = attr.GetGroupName() ?? string.Empty;
                        orderValue = attr.GetOrder().HasValue ? attr.GetOrder().Value : orderValue;
                    }
                    EnumItem listitem = new EnumItem()
                    {
                        Text = showName.Trim().Length > 0 ? showName : name,
                        Value = useIntValue ? i.ToString() : name,
                        Sort = orderValue
                    };

                    if (!string.IsNullOrEmpty(groupName))
                    {
                        bool isInGroup = true;
                        string[] enumGroupNameArray = enumGroupName.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                        foreach (string groupNameItem in groupNameArray)
                        {
                            if (!enumGroupNameArray.Contains(groupNameItem))
                            {
                                isInGroup = false;
                                break;
                            }
                        }
                        if (isInGroup)
                            list.Add(listitem);
                    }
                    else
                    {
                        list.Add(listitem);
                    }

                }
                list.Sort((x, y) => { return x.Sort.CompareTo(y.Sort); });

                if (!_EnumList.ContainsKey(keyName))
                    lock (listLockOb)
                        if (!_EnumList.ContainsKey(keyName))
                            _EnumList.Add(keyName, list);
            }
            IList<EnumItem> result = _EnumList[keyName];
            List<EnumItem> returnResult = new List<EnumItem>();
            foreach (var item in result)
                returnResult.Add(new EnumItem() { Text = item.Text, Value = item.Value });
            return returnResult;
        }

        /// <summary>
        /// 将枚举转换成ArrayList
        /// Key-Value：描述-枚举值
        /// </summary>
        /// <returns></returns>
        public static IList<EnumItem> EnumToList<TEnum>() where TEnum : struct
        {
            return EnumToList<TEnum>(false);
        }
    }
}
