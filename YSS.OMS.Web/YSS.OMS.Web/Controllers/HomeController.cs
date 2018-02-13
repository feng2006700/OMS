using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSS.OMS.Common;

namespace YSS.OMS.Web.Controllers
{
    [HandlerLogin]
    public class HomeController : ControllerBase
    {
        public override ActionResult Index()
        {
            var model = Operator.GetOperator() != null ? Operator.GetOperator() : new CurrentOperator();
            return View(model);
        }
        
    }
}
