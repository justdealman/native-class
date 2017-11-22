function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:999px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('.tech__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		fade: true,
		cssEase: 'ease',
		speed: 500
	});
	$('.tech__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var pic = $(this).parents('.tech__content').find('.tech__pic .item');
		pic.eq(nextSlide).addClass('is-active').siblings().removeClass('is-active');
		var nav = $(this).parents('.tech__content').find('.tech__nav li');
		nav.eq(nextSlide).addClass('is-active').siblings().removeClass('is-active');
	});
	$('.tech__nav li a').on('click', function(e) {
		e.preventDefault();
		$('.tech__slider').slick('slickGoTo',$(this).attr('href'));
	});
	$('.teachers__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500
	});
	
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {

			} else {

			}
		}
		setRatio();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 30;
		} else {
			var diff = 20;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	$('.navigator ul li').on('click', function(e) {
		e.preventDefault();
		var t = $('[data-id="'+$(this).attr('data')+'"]');
		$('html, body').stop().animate({
			scrollTop: t.offset().top
		}, 500);
		//$(this).addClass('is-active').siblings().removeClass('is-active');
	});
	$(document).on('scroll', function() {
		$('.navigator ul li').removeClass('is-active');
		$('[data-id]').each(function() {
			if ( $(document).scrollTop() >= $(this).offset().top-$(window).height()/2 ) {
				$('.navigator ul li[data="'+$(this).attr('data-id')+'"]').addClass('is-active').siblings().removeClass('is-active');
			}
		});
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});