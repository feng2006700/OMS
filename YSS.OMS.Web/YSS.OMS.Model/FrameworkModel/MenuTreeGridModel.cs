using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YSS.OMS.Common;

namespace YSS.OMS.Model
{
    public class MenuTreeGridModel
    {
        public int id { get; set; }

        public string name { get; set; }

        public int? _parentId { get; set; }

        public string state { get; set; }

        public string iconCls { get; set; }

        public bool @checked { get; set; }

        public string Tooltip { get; set; }

        public string Link { get; set; }

        public int Order { get; set; }

        public bool Enable { get; set; }

        public int MenuType { get; set; }

        public string MenuTypeDisplay
        {
            get
            {
                MenuType menuType = EnumUtility.GetEnum<MenuType>(MenuType.ToString());
                return EnumUtility.GetEnumDescription<MenuType>(menuType);
            }
        }

        public string Name { get; set; }

        public string Remark { get; set; }

        public string CreateBy { get; set; }

        public string CreateTime { get; set; }

        public string LastUpdateTime { get; set; }

        public string LastUpdateBy { get; set; }

        public bool IsDelete { get; set; }
    }
}
