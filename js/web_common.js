$(function() {

	/* GNB */

	$.fn.device();
	$.fn.gnbSize();

	/* 연혁 탭메뉴 (모바일) */

	var tabH = 1;

	if($(window).width() <= 767) {
		tabH = 1;
		$.fn.historyTab();
	} else {
		tabH = 0;
		$.fn.historyReset();
	}

	// WINDOW RESIZE FUNCTION

	$(window).resize(function() {

		$.fn.device();
		$.fn.gnbSize();

		if($(this).width() <= 767) {
			if(tabH == 1) {
			
			} else {
				tabH = 1;
				$.fn.historyTab(); // 연혁 탭메뉴 (모바일) 한번만 실행
			}
		} else {
			if(tabH == 0) {
			
			} else {
				tabH = 0;
				$.fn.historyReset();
			};
		}

	});

	// TOP 플로팅

	var btnTopFlag = false;

	$(window).scroll( function() {

		if($(window).scrollTop() > 100) {

			if(!btnTopFlag) {
				$('#btn-top').stop(true).fadeIn(300);
			}
			btnTopFlag = true;
			
		} else {

			if(btnTopFlag) {
				$('#btn-top').stop(true).fadeOut(300);
			}			
			btnTopFlag = false;
		}

	});

	// 상단메뉴 고정

	var fixed_offset = $('.h_group').offset();

	$(window).on('scroll', $.throttle(1000 / 15, function() {
		if ( $(document).scrollTop() > fixed_offset.top ) {
			$('.h_group').addClass('sticky'); 
		} else {
			$('.h_group').removeClass('sticky');
		}
	}));

	// GNB PC

	$("#gnb").on("mouseenter", "> .box > ul > li", function() {
		if($("body").data("device") != "mobile") {
			$(this).parents(".h_group").stop().animate({"height":"260px"}, 300);
			$("#gnb .sub_menu").show();
		}
	});

	$(".h_group").on("mouseleave", function() {
		if($("body").data("device") != "mobile") {
			$("#gnb > .box > ul > li").css("height","auto");
			$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"58px"}, 300, function() {
				$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();
			});
		}
	});

	// GNB 키보드 접근
	
	$("#gnb").on("focusin", "> .box > ul > li > a", function() {
		if($("body").data("device") != "mobile") {
			if($(".h_group").hasClass("on") == false) {
				$(this).parents(".h_group").stop().animate({"height":"260px"}, 300);
				$("#gnb .sub_menu").show();
			}
		}
	}); 

	$(document).on('focus', '.h_group h1 a, .lnb-nav li a, .slick-prev', function() {
		if($("body").data("device") != "mobile") {
			$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"58px"}, 300, function() {
				$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();
			});
		}
	});
	
	// GNB MOBILE

	$(".btn_menu").on("click", function() {
		var overflowChk = $("body").css("overflow");
		var deviceHeight = $(window).height();

		if(overflowChk == "hidden") {
			$("body").css({
				"overflow":"visible",
				"height":"auto"
			});
		} else {
			$("body").css({
				"overflow":"hidden",
				"height":deviceHeight
			});
		}

		$("#gnb > .box").css("display","block");
		$(this).next().stop().animate({"right":"0%"}, 300);
		$("#gnb > .dim").fadeIn();
		$(".logo").css("z-index","10");
	});

	$("#gnb > .box").on("click", "> ul > li > a", function() {
		if($("body").data("device") == "mobile") {
			$("#gnb > .box > ul > li > .sub_menu > .inner > ul").filter(":not(:animated)").slideUp("fast");
			$(this).parent().find("> .sub_menu > .inner > ul").filter(":not(:animated)").slideToggle();
			if( $(this).parent().hasClass("current") ){
				$(this).parent().removeClass("current");
				return;
			}
			$("#gnb > .box > ul > li").removeClass("current");
			$(this).parent().toggleClass("current");
		}
	});

	$("#gnb").on("click", "> .dim, > .box > .btn_close", function() {
		$("body").css("overflow","visible");
		$("#gnb > .dim").hide();
		$("#gnb > .box").stop().animate({"right":"-80%"}, 300, function() { 
			$("#gnb > .box").css("display","none");
		});
		$("#gnb .btn_menu").focus();
		$(".logo").css("z-index","100");
	});

	if( $('body').hasClass('page') ) 
	{

		// 메인 비주얼

		$('.visual').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: 5000
		});

		// visual pause, play

		$('.visual_btn .btn_play').on('click', function() {
			var $pauseBtn = $(this);
			if($pauseBtn.hasClass('on')) {
				$(".visual.web").slick('slickPlay');
				$(this).text("정지");
				$pauseBtn.removeClass('on');
			} else {
				$(".visual.web").slick('slickPause');
				$(this).text("재생");
				$pauseBtn.addClass('on');
			}
		});

		// dots 갯수에 따른 visual pause, play 위치조정 (웹)

		var dots_li = $('.visual.web .slick-dots li').length;
			dots_li_sum = 20 * dots_li;

		$('.visual_btn.web').css("margin-left", dots_li_sum);

		// visual pause, play

		$('.visual_btn_mo .btn_play').on('click', function() {
			var $pauseBtn = $(this);
			if($pauseBtn.hasClass('on')) {
				$(".visual.mobile").slick('slickPlay');
				$(this).text("정지");
				$pauseBtn.removeClass('on');
			} else {
				$(".visual.mobile").slick('slickPause');
				$(this).text("재생");
				$pauseBtn.addClass('on');
			}
		});

		// (모바일)
	
		var dots_mo_li = $('.visual.mobile .slick-dots li').length;
			dots_mo_li_sum = 20 * dots_mo_li;

		$('.visual_btn_mo.mobile').css("margin-left", dots_mo_li_sum);

		// 공연사진

		$('.item_total').slick({
			arrows: true,
			dots: false,
			autoplay: true,
			autoplaySpeed: 5000
		});

		// 

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
		});

	}
	
	// 탭메뉴(공통)

    $(".tab-menu ul li a").on("click", function () {
        var index = $(this).parent("li").index();
        $(".tab-menu").find(".tab-content").each(function (i) {
            if (i == index) {
                $(".tab-menu > ul > li").removeAttr("class").eq(i).attr("class", "active");
                $(".tab-menu > ul > li > a").removeAttr("title").eq(i).attr("title", "현재탭");
                $(".tab-content").removeClass("selected").eq(i).addClass("selected");
            }
        });
    });

	// 관련도서 펼쳐보기

    var lst_lnk_on = $("button.on");
	var lst_lnk_off = $("button.off");

	$(lst_lnk_on).on("click", function(){
		$(this).parent().children(".cont02").css("display","block");
		$(this).parent().children("button.off").css("display","block");
		$(this).parent().children("button.on").css("display","none");
		return false;
	});
	$(lst_lnk_off).on("click", function(){
		$(this).parent().children(".cont02").css("display","none");
		$(this).parent().children("button.off").css("display","none");
		$(this).parent().children("button.on").css("display","block");
		return false;
	});

	// 관련도서 book

	var lst_link = $(".library .list-se a");

	$(lst_link).on("click", function(){
		var link = $(this).attr("href");

		$(".library .box-seView, .library .list-se li").removeClass("on");
		$(this).parent().addClass("on");
		$(link).addClass("on");

		return false;
	});

	// 연혁 (현재 년도 부분은 제외하고 가장 큰수값 구하기)

	var heights = $(".history_line .right").not(".history_line .right:last-child").map(function ()
    {
        return $(this).height();
    }).get(),

	maxHeight = Math.max.apply(null, heights);

	maxHeight = maxHeight/3.8;

	// $(".history_line dl").css("padding-bottom", maxHeight);

	// 연혁 (현재 년도 사이즈 조정)

	var right_height = $(".history_line .right:last-child ul").height() + 320;
	
	$(".history_area").css("padding-bottom",right_height);

	
	// 공연후기 상세 팝업

	$("#updBtn").on("click", function() {
		$(".boardPopup1").css('display','block');
	});

	$("#delBtn").on("click", function() {
		$(".boardPopup2").css('display','block');
	});

	/*$(".boardPopup2 .OKBtn").on("click", function() {
		$(".deletePopup").css('display','block');
		$(".boardPopup2").css('display','none');
	});*/

	/*$(".deletePopup .OKBtn").on("click", function() {
		$(".confirmPopup").css('display','block');
		$(".deletePopup").css('display','none');
	});*/

	$(".confirmPopup .OKBtn").on("click", function() {
		$(".confirmPopup").css('display','none');
	});
		

	$(".XBtn").on("click", function() {
		$(".boardPopup1").css('display','none');
		$(".boardPopup2").css('display','none');
		$(".deletePopup").css('display','none');
		$(".confirmPopup").css('display','none');
	});

    // 파일첨부

    $("input#att1").change(function() {
    	$("#file1_name").val($(this).val());
    });

});

