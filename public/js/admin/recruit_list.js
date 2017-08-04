/*CSV*/
var $csvConfirm = new Vue({
    el: '#csvImport',
    data: {
        'items': []
    }
});


$(function () {
    //display list recruit as size 20, 50, 100
    $(".change_page_size").change(function () {
        var numberNow = $(this).val();
        location.href = "/admin/recruits/" + numberNow;
    });

    //add new recruit click
    $("#add_new_btn").click(function () {
        // var newTab=safari.self.browserWindow.openTab();

       $('#formTitle').html('求人情報新規登録');
        $('#save').html('新規登録');
        clearRecruitForm();
        $('#new').modal('show');
    });
});






function clearRecruitForm() {
    $('#update_insert_recruit_frm')[0].reset();

    $("#CATEGORY_ID").val($("#CATEGORY_ID option:first").val());
    $("#IS_PUBLIC").val($("#IS_PUBLIC option:first").val());

    $("#update_insert_recruit_frm input[type=text]").each(function (e) {
            var id = $(this).attr("id");
            $("#" + id + '_DIV').removeClass('has-error');
    });

    $("#update_insert_recruit_frm img").each(function (e) {
        var preview_id = $(this).attr("id");
        $("#" + preview_id).attr("src",'');
    });
}
function addcriteria() {
    location.href = "/addcriteria";
}

function deletecriteria() {
    var id = $('#checkbox_id:checked').val();
    var token = $('#token').val();
    var txt;
    var r = confirm("Bạn có muốn xóa không!");
    if (r == true) {
        txt = "OK!";
        $.ajax({
            type: "post",
            url: "/deleteRecruit",
            data: {"_token" : token ,ID: id },
            dataType: 'json',
            // async: false,
            beforeSend: function () {
                // $("#loading_overlay").fadeIn(300);
            },
            error: function (data, status, errThrown) {
                // $("#loading_overlay").fadeOut(300);
            },
            success: function (data) {
                if (data.status == "success") {
                    window.location.href = window.location.href;
                }
            },
            statusCode: {
                404: function () {
                    alert('page not found');
                    // $("#loading_overlay").fadeOut(300);
                }
            }
        });
    } else {
        txt = "Cancel!";
    }
}



