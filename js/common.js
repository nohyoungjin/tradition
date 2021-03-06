$(function() {

	// init

	$.fn.device()
	$.fn.gnbSize()

	navi()
	sticky()

	smallNav()

	mainVisualSlider()
	colPhoto()
	gFamily()

	scrollFlag()

	compHistory()
	bodPopup()
	fileAttach()

	// on load

    $(window).load(function() {

		$('body').addClass('load')

	})

	// window resize function

	$(window).resize(function() {

		$.fn.device()
		$.fn.gnbSize()

	})

	// gnb pc

	function navi() {

		$('#gnb').on('mouseenter', '> .box > ul > li', function() {
			if ($('body').data('device') != 'mobile') {
				$(this).parents('.h_group').stop().animate({ 'height': '230px' }, 300)
				$('#gnb .sub_menu').show()
			}
		})

		$('.h_group').on('mouseleave', function() {
			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '59px' }, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide()
				})
			}
		})

		// gnb keyboard accessibility
		
		$('#gnb').on('focusin', '> .box > ul > li > a', function() {
			if ($('body').data('device') != 'mobile') {
				if ($('.h_group').hasClass('on') == false) {
					$(this).parents('.h_group').stop().animate({ 'height': '230px' }, 300)
					$('#gnb .sub_menu').show()
				}
			}
		})

		$(document).on('focus', '.h_group h1 a, .lnb-nav li a, .slick-prev', function() {
			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '59px' }, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide()
				})
			}
		})

	}
	
	// sticky

	function sticky() {

		var fixedOffset = $('.h_group').offset()

		$(window).on('scroll', $.throttle(1000 / 15, function() {
			if ($(document).scrollTop() > fixedOffset.top) {
				$('.h_group').addClass('sticky')
			} else {
				$('.h_group').removeClass('sticky')
			}
		}))

	}

	// gnb mobile

	function smallNav() {

		$('.btn_menu').on('click', function() {

			var overflowChk = $('body').css('overflow')
			var deviceHeight = $(window).height()

			$('body').css('overflow-y', 'hidden')

			/* if (overflowChk == 'hidden') {
				$('body').css({
					'overflow': 'visible',
					'height': 'auto'
				})
			} else {
				$('body').css({
					'overflow': 'hidden',
					'height': deviceHeight
				})
			} */

			$('#gnb > .box').css('display', 'block')
			$(this).next().stop().animate({ 'right': '0%' }, 300)
			$('#gnb > .dim').fadeIn()
			$('.logo').css('z-index', '10')

		})

		$('#gnb > .box').on('click', '> ul > li > a', function() {

			if ($('body').data('device') == 'mobile') {

				$('#gnb > .box > ul > li > .sub_menu > ul').filter(':not(:animated)').slideUp('fast')
				$(this).parent().find('> .sub_menu > ul').filter(':not(:animated)').slideToggle()
				
				if ($(this).parent().hasClass('current')) {
					$(this).parent().removeClass('current')
					return
				}

				$('#gnb > .box > ul > li').removeClass('current')
				$(this).parent().toggleClass('current')

			}

		})

		$('#gnb').on('click', '> .dim, > .box > .btn_close', function() {

			$('body').css('overflow','visible')
			$('#gnb > .dim').hide()

			$('#gnb > .box').stop().animate({ 'right': '-80%' }, 300, function() { 
				$('#gnb > .box').css('display', 'none')
			})

			$('#gnb .btn_menu').focus()
			$('.logo').css('z-index', '100')

		})

	}

	// main visual slider

	function mainVisualSlider() {

		if (!$('body').hasClass('home')) { return }
	
		$('.visual').slick({
			accessibility: false,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			dots: true,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1
		})

		// visual pause, play (pc)

		$('.visual_btn .btn_play').on('click', function() {

			var $pauseBtn = $(this)

			if ($pauseBtn.hasClass('on')) {
				$('.visual.web').slick('slickPlay')
				$(this).text('??????')
				$pauseBtn.removeClass('on')
			} else {
				$('.visual.web').slick('slickPause')
				$(this).text('??????')
				$pauseBtn.addClass('on')
			}

		})

		// dots ????????? ?????? visual pause, play ????????????

		var dotsLi = $('.visual.web .slick-dots li').length
		var dotsLiSum = 20 * dotsLi

		$('.visual_btn.web').css('margin-left', dotsLiSum)

		// visual pause, play (mobile)

		$('.visual_btn_mo .btn_play').on('click', function() {

			var $pauseBtn = $(this)

			if ($pauseBtn.hasClass('on')) {
				$('.visual.mobile').slick('slickPlay')
				$(this).text('??????')
				$pauseBtn.removeClass('on')
			} else {
				$('.visual.mobile').slick('slickPause')
				$(this).text('??????')
				$pauseBtn.addClass('on')
			}

		})

		// 
	
		var dotsMoLi = $('.visual.mobile .slick-dots li').length
		var dotsMoLiSum = 20 * dotsMoLi

		$('.visual_btn_mo.mobile').css('margin-left', dotsMoLiSum)

	}

	// ??????????????? (main)

	function colPhoto() {

		if (!$('body').hasClass('home')) { return }
	
		$('.col_photo .item_total').slick({
			arrows: true,
			dots: false,
			autoplay: true,
			autoplaySpeed: 5000
		})

	}

	// ????????? (main)

	function gFamily() {

		if (!$('body').hasClass('home')) { return }

		$('.g_family').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 4,
					infinite: true
				  }
				},
				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 2
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 1
				  }
				}
			]
		})

	}
	
	// top floating

	function scrollFlag() {

		var btnTopFlag = false

		$(window).scroll( function() {

			if ($(window).scrollTop() > 100) {

				if (!btnTopFlag) {
					$('.btn_top').stop(true).fadeIn(300)
				}

				btnTopFlag = true
				
			} else {

				if (btnTopFlag) {
					$('.btn_top').stop(true).fadeOut(300)
				}
				
				btnTopFlag = false
			}

		})

	}

	// history

	function compHistory() {

		// ?????? (?????? ?????? ????????? ???????????? ?????? ????????? ?????????)

		var heights = $('.history_line .right').not('.history_line .right:last-child').map(function() {
			return $(this).height()
		}).get(),

		maxHeight = Math.max.apply(null, heights)
		maxHeight = maxHeight / 3.8

		// $('.history_line dl').css('padding-bottom', maxHeight)

		// ?????? (?????? ?????? ????????? ??????)

		var right_height = $('.history_line .right:last-child ul').height() + 320
		
		$('.history_area').css('padding-bottom', right_height)

	}

	// bod popup

	function bodPopup() {

		$('#updBtn').on('click', function() {
			$('.bod_pop1').css('display', 'block')
		})

		$('#delBtn').on('click', function() {
			$('.bod_pop2').css('display', 'block')
		})

		$('.bod_pop2 .OKBtn').on('click', function() {
			$('.bod_pop2').css('display', 'none')
			$('.del_pop').css('display', 'block')
		})

		$('.del_pop .OKBtn').on('click', function() {
			$('.del_pop').css('display', 'none')
			$('.alt_pop').css('display', 'block')
		})

		$('.alt_pop .OKBtn').on('click', function() {
			$('.alt_pop').css('display', 'none')
		})

		$('.XBtn').on('click', function() {
			$('.bod_pop1, .bod_pop2, .del_pop, .alt_pop').css('display', 'none')
		})

	}

    // file attach

	function fileAttach() {

		$('input#att1').change(function() {
			$('#file1_name').val($(this).val())
		})

	}

})


