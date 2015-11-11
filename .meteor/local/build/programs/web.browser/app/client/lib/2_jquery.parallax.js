(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/2_jquery.parallax.js                                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
Plugin: jQuery Parallax                                                //
Version 1.1.3                                                          //
Author: Ian Lunn                                                       //
Twitter: @IanLunn                                                      //
Author URL: http://www.ianlunn.co.uk/                                  //
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/          //
                                                                       //
Dual licensed under the MIT and GPL licenses:                          //
http://www.opensource.org/licenses/mit-license.php                     //
http://www.gnu.org/licenses/gpl.html                                   //
*/                                                                     //
                                                                       //
(function ($) {                                                        // 14
	var $window = $(window);                                              // 15
	var windowHeight = $window.height();                                  // 16
                                                                       //
	$window.resize(function () {                                          // 18
		windowHeight = $window.height();                                     // 19
	});                                                                   //
                                                                       //
	$.fn.parallax = function (xpos, speedFactor, outerHeight) {           // 22
		var $this = $(this);                                                 // 23
		var getHeight;                                                       // 24
		var firstTop;                                                        // 25
		var paddingTop = 0;                                                  // 26
                                                                       //
		//get the starting position of each element to have parallax applied to it		
		$this.each(function () {                                             // 29
			firstTop = $this.offset().top;                                      // 30
		});                                                                  //
                                                                       //
		if (outerHeight) {                                                   // 33
			getHeight = function (jqo) {                                        // 34
				return jqo.outerHeight(true);                                      // 35
			};                                                                  //
		} else {                                                             //
			getHeight = function (jqo) {                                        // 38
				return jqo.height();                                               // 39
			};                                                                  //
		}                                                                    //
                                                                       //
		// setup defaults if arguments aren't specified                      //
		if (arguments.length < 1 || xpos === null) xpos = "50%";             // 44
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
                                                                       //
		// function to be called whenever the window is scrolled or resized  //
		function update() {                                                  // 49
			var pos = $window.scrollTop();                                      // 50
                                                                       //
			$this.each(function () {                                            // 52
				var $element = $(this);                                            // 53
				var top = $element.offset().top;                                   // 54
				var height = getHeight($element);                                  // 55
                                                                       //
				// Check if totally above or totally below viewport                //
				if (top + height < pos || top > pos + windowHeight) {              // 58
					return;                                                           // 59
				}                                                                  //
                                                                       //
				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});                                                                 //
		}                                                                    //
                                                                       //
		$window.bind('scroll', update).resize(update);                       // 66
		update();                                                            // 67
	};                                                                    //
})(jQuery);                                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
