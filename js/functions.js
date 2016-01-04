
//Carousel slider -->
$(document).ready(function() {
	$(".rslides").responsiveSlides();
	$.material.init();
	$('#Carousel').carousel({
		interval : 500000,
		pause : "hover"
	});
});


$(document).ready(function() {  
	$(".btn-group > .btn").click(function(){
		$(this).addClass("btn-primary").siblings().removeClass("btn-primary");
	});
	$(".dropdown-menu li a").click(function(){
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
		$(this).parents(".dropdown").find('.btn').val($(this).data('value'));

	});

	$.material.init();    

});


