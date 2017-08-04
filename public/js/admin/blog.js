
var $vBlog = new Vue({
    el: '#edit',
    data: {
        'blog': {
            'blocks':[]
        }
    }
});


$(function () {
    //display list recruit as size 20, 50, 100
    $(".change_page_size").change(function () {
        var numberNow = $(this).val();
        location.href = "/admin/blog/" + numberNow;
    });

});


function add_btn() {
    // $('#frm_new #title_div').removeClass('has-error');
    clearForm();
    $('#edit').modal('show');
}

function addBlockForm() {
    var blocktype = $('#blog_type_edit').val();
    if(isEmpty($vBlog.blog.blocks)){
        $vBlog.blog = {
            'blocks': [{
                'type': blocktype,
                'content': '',
                'img': '',
                'content_2': '',
                'img_2': ''
            }]
        }
    }else {
        $vBlog.blog.blocks.push({
            'type': blocktype,
            'content':'',
            'img':'',
            'content_2':'',
            'img_2':''
        });
    }

}

function deleteForm(index) {
    $vBlog.blog.blocks.splice(index,1);
    // $(elt).closest('tr').remove();

}

function get_data_btn(id) {
    $('#edit_frm .title_div').removeClass('has-error');
    clearForm();

    $.ajax({
        type: "POST",
        url: "/admin/blog/getblog",
        data: {id: id},
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

                // $("#edit_frm input[type=text]").each(function (e) {
                //     var id = $(this).attr("id");
                //     $(this).val(data.blog[id]);
                //     $("#" + id + '_DIV').removeClass('has-error');
                // });

                // $("#edit_frm textarea").each(function (e) {
                //     var id = $(this).attr("id");
                //     $(this).val(data.blog[id]);
                // });

                // $("#edit_frm select").each(function (e) {
                //     var id = $(this).attr("id");
                //     $(this).val(data.blog[id]);
                //
                // });
                // $("#edit_frm img[name='contributor_img_preview']").attr("src",data.blog.contributor_img);

                $vBlog.blog = data.blog;

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

function saveBlog() {
    var formData = new FormData($('#edit_frm')[0]);
    $.ajax({
        type: "POST",
        url: "/admin/blog/saveBlog",
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
                // window.location.href = "/admin/blog";

                var id = data.blog.id;
                $('#blog_list tr').each(function(i, row){
                    var $row = $(row);
                    var trid = $row.attr('id');
                    if(id == trid){
                        $row.find('.title').text(data.blog.title);
                        $row.find('.name').text(data.blog.name);
                        $row.find('.contributor').text(data.blog.contributor);
                        $row.find('.is_public').text(data.blog.is_public);
                    }
                });
                $('#edit').modal('hide');
            } else {
                for (var key in data.errors) {
                    div = key + '_div';
                    $("." + div).addClass('has-error');
                    $("." + div + " p").html(data.errors[key]);
                    $( "."+key).focus(function() {
                        var id = $(this).attr("id");
                        $("." + id + '_DIV').removeClass('has-error');
                    });
                }
            }
            enable_btn();

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


function createHtml(blocktype) {
    var html = '';
    ++blockIndex;
    switch(blocktype) {
        case "1":
            html='<tr id="'+blockIndex+'">'
                +'<th>テキスト</th>'
                +'<td><input type="hidden" name="block['+blockIndex+'][type]" value="1" >  <div class="form-group"><textarea class="form-control" name="block['+blockIndex+'][content]" rows="5"></textarea></div></td>'
                +'<td></td>'
                +'<td><button type="button" class="btn btn-default" name="button" onclick="deleteForm(this)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></td>'
                +'</tr>';
            break;

        case "2":
            html='<tr id="'+blockIndex+'">'
                +'<th>画像右＋テキスト</th>'
                +'<td><input type="hidden" name="block['+blockIndex+'][type]" value="2" ><div class="form-group"><textarea class="form-control" name="block['+blockIndex+'][content]" rows="5"></textarea></div></td>'
                +'<td> <div class="form-group"> <input class="blog_photo" type="file" name="block['+blockIndex+'][img]" data-id = "img" onchange="uploadImg(this)"> </div>'
                +'<img class="image img" id="block['+blockIndex+'][img]" /></td>'
                +'<td><button type="button" class="btn btn-default" name="button" onclick="deleteForm(this)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></td>'
                +'</tr>';
            break;

        case "3":
            html='<tr id="'+blockIndex+'">'
                +'<th>画像左＋テキスト</th>'
                +'<td><input type="hidden" name="block['+blockIndex+'][type]" value="3"> <div class="form-group"> <input class="blog_photo" type="file" name="block['+blockIndex+'][img]" data-id = "img" onchange="uploadImg(this)"> </div>'
                +'<img class="image img" name="block['+blockIndex+'][img]" /> </td>'
                +'<td><div class="form-group"><textarea class="form-control" name="block['+blockIndex+'][content]" rows="5"></textarea></div></td>'
                +'<td><button type="button" class="btn btn-default" name="button" onclick="deleteForm(this)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></td>'
                +'</tr>';
            break;

        case "4":
            html='<tr id="'+blockIndex+'">'
                +'<th>画像1枚中央＋テキスト</th>'
                +'<td><input type="hidden" name="block['+blockIndex+'][type]" value="4" > <div class="form-group"> <input class="blog_photo" type="file" name="block['+blockIndex+'][img]" data-id = "img" onchange="uploadImg(this)"> </div>'
                +'<img class="image image-center img" />'
                +'<div class="form-group"><textarea class="form-control" name="block['+blockIndex+'][content]" rows="5"></textarea></div></td>'
                +'<td></td>'
                +'<td><button type="button" class="btn btn-default" name="button" onclick="deleteForm(this)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></td>'
                +'</tr>';
            break;

        case "5":
            html='<tr id="'+blockIndex+'">'
                +'<th>画像2枚＋テキスト</th>'
                +'<td><input type="hidden" name="block['+blockIndex+'][type]" value="5" > <div class="form-group"><input class="blog_photo" type="file" name="block['+blockIndex+'][img]" data-id = "img" onchange="uploadImg(this)"></div> <img class="image image-center img" >'
                +'<div class="form-group"> <textarea class="form-control" name="block['+blockIndex+'][content]" rows="5"></textarea> </div> </td>'
                +'<td><div class="form-group"><input class="blog_photo" type="file" name="block['+blockIndex+'][img_2]" data-id = "img_2" onchange="uploadImg(this)"></div>'
                +'<img class="image image-center img_2" >'
                +'<div class="form-group"> <textarea class="form-control" name="block['+blockIndex+'][content_2]" rows="5"></textarea> </div> </td>'
                +'<td><button type="button" class="btn btn-default" name="button" onclick="deleteForm(this)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></td>'
                +'</tr>';
            break;

        default:
    }
    return html;
    
}

function uploadImg(obj) {
    var row = $(obj).closest('tr');
    var img =row.find('.'+$(obj).data("id"));
    var fileUploadPath = obj.value;
    if (fileUploadPath == '') {
        $(obj).val('');
        img.attr('src', '');
    } else {
        var extension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
            if (obj.files && obj.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    img.attr('src', e.target.result);
                };
                reader.readAsDataURL(obj.files[0]);
            }

        }else {
            $(obj).val('');
            img.attr('src', '');
        }
    }

}

function addblog() {
    var formData = new FormData($('#frm_new')[0]);
    $.ajax({
        type: "POST",
        url: "/admin/blog/addblog",
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
                $('#new').modal('hide');
                window.location.href = "/admin/blog";
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

function coppyBlog(id){
    $.ajax({
        type: "POST",
        url: "/admin/blog/coppyblog",
        data: {id: id},
        dataType: 'json',
        // async: false,
        beforeSend: function () {
            // $("#loading_overlay").fadeIn(300);
        },
        error: function (data, status, errThrown) {
            // $("#loading_overlay").fadeOut(300);
        },
        success: function (data) {
            // if (data.status == "success") {
                window.location.href = window.location.href;
            // }
        },
        statusCode: {
            404: function () {
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    });
}

function deleteBlog(elt) {
    var id = $(elt).closest('tr').attr('id');
    var title =  $(elt).closest('tr').find('.title').text();
    bootbox.setDefaults({locale:"ja"});
    bootbox.confirm( {
        title: "求人削除",
        message: title + "の求人を削除します。よろしいですか",
        buttons: {
            confirm: {
                label: '削除',
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
                $.ajax({
                    type: "post",
                    url: "/admin/blog/deleteblog",
                    data: {id: id},
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

function clearForm() {
    $vBlog.blog='';

    // $("#frm_new input[type=text]").each(function (e) {
    //     var id = $(this).attr("id");
    //     $("#"+id + '_error').html('');
    //     $("#" + id + '_div').removeClass('has-error');
    // });
}



function disable_btn() {
    $('#edit_blog').attr('disabled','disabled');
    $('#save').attr('disabled','disabled');
}

function enable_btn() {
    $('#edit_blog').removeAttr('disabled');
    $('#save').removeAttr('disabled');
}
