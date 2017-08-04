//メニュー
$(function() {
  $(".menu-btn").click(function() {
    $("body").toggleClass("menu-open");
    $("nav").fadeToggle("fast");
    $("#content").fadeToggle("fast");
    $("footer").fadeToggle("fast");
    $("#menu a span").toggleClass("close");
    $("#menu a").toggleClass("close");
    return false;
  });
});



//スムーススクロール
$(function(){
	$('a[href^=#]').click(function(){
		var speed = 1200;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});



//レスポンシブ画像切り替え
$(function(){
	var $setElem = $('.switch'),
	pcName = '_pc',
	spName = '_sp',
	replaceWidth = 767;

	$setElem.each(function(){
		var $this = $(this);
		function imgSize(){
			var windowWidth = parseInt($(window).width());
			if(windowWidth >= replaceWidth) {
				$this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
			} else if(windowWidth < replaceWidth) {
				$this.attr('src',$this.attr('src').replace(pcName,spName)).css({visibility:'visible'});
			}
		}
		$(window).resize(function(){imgSize();});
		imgSize();
	});
});



//hover時のアクション
$(function()
{
	initRollovers();
	$(".imghover").hover(animateKesu,animateDasu); 
});


//    imghover    
function animateKesu(){
	    $(this).stop().fadeTo(400,0.5);
	    //スピード指定、透明度の指定
	    }
function animateDasu(){
	    $(this).stop().fadeTo(300,1.0);
	    //スピード指定、透明度の指定
	    }


//    Rollover    
//　Standards Compliant Rollover Script
//　Author : Daniel Nolan
//　http://www.bleedingego.co.uk/webdev.php
function initRollovers() {
	if (!document.getElementById) return
	
	var aPreLoad = new Array();
	var sTempSrc;
	var aImages = document.getElementsByTagName('img');

	for (var i = 0; i < aImages.length; i++) {		
		if (aImages[i].className == 'imgover') {
			var src = aImages[i].getAttribute('src');
			var ftype = src.substring(src.lastIndexOf('.'), src.length);
			var hsrc = src.replace(ftype, '_o'+ftype);

			aImages[i].setAttribute('hsrc', hsrc);
			
			aPreLoad[i] = new Image();
			aPreLoad[i].src = hsrc;
			
			aImages[i].onmouseover = function() {
				sTempSrc = this.getAttribute('src');
				this.setAttribute('src', this.getAttribute('hsrc'));
			}	
			
			aImages[i].onmouseout = function() {
				if (!sTempSrc) sTempSrc = this.getAttribute('src').replace('_o'+ftype, ftype);
				this.setAttribute('src', sTempSrc);
			}
		}
	}
}