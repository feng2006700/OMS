using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace YSS.OMS.Common
{
    public class CurrentOperator
    {
        public string Id { get; set; }

        public string TrueName { get; set; }

        public List<OperatorRole> Roles { get; set; }
    }

    public class OperatorRole
    {
        public string RoleCode { get; set; }

        public string RoleName { get; set; }
    }

    public class Operator
    {
        public static CurrentOperator GetOperator()
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (cookie != null && !string.IsNullOrEmpty(cookie.Value))
            {
                try
                {
                    FormsAuthenticationTicket deyTicket = FormsAuthentication.Decrypt(cookie.Value);
                    string userJson = deyTicket.UserData;
                    if (!string.IsNullOrEmpty(userJson))
                    {
                        return JsonConvert.DeserializeObject<CurrentOperator>(userJson);
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }

            return null;
        }

        public static bool IsLogin()
        {
            CurrentOperator currentOperator = GetOperator();
            if (currentOperator != null)
            {
                int userID = 0;
                int.TryParse(currentOperator.Id, out userID);
                if (userID > 0)
                    return true;
            }

            return false;
        }
    }
}
