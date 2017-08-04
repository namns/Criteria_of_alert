

function deletecategory(elt) {
    var id = $(elt).closest('tr').attr('id');
    var name =  $(elt).closest('tr').find('.name').text();
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "カテゴリ削除",
        message: name + " のカテゴリを削除します。よろしいですか？",
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
                    url: "/admin/category/deleteCategory",
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
function addcategory(sumcategory){
    clearForm();
    $('#formTitle').html('カテゴリ新規登録');
    $('#category_frm input[name=categoryName]').val('');
    $('#category_frm input[name=categorySort]').val('');
    if (sumcategory<30){
        $("div#all30").hide();
    }
    else {
        $("#remove").hide();
        $("#save").hide();
        $("div#all30").show();
    }
    $('#edit').modal('show');
}

function savecategory() {
    var categoryId = $("#category_frm input[name=categoryId]").val();
    console.log(categoryId);
    var formData = new FormData($('#category_frm')[0]);
    clearForm();
    $.ajax({
        type: "POST",
        url: "/admin/category/edit",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        async: false,
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
                window.location.href = window.location.href;
                // $('#edit').modal('hide');
                // if (isEmpty(categoryId)) {//add new recruit
                //     window.location.href = window.location.href;
                // }
                // else { //edit
                //     var id = data.category.ID;
                //
                //     $('#category_list tr').each(function (i, row) {
                //         var $row = $(row);
                //         var trid = $row.attr('id');
                //         if (id == trid) {
                //             $row.find('.categorySort').text(data.category.INDEX_DISPLAY);
                //             $row.find('.name').text(data.category.NAME);
                //         }
                //     });
                //     enable_btn();
                // }
            } else {
                for (var key in data.errors) {
                    div = key + '_div';
                    $("#" + div).addClass('has-error');
                    $("#" + div + " p").html(data.errors[key]);
                    $("#" + key).focus(function () {
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

function getCategory(id) {
    clearForm();
    $('#formTitle').html('カテゴリ編集');
    $("#remove").show();
    $("#save").show();
    $("#all30").hide();
    $.ajax({
        type: "POST",
        url: "/admin/category/getcategory",
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
                $('#div_category').removeClass('has-error');
                $('#div_name').removeClass('has-error');
                $('#category_frm')[0].reset();
                $('#categoryId').val(data.category.ID);
                $('#category_frm input[name=categorySort]').val(data.category.INDEX_DISPLAY);
                $('#category_frm input[name=categoryName]').val(data.category.NAME);

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

function clearForm() {

    $("#category_frm input[type=text]").each(function (e) {
        var id = $(this).attr("id");
        $("#"+id + '_error').html('');
        $("#" + id + '_div').removeClass('has-error');
    });

}

function disable_btn() {
    $('#close_modal').attr('disabled','disabled');
    $('#save').attr('disabled','disabled');
}

function enable_btn() {
    $('#close_modal').removeAttr('disabled');
    $('#save').removeAttr('disabled');
}