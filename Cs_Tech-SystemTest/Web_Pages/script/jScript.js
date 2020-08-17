var arr = callWebService("GetDesignationData", "");
callWebService("getEmployees", "");
$(document).ready(function () {
    $('.error').hide();
    $('#myModal').on('show.bs.modal', function (event) {
        debugger;
        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this);
        modal.find('#mod-lblid').text(`Your Id: ${event.relatedTarget.parentNode.parentNode.children[0].innerText}`);
        modal.find('#mod-txtname').val(event.relatedTarget.parentNode.parentNode.children[1].innerText);
        modal.find('#mod-txtemail').val(event.relatedTarget.parentNode.parentNode.children[2].innerText);
        modal.find('#mod-txtsalary').val(event.relatedTarget.parentNode.parentNode.children[3].innerText);
        modal.find('#mod-txtdesignation').val(event.relatedTarget.parentNode.parentNode.children[4].innerText);
    });
    //$('#myModalfordelete').on('show.bs.modal', function (event) {
    //    debugger;
    //    var button = $(event.relatedTarget) // Button that triggered the modal
    //    var modal = $(this);
    //    modal.find('#empid').text(event.relatedTarget.parentNode.parentNode.children[0].innerText);
    //});
    //update data
    $('.btn-update').click(function (e) {
        debugger;
        var modal = $('#myModal');
        var empobj = {
            "id": +modal.find('#mod-lblid').text().split(' ').pop(),
            "name": modal.find('#mod-txtname').val(),
            "email": modal.find('#mod-txtemail').val(),
            "salary": +modal.find('#mod-txtsalary').val(),
            "designation": $("#mod-grid option:selected").val()
        }
        callWebService("updateEmployee", JSON.stringify({ emp: empobj }));
    });
    //delete employee
    debugger;
    $('tr td :submit').click(function (e) {
        debugger;
        var id = e.currentTarget.parentNode.parentNode.children[0].innerText;
        callWebService("udeleteEmployee", JSON.stringify({ id: +modal.find('#empid').text() }));
    });
    //Add New Employee
    $('#btnSubmit').click(function () {
        $('.error').hide();
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
        if (!(Number(salary) > 100)) {
            $('#invalid_salary').show();
            return false;
        }
        var empobj = {
            "id": +designation,
            "name": name,
            "email": email,
            "salary": +salary,
            "designation": ""
        }
        callWebService("addEmployee", JSON.stringify({ emp: empobj }));
        callWebService("getEmployees", ""); 
    });
    $('#btnsearch').click(function () {
        debugger;
        var name = $('#txtsearchname').val();
        callWebService("searchEmployee", JSON.stringify({ str: name }));
    });
});
function IsEmailCorrect(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function callWebService(url, data) {
    $.ajax({
        method: 'post',
        dataType: 'json',
        data: data,
        contentType: "application/json;charset=utf-8",
        url: `/Web_Services/WebService1.asmx/${url}`,
        processData: false,
        success: function (response) {
            if (url.includes('Designation')) {
                $.each(response.d, function (index, value) {
                    $("#DropDownList1").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                    $("#mod-grid").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                });
            }
            else if (url.includes('getEmployees')) {
                AppendToGrid(response.d);
            }
            else if (url.includes('searchEmployee')) {
                $('#grid tr').slice(1, $('#grid tr').length).remove();
                if (response.d.length >= 1) {
                    AppendToGrid(response.d);
                }
                else {
                    $('#grid').append(`<tr><td>Data Not found...</td><tr>`);
                }
            }
            return response.d;
        }, error: function (err) {
            return err;
        }
    });
}
function AppendToGrid(list) {
    $.each(list, function (ind, emp) {
        $('#grid').append(`<tr><td>${emp.id}</td><td>${emp.name}</td><td>${emp.email}</td><td>${emp.salary}</td><td>${emp.designation}</td><td><input id='btnedit${ind}' value='Edit' type='button' data-toggle='modal' data-target='#myModal' /><input id='btndelete${ind}' value='Delete' type='submit' /></td></tr>`);
    });
}