// device chk

$.fn.device = function() {

	var size = $(window).width() + 17 // ???????????? width ??????
		
	if (size <= 1200) {
		$('body').data('device', 'mobile')
	/* } else if(size > 1024 && size < 1280) {
		$('body').data('device', 'tablet') */
	} else {
		$('body').data('device', 'pc')
	}

}

// gnb setting

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width()
	var deviceHeight = $(window).height()
	
	if ($('body').data('device') == 'mobile') {

		// $('body').css('overflow', 'visible')
		$('#gnb > .box').css({
			'height'     : (deviceHeight + 50),
			'background' : '#fff'
		})

		$('#gnb .sub_menu').show()
		$('#gnb .sub_menu ul').hide()

		if ($('#gnb > .dim').length == 0) {
			$('#gnb').append("<div class='dim' style='display:none;position:absolute;top:0px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + (deviceHeight + 50) + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>")
		}

	} else {

		// $('body').css('overflow', 'visible')
		$('#gnb > div.box').css({
			'display'    : 'block',
			'height'     : 'auto',
			'background' : 'none'
		})

		$('#gnb > div.box').css('right', '-80%')
		$('#gnb > div.box > ul > li').removeClass('current')
		$('#gnb .sub_menu').hide()
		$('#gnb .sub_menu ul').show()
		$('#gnb .sub_menu > div > ul').show()
		$('#gnb > .dim').remove()

	}

}

// scroll top 

function scrollTopStart() {

	 $('html,body').stop().animate({ scrollTop: 0 }, 600)

}