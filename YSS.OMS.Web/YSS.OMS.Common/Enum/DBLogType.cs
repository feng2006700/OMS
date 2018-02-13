using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public enum DbLogType
    {
        [Display(Name = "其他")]
        Other = 0,

        [Display(Name = "登录")]
        Login = 1,

        [Display(Name = "退出")]
        Exit = 2,

        [Display(Name = "查找")]
        Get = 3,

        [Display(Name = "新增")]
        Add = 4,

        [Display(Name = "删除")]
        Remove = 5,

        [Display(Name = "修改")]
        Edit = 6,

        [Display(Name = "提交")]
        Submit = 7,

        [Display(Name = "异常")]
        Exception = 8,

        [Display(Name = "导出")]
        Export = 9,

        [Display(Name = "导入")]
        Import = 10,

        [Display(Name = "更新")]
        Refresh = 11,

        [Display(Name = "下载")]
        Download = 12,

        [Display(Name = "搜索")]
        Search = 13
    }
}
