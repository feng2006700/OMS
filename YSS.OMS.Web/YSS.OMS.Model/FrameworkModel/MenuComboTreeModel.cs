using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Model
{
    public class MenuComboTreeModel : ComboTreeModel
    {
        public List<MenuComboTreeModel> children { get; set; }
    }
}
