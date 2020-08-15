using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cs_Tech_SystemTest
{
    public class clsDesignation
    {
        public int id { get; set; }
        public string Designation_Name { get; set; }
    }
    public class Employee {
        public int id { get; set; }
        public string name { get; set; }
        public string email
        {
            get;
            set;
        }
        public double salary
        {
            get;
            set;
        }
        public string designation { get; set; }
    }
}