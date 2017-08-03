$(function() {
	var platform = 'm';

	$('.window-type-item').bind('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		platform = $this.data('platform');
		$this.addClass('active').siblings().removeClass('active');
	});

	$('[name="file"]').bind('change', function(event) {
		var $file = $(this);
		var $form = $(this).closest('form');
		var file = this.files[0];
		if(typeof file === 'undefined' || file == null) {
			return false;
		}
		var reader  = new FileReader(), _lock = false;
		var l = function() {
			$('html, body').scrollTop(0);
			if(_lock != false) {
				setTimeout(l, 20);
			}
		};
		$('.overlay').addClass('active');
		reader.addEventListener('load', function() {
			var $div = $('<div class="window"><div class="window-inner"></div></div>');
			var $img = $('<img src="' + reader.result + '" />');
			var $pos = $('<div class="window-pos window-pos-t"></div><div class="window-pos window-pos-r"></div><div class="window-pos window-pos-b"></div><div class="window-pos window-pos-l"></div><div class="window-pos window-pos-tl"></div><div class="window-pos window-pos-tr"></div><div class="window-pos window-pos-bl"></div><div class="window-pos window-pos-br"></div>');
			$div.children('.window-inner').append($img);
			var $header = $('<div class="window-header"></div>');
			if(platform == 'w') {
				$div.addClass('window-windows');
				$header.append('<img src="/static/image/window-hide.png" alt="" /><img src="/static/image/window-minimize.png" alt="" /><img src="/static/image/window-close.png" alt="" />');
			} else if(platform == 'm') {
				$div.addClass('window-mac');
				$header.append('<span class="circle circle-close"></span><span class="circle circle-minimize"></span><span class="circle circle-hide"></span>');
			}
			$header.prependTo($div.find('.window-inner'));
			$div.append($pos);
			$img.bind('load', function() {
				$('html, body').animate({scrollTop: 0}, 300, function() {
					_lock = true;
					setTimeout(l, 0);
					html2canvas($div[0], {
						onrendered: function(canvas) {
							_lock = false;
							$('.overlay').removeClass('active');
							$file.val('');
							$('#content .export').remove();
							$form.after('<a class="export" href="' + canvas.toDataURL() + '" target="_blank"><img src="' + canvas.toDataURL() + '" /></a>');
							$div.remove();
						}
					});
				});
			});
			$div.insertAfter($('[name="file"]').closest('form'));
		});
		reader.addEventListener('error', function() {
			$('.overlay').removeClass('active');
			alert('이미지 처리에 실피했습니다.\r\n죄송하지만 다시 시도해주세요 ㅜㅜ');
		});
		reader.readAsDataURL(file);
	});
});