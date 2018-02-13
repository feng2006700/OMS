using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using YSS.OMS.Common;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;
using YSS.OMS.Model;

namespace YSS.OMS.BLL
{
    public class SessionDataBLL : BaseBLL
    {
        public SessionDataBLL(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        private static string userAuthMenuTreeSession = "OMS_UserAuthMenuTreeJson";

        private static string userAuthMenuListSession = "OMS_UserAuthMenuListJson";

        private static string userAuthMenuRolesSession = "OMS_UserAuthMenuRolesJson";

        public List<MenuModel> GetUserAuthMenuList()
        {
            List<MenuModel> modelList = new List<MenuModel>();
            if (HttpContext.Current.Session[userAuthMenuListSession] != null)
            {
                var userAuthMenuList = HttpContext.Current.Session[userAuthMenuListSession];
                modelList = userAuthMenuList as List<MenuModel>;
            }
            else
            {
                CurrentOperator currentOperator = Operator.GetOperator();
                List<string> roleCodes = currentOperator.Roles.Select(i => i.RoleCode).ToList();
                modelList = new MenuBLL(UnitOfWork).GetAuthedMenu(roleCodes).OrderBy(i => i.Order).ToList();
                HttpContext.Current.Session[userAuthMenuListSession] = modelList;
            }

            return modelList;
        }

        public List<TreeGridModel> GetUserAuthMenuTree()
        {
            List<TreeGridModel> resultList = new List<TreeGridModel>();
            if (HttpContext.Current.Session[userAuthMenuTreeSession] != null)
            {
                var userAuthMenuTree = HttpContext.Current.Session[userAuthMenuTreeSession];
                resultList = userAuthMenuTree as List<TreeGridModel>;
            }
            else
            {
                List<MenuModel> modelList = GetUserAuthMenuList();
                List<MenuModel> firstLevelMenu = modelList.Where(i => (i.ParentID == 0)).ToList();
                List<MenuModel> remainMenu = modelList.Where(i => i.ParentID > 0).ToList();
                foreach (var item in firstLevelMenu)
                {
                    TreeGridModel model = new TreeGridModel()
                    {
                        url = item.Link,
                        text = item.Name,
                        name = item.Code,
                        iconCls = item.Icon,
                        id = item.ID.ToString(),
                        order = item.Order.ToString(),
                        parentId = item.ParentID.ToString(),
                        tooltip = item.ToolTip,
                        child = new List<TreeGridModel>()
                    };

                    GetChildMenu(model, remainMenu);

                    resultList.Add(model);
                }

                HttpContext.Current.Session[userAuthMenuTreeSession] = resultList;
            }

            return resultList;
        }

        private void GetChildMenu(TreeGridModel parent, List<MenuModel> remainMenu)
        {
            List<MenuModel> childList = remainMenu.Where(i => i.ParentID.ToString() == parent.id).ToList();
            if (childList == null || childList.Count <= 0)
                return;
            foreach (var item in childList)
            {
                TreeGridModel model = new TreeGridModel()
                {
                    url = item.Link,
                    text = item.Name,
                    name = item.Code,
                    iconCls = item.Icon,
                    id = item.ID.ToString(),
                    order = item.Order.ToString(),
                    parentId = item.ParentID.ToString(),
                    tooltip = item.ToolTip,
                    child = new List<TreeGridModel>()
                };

                remainMenu.Remove(item);
                GetChildMenu(model, remainMenu);
                parent.child.Add(model);
            }
        }

        public List<RoleModel> GetUserAuthMenuRoles(int menuID)
        {
            List<RoleModel> modelList = new List<RoleModel>();
            CurrentOperator currentOperator = Operator.GetOperator();
            if (HttpContext.Current.Session[userAuthMenuRolesSession + "_" + currentOperator.Id + "_" + menuID] != null)
            {
                var roleList = HttpContext.Current.Session[userAuthMenuRolesSession + "_" + currentOperator.Id + "_" + menuID];
                modelList = roleList as List<RoleModel>;
            }
            else
            {
                List<string> userRoleCodes = currentOperator.Roles.Select(i => i.RoleCode).ToList();
                List<int> userRoleIDs = UnitOfWork.RoleAuthorizeRep.FindList(i => i.MenuID == menuID).Select(i => i.RoleID).ToList();
                List<string> menuRoleCodes = UnitOfWork.RoleRep.FindList(i => userRoleIDs.Contains(i.ID)).Select(i => i.RoleCode).ToList();
                List<string> userMenuRoleCodes = userRoleCodes.Where(i => menuRoleCodes.Contains(i)).ToList();
                List<Role> menuAuthRoles = UnitOfWork.RoleRep.FindList(i => userMenuRoleCodes.Contains(i.RoleCode));
                if (menuAuthRoles != null && menuAuthRoles.Count > 0)
                {
                    foreach (Role entity in menuAuthRoles)
                    {
                        RoleModel model = new RoleModel();
                        ModelCopierUtility.CopyModel(entity, model);
                        modelList.Add(model);
                    }
                }

                HttpContext.Current.Session[userAuthMenuRolesSession + "_" + currentOperator.Id + "_" + menuID] = modelList;
            }

            return modelList;
        }
    }
}
