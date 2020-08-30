var newarr = [];

$(document).ready(function () {
    var arr = callWebService("GetDesignationData", "");
    callWebService("getEmployees", "");
    debugger;
    $('#form1  input:text').val('');
    //initially hide search dropdown of designation
    $('.error').hide();
    $('.alert').hide();
    $("#search-dropdown").hide();
    //set values to when click to edit
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this);
        modal.find('#mod-lblid').text(`Your Id: ${event.relatedTarget.parentNode.parentNode.children[0].innerText}`);
        modal.find('#mod-txtname').val(event.relatedTarget.parentNode.parentNode.children[1].innerText);
        modal.find('#mod-txtemail').val(event.relatedTarget.parentNode.parentNode.children[2].innerText);
        modal.find('#mod-txtsalary').val(event.relatedTarget.parentNode.parentNode.children[3].innerText);
    });

    //hide dropdown when entering name and email vise versa
    $('#selsearch').change(function (e) {
        if (e.currentTarget.selectedIndex == 2) {
            $("#search-dropdown").show();
            $("#txtsearchname").hide();
        }
        if (e.currentTarget.selectedIndex !== 2) {
            $("#search-dropdown").hide();
            $("#txtsearchname").show();
        }
    });
    //update data
    $('.btn-update').click(function (e) {
        debugger;
        var modal = $('#myModal');
        var index = $("#mod-grid option:selected").val();
        if (+index == 0) {
            $('#modseldata').show();
            return false;
        }
        var empobj = {
            "id": +modal.find('#mod-lblid').text().split(' ').pop(),
            "name": modal.find('#mod-txtname').val(),
            "email": modal.find('#mod-txtemail').val(),
            "salary": +modal.find('#mod-txtsalary').val(),
            "designation": $("#mod-grid option:selected").val()
        }
        $.ajax({
            method: 'post',
            dataType: 'json',
            data: data,
            contentType: "application/json;charset=utf-8",
            url: `/Web_Services/WebService1.asmx/${url}`,
            success: function (response) {
                if (response.d >= 1) {
                    debugger;
                    $('.alert').attr('class', 'alert success');
                    $('.alert h6').text("Employee  Details updated Successfully..");
                    showpopup();
                }
                else {
                    $('.alert h6').text("Update Failed!...");
                    $('.alert').attr('class', 'alert fail');
                    showpopup();
                }
            }, error: function () {
            }
        });
        callWebService("getEmployees", "");
        model.attr('data-dismiss', 'modal');
    });
    //Add New Employee
    $('#btnSubmit').click(function () {
        debugger;
        $('.error').hide();
        var name = $('#txtname').val();
        var email = $('#txtemail').val();
        var salary = $('#txtsalary').val();
        var designation = +$("#DropDownList1 option:selected").val();
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
        if (designation < 1) {
            $('#invalid_selection').show();
            return false;
        }
        var empobj = {
            "id": +designation,
            "name": name,
            "email": email,
            "salary": +salary,
            "designation": ""
        }
        $.ajax({
            method: 'post',
            dataType: 'json',
            data: JSON.stringify({ emp: empobj }),
            contentType: "application/json;charset=utf-8",
            url: `/Web_Services/WebService1.asmx/addEmployee`,
            success: function (response) {
                if (response.d >= 1) {
                    debugger;
                    alert('data saved');
                    sucessmessage();
                    $('.alert').attr('class', 'alert success');
                    $('.alert h6').text("Employee Added Successfully..");
                    showpopup();
                }
                else if (response.d == 0) {
                    $('.alert h6').text("Adding Failed!...May be Email duplicate found");
                    $('.alert').attr('class', 'alert fail');
                    showpopup();
                }
                else {
                    $('.alert h6').text("Adding Failed!...");
                    $('.alert').attr('class', 'alert fail');
                    showpopup();
                }
            },
            error: function () {
            }
        });

        //callWebService("addEmployee", );
        callWebService("getEmployees", "");
    });
    //Search Employee
    $('#btnsearch').click(function () {
        debugger;
        var option = $('#selsearch option:selected').text();
        var name = "";
        if (option === 'EmpDesignation') {
            option = 'EmpDesignation_ID';
            name = $('#search-dropdown option:selected').val();
        } else {
            name = $('#txtsearchname').val();
        }

        $.ajax({
            method: 'post',
            dataType: 'json',
            data: JSON.stringify({ option: option, str: name }),
            contentType: "application/json;charset=utf-8",
            url: `/Web_Services/WebService1.asmx/searchEmployee`,
            success: function (response) { 
                $('#grid tr').slice(1, $('#grid tr').length).remove();
                if (response.d.length >= 1) {
                    AppendToGrid(response.d);
                }
                else {
                    $('#grid').append(`<tr><td>Data Not found...</td><tr>`);
                }
            },
            error: function () {
            }
        });
    });


});
//delete employee
function deleteFun(event) {
    debugger;
    var id = event.parentNode.parentNode.children[0].innerText;
    $.ajax({
        method: 'post',
        dataType: 'json',
        data: JSON.stringify({ id: id }),
        contentType: "application/json;charset=utf-8",
        url: `/Web_Services/WebService1.asmx/deleteEmployee`,
        success: function (response) {
            if (response.d >= 1) {
                $('.alert h6').text("SuccessFully deleted!...");
                $('.alert').attr('class', 'alert success');
                showpopup();
                callWebService("getEmployees", "");
            }
            else {
                $('.alert h6').text("Deletion Failed!...");
                $('.alert').attr('class', 'alert fail');
                showpopup();
                callWebService("getEmployees", "");
            }
        }, error: function () {
            return err;
        }

    });
}

function showpopup() {
    $('.alert').show();
    setInterval(() => {
        relif();
    }, 30000);
};
function relif() {
    $('.alert').hide();
};
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
        success: function (response) {
            debugger;
            if (url.includes('Designation')) {
                $.each(response.d, function (index, value) {
                    $("#DropDownList1").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                    $("#mod-grid").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                    $("#search-dropdown").append($(`<option>${value.Designation_Name}</option>`).val(value.id));
                });
            }
            else if (url.includes('getEmployees')) {
                newarr = response.d;
                if (response.d.length <= 5) {
                    $('.viewall').hide();
                }
                AppendToGrid(response.d.slice(0, 5));


            }
            return response.d;
        }, error: function (err) {
            return err;
        }
    });
}
function AppendToGrid(list) {
    $.each(list, function (ind, emp) {
        $('#grid').append(`<tr><td>${emp.id}</td><td>${emp.name}</td><td>${emp.email}</td><td>${emp.salary}</td><td>${emp.designation}</td><td><input id='btnedit${ind}' value='Edit' type='button' data-toggle='modal' data-target='#myModal' /><input id='btndelete${ind}' value='Delete' onclick='deleteFun(this)' type='submit' /></td></tr>`);
    });
}
