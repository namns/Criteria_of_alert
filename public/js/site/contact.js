////////////////////////////////////////////////////      出品       /////////////////////////////////////////////

function cancelPreview(){
    //$("#loading_overlay").show();
    $("#contact_input_preview").fadeOut(300, function(){
        $("#contact_input").fadeIn(300, function(){
            goToByScroll("contact_input");
        });
    })
}

function showPreview(){
    var formData = $('#contact_form').serialize();
    $.ajax({
        type: "POST",
        url: "/contact/confirm",
        data: formData,
        dataType: 'json',
        async: false,
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
                $("#CONTENT_PREVIEW").html($("#CONTENT").val().replace(/\n/g, '<br \\>'));
                $("#contact_input").fadeOut(300, function () {
                    $("#contact_input_preview").fadeIn(300, function () {
                        goToByScroll("contact_input_preview");
                        enable_btn();
                    });
                });
            }else {

                $('#contact_input_title').html("お問い合わせは、電話・FAX・メール・お問い合わせフォーム、ご都合の良い方法でご連絡ください。");
                $('#contact_input_header').html("入力欄に必要事項をご記入の上、確認ボタンを押してください。送信後、担当者より折り返しご連絡させていただきます。");
                goToByScroll("contact_input");
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
    });
}

function saveContact(){

    var formData = $('#contact_form').serialize();
    $.ajax({
        type: "POST",
        url: "/contact",
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
                $("#contact_input_preview").fadeOut(300, function () {
                    $("#thanks_preview").fadeIn(300, function () {
                        goToByScroll("thanks_preview");
                        enable_btn();
                    });
                });
            }else {
                $('#contact_input_title').html("お問い合わせは、電話・FAX・メール・お問い合わせフォーム、ご都合の良い方法でご連絡ください。");
                $('#contact_input_header').html("入力欄に必要事項をご記入の上、確認ボタンを押してください。送信後、担当者より折り返しご連絡させていただきます。");
                $("#contact_input_preview").fadeOut(300, function(){
                    $("#contact_input").fadeIn(300, function(){
                        goToByScroll("contact_input");
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
    });
}

function disable_btn() {
    $('#show_preview').attr('disabled','disabled');
    $('#cancel_preview').attr('disabled','disabled');
    $('#save').attr('disabled','disabled');
}

function enable_btn() {
    $('#show_preview').removeAttr('disabled');
    $('#cancel_preview').removeAttr('disabled');
    $('#save').removeAttr('disabled');
}