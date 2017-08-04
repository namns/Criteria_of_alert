$(function(){
    $('#new .blog_photo').change(function(e){
        var preview_id = "#" + $(this).attr("name") + "_preview";
        var fileUploadPath = this.value;
        if (fileUploadPath == '') {
            $(this).val('');
            $(preview_id).attr('src', '');
        } else {
            var extension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
                readURL(this, preview_id);
            }else {
                $(this).val('');
                $(preview_id).attr('src', '');
            }
        }
    });

    $('#edit .blog_photo').change(function(e){
        var preview_id = "." + $(this).attr("name") + "_preview";
        var fileUploadPath = this.value;
        if (fileUploadPath == '') {
            $(this).val('');
            $(preview_id).attr('src', '');
        } else {
            var extension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
                readURL(this, preview_id);
            }else {
                $(this).val('');
                $(preview_id).attr('src', '');
            }
        }
    });

});