function deleteRecruit(elt) {
    var id = $(elt).closest('tr').attr('id');
    var title =  $(elt).closest('tr').find('.title').text();
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "Xóa tiêu chí",
        message: title + "bạn có muốn xóa tiêu chí này không?？",
        buttons: {
            confirm: {
                label: 'có',
                className: 'btn-danger '
            },
            cancel: {
                label: 'không',
                className: 'btn-default pull-right'
            }
        },
        callback:  function(result) {
            if(result == true) {
                // call back ajax function
                var token = $('input[name="_token"]').val();
                $.ajax({
                    type: "post",
                    url: "/deleteRecruit",
                    data: {ID: id ,token: token},
                    dataType: 'json',
                    // async: false,
                    beforeSend: function () {
                        // $("#loading_overlay").fadeIn(300);
                    },
                    error: function (data, status, errThrown) {
                        // $("#loading_overlay").fadeOut(300);
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            window.location.href = window.location.href;
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

function deleteListRecruit() {
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "求人一括削除",
        message: "チェックした求人を一括削除します。よろしいですか？",
        buttons: {
            confirm: {
                label: '一括削除',
                className: 'btn-danger'
            },
            cancel: {
                label: 'キャンセル',
                className: 'btn-default pull-right'
            }
        },
        callback:  function(result) {
            if(result == true) {
                // call back ajax function
                var formData = new FormData($('#main_form')[0]);
                $.ajax({
                    type: "POST",
                    url: "/admin/recruits/deleteListRecruit",
                    data: formData,
                    // dataType: 'json',
                    processData: false,
                    contentType: false,
                    // async: true,
                    beforeSend: function () {
                        // $("#loading_overlay").fadeIn(300);
                    },
                    error: function (data, status, errThrown) {
                        // disable_btn();
                        // $("#loading_overlay").fadeOut(300);
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            if($('#recruit_list').find('tr').length -1 == data.idList.length){
                                window.location.href = "/admin/recruits";
                            }
                            $('#recruit_list tr').each(function(i, row){
                                var $row = $(row);
                                var trid = $row.attr('id');
                                for (i = 0; i < data.idList.length; i++) {
                                    if(trid == data.idList[i]){
                                        $row.remove();
                                    }
                                }
                            });
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





    // $("input[name$='action']" ).val('update_list_url');
    // $("#main_form").submit();
}

function editRecruit(id) {
    $.ajax({
        type: "POST",
        url: "/admin/getRecruit",
        data: {ID: id},
        dataType: 'json',
        async: true,
        beforeSend: function () {
            // $("#loading_overlay").fadeIn(300);
        },
        error: function (data, status, errThrown) {
            // $("#loading_overlay").fadeOut(300);
        },
        success: function (data) {
            if (data.status == "success") {
                $('#formTitle').html('求人情報編集');
                $('#save').html('編集確定');
                clearRecruitForm();

                $("#update_insert_recruit_frm input[type=text]").each(function (e) {
                    var id = $(this).attr("id");
                    $(this).val(data.recruit[id]);
                    $("#" + id + '_DIV').removeClass('has-error');
                });

                $("#update_insert_recruit_frm textarea").each(function (e) {
                        var id = $(this).attr("id");
                        $(this).val(data.recruit[id]);
                });

                $("#update_insert_recruit_frm select").each(function (e) {
                    var id = $(this).attr("id");
                    $(this).val(data.recruit[id]);

                });

                $("#update_insert_recruit_frm img").each(function (e) {
                        var preview_id = $(this).attr("id");
                        var id = preview_id.substring(0 ,preview_id.length - '_PREVIEW'.length);
                        $("#" + preview_id).attr("src",data.recruit[id]);
                });

                $('#new').modal('show');
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


function csvSave() {
    $.ajax({
        type: "POST",
        url: "/admin/recruits/csvSave",
        data: {'action':'csv_save',
            'items': $csvConfirm.items},
        dataType: 'json',
        async: false,
        beforeSend: function () {
            disable_btn();
        },
        error: function (data, status, errThrown) {
            enable_btn();
        },
        success: function (data) {
            if (data.status == "success") {
                window.location.href = window.location.href;
            }else {
                enable_btn();
            }
        },
        statusCode: {
            404: function () {
                alert('page not found');
                enable_btn();
                // $("#loading_overlay").fadeOut(300);
            }
        }
    });
}

function updateURL(elt) {
    var id = $(elt).closest('tr').attr('id');
    var title =  $(elt).closest('tr').find('.title').text();
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "URL更新",
        message: title + "のURLを更新します。よろしいですか？",
        buttons: {
            confirm: {
                label: 'URL更新',
                className: 'btn-warning'
            },
            cancel: {
                label: 'キャンセル',
                className: 'btn-default pull-right'
            }
        },
        callback:  function(result) {
            if(result == true) {
                // call back ajax function
                $.ajax({
                    type: "post",
                    url: "/admin/recruits/updateURL",
                    data: {ID: id},
                    dataType: 'json',
                    // async: false,
                    beforeSend: function () {
                        // $("#loading_overlay").fadeIn(300);
                    },
                    error: function (data, status, errThrown) {
                        // $("#loading_overlay").fadeOut(300);
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            $(elt).closest('tr').find('.url').text(data.recruit.URL);
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

function updateListURL() {
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "求人情報URL一括更新",
        message: "チェックした求人情報のURLを一括更新します。よろしいですか？",
        buttons: {
            confirm: {
                label: 'URL一括更新',
                className: 'btn-warning'
            },
            cancel: {
                label: 'キャンセル',
                className: 'btn-default pull-right'
            }
        },
        callback:  function(result) {
            if(result == true) {
                // call back ajax function
                var formData = new FormData($('#main_form')[0]);
                $.ajax({
                    type: "POST",
                    url: "/admin/recruits/updateListURL",
                    data: formData,
                    // dataType: 'json',
                    processData: false,
                    contentType: false,
                    // async: true,
                    beforeSend: function () {
                        // $("#loading_overlay").fadeIn(300);
                    },
                    error: function (data, status, errThrown) {
                        // disable_btn();
                        // $("#loading_overlay").fadeOut(300);
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            $('#recruit_list tr').each(function(i, row){
                                var $row = $(row);
                                var trid = $row.attr('id');
                                for (var key in data.recruitList) {
                                    if (data.recruitList.hasOwnProperty(key)) {
                                        var recruit = data.recruitList[key];
                                        if(trid == recruit['ID']){
                                            $row.find('.url').text(recruit['URL']);
                                        }
                                    }
                                }
                            });
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





    // $("input[name$='action']" ).val('update_list_url');
    // $("#main_form").submit();
}

function disable_btn() {
    $('#show_preview').attr('disabled','disabled');
    $('#close_modal').attr('disabled','disabled');
    $('#save').attr('disabled','disabled');
    $('#update_csv_btn').attr('disabled','disabled');
    $('#import_csv').attr('disabled','disabled');
}

function enable_btn() {
    $('#show_preview').removeAttr('disabled');
    $('#close_modal').removeAttr('disabled');
    $('#save').removeAttr('disabled');
    $('#update_csv_btn').removeAttr('disabled');
    $('#import_csv').removeAttr('disabled');
}