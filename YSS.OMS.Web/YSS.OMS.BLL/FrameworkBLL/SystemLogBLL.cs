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
    public class SystemLogBLL : BaseBLL
    {
        public SystemLogBLL(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        #region IP地址名称

        private static string IPAddressName = "BIReport_Session_IPAddressName";

        #endregion

        public SearchListResult<SystemLogModel> GetSystemLogList(string username, DateTime? beginTime, DateTime? endTime, PagerCondition page)
        {
            var query = UnitOfWork.SystemLogRep.GetQueryable();
            if (!string.IsNullOrEmpty(username))
            {
                query = query.Where(i => i.CreateBy.Contains(username));
            }
            if (beginTime.HasValue && endTime.HasValue)
            {
                query = query.Where(i => i.CreateTime >= beginTime && i.CreateTime <= endTime);
            }
            page.TotalCount = query.Count();

            List<SystemLog> entityList = query.SortAndPage(page.Sort, "CreateTime", !string.IsNullOrEmpty(page.Sort) ? page.Order : "DESC", page.PageSize, page.CurrentPage, page.TotalCount).ToList();
            List<SystemLogModel> modelList = new List<SystemLogModel>();
            foreach (SystemLog item in entityList)
            {
                SystemLogModel model = new SystemLogModel();
                ModelCopierUtility.CopyModel(item, model);
                modelList.Add(model);
            }

            SearchListResult<SystemLogModel> result = new SearchListResult<SystemLogModel>();
            result.rows = modelList;
            result.total = page.TotalCount;
            return result;
        }

        public SystemLogModel GetSystemLog(int id)
        {
            SystemLog entity = UnitOfWork.SystemLogRep.Find(i => i.ID == id);
            SystemLogModel model = new SystemLogModel();
            ModelCopierUtility.CopyModel(entity, model);
            return model;
        }

        public void WriteOperateDbLog(DbLogType logType, int menuID, string menuName, string result, string remark)
        {
            string cityIds = string.Empty;
            string locations = string.Empty;
            CurrentOperator currentOperator = Operator.GetOperator();
            List<RoleModel> roles = new SessionDataBLL(UnitOfWork).GetUserAuthMenuRoles(menuID);
            
            SystemLog logEntity = new SystemLog();
            logEntity.UserID = int.Parse(currentOperator.Id);
            logEntity.OperateType = (short)logType;
            logEntity.IPAddress = Net.Ip;
            logEntity.IPAddressName = GetLocation(logEntity.IPAddress);
            logEntity.MenuID = menuID;
            logEntity.MenuName = menuName;
            logEntity.Result = result;
            logEntity.Remark = remark;
            logEntity.Create();

            string key = DateTime.Now.ToString("HHmmss") + currentOperator.Id;
            DBLog<SystemLog>.Current.Add(key, logEntity);
        }

        public void WriteLoginDbLog(DbLogType logType, string username, bool loginSuccess, string remark)
        {

            CurrentOperator currentOperator = Operator.GetOperator();
            SystemLog logEntity = new SystemLog();
            logEntity.UserID = loginSuccess ? int.Parse(currentOperator.Id) : -1;
            logEntity.OperateType = (short)logType;
            logEntity.IPAddress = Net.Ip;
            logEntity.IPAddressName = GetLocation(logEntity.IPAddress);
            logEntity.MenuID = null;
            logEntity.MenuName = string.Empty;
            logEntity.Result = loginSuccess ? "登录成功" : "登录失败";
            logEntity.Remark = remark;
            logEntity.CreateTime = DateTime.Now;
            logEntity.CreateBy = username;

            string key = DateTime.Now.ToString("HHmmss") + currentOperator.Id;
            DBLog<SystemLog>.Current.Add(key, logEntity);
        }

        public void WriteLogoutDbLog(DbLogType logType, string remark)
        {
            CurrentOperator currentOperator = Operator.GetOperator();
            SystemLog logEntity = new SystemLog();
            logEntity.UserID = int.Parse(currentOperator.Id);
            logEntity.OperateType = (short)logType;
            logEntity.IPAddress = Net.Ip;
            logEntity.IPAddressName = GetLocation(logEntity.IPAddress);
            logEntity.MenuID = null;
            logEntity.MenuName = string.Empty;
            logEntity.Result = "安全退出成功";
            logEntity.Remark = remark;
            logEntity.Create();

            string key = DateTime.Now.ToString("HHmmss") + currentOperator.Id;
            DBLog<SystemLog>.Current.Add(key, logEntity);
        }

        private string GetLocation(string ipAddress)
        {
            string ipAddressName = string.Empty;
            object obj = HttpContext.Current.Session[IPAddressName];
            if (obj == null)
            {
                ipAddressName = Net.GetLocation(ipAddress);
                HttpContext.Current.Session[IPAddressName] = ipAddressName;
            }
            else
            {
                ipAddressName = obj.ToString();
            }

            return ipAddressName;
        }

        public void WriteDBLog(SystemLogModel model)
        {
            SystemLog entity = new SystemLog();
            ModelCopierUtility.CopyModel(model, entity);
            UnitOfWork.SystemLogRep.Insert(entity);
            UnitOfWork.Save();
        }
    }
}
