$(function(){
  "use strict";
  $(document).on('change', 'input[name="checkAll"]', function(){
    if($(this).prop("checked")){
      $('.list-column input[name="check_list[]"]').prop("checked", true);
    } else {
      $('.list-column input[name="check_list[]"]').prop("checked", false);
    }
  });

  $('#update_insert_recruit_frm .recruit_photo').change(function(e){
      var preview_id = "#" + $(this).attr("name") + "_PREVIEW";
      readURL(this, preview_id);
  });
});