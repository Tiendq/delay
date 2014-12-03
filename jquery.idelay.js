/**
 * jQuery Delay
 * A very lightweight jQuery plugin to lazy load images
 *  
 * Original code is forked from http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2014 Tien Do
 * https://github.com/Tiendq/delay
 */

;(function($) {
	$.fn.idelay = function(threshold, callback) {
 		var $window = $(window),
 			threshold = threshold || 0,
 			retina = window.devicePixelRatio > 1,
 			sourceName = retina ? "data-src-retina" : "data-src",
 			images = this, loaded;

		this.one("idelay", function() {
			var source = this.getAttribute(sourceName);
			source = source || this.getAttribute("data-src");

 			if (source) {
 				this.setAttribute("src", source);
 				
 				if ("function" === typeof callback)
 					callback.call(this);
 			}
 		});

 		function idelay() {
 			var inview = images.filter(function() {
 				var $image = $(this);

 				if ($image.is(":hidden"))
 					return;

 				var top = $window.scrollTop(),
 					bottom = top + $window.height(),
 					etop = $image.offset().top,
 					ebottom = etop + $image.height();

 				return ebottom >= top - threshold && etop <= bottom + threshold;
 			});

 			loaded = inview.trigger("idelay");
 			images = images.not(loaded);
 		}

 		$window.on("scroll.idelay resize.idelay lookup.idelay", idelay);
 		idelay();

 		return this;
 	};
 })(window.jQuery || window.Zepto);