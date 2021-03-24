//初始化字体大小
size();
window.addEventListener('resize', size);

function size() {
	var docElement = document.documentElement;
	var winW = docElement.clientWidth || document.body.clientWidth;
	docElement.style.fontSize = winW / 10 + "px";
}

var splashSwiper = new Swiper('.splash-box', {
	autoplayDisableOnInteraction: true,
	pagination: '.swiper-pagination'
});

function splashAnimation() {
	$('.splash').animate({
		width: 0,
	}, 1000);
	location.hash = "#/home";
}


$('.skip').click(function() {
	splashAnimation();
})
$('.begin').click(function() {
	splashAnimation();
})


$(".btn-expend-nav").click(function(e){
    $(".nav-menu").toggle();
	$(".user-menu").hide();
    e.stopPropagation();
});

$(".btn-userico").click(function(e){
    $(".user-menu").toggle();
	$(".nav-menu").hide();
    e.stopPropagation();
});

$(document).click(function(){
    $(".nav-menu").hide();
    $(".user-menu").hide();
});