// DEVICE CHK

$.fn.device = function() {

	var size = $(window).width() + 17; // 스크롤바 width 추가
		
	if(size < 1200) {
		$("body").data("device","mobile");
	/* } else if(size > 1024 && size < 1280) {
		$("body").data("device","tablet"); */
	} else {
		$("body").data("device","pc");
	}

}

// GNB SETTING

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width();
	var deviceHeight = $(window).height();
	
	if($("body").data("device") == "mobile") {

		$("body").css("overflow","visible");
		$("#gnb > .box").css({
			"height":deviceHeight,
			"background":"#fff"
		});
		$("#gnb .sub_menu").show();
		$("#gnb .sub_menu ul").hide();
		if($("#gnb > .dim").length == 0) {
			$("#gnb").append("<div class='dim' style='display:none;position:absolute;top:-30px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>");
		}

	} else {

		$("body").css("overflow","visible");
		$("#gnb > div.box").css({
			"display":"block",
			"height":"auto",
			"background":"none"
		});
		$("#gnb > div.box").css("right","-80%");
		$("#gnb > div.box > ul > li").removeClass("current");
		$("#gnb .sub_menu").hide();
		$("#gnb .sub_menu ul").show();
		$("#gnb .sub_menu > div .inner > ul").show();
		$("#gnb > .dim").remove();

	}

}

// 연혁 탭메뉴 변경 (모바일)

$.fn.historyTab = function() {

	var onTxt = $('.history_tab li.on');
	
	$('.history_tab').prepend('<button type="button" class="history_menu">'+onTxt.text()+'</button>');
	$('.history_menu').click(function() {
		$(this).toggleClass('on');
		$('.history_tab ul').slideToggle();
	});

};

// 연혁 초기화

$.fn.historyReset = function() {

	if($('.history_menu').size() >= 1) {
		$('.history_menu').remove();
	}

}

// 스크롤 TOP

function scollTopStart() {

	 $('html,body').stop().animate({ scrollTop: 0 }, 600);

}