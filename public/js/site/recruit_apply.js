function cancelPreview(){
    //$("#loading_overlay").show();
    $("#recruit_apply_preview").fadeOut(300, function(){
        $("#recruit_apply_input").fadeIn(300, function(){
            goToByScroll("recruit_apply_input");
        });
    })
}

function showPreview(){
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
            // $("#loading_overlay").fadeIn(300);
        },
        error: function(data, status, errThrown){
            disable_btn();
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
                $("#NOTE_PREVIEW").html($("#NOTE").val().replace(/\n/g, '<br \\>'));

                $("#recruit_apply_input").fadeOut(300, function () {
                    $("#recruit_apply_preview").fadeIn(300, function () {
                        goToByScroll("recruit_apply_preview");
                    });
                });
            }else {
                goToByScroll("recruit_apply_input");
                for (var key in data.errors) {
                    $("#ERROR_" + key).html(data.errors[key]);
                    $( "#"+key).focus(function() {
                        var id = $(this).attr("id");
                        $("#ERROR_" + id).html('');
                    });
                }
            }
        },
        statusCode: {
            404: function() {
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    }).always(function() {
        enable_btn();
    });

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
            // $("#loading_overlay").fadeOut(300);
        },
        success: function(data){
            if(data.status == "success"){
                $("#recruit_apply_preview").fadeOut(300, function () {
                    $("#inquiry_thanks_preview").fadeIn(300, function () {
                        goToByScroll("inquiry_thanks_preview");
                    });
                });
            }else {
                $("#recruit_apply_preview").fadeOut(300, function(){
                    $("#recruit_apply_input").fadeIn(300, function(){
                        goToByScroll("recruit_apply_input");
                    });
                })

            }
        },

        statusCode: {
            404: function() {
                alert('page not found');
                // $("#loading_overlay").fadeOut(300);
            }
        }
    }).always(function() {
        enable_btn();
    });
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