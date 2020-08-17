<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Display_Page.aspx.cs" Inherits="Cs_Tech_SystemTest.Web_Pages.Display_Page" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="script/jScript.js"></script>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="data-form">
                <div class="data-name">
                    <div class="forlabel">
                        <label for="txtname" title="name">Name</label>
                    </div>
                    <div class="forfield">
                        <asp:TextBox ID="txtname" runat="server"></asp:TextBox>
                        <span class="error">Enter your name here</span>
                    </div>
                </div>
                <div class="data-email">
                    <div class="forlabel">
                        <label for="txtemail" title="Email">Email</label>
                    </div>
                    <div class="forfield">
                        <asp:TextBox ID="txtemail" runat="server"></asp:TextBox>
                        <span class="error" id="invalid_email">Email-id is invalid</span>
                    </div>
                </div>

                <div class="data-salary">
                    <div class="forlabel">
                        <label for="txtsalary" title="Salary">Salary</label>
                    </div>
                    <div class="forfield">
                        <asp:TextBox ID="txtsalary" runat="server"></asp:TextBox>
                        <span class="error" id="invalid_salary">Salary Must be a Number or Greterthen 100</span>
                    </div>
                </div>
                <div class="data-designation">
                    <div class="forlabel">
                        <label for="dddesignation" title="Designation">Designation</label>
                    </div>
                    <div class="forfield">

                        <select id="DropDownList1">
                            <option value="0">--Select-One--</option>
                        </select>
                    </div>
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
                    <th>Action</th>
                </tr>
            </table>
        </div>

        <div class="container">
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Update Details</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <div>
                                <h5 id="mod-lblid"></h5>
                            </div>
                            <div>
                                <label>Name</label>
                                <input type="text" id="mod-txtname" />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="text" id="mod-txtemail" />
                            </div>
                            <div>
                                <label>Salary</label>
                                <input type="text" id="mod-txtsalary" />
                            </div>
                            <div>
                                <label>Designation</label>
                                <select id="mod-grid">
                                    <option value="0" disabled="disabled">--select-any-one--</option>
                                </select>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn-update btn btn-primary">Save</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="myModalfordelete">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal body -->
                        <div class="modal-body">
                            <h6>Are you showre to delete <span id="empid"></span>Employee</h6>
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn-delete btn btn-primary">Delete</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <link rel="stylesheet" href="style.css" />

</body>
</html>
