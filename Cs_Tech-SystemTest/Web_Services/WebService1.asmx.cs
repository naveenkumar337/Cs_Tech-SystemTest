using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace Cs_Tech_SystemTest.Web_Services
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connection"].ConnectionString);
        [WebMethod]
        public List<clsDesignation> GetDesignationData()
        {
            DataTable dt = new DataTable();
            //SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connection"].ConnectionString);
            SqlCommand cmd = new SqlCommand("getDesignationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            using (SqlDataAdapter ad = new SqlDataAdapter(cmd)) {
                ad.Fill(dt);
            }
            con.Close();
            List<clsDesignation> liDes = new List<clsDesignation>();
            if (dt.Rows.Count >= 1)
            {
                foreach (DataRow row in dt.Rows)
                {
                    clsDesignation desig = new clsDesignation();
                    desig.id = Convert.ToInt32(row["id"].ToString());
                    desig.Designation_Name = row["DesignationName"].ToString();
                    liDes.Add(desig);

                }
            }
                return liDes;
        }
        [WebMethod(MessageName ="addEmployee")]
        public void addEmployeeDetails(Employee emp)
        {
            SqlCommand cmd = new SqlCommand("sp_Cs_AddEmployeeDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@empName", emp.name));
            cmd.Parameters.Add(new SqlParameter("@empEmail", emp.email));
            cmd.Parameters.Add(new SqlParameter("@empDesignationID", emp.id));
            cmd.Parameters.Add(new SqlParameter("@empSalary", emp.salary));
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }
        [WebMethod(MessageName = "getEmployees")]
        public List<Employee> getEmployees() {
            SqlCommand cmd = new SqlCommand("sp_cs_getEmployeesDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            DataTable dt = new DataTable();
            using (SqlDataAdapter ad = new SqlDataAdapter(cmd)) {
                ad.Fill(dt);
            }
            List<Employee> liemp = new List<Employee>();
            if (dt.Rows.Count >= 1) {

                foreach (DataRow row in dt.Rows) {
                    liemp.Add(new Employee
                    {
                        id = Int32.Parse(row["EmpId"].ToString()),
                        name = row["EmpName"].ToString(),
                        email = row["EmpEmail"].ToString(),
                        salary = Double.Parse(row["EmpSalary"].ToString()),
                        designation = row["EmpDesignation"].ToString()                
                    });
                }
            }
            return liemp;
        }

        [WebMethod(MessageName = "updateEmployee")]
        public void updateEmployeeDetails(Employee emp) {
            SqlCommand cmd = new SqlCommand("sp_Cs_updateEmployeeDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@empid", emp.id));
            cmd.Parameters.Add(new SqlParameter("@empname", emp.name));
            cmd.Parameters.Add(new SqlParameter("@empemail", emp.email));
            cmd.Parameters.Add(new SqlParameter("@empsalary", emp.salary));
            cmd.Parameters.Add(new SqlParameter("@empdesig", emp.designation));
            con.Open();
            var result= cmd.ExecuteNonQuery();
            con.Close();
        }

        [WebMethod(MessageName = "deleteEmployee")]
        public void deleteEmployee(int id) {
            SqlCommand cmd = new SqlCommand("sp_Cs_deletEemployee", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@empid", id));
            con.Open();
            var result = cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}
