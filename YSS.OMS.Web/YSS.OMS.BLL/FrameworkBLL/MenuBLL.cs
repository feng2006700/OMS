using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using YSS.OMS.Common;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;
using YSS.OMS.Model;

namespace YSS.OMS.BLL
{
    public class MenuBLL : BaseBLL
    {
        public MenuBLL(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        /// <summary>
        /// 根据菜单名称获取菜单
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public MenuModel GetMenuInfo(string name)
        {
            Menu entity = UnitOfWork.MenuRep.Find(i => i.Name == name && i.IsDelete == false);
            MenuModel model = new MenuModel();
            ModelCopierUtility.CopyModel(entity, model);
            return model;
        }

        /// <summary>
        /// 获取所有的菜单(TreeGrid)
        /// </summary>
        /// <returns></returns>
        public List<MenuTreeGridModel> GetTreeGridMenu()
        {
            List<MenuTreeGridModel> menuTreeList = new List<MenuTreeGridModel>();
            List<Menu> menuList = UnitOfWork.MenuRep.FindList(i => i.IsDelete == false);
            foreach (Menu item in menuList)
            {
                MenuTreeGridModel model = new MenuTreeGridModel()
                {
                    @checked = false,
                    CreateBy = item.CreateBy,
                    IsDelete = item.IsDelete,
                    CreateTime = item.CreateTime.ToString("yyyy-MM-dd hh:mm:ss"),
                    Enable = item.Enable,
                    iconCls = item.Icon,
                    id = item.ID,
                    MenuType = item.MenuType,
                    LastUpdateBy = item.LastUpdateBy,
                    LastUpdateTime = item.LastUpdateTime.HasValue ? item.LastUpdateTime.Value.ToString("yyyy-MM-dd hh:mm:ss") : string.Empty,
                    Link = item.Link,
                    name = item.Code,
                    Order = item.Order,
                    Remark = item.Remark,
                    state = "open",
                    Name = item.Name,
                    Tooltip = item.Tooltip,
                    _parentId = item.ParentID
                };

                menuTreeList.Add(model);
            }

            return menuTreeList.OrderBy(i => i.Order).ToList();
        }

        /// <summary>
        /// 删除单个菜单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool RemoveMenu(int id)
        {
            if (id <= 0)
                return false;

            Menu menu = UnitOfWork.MenuRep.Find(i => i.ID == id && i.IsDelete == false);
            if (menu != null && menu.MenuType == (int)MenuType.SysytemMenu)
            {
                throw new Exception("系统菜单不允许删除!");
            }
            if (UnitOfWork.MenuRep.Find(i => i.ParentID == menu.ID && i.IsDelete == false) != null)
            {
                throw new Exception("该菜单已含有子菜单，不允许删除!");
            }
            menu.Remove();
            UnitOfWork.MenuRep.Update(menu);
            UnitOfWork.Save();
            return true;
        }

        /// <summary>
        /// 根据ID获取菜单
        /// </summary>
        /// <param name="menuID"></param>
        /// <returns></returns>
        public MenuModel GetMenuInfo(int menuID)
        {
            Menu menu = UnitOfWork.MenuRep.Find(i => i.ID == menuID && i.IsDelete == false);
            MenuModel model = new MenuModel();
            ModelCopierUtility.CopyModel(menu, model);
            model.ParentMenuName = (menu.ParentID > 0) ? UnitOfWork.MenuRep.Find(i => i.ID == menu.ParentID && i.IsDelete == false).Name : string.Empty;

            return model;
        }

        /// <summary>
        /// 添加菜单
        /// </summary>
        /// <param name="model"></param>
        public int AddMenu(MenuModel model)
        {
            Menu entity = new Menu();
            if (UnitOfWork.MenuRep.Find(i => i.Name == model.Name && i.IsDelete == false) != null)
            {
                throw new Exception("菜单英文名称必须唯一!");
            }
            if (model.ParentID > 0 && UnitOfWork.MenuRep.Find(i => i.ID == model.ParentID).MenuType != model.MenuType)
            {
                throw new Exception("父菜单类型与新增菜单类型不一致，请修改!");
            }
            ModelCopierUtility.CopyModel(model, entity);
            if (model.MenuType == (int)MenuType.BusinessMenu)
            {
                entity.Link = @"/Business/" + entity.Name + @"/Index";
            }
            else
            {
                entity.Link = @"/Framework/" + entity.Name + @"/Index";
            }
            entity.Create();
            UnitOfWork.MenuRep.Insert(entity);
            UnitOfWork.Save();

            return entity.ID;
        }

        /// <summary>
        /// 编辑菜单
        /// </summary>
        /// <param name="model"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool EditMenu(MenuModel model, int id)
        {
            Menu entity = UnitOfWork.MenuRep.Find(i => i.ID == id && i.IsDelete == false);
            if (entity == null)
                return false;
            if (UnitOfWork.MenuRep.Find(i => i.Name == model.Name && i.IsDelete == false && i.ID != id) != null)
            {
                throw new Exception("菜单英文名称必须唯一!");
            }
            if (model.ParentID > 0 && UnitOfWork.MenuRep.Find(i => i.ID == model.ParentID).MenuType != model.MenuType)
            {
                throw new Exception("父菜单类型与新增菜单的类型不一致，请修改!");
            }
            ModelCopierUtility.CopyModel(model, entity, "ID,CreateTime,CreateBy,LastUpdateTime,LastUpdateBy");
            if (model.MenuType == (int)MenuType.BusinessMenu)
            {
                entity.Link = @"/Business/" + entity.Name + @"/Index";
            }
            else
            {
                entity.Link = @"/Framework/" + entity.Name + @"/Index";
            }
            entity.Modify();
            UnitOfWork.Save();

            return true;
        }

        /// <summary>
        /// 获取菜单下拉列表
        /// </summary>
        public List<MenuComboTreeModel> GetMenuComboTree()
        {
            List<Menu> menuList = UnitOfWork.MenuRep.FindList(i => i.IsDelete == false);
            List<Menu> fisrtLevelMenu = menuList.FindAll(i => (i.ParentID == 0));
            List<Menu> secondLevelMenu = menuList.FindAll(i => i.ParentID > 0);

            List<MenuComboTreeModel> menuComboTree = new List<MenuComboTreeModel>();
            //一级菜单
            foreach (Menu item in fisrtLevelMenu.OrderBy(i => i.ID))
            {
                MenuComboTreeModel parentNode = new MenuComboTreeModel()
                {
                    id = item.ID.ToString(),
                    text = item.Name,
                    state = "open",
                    @checked = false,
                    children = new List<MenuComboTreeModel>()
                };
                List<Menu> childMenu = secondLevelMenu.FindAll(i => i.ParentID == item.ID).OrderBy(i => i.ID).ToList();
                //二级菜单
                foreach (var child in childMenu)
                {
                    MenuComboTreeModel childNode = new MenuComboTreeModel()
                    {
                        id = child.ID.ToString(),
                        text = child.Name,
                        state = "open",
                        @checked = false
                    };

                    parentNode.children.Add(childNode);
                }

                menuComboTree.Add(parentNode);
            }

            return menuComboTree;
        }

        /// <summary>
        /// 获取菜单(根据菜单层级和当前角色权限)
        /// </summary>
        /// <returns></returns>
        public List<MenuModel> GetMenuByLevel(MenuLevel menuLevel, List<string> roleCodes)
        {
            List<int> menuIDs = GetMenuIDByRoleCodes(roleCodes);
            List<MenuModel> modelList = new List<MenuModel>();
            if (menuIDs == null || menuIDs.Count == 0)
            {
                return modelList;
            }
            List<Menu> entityList = new List<Menu>();
            if (menuLevel == MenuLevel.FirstLevel)
            {
                entityList = UnitOfWork.MenuRep.FindList(i => (i.ParentID == null || i.ParentID == 0) && menuIDs.Contains(i.ID) && i.Enable && i.IsDelete == false);
            }
            else if (menuLevel == MenuLevel.OtherLevel)
            {
                entityList = UnitOfWork.MenuRep.FindList(i => i.ParentID != null && menuIDs.Contains(i.ID) && i.Enable && i.IsDelete == false);
            }
            foreach (Menu entity in entityList)
            {
                MenuModel model = new MenuModel();
                ModelCopierUtility.CopyModel(entity, model);
                modelList.Add(model);
            }

            return modelList;
        }

        /// <summary>
        /// 获取菜单(根据父菜单名称)
        /// </summary>
        /// <param name="parentName"></param>
        /// <returns></returns>
        public List<MenuModel> GetMenuByParentName(string parentName, List<string> roleCodes)
        {
            List<int> menuIDs = GetMenuIDByRoleCodes(roleCodes);
            List<MenuModel> modelList = new List<MenuModel>();
            if (menuIDs == null || menuIDs.Count == 0)
            {
                return modelList;
            }
            Menu parentNode = UnitOfWork.MenuRep.Find(i => i.Name == parentName && i.IsDelete == false);
            if (parentNode == null)
                return modelList;

            List<Menu> entityList = UnitOfWork.MenuRep.FindList(i => i.ParentID == parentNode.ID && menuIDs.Contains(i.ID) && i.Enable && i.IsDelete == false).OrderBy(i => i.ID).ToList();
            foreach (Menu entity in entityList)
            {
                MenuModel model = new MenuModel();
                ModelCopierUtility.CopyModel(entity, model);
                modelList.Add(model);
            }

            return modelList;
        }

        /// <summary>
        /// 获取所有的已授权角色
        /// </summary>
        /// <param name="roleCodes"></param>
        /// <returns></returns>
        public List<MenuModel> GetAuthedMenu(List<string> roleCodes)
        {
            List<int> menuIDs = GetMenuIDByRoleCodes(roleCodes);
            List<MenuModel> modelList = new List<MenuModel>();
            if (menuIDs == null || menuIDs.Count == 0)
            {
                return modelList;
            }
            List<Menu> entityList = new List<Menu>();
            entityList = UnitOfWork.MenuRep.FindList(i => menuIDs.Contains(i.ID) && i.Enable && i.IsDelete == false);
            foreach (Menu entity in entityList)
            {
                MenuModel model = new MenuModel();
                ModelCopierUtility.CopyModel(entity, model);
                modelList.Add(model);
            }

            return modelList;
        }

        /// <summary>
        /// 根据角色Code获取其所拥有的菜单ID
        /// </summary>
        /// <param name="roleCodes"></param>
        /// <returns></returns>
        public List<int> GetMenuIDByRoleCodes(List<string> roleCodes)
        {
            List<Role> roles = UnitOfWork.RoleRep.FindList(i => roleCodes.Contains(i.RoleCode) && i.IsDelete == false);
            if (roles == null || roles.Count == 0)
                return null;
            List<int> roleIDs = roles.Select(i => i.ID).ToList();
            List<RoleAuthorize> roleAuthorizes = UnitOfWork.RoleAuthorizeRep.FindList(i => roleIDs.Contains(i.RoleID));
            if (roleAuthorizes == null || roleAuthorizes.Count == 0)
                return null;
            List<int> menuIDs = roleAuthorizes.Select(i => i.MenuID).ToList();

            return menuIDs.Distinct().ToList();
        }

        /// <summary>
        /// 根据角色Code获取其所拥有的菜单ID
        /// </summary>
        /// <param name="roleCodes"></param>
        /// <returns></returns>
        public List<int> GetMenuIDByRoleCodes(List<string> roleCodes, MenuType menutype)
        {
            List<Role> roles = UnitOfWork.RoleRep.FindList(i => roleCodes.Contains(i.RoleCode) && i.IsDelete == false);
            if (roles == null || roles.Count == 0)
                return null;
            List<int> roleIDs = roles.Select(i => i.ID).ToList();
            List<RoleAuthorize> roleAuthorizes = UnitOfWork.RoleAuthorizeRep.FindList(i => roleIDs.Contains(i.RoleID));
            if (roleAuthorizes == null || roleAuthorizes.Count == 0)
                return null;
            List<int> menuIDs = roleAuthorizes.Select(i => i.MenuID).Distinct().ToList();
            List<Menu> menulist = UnitOfWork.MenuRep.FindList(i => menuIDs.Contains(i.ID) && i.IsDelete == false && i.MenuType == (int)menutype);
            if (menulist == null || menulist.Count <= 0)
                return null;

            return menulist.Select(i => i.ID).ToList();
        }

        /// <summary>
        /// 获取角色权限树
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public List<MenuComboTreeModel> GetMenuAuthTree(int roleID)
        {
            List<Menu> menuList = UnitOfWork.MenuRep.FindList(i => i.IsDelete == false);
            List<Menu> firstLevelMenu = menuList.FindAll(i => i.ParentID == 0 && !i.IsDelete && i.Enable);
            List<Menu> remainMenu = menuList.FindAll(i => i.ParentID > 0 && !i.IsDelete && i.Enable);

            Role role = UnitOfWork.RoleRep.Find(i => i.ID == roleID && i.IsDelete == false);
            List<RoleAuthorize> roleAuthList = UnitOfWork.RoleAuthorizeRep.FindList(i=>i.RoleID == role.ID).ToList();
            Dictionary<int, RoleAuthorize> dict = new Dictionary<int, RoleAuthorize>();
            if (roleAuthList != null && roleAuthList.Count > 0)
            {
                dict = roleAuthList.ToDictionary(i => i.MenuID);
            }

            List<MenuComboTreeModel> menuComboTree = new List<MenuComboTreeModel>();
            //一级菜单
            foreach (Menu item in firstLevelMenu.OrderBy(i => i.Order))
            {
                MenuComboTreeModel parentNode = new MenuComboTreeModel()
                {
                    id = item.ID.ToString(),
                    text = item.Name,
                    state = "open",
                    @checked = dict.ContainsKey(item.ID),
                    children = new List<MenuComboTreeModel>()
                };

                GetChildMenu(parentNode, remainMenu, dict);

                menuComboTree.Add(parentNode);
            }

            return menuComboTree;
        }

        /// <summary>
        /// 获取一级菜单下拉列表
        /// </summary>
        /// <returns></returns>
        public List<MenuTreeGridModel> GetParentMenuCombo()
        {
            List<MenuTreeGridModel> resulrList = new List<MenuTreeGridModel>()
            {
                new MenuTreeGridModel()
                {
                     id = 0,
                     Name = "一级菜单"
                }
            };
            List<Menu> menuList = UnitOfWork.MenuRep.FindList(i => i.IsDelete == false);
            if (menuList == null)
                return resulrList;

            resulrList.AddRange(MakeTreeComboSelectForMenu(menuList));
            return resulrList;
        }

        private void GetChildMenu(MenuComboTreeModel parent, List<Menu> remainMenu, Dictionary<int, RoleAuthorize> dict)
        {
            List<Menu> childList = remainMenu.Where(i => i.ParentID.ToString() == parent.id).ToList();
            if (childList == null || childList.Count <= 0)
                return;
            foreach (var child in childList)
            {
                MenuComboTreeModel model = new MenuComboTreeModel()
                {
                    id = child.ID.ToString(),
                    text = child.Name,
                    state = "open",
                    @checked = dict.ContainsKey(child.ID),
                    children = new List<MenuComboTreeModel>()
                };

                remainMenu.Remove(child);
                GetChildMenu(model, remainMenu, dict);
                parent.children.Add(model);
            }
        }

        private void GetMenuDropDown(List<MenuTreeGridModel> resultList, MenuTreeGridModel parent, List<Menu> remainMenu, int depth)
        {
            depth++;
            List<Menu> childList = remainMenu.Where(i => i.ParentID == parent.id).ToList();
            if (childList == null || childList.Count <= 0)
                return;
            childList = childList.OrderBy(i => i.Order).ToList();
            foreach (var item in childList)
            {
                string menuDisplayName = string.Empty;
                for (int i = 0; i < depth; i++)
                {
                    menuDisplayName += "　　";
                }
                menuDisplayName += item.Name;

                MenuTreeGridModel model = new MenuTreeGridModel()
                {
                    @checked = false,
                    CreateBy = item.CreateBy,
                    IsDelete = item.IsDelete,
                    CreateTime = item.CreateTime.ToString("yyyy-MM-dd hh:mm:ss"),
                    Enable = item.Enable,
                    iconCls = item.Icon,
                    id = item.ID,
                    MenuType = item.MenuType,
                    LastUpdateBy = item.LastUpdateBy,
                    LastUpdateTime = item.LastUpdateTime.HasValue ? item.LastUpdateTime.Value.ToString("yyyy-MM-dd hh:mm:ss") : string.Empty,
                    Link = item.Link,
                    name = item.Code,
                    Order = item.Order,
                    Remark = item.Remark,
                    state = "open",
                    Name = menuDisplayName,
                    Tooltip = item.Name,
                    _parentId = item.ParentID
                };

                remainMenu.Remove(item);
                resultList.Add(model);
                GetMenuDropDown(resultList, model, remainMenu, depth);
            }
        }

        /// <summary>
        /// 组装下拉选择
        /// </summary>
        /// <param name="menuList"></param>
        /// <returns></returns>
        private List<MenuTreeGridModel> MakeTreeComboSelectForMenu(List<Menu> menuList)
        {
            List<MenuTreeGridModel> resultList = new List<MenuTreeGridModel>();
            List<Menu> firstLevelMenu = new List<Menu>();
            List<Menu> remainMenu = new List<Menu>();
            firstLevelMenu = menuList.FindAll(i => (i.ParentID == 0));
            remainMenu = menuList.FindAll(i => i.ParentID > 0);
            int depth = 0;
            if (firstLevelMenu == null)
                return resultList;
            firstLevelMenu = firstLevelMenu.OrderBy(i => i.Order).ToList();
            foreach (Menu item in firstLevelMenu)
            {
                MenuTreeGridModel model = new MenuTreeGridModel()
                {
                    @checked = false,
                    CreateBy = item.CreateBy,
                    IsDelete = item.IsDelete,
                    CreateTime = item.CreateTime.ToString("yyyy-MM-dd hh:mm:ss"),
                    Enable = item.Enable,
                    iconCls = item.Icon,
                    id = item.ID,
                    MenuType = item.MenuType,
                    LastUpdateBy = item.LastUpdateBy,
                    LastUpdateTime = item.LastUpdateTime.HasValue ? item.LastUpdateTime.Value.ToString("yyyy-MM-dd hh:mm:ss") : string.Empty,
                    Link = item.Link,
                    name = item.Code,
                    Order = item.Order,
                    Remark = item.Remark,
                    state = "open",
                    Name = item.Name,
                    Tooltip = item.Tooltip,
                    _parentId = item.ParentID
                };

                resultList.Add(model);
                GetMenuDropDown(resultList, model, remainMenu, depth);
            }

            return resultList;
        }

        /// <summary>
        /// 获取所有的报表叶子节点
        /// </summary>
        /// <returns></returns>
        private List<Menu> GetAllLeafMenuNodes()
        {
            List<Menu> allMenu = UnitOfWork.MenuRep.FindList(i => i.IsDelete == false && i.MenuType == (int)MenuType.BusinessMenu);
            List<int> allParentMenuIDs = new List<int>();
            if (allMenu == null || allMenu.Count == 0)
                return new List<Menu>();

            allParentMenuIDs = allMenu.Select(i => i.ParentID).ToList();
            return allMenu.Where(i => !allParentMenuIDs.Contains(i.ID)).ToList();
        }

        /// <summary>
        /// 获取菜单节点的所有父ID
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="parentIDs"></param>
        private void GetParentIDs(List<int> ids, List<int> parentIDs)
        {
            if (ids == null || ids.Count == 0)
                return;

            List<Menu> menuList = UnitOfWork.MenuRep.FindList(i => ids.Contains(i.ID) && i.IsDelete == false);
            List<int> currentParentIDs = new List<int>();
            if (menuList != null && menuList.Count > 0)
            {
                currentParentIDs = menuList.Where(i => i.ParentID > 0).Select(i => i.ParentID).ToList();
                parentIDs.AddRange(currentParentIDs);
            }

            GetParentIDs(currentParentIDs, parentIDs);
        }

        public List<string> GetAllIcon()
        {
            List<string> iconList = new List<string>();
            string iconFolder = AppConfig.IconFolderPath;
            if (!string.IsNullOrEmpty(iconFolder))
            {
                DirectoryInfo directtory = new DirectoryInfo(iconFolder);
                FileInfo[] files = directtory.GetFiles();
                if (files.Count() > 0)
                {
                    foreach (var file in files)
                    {
                        if (file.Name.StartsWith("large") || file.Name.StartsWith("mini"))
                            continue;
                        iconList.Add(string.Format("icon-{0}", file.Name.Replace(file.Extension, "")));
                    }
                }
            }

            return iconList;
        }

        public bool UpdateIcon(int id, string icon)
        {
            Menu menu = UnitOfWork.MenuRep.Find(i => i.ID == id && i.IsDelete == false);
            if (menu == null)
                return false;

            menu.Icon = icon;
            UnitOfWork.MenuRep.Update(menu);
            UnitOfWork.Save();

            return true;
        }

        public bool CheckIsLeaf(int id)
        {
            return UnitOfWork.MenuRep.Find(i => i.ParentID == id && i.IsDelete == false) == null ? true : false;
        }

        public bool AuthRole(int menuID, string insertRoleIDs, string deleteRoleIDs)
        {
            List<int> insertIDs = new List<int>();
            List<int> deleteIDs = new List<int>();
            if (!string.IsNullOrEmpty(insertRoleIDs))
            {
                foreach (var item in insertRoleIDs.Split(','))
                {
                    insertIDs.Add(int.Parse(item));
                }
            }
            if (!string.IsNullOrEmpty(deleteRoleIDs))
            {
                foreach (var item in deleteRoleIDs.Split(','))
                {
                    deleteIDs.Add(int.Parse(item));
                }
            }

            insertIDs = insertIDs.Distinct().ToList();
            deleteIDs = deleteIDs.Distinct().ToList();

            List<int> menuIds = new List<int>() { menuID };
            List<int> parentMenuIds = new List<int>();
            GetParentIDs(menuIds, parentMenuIds);
            menuIds.AddRange(parentMenuIds);
            menuIds = menuIds.Distinct().ToList();

            using (TransactionScope scope = new TransactionScope())
            {
                if (deleteIDs.Count > 0)
                {
                    foreach (var deleteRoleID in deleteIDs)
                    {
                        List<int> deleteMenuIDs = new List<int>();
                        GetOnlyOneChildParentIDs(menuID, deleteMenuIDs, deleteRoleID);
                        deleteMenuIDs.Add(menuID);
                        UnitOfWork.RoleAuthorizeRep.Delete(i => i.RoleID == deleteRoleID && deleteMenuIDs.Contains(i.MenuID));
                    }
                }

                if (insertIDs.Count > 0)
                {
                    foreach (var insertRoleID in insertIDs)
                    {

                        List<int> existsIDs = new List<int>();
                        List<RoleAuthorize> existAuth = UnitOfWork.RoleAuthorizeRep.FindList(i => menuIds.Contains(i.MenuID) && i.RoleID == insertRoleID);
                        if (existAuth != null && existAuth.Count > 0)
                            existsIDs = existAuth.Select(i => i.MenuID).ToList();
                        List<int> noAuthIDs = menuIds.Where(i => !existsIDs.Contains(i)).ToList();
                        List<RoleAuthorize> roleAuthorizeList = new List<RoleAuthorize>();
                        foreach (var item in noAuthIDs)
                        {
                            RoleAuthorize roleAuthorize = new RoleAuthorize() { MenuID = item, RoleID = insertRoleID };
                            roleAuthorize.Create();
                            roleAuthorizeList.Add(roleAuthorize);
                        }
                        UnitOfWork.RoleAuthorizeRep.Insert(roleAuthorizeList);
                    }
                }

                UnitOfWork.Save();
                scope.Complete();
            }

            return true;
        }

        private void GetOnlyOneChildParentIDs(int id, List<int> parentIDs, int roleID)
        {
            Menu currentMenu = UnitOfWork.MenuRep.Find(i => i.ID == id);
            if (currentMenu == null)
                return;

            List<Menu> brotherMenuList = UnitOfWork.MenuRep.FindList(i => i.ID != id && i.ParentID == currentMenu.ParentID);
            if (brotherMenuList != null && brotherMenuList.Count > 0)
            {
                List<int> brotherMenuIDs = brotherMenuList.Select(i => i.ID).ToList();
                List<RoleAuthorize> roleAuth = UnitOfWork.RoleAuthorizeRep.FindList(i => i.RoleID == roleID && brotherMenuIDs.Contains(i.MenuID));
                if (roleAuth != null && roleAuth.Count > 0)
                {
                    return;
                }
            }

            parentIDs.Add(currentMenu.ParentID);
            GetOnlyOneChildParentIDs(currentMenu.ParentID, parentIDs, roleID);
        }
    }
}
