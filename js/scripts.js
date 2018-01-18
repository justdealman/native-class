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
		speed: 500,
		adaptiveHeight: true
	});
	$('.camps__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: false,
		fade: false,
		cssEase: 'ease',
		speed: 500,
		draggable: false,
		swipe: false
	});
	$('.teachers-md__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		cssEase: 'ease',
		speed: 500
	});
	function setCampsBg() {
		var rbgWidth = $(window).width()-$('.camps__slider .slick-current .camps__group:nth-child(2n+1) .camps__about').offset().left;
		$('.camps__group:nth-child(2n+1) .camps__group--bg').width(rbgWidth);
		var lbgWidth = $('.camps__slider .slick-current .camps__group:nth-child(2n) .camps__sections').offset().left;
		$('.camps__group:nth-child(2n) .camps__group--bg').width(lbgWidth);
	}
	function setCampNavArrow() {
		var t = $('.camps-nav li.is-active');
		var posLeft = t.position().left+t.outerWidth()/2;
		var elem = $('.camps-nav--arrow');
		elem.css({
			left: posLeft
		});
		if ( !elem.hasClass('is-visible') ) {
			elem.addClass('is-visible');
		}
		if ( !elem.hasClass('is-animated') ) {
			setTimeout(function() {
				elem.addClass('is-animated');
			}, 500);
		}
	}
	$('.camps-nav a').on('click', function(e) {
		e.preventDefault();
		$('.camps__slider').slick('slickGoTo',$(this).attr('href')-1);
		$(this).parent().addClass('is-active').siblings('li').removeClass('is-active');
		setCampNavArrow();
	});
	$('.navigator ul li').on('click', function(e) {
		if ( $('.camps').length ) {
			e.preventDefault();
			var t = $(this).attr('data');
			$('html, body').stop().animate({
				scrollTop: $('.camps').offset().top
			}, 500);
			$('.camps-nav a[href="'+t+'"]').trigger('click');
			$(this).addClass('is-active').siblings().removeClass('is-active');
		}
	});
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {

			} else {

			}
		}
		setRatio();
		if ( $('.camps').length ) {
			setCampsBg();
			setCampNavArrow();
		}
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
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('input[type="checkbox"]').uniform();
	$(document).on('click', '.agreement-drop', function(e) {
		e.preventDefault();
		var t = $(this).parents('.modal').find('.agreement-info');
		t.stop().slideToggle(200);
	});
	$('[data-tab-link]').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('[data-tabs]').find('[data-tab-item="'+$(this).attr('href')+'"]');
		if ( !t.hasClass('is-opened') ) {
			t.addClass('is-opened').siblings('[data-tab-item]').removeClass('is-opened');
			$(this).parent().addClass('is-active').siblings().removeClass('is-active');
		}
	});
});
$(function() {
	var baseDelay = 250;
	var delay = 75;
	var showTimer = [];
	var hideTimer = [];
	function setBg(e,t) {
		e.find('.bg').width(t);
	}
	function showItems(i,t) {
		showTimer.push(
			setTimeout(function() {
				t.find('li[data="'+i+'"] span').addClass('is-visible');
			}, baseDelay+delay*i)
		);
	}
	function stopShow() {
		showTimer.forEach(function(timer) {
            clearTimeout(timer);
        });
	}
	function hideItems(i,t) {
		hideTimer.push(
			setTimeout(function() {
				t.find('li[data="'+i+'"] span').removeClass('is-visible');
			}, delay*i)
		);
	}
	function stopHide() {
		hideTimer.forEach(function(timer) {
            clearTimeout(timer);
        });
	}
	var bgDelay;
	$('.navigator').on('mouseenter', function() {
		stopHide();
		var t = $(this);
		var size = t.find('li').size();
		clearTimeout(bgDelay);
		setBg(t,t.width());
		for ( var i=1; i<=size; i++ ) {
			showItems(i,t)
		}
	});
	$('.navigator').on('mouseleave', function() {
		stopShow();
		var t = $(this);
		var size = t.find('li').size();
		for ( var i=size; i>=1; i-- ) {
			hideItems(i,t)
		}
		bgDelay = setTimeout(function() {
			setBg(t,0);
		}, delay+delay*size);
	});
	$('.navigator ul li').on('click', function(e) {
		if ( !$('.camps').length ) {
			e.preventDefault();
			var t = $('[data-id="'+$(this).attr('data')+'"]');
			$('html, body').stop().animate({
				scrollTop: t.offset().top
			}, 500);
		}
	});
	$(document).on('scroll', function() {
		if ( !$('.camps').length ) {
			$('.navigator ul li').removeClass('is-active');
			$('[data-id]').each(function() {
				if ( $(document).scrollTop() >= $(this).offset().top-$(window).height()/2 ) {
					$('.navigator ul li[data="'+$(this).attr('data-id')+'"]').addClass('is-active').siblings().removeClass('is-active');
				}
			});
		}
	});
});