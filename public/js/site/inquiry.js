////////////////////////////////////////////////////      出品       ///////////////////////////////////////////

$(function(){
    $("input[name='CONTACT_METHOD[]']").change(function () {
        console.log('11111111111');
        ("#ERROR_SEX").html("");
    });
    // $("#recruit_apply_form input[name='SEX']").click(function(){
    //     console.log('11111111111');
    //     ("#ERROR_SEX").html("");
    // });


});

function cancelPreview(){
    //$("#loading_overlay").show();
    $("#recruit_apply_preview").fadeOut(300, function(){
        $("#recruit_apply_input").fadeIn(300, function(){
            goToByScroll("recruit_apply_input");
        });
    })
}

function showPreview(){
    clearForm();
    var formData = $('#recruit_apply_form').serialize();
    $.ajax({
        type: "POST",
        url: "/recruit_inquiry/confirm",
        data: formData,
        dataType: 'json',
        async: true,
        // contentType : false,
        // processData : false,
        beforeSend: function() {
            disable_btn();
            // $("#loading_overlay").fadeIn(300);
        },
        error: function(data, status, errThrown){
            enable_btn();
            // $("#loading_overlay").fadeOut(300);
        },
        success: function(data){
            if(data.status == "success"){
                $("input[type=text]").each(function (e) {
                        var val = $(this).val();
                        var id = $(this).attr("id");
                        var preview_id = id + "_PREVIEW";
                        $("#" + preview_id).html(val);
                });
                $("#SEX_PREVIEW").html( $("#recruit_apply_form input[type='radio']:checked").attr("data-name"));
                var contactMethod = '';
                $('#recruit_apply_form input[name="CONTACT_METHOD[]"]:checked').each(function(key) {
                    if(key==0){
                        contactMethod += $(this).attr("data-name");
                    }else {
                        contactMethod += "," + $(this).attr("data-name");
                    }
                });
                $("#CONTACT_METHOD_PREVIEW").html(contactMethod);
                $("#AGE_PREVIEW").html($("#AGE").val()+"歳");
                $("#NOTE_PREVIEW").html($("#NOTE").val().replace(/\n/g, '<br \\>'));
                $("#recruit_apply_input").fadeOut(300, function () {
                    $("#recruit_apply_preview").fadeIn(300, function () {
                        goToByScroll("recruit_apply_preview");
                        enable_btn();
                    });
                });
            }else {

                $('#inquiry_input_title').show();
                $('#inquiry_input_des').html('ご応募をご希望の方は、入力欄に必要事項をご記入の上、確認ボタンを押してください。送信後、担当者より折り返しご連絡させていただきます。');
                goToByScroll("recruit_apply_input");
                for (var key in data.errors) {
                    $("#ERROR_" + key).html(data.errors[key]);
                    $( "#"+key).focus(function() {
                        var id = $(this).attr("id");
                        $("#ERROR_" + id).html('');
                    });
                }
                enable_btn();
            }
        },
        statusCode: {
            404: function() {
                enable_btn();
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    })
}

function clearForm() {
    $("#recruit_apply_form input[type=text]").each(function (e) {
        var id = $(this).attr("id");
        $("#ERROR_"+id).html('');
    });
    $("#recruit_apply_form textarea").each(function (e) {
        var id = $(this).attr("id");
        $("#ERROR_"+id).html('');
    });
    $("#ERROR_SEX").html("");
    $("#ERROR_CONTACT_METHOD").html("");
}

function saveInquiry(){
    var formData = $('#recruit_apply_form').serialize();
    $.ajax({
        type: "POST",
        url: "/recruit_inquiry",
        data: formData,
        dataType: 'json',
        async: true,
        // contentType : false,
        // processData : false,
        beforeSend: function() {
            disable_btn();
            // $("#loading_overlay").fadeIn(300);
        },
        error: function(data, status, errThrown){
            enable_btn();
            // $("#loading_overlay").fadeOut(300);
        },
        success: function(data){
            if(data.status == "success"){
                $("#recruit_apply_preview").fadeOut(function () {
                    $("#inquiry_thanks_preview").fadeIn(function () {
                        goToByScroll("inquiry_thanks_preview");
                        enable_btn();
                    });
                });
            }else {
                $("#recruit_apply_preview").fadeOut(function(){
                    $("#recruit_apply_input").fadeIn(function(){
                        goToByScroll("recruit_apply_input");
                        $('#error').html(data.errors.message);
                        enable_btn();
                    });
                })
            }
        },

        statusCode: {
            404: function() {
                enable_btn();
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    })
}

function disable_btn() {
    $('#show_preview').attr('disabled','disabled');
    $('#cancel_preview').attr('disabled','disabled');
    $('#save_inquiry').attr('disabled','disabled');
}

function enable_btn() {
    $('#show_preview').removeAttr('disabled');
    $('#cancel_preview').removeAttr('disabled');
    $('#save_inquiry').removeAttr('disabled');
}