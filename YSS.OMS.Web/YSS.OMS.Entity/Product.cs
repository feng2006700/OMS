//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace YSS.OMS.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public short Category { get; set; }
        public string Origin { get; set; }
        public short Status { get; set; }
        public string CreateBy { get; set; }
        public System.DateTime CreateTime { get; set; }
        public Nullable<System.DateTime> LastUpdateTime { get; set; }
        public string LastUpdateBy { get; set; }
        public bool IsDelete { get; set; }
    }
}
