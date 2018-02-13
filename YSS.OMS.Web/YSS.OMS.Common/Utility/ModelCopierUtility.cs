using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace YSS.OMS.Common
{
    public static class ModelCopierUtility
    {
        public static void CopyCollection<T>(IEnumerable<T> from, ICollection<T> to)
        {
            if (from == null || to == null || to.IsReadOnly)
            {
                return;
            }

            to.Clear();
            foreach (T element in from)
            {
                to.Add(element);
            }
        }

        public static ModelCopierAduitLog CopyModelWithAduit(object from, object to)
        {
            return CopyModelWithAduit(from, to, null);
        }

        public static ModelCopierAduitLog CopyModelWithAduit(object from, object to, string excludePropertieNames)
        {
            ModelCopierAduitLog aduitLog = new ModelCopierAduitLog();
            CopyModel(from, to, excludePropertieNames, aduitLog);
            return aduitLog;
        }

        public static void CopyModel(object from, object to)
        {
            CopyModel(from, to, null);
        }

        public static void CopyModel(object from, object to, string excludePropertieNames)
        {
            CopyModel(from, to, excludePropertieNames, null);
        }

        private static void CopyModel(object from, object to, string excludePropertieNames, ModelCopierAduitLog aduitLog)
        {
            if (from == null || to == null)
            {
                return;
            }

            string[] excludePropertys = null;
            if (!string.IsNullOrEmpty(excludePropertieNames))
                excludePropertys = excludePropertieNames.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            PropertyDescriptorCollection fromProperties = TypeDescriptor.GetProperties(from);
            PropertyDescriptorCollection toProperties = TypeDescriptor.GetProperties(to);

            foreach (PropertyDescriptor fromProperty in fromProperties)
            {
                if (excludePropertys != null && excludePropertys.Contains(fromProperty.Name))
                    continue;

                PropertyDescriptor toProperty = toProperties.Find(fromProperty.Name, true /* ignoreCase */);
                if (toProperty != null && !toProperty.IsReadOnly)
                {
                    // Can from.Property reference just be assigned directly to to.Property reference?
                    bool isDirectlyAssignable = toProperty.PropertyType.IsAssignableFrom(fromProperty.PropertyType);
                    // Is from.Property just the nullable form of to.Property?
                    bool liftedValueType = (isDirectlyAssignable) ? false : (Nullable.GetUnderlyingType(fromProperty.PropertyType) == toProperty.PropertyType);

                    if (isDirectlyAssignable || liftedValueType)
                    {
                        object fromValue = fromProperty.GetValue(from);
                        if (isDirectlyAssignable || (fromValue != null && liftedValueType))
                        {
                            if (aduitLog != null)
                            {
                                object toValue = toProperty.GetValue(to);
                                if (!isEqual(fromValue, toValue))
                                {
                                    string displayName = fromProperty.Name;
                                    DisplayAttribute display = fromProperty.Attributes[typeof(DisplayAttribute)] as DisplayAttribute;
                                    if (display != null)
                                        displayName = display.Name;
                                    aduitLog.AddChangeAduitLog(fromProperty.Name, displayName, toValue == null ? string.Empty : toValue.ToString(), fromValue == null ? string.Empty : fromValue.ToString());
                                }
                            }
                            toProperty.SetValue(to, fromValue);
                        }
                    }
                }
            }
        }

        private static bool isEqual(object fromValue, object toValue)
        {
            if (fromValue == null && toValue == null)
                return true;
            else
            {
                if (fromValue != null)
                    return fromValue.Equals(toValue);
                else
                    return toValue.Equals(fromValue);
            }
        }
    }
}
