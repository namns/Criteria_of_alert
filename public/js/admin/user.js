

function deleteUser(elt) {
    var id = $(elt).closest('tr').attr('id');
    var name =  $(elt).closest('tr').find('.name').text();
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "ユーザ削除",
        message: name + "の求人情報を削除します。よろしいですか？",
        buttons: {
            cancel: {
                label: 'キャンセル',
                className: 'btn-default pull-right'
            },
            confirm: {
                label: '削除',
                className: 'btn-danger'
            }
        },
        callback:  function(result) {
            if(result == true) {
                // call back ajax function
                $.ajax({
                    type: "POST",
                    url: "/admin/user/delete_user",
                    data: {ID: id},
                    dataType: 'json',
                    async: false,
                    beforeSend: function () {
                        // $("#loading_overlay").fadeIn(300);
                    },
                    error: function (data, status, errThrown) {
                        // $("#loading_overlay").fadeOut(300);
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            location.reload();
                        }
                    },
                    statusCode: {
                        404: function () {
                            alert('page not found');
                            // $("#loading_overlay").fadeOut(300);
                        }
                    }
                });
            }
        }
    });

}

function addUser() {
    clearForm();
    $('#formTitle').html('ユーザ新規登録');
    $('#userId').val('');
    $('#user_frm input[name=user_name]').val('');
    $('#user_frm input[name=password]').val('');
    $('#user_frm input[name=name]').val('');
    $('#user_frm input[name=status_flg]:eq(0)').prop('checked', true);
    $('#edit').modal('show');
}

function editUser(id) {
    $('#formTitle').html('求人情報編集');
    $.ajax({
        type: "POST",
        url: "/admin/user/getUser",
        data: {ID: id},
        dataType: 'json',
        async: false,
        beforeSend: function () {
            // $("#loading_overlay").fadeIn(300);
        },
        error: function (data, status, errThrown) {
            // $("#loading_overlay").fadeOut(300);
        },
        success: function (data) {
            if (data.status == "success") {
                $('#user_name_div').removeClass('has-error');
                $('#password_div').removeClass('has-error');
                $('#name_div').removeClass('has-error');
                $('#user_frm')[0].reset();

                $('#userId').val(data.usercategory.id);

                $('#user_frm input[name=user_name]').val(data.usercategory.user_name);
                $('#user_frm input[name=password]').val('');

                $('#user_frm input[name=name]').val(data.usercategory.name);

                if(data.usercategory.status_flg ==0){
                    $('#user_frm input[name=status_flg]:eq(1)').prop('checked', true);
                }else {
                    $('#user_frm input[name=status_flg]:eq(0)').prop('checked', true);
                }
                $('#edit').modal('show');
            }
        },
        statusCode: {
            404: function () {
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    });
}

function saveUser() {
    var userId = $("#user_frm input[name=userId]").val();
    var formData = new FormData($('#user_frm')[0]);
    clearForm();
    $.ajax({
        type: "POST",
        url: "/admin/user/save",
        data: formData,
        // dataType: 'json',
        processData: false,
        contentType: false,
        // async: true,
        beforeSend: function () {
            disable_btn();
            // $("#loading_overlay").fadeIn(300);
        },
        error: function (data, status, errThrown) {
            enable_btn();
            // $("#loading_overlay").fadeOut(300);
        },
        success: function (data) {
            if (data.status == "success") {
                $('#edit').modal('hide');
                if(isEmpty(userId)){//add new recruit
                    window.location.href = window.location.href;
                }else { //edit
                    var id = data.user.id;
                    $('#user_list tr').each(function(i, row){
                        var $row = $(row);
                        var trid = $row.attr('id');
                        if(id == trid){
                            $row.find('.user_name').text(data.user.user_name);
                            $row.find('.name').text(data.user.name);
                            $row.find('.status_flg').text(data.user.status_flg);
                        }
                    });
                    enable_btn();
                }
            } else {
                for (var key in data.errors) {
                    div = key + '_div';
                    $("#" + div).addClass('has-error');
                    $("#" + div + " p").html(data.errors[key]);
                    $( "#"+key).focus(function() {
                        var id = $(this).attr("id");
                        $("#" + id + '_DIV').removeClass('has-error');
                    });
                }
                enable_btn();
            }

        },
        statusCode: {
            404: function () {
                enable_btn();
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    });
}

function clearForm() {

    $("#user_frm input[type=text]").each(function (e) {
        var id = $(this).attr("id");
        $("#"+id + '_error').html('');
        $("#" + id + '_div').removeClass('has-error');
    });

    $("#password_error").html('');
    $("#password_div").removeClass('has-error');

    $("#recruit_apply_form textarea").each(function (e) {
        var id = $(this).attr("id");
        $("#ERROR_"+id).html('');
    });
    $("#ERROR_SEX").html("");
    $("#ERROR_CONTACT_METHOD").html("");
}

function disable_btn() {
    $('#close_modal').attr('disabled','disabled');
    $('#save').attr('disabled','disabled');
}

function enable_btn() {
    $('#close_modal').removeAttr('disabled');
    $('#save').removeAttr('disabled');
}