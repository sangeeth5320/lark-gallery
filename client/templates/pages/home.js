Template.home.rendered = function(){
	$(".owl-carousel").owlCarousel({
		items:1,
        loop:true,
        autoplay:true,
        autoHeight: false,
        autoHeightClass: 'owl-height',
        dots:false,
        nav:true
	});
}