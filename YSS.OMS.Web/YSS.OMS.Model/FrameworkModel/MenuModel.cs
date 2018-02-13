using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using YSS.OMS.Common;

namespace YSS.OMS.Model
{
    public class MenuModel
    {
        [Display(Name = "菜单编号")]
        public int ID { get; set; }

        [Display(Name = "父菜单")]
        public int ParentID { get; set; }

        [Display(Name = "父菜单")]
        public string ParentMenuName { get; set; }

        [Display(Name = "菜单编码")]
        [Required]
        [StringLength(50, ErrorMessage = "{0} 最多不超过{1}个字符!")]
        public string Code { get; set; }

        [Display(Name = "菜单名称")]
        [Required]
        [StringLength(50, ErrorMessage = "{0} 最多不超过{1}个字符!")]
        public string Name { get; set; }

        [Display(Name = "提示语")]
        [StringLength(50, ErrorMessage = "{0} 最多不超过{1}个字符!")]
        public string ToolTip { get; set; }

        [Display(Name = "菜单地址")]
        [StringLength(50, ErrorMessage = "{0} 最多不超过{1}个字符!")]
        public string Link { get; set; }

        [Display(Name = "排序")]
        [Required]
        public int Order { get; set; }

        [Display(Name = "启用")]
        public bool Enable { get; set; }

        [Display(Name = "菜单类型")]
        [Required]
        public short MenuType { get; set; }

        [Display(Name = "菜单类型")]
        public string MenuTypeDisplay
        {
            get
            {
                MenuType menuType = EnumUtility.GetEnum<MenuType>(MenuType.ToString());
                return EnumUtility.GetEnumDescription<MenuType>(menuType);
            }
        }

        [Display(Name = "菜单图标")]
        public string Icon { get; set; }

        [Display(Name = "备注")]
        [StringLength(500, ErrorMessage = "{0} 最多不超过{1}个字符!")]
        public string Remark { get; set; }

        [Display(Name = "创建人")]
        public string CreateBy { get; set; }

        [Display(Name = "创建时间")]
        public System.DateTime CreateTime { get; set; }

        [Display(Name = "最后更新时间")]
        public Nullable<System.DateTime> LastUpdateTime { get; set; }

        [Display(Name = "最后更新人")]
        public string LastUpdateBy { get; set; }

        [Display(Name = "是否删除")]
        public bool IsDelete { get; set; }


        public IEnumerable<SelectListItem> ParentMenuDropdownList { get; set; }

        public IEnumerable<SelectListItem> MenuTypeDropdownList { get; set; }

        public List<string> IconList { get; set; }
    }

    public enum MenuType
    {
        [Display(Name = "系统菜单")]
        SysytemMenu = 0,

        [Display(Name = "业务菜单")]
        BusinessMenu = 1,
    }

    public enum MenuLevel
    {
        [Display(Name = "一级菜单")]
        FirstLevel = 1,

        [Display(Name = "非一级菜单")]
        OtherLevel = 2
    }
}
