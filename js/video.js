
(function($) {

	$.fn.vPlayer = function(options, param) {

		var self = this;
		var video = self.children('.player')[0];

		self.each(function() {

			var defaults = {

				loop : false,
				autoplay : false

			};

			var settings = $.extend(defaults, options);

			var public_methods = {

				pause : function() {

					private_methods.videoProgress();
					window.clearInterval(self.percentage);

					self.addClass('paused');
					video.pause();

				},

				play : function() {

					private_methods.videoProgress();
					self.percentage = window.setInterval(function(){private_methods.videoProgress()}, 50);

					self.removeClass('paused');
					video.play();

				}

			}

			var private_methods = {

				initialise : function() {

					video.loop = settings.loop;
					settings.autoplay == true ? public_methods.play() : '';

					
				},

				videoProgress : function() {

					var percentage = video.currentTime / video.duration * 100;

					self.find('.progress-bar').css({

						'width' : percentage + '%'

					});

				}

			}

			if(public_methods[options]) {

				settings = self.data('settings');
				self = self.data('self');

				if(self == undefined) {

					console.log('[vPlayer] - You are trying to fire a method on an object before it\'s been initialised!');

				} else {

					public_methods[options].call(self, param);
					
				}

			} else if(typeof(options) == 'object' || options == undefined){

				self.data('settings', settings);
				self.data('self', self);
				private_methods.initialise.call();

			} else {

				console.log('[vPlayer] - ' + options + ' is not a defined method :(');

			}

		});

	}

} (jQuery));

(function VideoPlayer(){


	$('.video-player').vPlayer({

		autoplay : true,
		loop : true

	});

	$('.player').click(function(){

		$('.video-player').vPlayer('pause');

	});

})();