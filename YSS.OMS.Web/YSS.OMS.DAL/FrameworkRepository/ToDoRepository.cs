using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YSS.OMS.Entity;
using YSS.OMS.IDAL;

namespace YSS.OMS.DAL
{
    public class ToDoRepository : EFRepository<ToDo>, IToDoRepository
    {
        public ToDoRepository(OMSEntities Context)
            : base(Context)
        {
        }
    }
}
