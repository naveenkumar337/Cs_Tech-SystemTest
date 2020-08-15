<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Display_Page.aspx.cs" Inherits="Cs_Tech_SystemTest.Web_Pages.Display_Page" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" ></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div class="data-form">
            <div class="data-name">
                <label for="txtname" title="name">Name</label>
                <asp:TextBox ID="txtname" runat="server"></asp:TextBox>
                <span class="error">Enter your name here</span>
            </div>            
            <div class="data-email">
                <label for="txtemail" title="Email">Email</label>
                <asp:TextBox ID="txtemail" runat="server"></asp:TextBox>
                <span class="error" id="invalid_email">Email-id is invalid</span>

            </div>
            
            <div class="data-salary">
                <label for="txtsalary" title="Salary">Salary</label>
                <asp:TextBox ID="txtsalary" runat ="server"></asp:TextBox>                
                <span class="error" id="invalid_salary">Salary Must be a Number or Greterthen 100</span>
            </div>
            <div class="data-designation">
                <label for="dddesignation" title="Designation">Designation</label>
                <select id="DropDownList1">
                    <option value="0">--Select-One--</option>
                </select>
            </div>
            <div class="data-submit">
                <asp:Button ID="btnSubmit" Text="Submit" runat="server" />
            </div>
        </div>    
    </div>
    <div class="gridview">
        <table id="grid">
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Designation</th>
            </tr>
        </table>
    </div>

    </form>
    <script type="text/javascript">
        var arr = callWebService("GetDesignationData", "");
        callWebService("getEmployees", "");
        $(document).ready(function () {
            $('.error').hide();
            $('#btnSubmit').click(function () {
                $('.error').hide();
                //alert("Hello iam clicked by Naveen"); 
                var name = $('#txtname').val();
                var email = $('#txtemail').val();
                var salary = $('#txtsalary').val();
                var designation = $("#DropDownList1 option:selected").val();
                if (name === "") {
                    $('#txtname').next().show();
                    return false;
                }
                if (IsEmailCorrect(email) == false) {
                    $('#invalid_email').show();
                    return false;
                }
                if (!(Number(salary)>100)) {
                    $('#invalid_salary').show();
                    return false;
                }
                var empobj = {
                    "id": +designation,
                    "name": name,
                    "email": email,
                    "salary": +salary,
                    "designation":""
                }
                callWebService("addEmployee", JSON.stringify({ emp: empobj }));
            });
        });
        function IsEmailCorrect(email) {
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
        function callWebService(url,data) {
            $.ajax({
                method: 'post',
                dataType: 'json',
                data: data,
                contentType: "application/json;charset=utf-8",
                url: `/Web_Services/WebService1.asmx/${url}`,
                processData:false,
                success: function (response) {
                    if (url.includes('Designation')) {
                        $.each(response.d, function (index, value) {
                            $("#DropDownList1").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                        });
                    }
                    else if (url.includes('getEmployees')) {
                        AppendToGrid(response.d);
                    }
                    return response.d;
                }, error: function (err) {
                    return  err;
                }
            });
        }
        function AppendToGrid(list) {
            $.each(list, function (ind, emp) {
                $('#grid').append(`<tr><td>${emp.id}</td><td>${emp.name}</td><td>${emp.email}</td><td>${emp.salary}</td><td>${emp.designation}</td><td><input id='btnedit${ind}' value='Edit' type='button' /><input id='btndelete${ind}' value='Delete' type='submit' /></td></tr>`);
            });
        }
    </script>
</body>
</html>
