function snb(cate, snb, chk) {

	var uniq = {

		'troupe'   : '예술단소개',
		'perform'  : '공연안내',
		'work'     : '작품소개',
		'unit'     : '단원양성',
		'donat'    : '나눔마당',
		'notify'   : '알림마당'

	};

	str = ''		
	str += '<div class="snb_list">'
	str += '	<h2 class="snb_tit"><span>' + uniq[cate] + '</span></h2>';
	str += '	<ul class="snb_nav">';

	if ( cate == 'troupe' ) {

		str += '	<li><a href="intro.html">관현맹인전통예술단</a></li>';
		str += '	<li><a href="history.html">예술단주요연혁</a></li>';
		str += '	<li><a href="member.html">예술단원소개</a></li>';
		str += '	<li><a href="contact.html">찾아오시는 길</a></li>';

	}

	if ( cate == 'perform' ) {

		str += '	<li><a href="schedule.html">행사일정</a></li>';
		str += '	<li><a href="photo_list.html">공연사진</a></li>';

	}
	
	if ( cate == 'work' ) {

		str += '	<li><a href="album.html">음반</a></li>';
		str += '	<li><a href="library.html">관련도서</a></li>';	

	}

	if ( cate == 'unit' ) {

		str += '	<li><a href="music.html">전통음악교육</a></li>';
		str += '	<li><a href="camp.html">성공사례</a></li>';

	}

	if ( cate == 'donat' ) {

		str += '	<li><a href="guide.html">후원안내</a></li>';
		str += '	<li><a href="sponsor.html">후원신청</a></li>';

	}

	if ( cate == 'notify' ) {

		str += '	<li><a href="notice_list.html">공지사항</a></li>';
		str += '	<li><a href="news_list.html">보도자료</a></li>';
		str += '	<li><a href="review_list.html">공연후기</a></li>';

	}

	str += '	</ul>';
	str += '</div>';

	document.getElementById(snb).innerHTML += str;

	$('.snb_nav li:nth-child(' + chk + ')').addClass('on');

}