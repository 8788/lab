$(function (){
	//·µ»Ø¶¥²¿
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){
			$(".back-to-top").fadeIn(1600);
		}else{
			$(".back-to-top").fadeOut(1600);
		}
	});

	$(".back-to-top a").click(function(){
		$('body,html').animate({scrollTop:0},1000);
	});
});