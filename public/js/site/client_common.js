var clientCommon = new function() {
    var _self = this;


};

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function isEmpty(value){
    return (value == null || value.length === 0);
}

function openTab(url) {
    // Create link in memory
    var a = window.document.createElement("a");
    a.target = 'recruit';
    a.href = url;

    // Dispatch fake click
    var e = window.document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}

function readURL(input, display_id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(display_id).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


function get_params_from_href(href){
    var paramstr = href.split('?')[1];        // get what's after '?' in the href
    var paramsarr = paramstr.split('&');      // get all key-value items
    var params = Array();
    for (var i = 0; i < paramsarr.length; i++) {
        var tmparr = paramsarr[i].split('='); // split key from value
        params[tmparr[0]] = tmparr[1];        // sort them in a arr[key] = value way
    }
    return params;
}

function isEmail(email) {
    // add support to + sign (Nghi: 17/1/2016) START
    var regex = /^([\w-+]+(?:\.[\w-+]+)*)@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    // add support to + sign (Nghi: 17/1/2016) END
    if (regex.test(email)){
        return true;
    }
    return false;
}


function checkAlphabet(sentences) {
	var regex = /^[A-Za-z0-9]+$/i;
	if (!regex.test(sentences)){
        return false;
    }
	return true;
}

function ValidateTypeImg() {
    var fuData = document.getElementById('fileChooser');
    var FileUploadPath = fuData.value;

    //To check if user upload any file
    if (FileUploadPath == '') {
        return "Please upload an image";

    } else {
        var Extension = FileUploadPath.substring(
            FileUploadPath.lastIndexOf('.') + 1).toLowerCase();

        //The file uploaded is an image

        if (Extension == "gif" || Extension == "png" || Extension == "bmp"
            || Extension == "jpeg" || Extension == "jpg") {

            // To Display
            if (fuData.files && fuData.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#blah').attr('src', e.target.result);
                };

                reader.readAsDataURL(fuData.files[0]);
            }

        }

        //The file upload is NOT an image
        else {
            alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");

        }
    }
}

/**
 * Toggle header (search, favorite artist, high five)
 */ 
function isActived(obj) {
	if(obj.hasClass('active')) {
		return true;
	}
	return false;
}

function toggleHeader(obj) {	
	$('li a', obj.closest('ul')).removeClass('active');
	obj.addClass('active');
}

function formatNumber(num) {
    num += '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(num)) {
        num = num.replace(rgx, '$1' + ',' + '$2');
    }
    return num;
}

function goToByScroll(id){
    // Reove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({scrollTop: $("#"+id).offset().top}, 'slow');
}

