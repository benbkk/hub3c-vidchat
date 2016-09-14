(function($) {
	// Sticky Elements Width & Height
	// There's gotta be some other ways that more make sense than this :D
	var 
		$sidebarMain 		 		= $('#sidebarMain'), 
		$sidebarHeader 	 		= $('#sidebarHeader'),
		$sidebarFooter	 		= $('#sidebarFooter'),
		$sidebarContacts 		= $('#sidebarContacts'),

		$mainStageHeader    = $('#mainStageHeader'),
		$mainStageContent   = $('#mainStageContent'),
		$mainStageFooter    = $('#mainStageFooter'),

		$windowHeader       = $('#windowHeader');

	stickyElements();
	$(window).on('resize', function(){
		stickyElements();
	});
	
	function stickyElements() {
		var 
			sidebarWidth = $sidebarMain.outerWidth(),
			sidebarHeaderHeight = $sidebarHeader.outerHeight(),
			windowWidth = $(window).width(),
			windowHeaderHeight = $windowHeader.outerHeight();

		$sidebarHeader.css('width', sidebarWidth + 'px');
		$sidebarFooter.css('width', sidebarWidth + 'px');
		
		$mainStageHeader.css('width', windowWidth - sidebarWidth + 'px');
		$mainStageContent.css('width', windowWidth - sidebarWidth + 'px');
		$mainStageFooter.css('width', windowWidth - sidebarWidth + 'px');
	}

	// Fake Search
	// This is for demonstration purpose only.
	// Please don't use the JS :)
	$("#searchContacts").keyup(function(){
		var filter = $(this).val();
		$(".contacts-list li").each(function(){		
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).addClass('hidden');
			} else {
				$(this).removeClass('hidden');
			}
		});
	});

	// Search Toggle
	// Will push the main stage to the right
	// On large mobile (480px - 767px)
	searchToggle();
	$(window).on('resize', function(){
		searchToggle();
	});

	function searchToggle() {
		var mqSmall = 480,
		mqLarge = 677,
		windowWidth = $(window).outerWidth();

		$('#toggleSearch').on('click touchstart', function () {	
			if ( windowWidth > mqSmall && windowWidth <= mqLarge ) {
				$('#mainStage').toggleClass('slide-out');
			} else {
				if($('#mainStage').hasClass('slide-out')) {
					$(this).removeClass('slide-out');
				}
			}	
		});		
	}

	$('#backToContacts').on('click touchstart', function(){
		$('#mainStage').addClass('out');
	});

	// Video Toggle. Again this is for demonstration purpose only.
	$('#startVideoCall').on('click touchstart', function(e){
		$('body, #mainStage, #sidebarMain, #videoStage').addClass('video-call-is-on');
	});
	if ($('#videoStage').length) {
		$('#openChat').on('click touchstart', function(){
			$('#mainStage').toggleClass('sidebar-open');
		});
		$('a#closePanel').on('click touchstart', function(){
			$(this).parent().removeClass('sidebar-open');
			$('#openChat').removeClass('sidebar-open');
		});

		$('#muteVoice').on('click touchstart', function(){
			$(this).toggleClass('muted');
		});

		$('#muteVideo').on('click touchstart', function(){
			$(this).toggleClass('muted');
		});

		$('#openContacts').on('click touchstart', function(){
			$('#sidebarMain').addClass('sidebar-open');
		});
		$('#hangUp').on('click touchstart', function(){
			$('body, #mainStage, #sidebarMain, #videoStage').removeClass('video-call-is-on');
		});
	}	

})(jQuery);