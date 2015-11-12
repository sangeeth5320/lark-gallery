(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/revolution-slider/rs-plugin/js/jquery.themepunch.revolut //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 4.6.4 (26.11.2014)                                        //
 * @requires jQuery v1.7 or later (tested on 1.9)                      //
 * @author ThemePunch                                                  //
**************************************************************************/
                                                                       //
(function (jQuery, undefined) {                                        // 9
                                                                       //
	////////////////////////////////////////                              //
	// THE REVOLUTION PLUGIN STARTS HERE //                               //
	///////////////////////////////////////                               //
                                                                       //
	jQuery.fn.extend({                                                    // 18
                                                                       //
		// OUR PLUGIN HERE :)                                                //
		revolution: function (options) {                                     // 21
                                                                       //
			////////////////////////////////                                    //
			// SET DEFAULT VALUES OF ITEM //                                    //
			////////////////////////////////                                    //
			var defaults = {                                                    // 28
				delay: 9000,                                                       // 29
				startheight: 500,                                                  // 30
				startwidth: 960,                                                   // 31
				fullScreenAlignForce: "off",                                       // 32
				autoHeight: "off",                                                 // 33
				hideTimerBar: "off",                                               // 34
				hideThumbs: 200,                                                   // 35
				hideNavDelayOnMobile: 1500,                                        // 36
                                                                       //
				thumbWidth: 100, // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
				thumbHeight: 50,                                                   // 39
				thumbAmount: 3,                                                    // 40
                                                                       //
				navigationType: "bullet", // bullet, thumb, none                   // 42
				navigationArrows: "solo", // nextto, solo, none                    // 43
				navigationInGrid: "off", // on/off                                 // 44
                                                                       //
				hideThumbsOnMobile: "off",                                         // 46
				hideBulletsOnMobile: "off",                                        // 47
				hideArrowsOnMobile: "off",                                         // 48
				hideThumbsUnderResoluition: 0,                                     // 49
                                                                       //
				navigationStyle: "round", // round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item),
                                                                       //
				navigationHAlign: "center", // Vertical Align top,center,bottom    // 53
				navigationVAlign: "bottom", // Horizontal Align left,center,right  // 54
				navigationHOffset: 0,                                              // 55
				navigationVOffset: 20,                                             // 56
                                                                       //
				soloArrowLeftHalign: "left",                                       // 58
				soloArrowLeftValign: "center",                                     // 59
				soloArrowLeftHOffset: 20,                                          // 60
				soloArrowLeftVOffset: 0,                                           // 61
                                                                       //
				soloArrowRightHalign: "right",                                     // 63
				soloArrowRightValign: "center",                                    // 64
				soloArrowRightHOffset: 20,                                         // 65
				soloArrowRightVOffset: 0,                                          // 66
                                                                       //
				keyboardNavigation: "on",                                          // 68
                                                                       //
				touchenabled: "on", // Enable Swipe Function : on/off              // 70
				onHoverStop: "on", // Stop Banner Timet at Hover on Slide on/off   // 71
                                                                       //
				stopAtSlide: -1, // Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops: -1, // Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
                                                                       //
				hideCaptionAtLimit: 0, // It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
				hideAllCaptionAtLimit: 0, // Hide all The Captions if Width of Browser is less then this value
				hideSliderAtLimit: 0, // Hide the whole slider, and stop also functions if Width of Browser is less than this value
                                                                       //
				shadow: 0, //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
				fullWidth: "off", // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
				fullScreen: "off",                                                 // 83
				minFullScreenHeight: 0, // The Minimum FullScreen Height           // 84
				fullScreenOffsetContainer: "", // Size for FullScreen Slider minimising Calculated on the Container sizes
				fullScreenOffset: "0", // Size for FullScreen Slider minimising    // 86
				dottedOverlay: "none", //twoxtwo, threexthree, twoxtwowhite, threexthreewhite
                                                                       //
				forceFullWidth: "off", // Force The FullWidth                      // 89
                                                                       //
				spinner: "spinner0",                                               // 91
                                                                       //
				swipe_treshold: 75, // The number of pixels that the user must move their finger by before it is considered a swipe.
				swipe_min_touches: 1, // Min Finger (touch) used for swipe         // 94
				drag_block_vertical: false, // Prevent Vertical Scroll during Swipe
				isJoomla: false,                                                   // 96
				parallax: "off",                                                   // 97
				parallaxLevels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
				parallaxBgFreeze: "off",                                           // 99
				parallaxOpacity: "on",                                             // 100
				parallaxDisableOnMobile: "off",                                    // 101
				panZoomDisableOnMobile: "off",                                     // 102
				simplifyAll: "on",                                                 // 103
				minHeight: 0,                                                      // 104
				nextSlideOnWindowFocus: "off",                                     // 105
                                                                       //
				startDelay: 0 // Delay before the first Animation starts.          // 107
                                                                       //
			};                                                                  //
                                                                       //
			options = jQuery.extend({}, defaults, options);                     // 112
                                                                       //
			return this.each(function () {                                      // 114
                                                                       //
				// REPORT SOME IMPORTAN INFORMATION ABOUT THE SLIDER               //
				if (window.tplogs == true) try {                                   // 118
					console.groupCollapsed("Slider Revolution 4.6.3 Initialisation on " + jQuery(this).attr('id'));
					console.groupCollapsed("Used Options:");                          // 121
					console.info(options);                                            // 122
					console.groupEnd();                                               // 123
					console.groupCollapsed("Tween Engine:");                          // 124
				} catch (e) {}                                                     //
                                                                       //
				// CHECK IF TweenLite IS LOADED AT ALL                             //
				if (punchgs.TweenLite == undefined) {                              // 128
					if (window.tplogs == true) try {                                  // 129
						console.error("GreenSock Engine Does not Exist!");               // 130
					} catch (e) {}                                                    //
					return false;                                                     // 132
				}                                                                  //
                                                                       //
				punchgs.force3D = true;                                            // 135
                                                                       //
				if (window.tplogs == true) try {                                   // 137
					console.info("GreenSock Engine Version in Slider Revolution:" + punchgs.TweenLite.version);
				} catch (e) {}                                                     //
                                                                       //
				if (options.simplifyAll == "on") {} else {                         // 143
					punchgs.TweenLite.lagSmoothing(1000, 16);                         // 146
					punchgs.force3D = "true";                                         // 147
				}                                                                  //
                                                                       //
				if (window.tplogs == true) try {                                   // 150
					console.groupEnd();                                               // 152
					console.groupEnd();                                               // 153
				} catch (e) {}                                                     //
                                                                       //
				initSlider(jQuery(this), options);                                 // 157
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE PAUSE                                                     //
		revscroll: function (oy) {                                           // 165
			return this.each(function () {                                      // 166
				var container = jQuery(this);                                      // 167
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) jQuery('body,html').animate({ scrollTop: container.offset().top + container.find('>ul >li').height() - oy + "px" }, { duration: 400 });
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE PAUSE                                                     //
		revredraw: function (oy) {                                           // 174
			return this.each(function () {                                      // 175
				var container = jQuery(this);                                      // 176
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
					var bt = container.parent().find('.tp-bannertimer');              // 178
					var opt = bt.data('opt');                                         // 179
					containerResized(container, opt);                                 // 180
				}                                                                  //
			});                                                                 //
		},                                                                   //
		// METHODE PAUSE                                                     //
		revkill: function (oy) {                                             // 185
                                                                       //
			var self = this,                                                    // 187
			    container = jQuery(this);                                       //
                                                                       //
			if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
                                                                       //
				container.data('conthover', 1);                                    // 192
				container.data('conthover-changed', 1);                            // 193
				container.trigger('revolution.slide.onpause');                     // 194
				var bt = container.parent().find('.tp-bannertimer');               // 195
				var opt = bt.data('opt');                                          // 196
				opt.bannertimeronpause = true;                                     // 197
				container.trigger('stoptimer');                                    // 198
                                                                       //
				punchgs.TweenLite.killTweensOf(container.find('*'), false);        // 200
				punchgs.TweenLite.killTweensOf(container, false);                  // 201
				container.unbind('hover, mouseover, mouseenter,mouseleave, resize');
				var resizid = "resize.revslider-" + container.attr('id');          // 203
				jQuery(window).off(resizid);                                       // 204
				container.find('*').each(function () {                             // 205
					var el = jQuery(this);                                            // 206
                                                                       //
					el.unbind('on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer');
					el.off('on, hover, mouseenter,mouseleave,mouseover, resize');     // 209
					el.data('mySplitText', null);                                     // 210
					el.data('ctl', null);                                             // 211
					if (el.data('tween') != undefined) el.data('tween').kill();       // 212
					if (el.data('kenburn') != undefined) el.data('kenburn').kill();   // 214
					el.remove();                                                      // 216
					el.empty();                                                       // 217
					el = null;                                                        // 218
				});                                                                //
                                                                       //
				punchgs.TweenLite.killTweensOf(container.find('*'), false);        // 222
				punchgs.TweenLite.killTweensOf(container, false);                  // 223
				bt.remove();                                                       // 224
				try {                                                              // 225
					container.closest('.forcefullwidth_wrapper_tp_banner').remove();  // 225
				} catch (e) {}                                                     //
				try {                                                              // 226
					container.closest('.rev_slider_wrapper').remove();                // 226
				} catch (e) {}                                                     //
				try {                                                              // 227
					container.remove();                                               // 227
				} catch (e) {}                                                     //
				container.empty();                                                 // 228
				container.html();                                                  // 229
				container = null;                                                  // 230
                                                                       //
				opt = null;                                                        // 232
				delete self.container;                                             // 233
				delete self.opt;                                                   // 234
                                                                       //
				return true;                                                       // 236
			} else {                                                            //
				return false;                                                      // 238
			}                                                                   //
		},                                                                   //
                                                                       //
		// METHODE PAUSE                                                     //
		revpause: function (options) {                                       // 245
                                                                       //
			return this.each(function () {                                      // 247
				var container = jQuery(this);                                      // 248
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
					container.data('conthover', 1);                                   // 250
					container.data('conthover-changed', 1);                           // 251
					container.trigger('revolution.slide.onpause');                    // 252
					var bt = container.parent().find('.tp-bannertimer');              // 253
					var opt = bt.data('opt');                                         // 254
					opt.bannertimeronpause = true;                                    // 255
					container.trigger('stoptimer');                                   // 256
				}                                                                  //
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE RESUME                                                    //
		revresume: function (options) {                                      // 264
			return this.each(function () {                                      // 265
				var container = jQuery(this);                                      // 266
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
					container.data('conthover', 0);                                   // 268
					container.data('conthover-changed', 1);                           // 269
					container.trigger('revolution.slide.onresume');                   // 270
					var bt = container.parent().find('.tp-bannertimer');              // 271
					var opt = bt.data('opt');                                         // 272
					opt.bannertimeronpause = false;                                   // 273
					container.trigger('starttimer');                                  // 274
				}                                                                  //
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE NEXT                                                      //
		revnext: function (options) {                                        // 281
			return this.each(function () {                                      // 282
                                                                       //
				// CATCH THE CONTAINER                                             //
				var container = jQuery(this);                                      // 285
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) container.parent().find('.tp-rightarrow').click();
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE RESUME                                                    //
		revprev: function (options) {                                        // 295
			return this.each(function () {                                      // 296
				// CATCH THE CONTAINER                                             //
				var container = jQuery(this);                                      // 298
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) container.parent().find('.tp-leftarrow').click();
			});                                                                 //
		},                                                                   //
                                                                       //
		// METHODE LENGTH                                                    //
		revmaxslide: function (options) {                                    // 306
			// CATCH THE CONTAINER                                              //
			return jQuery(this).find('>ul:first-child >li').length;             // 308
		},                                                                   //
                                                                       //
		// METHODE CURRENT                                                   //
		revcurrentslide: function (options) {                                // 313
			// CATCH THE CONTAINER                                              //
			var container = jQuery(this);                                       // 315
			if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
				var bt = container.parent().find('.tp-bannertimer');               // 317
				var opt = bt.data('opt');                                          // 318
				return opt.act;                                                    // 319
			}                                                                   //
		},                                                                   //
                                                                       //
		// METHODE CURRENT                                                   //
		revlastslide: function (options) {                                   // 324
			// CATCH THE CONTAINER                                              //
			var container = jQuery(this);                                       // 326
			if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
				var bt = container.parent().find('.tp-bannertimer');               // 328
				var opt = bt.data('opt');                                          // 329
				return opt.lastslide;                                              // 330
			}                                                                   //
		},                                                                   //
                                                                       //
		// METHODE JUMP TO SLIDE                                             //
		revshowslide: function (slide) {                                     // 336
			return this.each(function () {                                      // 337
				// CATCH THE CONTAINER                                             //
				var container = jQuery(this);                                      // 339
				if (container != undefined && container.length > 0 && jQuery('body').find('#' + container.attr('id')).length > 0) {
					container.data('showus', slide);                                  // 341
					container.parent().find('.tp-rightarrow').click();                // 342
				}                                                                  //
			});                                                                 //
		}                                                                    //
                                                                       //
	});                                                                   //
	/*******************************************                          //
 	-	IS IOS VERSION OLDER THAN 5 ??	-                                   //
 *******************************************/                          //
                                                                       //
	function iOSVersion() {                                               // 354
		var oldios = false;                                                  // 355
		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
			if (navigator.userAgent.match(/OS 4_\d like Mac OS X/i)) {          // 357
				oldios = true;                                                     // 358
			}                                                                   //
		} else {                                                             //
			oldios = false;                                                     // 361
		}                                                                    //
		return oldios;                                                       // 363
	}                                                                     //
                                                                       //
	function initSlider(container, opt) {                                 // 366
		if (container == undefined) return false;                            // 367
                                                                       //
		if (container.data('aimg') != undefined) {                           // 369
			if (container.data('aie8') == "enabled" && isIE(8) || container.data('amobile') == "enabled" && is_mobile()) container.html('<img class="tp-slider-alternative-image" src="' + container.data("aimg") + '">');
		}                                                                    //
		// PREPARE FALL BACK SETTINGS                                        //
		if (opt.navigationStyle == "preview1" || opt.navigationStyle == "preview3" || opt.navigationStyle == "preview4") {
			opt.soloArrowLeftHalign = "left";                                   // 375
			opt.soloArrowLeftValign = "center";                                 // 376
			opt.soloArrowLeftHOffset = 0;                                       // 377
			opt.soloArrowLeftVOffset = 0;                                       // 378
			opt.soloArrowRightHalign = "right";                                 // 379
			opt.soloArrowRightValign = "center";                                // 380
			opt.soloArrowRightHOffset = 0;                                      // 381
			opt.soloArrowRightVOffset = 0;                                      // 382
			opt.navigationArrows = "solo";                                      // 383
		}                                                                    //
                                                                       //
		// SIMPLIFY ANIMATIONS ON OLD IOS AND IE8 IF NEEDED                  //
		if (opt.simplifyAll == "on" && (isIE(8) || iOSVersion())) {          // 388
			container.find('.tp-caption').each(function () {                    // 389
				var tc = jQuery(this);                                             // 390
				tc.removeClass("customin").removeClass("customout").addClass("fadein").addClass("fadeout");
				tc.data('splitin', "");                                            // 392
				tc.data('speed', 400);                                             // 393
			});                                                                 //
			container.find('>ul>li').each(function () {                         // 395
				var li = jQuery(this);                                             // 396
				li.data('transition', "fade");                                     // 397
				li.data('masterspeed', 500);                                       // 398
				li.data('slotamount', 1);                                          // 399
				var img = li.find('>img').first();                                 // 400
				img.data('kenburns', "off");                                       // 401
			});                                                                 //
		}                                                                    //
                                                                       //
		opt.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
                                                                       //
		if (opt.fullWidth != "on" && opt.fullScreen != "on") opt.autoHeight = "off";
		if (opt.fullScreen == "on") opt.autoHeight = "on";                   // 412
		if (opt.fullWidth != "on" && opt.fullScreen != "on") forceFulWidth = "off";
                                                                       //
		if (opt.fullWidth == "on" && opt.autoHeight == "off") container.css({ maxHeight: opt.startheight + "px" });
                                                                       //
		if (is_mobile() && opt.hideThumbsOnMobile == "on" && opt.navigationType == "thumb") opt.navigationType = "none";
                                                                       //
		if (is_mobile() && opt.hideBulletsOnMobile == "on" && opt.navigationType == "bullet") opt.navigationType = "none";
                                                                       //
		if (is_mobile() && opt.hideBulletsOnMobile == "on" && opt.navigationType == "both") opt.navigationType = "none";
                                                                       //
		if (is_mobile() && opt.hideArrowsOnMobile == "on") opt.navigationArrows = "none";
                                                                       //
		if (opt.forceFullWidth == "on" && container.closest('.forcefullwidth_wrapper_tp_banner').length == 0) {
                                                                       //
			var loff = container.parent().offset().left;                        // 432
			var mb = container.parent().css('marginBottom');                    // 433
			var mt = container.parent().css('marginTop');                       // 434
			if (mb == undefined) mb = 0;                                        // 435
			if (mt == undefined) mt = 0;                                        // 436
                                                                       //
			container.parent().wrap('<div style="position:relative;width:100%;height:auto;margin-top:' + mt + ';margin-bottom:' + mb + '" class="forcefullwidth_wrapper_tp_banner"></div>');
			container.closest('.forcefullwidth_wrapper_tp_banner').append('<div class="tp-fullwidth-forcer" style="width:100%;height:' + container.height() + 'px"></div>');
			container.css({ 'backgroundColor': container.parent().css('backgroundColor'), 'backgroundImage': container.parent().css('backgroundImage') });
			//container.parent().css({'position':'absolute','width':jQuery(window).width()});
			container.parent().css({ 'left': 0 - loff + "px", position: 'absolute', 'width': jQuery(window).width() });
			opt.width = jQuery(window).width();                                 // 443
		}                                                                    //
                                                                       //
		// HIDE THUMBS UNDER RESOLUTION                                      //
		try {                                                                // 447
			if (opt.hideThumbsUnderResolution > jQuery(window).width() && opt.hideThumbsUnderResolution != 0) {
				container.parent().find('.tp-bullets.tp-thumbs').css({ display: "none" });
			} else {                                                            //
				container.parent().find('.tp-bullets.tp-thumbs').css({ display: "block" });
			}                                                                   //
		} catch (e) {}                                                       //
                                                                       //
		if (!container.hasClass("revslider-initialised")) {                  // 455
                                                                       //
			container.addClass("revslider-initialised");                        // 457
			if (container.attr('id') == undefined) container.attr('id', "revslider-" + Math.round(Math.random() * 1000 + 5));
                                                                       //
			// CHECK IF FIREFOX 13 IS ON WAY.. IT HAS A STRANGE BUG, CSS ANIMATE SHOULD NOT BE USED
                                                                       //
			opt.firefox13 = false;                                              // 464
			opt.ie = !jQuery.support.opacity;                                   // 465
			opt.ie9 = document.documentMode == 9;                               // 466
                                                                       //
			opt.origcd = opt.delay;                                             // 468
                                                                       //
			// CHECK THE jQUERY VERSION                                         //
			var version = jQuery.fn.jquery.split('.'),                          // 471
			    versionTop = parseFloat(version[0]),                            //
			    versionMinor = parseFloat(version[1]),                          //
			    versionIncrement = parseFloat(version[2] || '0');               //
                                                                       //
			if (versionTop == 1 && versionMinor < 7) {                          // 476
				container.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + version + ' <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>');
			}                                                                   //
                                                                       //
			if (versionTop > 1) opt.ie = false;                                 // 480
                                                                       //
			// Delegate .transition() calls to .animate()                       //
			// if the browser can't do CSS transitions.                         //
			if (!jQuery.support.transition) jQuery.fn.transition = jQuery.fn.animate;
                                                                       //
			// CATCH THE CONTAINER                                              //
                                                                       //
			// LOAD THE YOUTUBE API IF NECESSARY                                //
                                                                       //
			container.find('.caption').each(function () {                       // 493
				jQuery(this).addClass('tp-caption');                               // 493
			});                                                                 //
                                                                       //
			if (is_mobile()) {                                                  // 495
				container.find('.tp-caption').each(function () {                   // 496
					var nextcaption = jQuery(this);                                   // 497
					if (nextcaption.data('autoplayonlyfirsttime') == true || nextcaption.data('autoplayonlyfirsttime') == "true") nextcaption.data('autoplayonlyfirsttime', "false");
					if (nextcaption.data('autoplay') == true || nextcaption.data('autoplay') == "true") nextcaption.data('autoplay', false);
				});                                                                //
			}                                                                   //
                                                                       //
			var addedyt = 0;                                                    // 507
			var addedvim = 0;                                                   // 508
			var addedvid = 0;                                                   // 509
			var httpprefix = "http";                                            // 510
                                                                       //
			if (location.protocol === 'https:') {                               // 512
				httpprefix = "https";                                              // 513
			}                                                                   //
			container.find('.tp-caption').each(function (i) {                   // 515
				// IF SRC EXIST, RESET SRC'S since WE DONT NEED THEM !!            //
                                                                       //
				try {                                                              // 518
                                                                       //
					if ((jQuery(this).data('ytid') != undefined || jQuery(this).find('iframe').attr('src').toLowerCase().indexOf('youtube') > 0) && addedyt == 0) {
						addedyt = 1;                                                     // 521
						var s = document.createElement("script");                        // 522
						var httpprefix2 = "https";                                       // 523
						s.src = httpprefix2 + "://www.youtube.com/iframe_api"; /* Load Player API*/
                                                                       //
						var before = document.getElementsByTagName("script")[0];         // 526
						var loadit = true;                                               // 527
						jQuery('head').find('*').each(function () {                      // 528
							if (jQuery(this).attr('src') == httpprefix2 + "://www.youtube.com/iframe_api") loadit = false;
						});                                                              //
						if (loadit) {                                                    // 532
							before.parentNode.insertBefore(s, before);                      // 533
						}                                                                //
					}                                                                 //
				} catch (e) {}                                                     //
                                                                       //
				try {                                                              // 540
					if ((jQuery(this).data('vimeoid') != undefined || jQuery(this).find('iframe').attr('src').toLowerCase().indexOf('vimeo') > 0) && addedvim == 0) {
						addedvim = 1;                                                    // 542
						var f = document.createElement("script");                        // 543
						f.src = httpprefix + "://a.vimeocdn.com/js/froogaloop2.min.js"; /* Load Player API*/
						var before = document.getElementsByTagName("script")[0];         // 545
                                                                       //
						var loadit = true;                                               // 547
						jQuery('head').find('*').each(function () {                      // 548
							if (jQuery(this).attr('src') == httpprefix + "://a.vimeocdn.com/js/froogaloop2.min.js") loadit = false;
						});                                                              //
						if (loadit) before.parentNode.insertBefore(f, before);           // 552
					}                                                                 //
				} catch (e) {}                                                     //
                                                                       //
				try {                                                              // 557
					if (jQuery(this).data('videomp4') != undefined || jQuery(this).data('videowebm') != undefined) {}
				} catch (e) {}                                                     //
			});                                                                 //
                                                                       //
			// REMOVE ANY VIDEO JS SETTINGS OF THE VIDEO  IF NEEDED             //
			container.find('.tp-caption video').each(function (i) {             // 568
				jQuery(this).removeClass("video-js").removeClass("vjs-default-skin");
				jQuery(this).attr("preload", "");                                  // 570
				jQuery(this).css({ display: "none" });                             // 571
			});                                                                 //
                                                                       //
			container.find('>ul:first-child >li').each(function () {            // 574
				var t = jQuery(this);                                              // 575
				t.data('origindex', t.index());                                    // 576
			});                                                                 //
                                                                       //
			// SHUFFLE MODE                                                     //
			if (opt.shuffle == "on") {                                          // 580
				var fsa = new Object(),                                            // 581
				    fli = container.find('>ul:first-child >li:first-child');       //
                                                                       //
				fsa.fstransition = fli.data('fstransition');                       // 584
				fsa.fsmasterspeed = fli.data('fsmasterspeed');                     // 585
				fsa.fsslotamount = fli.data('fsslotamount');                       // 586
                                                                       //
				for (var u = 0; u < container.find('>ul:first-child >li').length; u++) {
					var it = Math.round(Math.random() * container.find('>ul:first-child >li').length);
					container.find('>ul:first-child >li:eq(' + it + ')').prependTo(container.find('>ul:first-child'));
				}                                                                  //
                                                                       //
				var newfli = container.find('>ul:first-child >li:first-child');    // 595
				newfli.data('fstransition', fsa.fstransition);                     // 596
				newfli.data('fsmasterspeed', fsa.fsmasterspeed);                   // 597
				newfli.data('fsslotamount', fsa.fsslotamount);                     // 598
			}                                                                   //
                                                                       //
			// CREATE SOME DEFAULT OPTIONS FOR LATER                            //
			opt.slots = 4;                                                      // 603
			opt.act = -1;                                                       // 604
			opt.next = 0;                                                       // 605
                                                                       //
			// IF START SLIDE IS SET                                            //
			if (opt.startWithSlide != undefined) opt.next = opt.startWithSlide;
                                                                       //
			// IF DEEPLINK HAS BEEN SET                                         //
			var deeplink = getUrlVars("#")[0];                                  // 611
			if (deeplink.length < 9) {                                          // 612
				if (deeplink.split('slide').length > 1) {                          // 613
					var dslide = parseInt(deeplink.split('slide')[1], 0);             // 614
					if (dslide < 1) dslide = 1;                                       // 615
					if (dslide > container.find('>ul:first >li').length) dslide = container.find('>ul:first >li').length;
					opt.next = dslide - 1;                                            // 617
				}                                                                  //
			}                                                                   //
                                                                       //
			opt.firststart = 1;                                                 // 622
                                                                       //
			// BASIC OFFSET POSITIONS OF THE BULLETS                            //
			if (opt.navigationHOffset == undefined) opt.navOffsetHorizontal = 0;
			if (opt.navigationVOffset == undefined) opt.navOffsetVertical = 0;  // 626
                                                                       //
			container.append('<div class="tp-loader ' + opt.spinner + '">' + '<div class="dot1"></div>' + '<div class="dot2"></div>' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>');
                                                                       //
			// RESET THE TIMER                                                  //
			if (container.find('.tp-bannertimer').length == 0) container.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
			var bt = container.find('.tp-bannertimer');                         // 640
			if (bt.length > 0) {                                                // 641
				bt.css({ 'width': '0%' });                                         // 642
			};                                                                  //
                                                                       //
			// WE NEED TO ADD A BASIC CLASS FOR SETTINGS.CSS                    //
			container.addClass("tp-simpleresponsive");                          // 647
			opt.container = container;                                          // 648
                                                                       //
			//if (container.height()==0) container.height(opt.startheight);     //
                                                                       //
			// AMOUNT OF THE SLIDES                                             //
			opt.slideamount = container.find('>ul:first >li').length;           // 653
                                                                       //
			// A BASIC GRID MUST BE DEFINED. IF NO DEFAULT GRID EXIST THAN WE NEED A DEFAULT VALUE, ACTUAL SIZE OF CONAINER
			if (container.height() == 0) container.height(opt.startheight);     // 657
			if (opt.startwidth == undefined || opt.startwidth == 0) opt.startwidth = container.width();
			if (opt.startheight == undefined || opt.startheight == 0) opt.startheight = container.height();
                                                                       //
			// OPT WIDTH && HEIGHT SHOULD BE SET                                //
			opt.width = container.width();                                      // 662
			opt.height = container.height();                                    // 663
                                                                       //
			// DEFAULT DEPENDECIES                                              //
			opt.bw = opt.startwidth / container.width();                        // 667
			opt.bh = opt.startheight / container.height();                      // 668
                                                                       //
			// IF THE ITEM ALREADY IN A RESIZED FORM                            //
			if (opt.width != opt.startwidth) {                                  // 671
                                                                       //
				opt.height = Math.round(opt.startheight * (opt.width / opt.startwidth));
                                                                       //
				container.height(opt.height);                                      // 675
			}                                                                   //
                                                                       //
			// LETS SEE IF THERE IS ANY SHADOW                                  //
			if (opt.shadow != 0) {                                              // 680
				container.parent().append('<div class="tp-bannershadow tp-shadow' + opt.shadow + '"></div>');
				var loff = 0;                                                      // 682
				if (opt.forceFullWidth == "on") loff = 0 - opt.container.parent().offset().left;
				container.parent().find('.tp-bannershadow').css({ 'width': opt.width, 'left': loff });
			}                                                                   //
                                                                       //
			container.find('ul').css({ 'display': 'none' });                    // 689
                                                                       //
			var fliparent = container;                                          // 691
                                                                       //
			// PREPARE THE SLIDES                                               //
			container.find('ul').css({ 'display': 'block' });                   // 695
			prepareSlides(container, opt);                                      // 696
			if (opt.parallax != "off") checkForParallax(container, opt);        // 697
                                                                       //
			// CREATE BULLETS                                                   //
			if (opt.slideamount > 1) createBullets(container, opt);             // 700
                                                                       //
			if (opt.slideamount > 1 && opt.navigationType == "thumb") createThumbs(container, opt);
			if (opt.slideamount > 1) createArrows(container, opt);              // 703
			if (opt.keyboardNavigation == "on") createKeyboard(container, opt);
                                                                       //
			swipeAction(container, opt);                                        // 707
                                                                       //
			if (opt.hideThumbs > 0) hideThumbs(container, opt);                 // 710
			setTimeout(function () {                                            // 711
				swapSlide(container, opt);                                         // 712
			}, opt.startDelay);                                                 //
			opt.startDelay = 0;                                                 // 714
			// START COUNTDOWN                                                  //
			if (opt.slideamount > 1) countDown(container, opt);                 // 716
			setTimeout(function () {                                            // 717
				container.trigger('revolution.slide.onloaded');                    // 718
			}, 500);                                                            //
                                                                       //
			/******************************                                     //
   	-	FULLSCREEN CHANGE	-                                              //
   ********************************/                                   //
			// FULLSCREEN MODE TESTING                                          //
			jQuery("body").data('rs-fullScreenMode', false);                    // 727
			jQuery(window).on('mozfullscreenchange webkitfullscreenchange fullscreenchange', function () {
				jQuery("body").data('rs-fullScreenMode', !jQuery("body").data('rs-fullScreenMode'));
				if (jQuery("body").data('rs-fullScreenMode')) {                    // 730
					setTimeout(function () {                                          // 731
						jQuery(window).trigger("resize");                                // 732
					}, 200);                                                          //
				}                                                                  //
			});                                                                 //
                                                                       //
			var resizid = "resize.revslider-" + container.attr('id');           // 739
                                                                       //
			// IF RESIZED, NEED TO STOP ACTUAL TRANSITION AND RESIZE ACTUAL IMAGES
			jQuery(window).on(resizid, function () {                            // 742
				if (container == undefined) return false;                          // 743
				if (jQuery('body').find(container) != 0) if (opt.forceFullWidth == "on") {
                                                                       //
					var loff = opt.container.closest('.forcefullwidth_wrapper_tp_banner').offset().left;
					//opt.container.parent().css({'width':jQuery(window).width()});   //
					opt.container.parent().css({ 'left': 0 - loff + "px", 'width': jQuery(window).width() });
				}                                                                  //
                                                                       //
				if (container.outerWidth(true) != opt.width || container.is(":hidden")) {
					containerResized(container, opt);                                 // 753
				}                                                                  //
			});                                                                 //
                                                                       //
			// HIDE THUMBS UNDER SIZE...                                        //
			try {                                                               // 762
				if (opt.hideThumbsUnderResoluition != 0 && opt.navigationType == "thumb") {
					if (opt.hideThumbsUnderResoluition > jQuery(window).width()) jQuery('.tp-bullets').css({ display: "none" });else jQuery('.tp-bullets').css({ display: "block" });
				}                                                                  //
			} catch (e) {}                                                      //
                                                                       //
			// CHECK IF THE CAPTION IS A "SCROLL ME TO POSITION" CAPTION IS     //
			//if (opt.fullScreen=="on") {                                       //
			container.find('.tp-scrollbelowslider').on('click', function () {   // 775
				var off = 0;                                                       // 776
				try {                                                              // 777
					off = jQuery('body').find(opt.fullScreenOffsetContainer).height();
				} catch (e) {}                                                     //
				try {                                                              // 780
					off = off - parseInt(jQuery(this).data('scrolloffset'), 0);       // 781
				} catch (e) {}                                                     //
                                                                       //
				jQuery('body,html').animate({ scrollTop: container.offset().top + container.find('>ul >li').height() - off + "px" }, { duration: 400 });
			});                                                                 //
			//}                                                                 //
                                                                       //
			// FIRST TIME STOP/START HIDE / SHOW SLIDER                         //
			//REMOVE AND SHOW SLIDER ON DEMAND                                  //
			var contpar = container.parent();                                   // 793
			if (jQuery(window).width() < opt.hideSliderAtLimit) {               // 794
				container.trigger('stoptimer');                                    // 795
				if (contpar.css('display') != "none") contpar.data('olddisplay', contpar.css('display'));
				contpar.css({ display: "none" });                                  // 798
			}                                                                   //
                                                                       //
			tabBlurringCheck(container, opt);                                   // 801
		}                                                                    //
	}                                                                     //
                                                                       //
	/******************************                                       //
 	-	MODULES	-                                                          //
 ********************************/                                     //
                                                                       //
	/////////////////////////////////////////                             //
	// main visibility API function                                       //
	// check if current tab is active or not                              //
	var vis = (function () {                                              // 817
		var stateKey,                                                        // 818
		    eventKey,                                                        //
		    keys = {                                                         //
			hidden: "visibilitychange",                                         // 821
			webkitHidden: "webkitvisibilitychange",                             // 822
			mozHidden: "mozvisibilitychange",                                   // 823
			msHidden: "msvisibilitychange"                                      // 824
		};                                                                   //
		for (stateKey in babelHelpers.sanitizeForInObject(keys)) {           // 826
			if (stateKey in document) {                                         // 827
				eventKey = keys[stateKey];                                         // 828
				break;                                                             // 829
			}                                                                   //
		}                                                                    //
		return function (c) {                                                // 832
			if (c) document.addEventListener(eventKey, c);                      // 833
			return !document[stateKey];                                         // 834
		};                                                                   //
	})();                                                                 //
                                                                       //
	var tabBlurringCheck = function (container, opt) {                    // 838
                                                                       //
		var notIE = document.documentMode === undefined,                     // 840
		    isChromium = window.chrome;                                      //
                                                                       //
		if (notIE && !isChromium) {                                          // 843
                                                                       //
			// checks for Firefox and other  NON IE Chrome versions             //
			jQuery(window).on("focusin", function () {                          // 846
				if (container == undefined) return false;                          // 847
                                                                       //
				setTimeout(function () {                                           // 849
					// TAB IS ACTIVE, WE CAN START ANY PART OF THE SLIDER             //
					if (opt.nextSlideOnWindowFocus == "on") container.revnext();      // 851
					container.revredraw();                                            // 852
				}, 300);                                                           //
			}).on("focusout", function () {                                     //
				// TAB IS NOT ACTIVE, WE CAN STOP ANY PART OF THE SLIDER           //
			});                                                                 //
		} else {                                                             //
                                                                       //
				// checks for IE and Chromium versions                             //
				if (window.addEventListener) {                                     // 862
                                                                       //
					// bind focus event                                               //
					window.addEventListener("focus", function (event) {               // 865
						if (container == undefined) return false;                        // 866
						setTimeout(function () {                                         // 867
							// TAB IS ACTIVE, WE CAN START ANY PART OF THE SLIDER           //
							if (opt.nextSlideOnWindowFocus == "on") container.revnext();    // 869
							container.revredraw();                                          // 870
						}, 300);                                                         //
					}, false);                                                        //
                                                                       //
					// bind blur event                                                //
					window.addEventListener("blur", function (event) {                // 876
						// TAB IS NOT ACTIVE, WE CAN STOP ANY PART OF THE SLIDER         //
					}, false);                                                        //
				} else {                                                           //
                                                                       //
					// bind focus event                                               //
					window.attachEvent("focus", function (event) {                    // 883
                                                                       //
						setTimeout(function () {                                         // 885
							if (container == undefined) return false;                       // 886
							// TAB IS ACTIVE, WE CAN START ANY PART OF THE SLIDER           //
							if (opt.nextSlideOnWindowFocus == "on") container.revnext();    // 888
							container.revredraw();                                          // 889
						}, 300);                                                         //
					});                                                               //
                                                                       //
					// bind focus event                                               //
					window.attachEvent("blur", function (event) {                     // 895
						// TAB IS NOT ACTIVE, WE CAN STOP ANY PART OF THE SLIDER         //
					});                                                               //
				}                                                                  //
			}                                                                   //
	};                                                                    //
                                                                       //
	///////////////////////////                                           //
	// GET THE URL PARAMETER //                                           //
	///////////////////////////                                           //
	var getUrlVars = function (hashdivider) {                             // 905
		var vars = [],                                                       // 907
		    hash;                                                            //
		var hashes = window.location.href.slice(window.location.href.indexOf(hashdivider) + 1).split('_');
		for (var i = 0; i < hashes.length; i++) {                            // 909
			hashes[i] = hashes[i].replace('%3D', "=");                          // 911
			hash = hashes[i].split('=');                                        // 912
			vars.push(hash[0]);                                                 // 913
			vars[hash[0]] = hash[1];                                            // 914
		}                                                                    //
		return vars;                                                         // 916
	};                                                                    //
                                                                       //
	//////////////////////////                                            //
	//	CONTAINER RESIZED	//                                               //
	/////////////////////////                                             //
	var containerResized = function (container, opt) {                    // 922
                                                                       //
		if (container == undefined) return false;                            // 924
		// HIDE THUMBS UNDER SIZE...                                         //
		try {                                                                // 926
			if (opt.hideThumbsUnderResoluition != 0 && opt.navigationType == "thumb") {
				if (opt.hideThumbsUnderResoluition > jQuery(window).width()) jQuery('.tp-bullets').css({ display: "none" });else jQuery('.tp-bullets').css({ display: "block" });
			}                                                                   //
		} catch (e) {}                                                       //
                                                                       //
		container.find('.defaultimg').each(function (i) {                    // 937
			setSize(jQuery(this), opt);                                         // 938
		});                                                                  //
                                                                       //
		//REMOVE AND SHOW SLIDER ON DEMAND                                   //
		var contpar = container.parent();                                    // 943
		if (jQuery(window).width() < opt.hideSliderAtLimit) {                // 944
			container.trigger('stoptimer');                                     // 945
			if (contpar.css('display') != "none") contpar.data('olddisplay', contpar.css('display'));
			contpar.css({ display: "none" });                                   // 948
		} else {                                                             //
                                                                       //
			if (container.is(":hidden")) {                                      // 952
				if (contpar.data('olddisplay') != undefined && contpar.data('olddisplay') != "undefined" && contpar.data('olddisplay') != "none") contpar.css({ display: contpar.data('olddisplay') });else contpar.css({ display: "block" });
				container.trigger('restarttimer');                                 // 957
				setTimeout(function () {                                           // 958
					containerResized(container, opt);                                 // 959
				}, 150);                                                           //
			}                                                                   //
		}                                                                    //
                                                                       //
		var loff = 0;                                                        // 965
		if (opt.forceFullWidth == "on") loff = 0 - opt.container.parent().offset().left;
		try {                                                                // 968
			container.parent().find('.tp-bannershadow').css({ 'width': opt.width, 'left': loff });
		} catch (e) {}                                                       //
                                                                       //
		var actsh = container.find('>ul >li:eq(' + opt.act + ') .slotholder');
		var nextsh = container.find('>ul >li:eq(' + opt.next + ') .slotholder');
		removeSlots(container, opt, container);                              // 974
		punchgs.TweenLite.set(nextsh.find('.defaultimg'), { opacity: 0 });   // 975
		actsh.find('.defaultimg').css({ 'opacity': 1 });                     // 976
                                                                       //
		nextsh.find('.defaultimg').each(function () {                        // 978
			var dimg = jQuery(this);                                            // 979
                                                                       //
			if (opt.panZoomDisableOnMobile == "on") {                           // 981
				// NO KEN BURNS ON MOBILE DEVICES                                  //
                                                                       //
			} else {                                                            //
					if (dimg.data('kenburn') != undefined) {                          // 985
						dimg.data('kenburn').restart();                                  // 986
						startKenBurn(container, opt, true);                              // 987
					}                                                                 //
				}                                                                  //
		});                                                                  //
                                                                       //
		var nextli = container.find('>ul >li:eq(' + opt.next + ')');         // 992
                                                                       //
		var arr = container.parent().find('.tparrows');                      // 996
		if (arr.hasClass("preview2")) arr.css({ width: parseInt(arr.css('minWidth'), 0) });
                                                                       //
		animateTheCaptions(nextli, opt, true);                               // 1001
		//restartBannerTimer(opt,container);                                 //
		setBulPos(container, opt);                                           // 1003
	};                                                                    //
                                                                       //
	/*********************************                                    //
 	-	CHECK IF BROWSER IS IE	-                                           //
 ********************************/                                     //
	var isIE = function (version, comparison) {                           // 1013
		var $div = jQuery('<div style="display:none;"/>').appendTo(jQuery('body'));
		$div.html('<!--[if ' + (comparison || '') + ' IE ' + (version || '') + ']><a>&nbsp;</a><![endif]-->');
		var ieTest = $div.find('a').length;                                  // 1016
		$div.remove();                                                       // 1017
		return ieTest;                                                       // 1018
	};                                                                    //
                                                                       //
	var callingNewSlide = function (opt, container) {                     // 1023
		// CHECK THE LOOPS !!                                                //
		if (opt.next == container.find('>ul >li').length - 1) {              // 1025
			opt.looptogo = opt.looptogo - 1;                                    // 1026
			if (opt.looptogo <= 0) opt.stopLoop = "on";                         // 1027
		}                                                                    //
		swapSlide(container, opt);                                           // 1030
	};                                                                    //
                                                                       //
	////////////////////////////////                                      //
	//	-	CREATE THE BULLETS -  //                                         //
	////////////////////////////////                                      //
	var createBullets = function (container, opt) {                       // 1042
		var starthidebullets = "hidebullets";                                // 1043
		if (opt.hideThumbs == 0) starthidebullets = "";                      // 1044
                                                                       //
		if (opt.navigationType == "bullet" || opt.navigationType == "both") {
			container.parent().append('<div class="tp-bullets ' + starthidebullets + ' simplebullets ' + opt.navigationStyle + '"></div>');
		}                                                                    //
                                                                       //
		var bullets = container.parent().find('.tp-bullets');                // 1050
		container.find('>ul:first >li').each(function (i) {                  // 1051
			var src = container.find(">ul:first >li:eq(" + i + ") img:first").attr('src');
			bullets.append('<div class="bullet"></div>');                       // 1053
			var bullet = bullets.find('.bullet:first');                         // 1054
		});                                                                  //
		// ADD THE BULLET CLICK FUNCTION HERE                                //
		bullets.find('.bullet').each(function (i) {                          // 1057
			var bul = jQuery(this);                                             // 1058
			if (i == opt.slideamount - 1) bul.addClass('last');                 // 1059
			if (i == 0) bul.addClass('first');                                  // 1060
                                                                       //
			bul.click(function () {                                             // 1062
				var sameslide = false,                                             // 1063
				    buli = bul.index();                                            //
                                                                       //
				if (opt.navigationArrows == "withbullet" || opt.navigationArrows == "nexttobullets") buli = bul.index() - 1;
                                                                       //
				if (buli == opt.act) sameslide = true;                             // 1069
                                                                       //
				if (opt.transition == 0 && !sameslide) {                           // 1071
					opt.next = buli;                                                  // 1072
					callingNewSlide(opt, container);                                  // 1073
				}                                                                  //
			});                                                                 //
		});                                                                  //
		bullets.append('<div class="tpclear"></div>');                       // 1078
		setBulPos(container, opt);                                           // 1079
	};                                                                    //
                                                                       //
	//////////////////////                                                //
	//	CREATE ARROWS	//                                                   //
	/////////////////////                                                 //
	var createArrows = function (container, opt) {                        // 1085
		var bullets = container.find('.tp-bullets'),                         // 1086
		    hidden = "",                                                     //
		    starthidearrows = "hidearrows",                                  //
		    arst = opt.navigationStyle;                                      //
                                                                       //
		if (opt.hideThumbs == 0) starthidearrows = "";                       // 1091
                                                                       //
		if (opt.navigationArrows == "none") hidden = "visibility:hidden;display:none";
		opt.soloArrowStyle = "default" + " " + opt.navigationStyle;          // 1095
                                                                       //
		if (opt.navigationArrows != "none" && opt.navigationArrows != "nexttobullets") arst = opt.soloArrowStyle;
                                                                       //
		function aArrow(dir) {                                               // 1099
			container.parent().append('<div style="' + hidden + '" class="tp-' + dir + 'arrow ' + starthidearrows + ' tparrows ' + arst + '"><div class="tp-arr-allwrapper"><div class="tp-arr-iwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-imgholder2"></div><div class="tp-arr-titleholder"></div><div class="tp-arr-subtitleholder"></div></div></div></div>');
		}                                                                    //
		aArrow("left");                                                      // 1102
		aArrow("right");                                                     // 1103
                                                                       //
		// 	THE LEFT / RIGHT BUTTON CLICK !	 //                              //
		container.parent().find('.tp-rightarrow').click(function () {        // 1106
			if (opt.transition == 0) {                                          // 1107
				if (container.data('showus') != undefined && container.data('showus') != -1) opt.next = container.data('showus') - 1;else opt.next = opt.next + 1;
				container.data('showus', -1);                                      // 1112
				if (opt.next >= opt.slideamount) opt.next = 0;                     // 1113
				if (opt.next < 0) opt.next = 0;                                    // 1114
                                                                       //
				if (opt.act != opt.next) callingNewSlide(opt, container);          // 1116
			}                                                                   //
		});                                                                  //
                                                                       //
		container.parent().find('.tp-leftarrow').click(function () {         // 1121
			if (opt.transition == 0) {                                          // 1122
				opt.next = opt.next - 1;                                           // 1123
				opt.leftarrowpressed = 1;                                          // 1124
				if (opt.next < 0) opt.next = opt.slideamount - 1;                  // 1125
				callingNewSlide(opt, container);                                   // 1126
			}                                                                   //
		});                                                                  //
                                                                       //
		setBulPos(container, opt);                                           // 1130
	};                                                                    //
                                                                       //
	//////////////////////////////////                                    //
	//	ENABLE KEYBOARD INTERACTION	//                                     //
	//////////////////////////////////                                    //
	var createKeyboard = function (container, opt) {                      // 1137
		// 	THE LEFT / RIGHT BUTTON CLICK !	 //                              //
		jQuery(document).keydown(function (e) {                              // 1139
			if (opt.transition == 0 && e.keyCode == 39) {                       // 1140
				if (container.data('showus') != undefined && container.data('showus') != -1) opt.next = container.data('showus') - 1;else opt.next = opt.next + 1;
				container.data('showus', -1);                                      // 1145
				if (opt.next >= opt.slideamount) opt.next = 0;                     // 1146
				if (opt.next < 0) opt.next = 0;                                    // 1147
				if (opt.act != opt.next) callingNewSlide(opt, container);          // 1148
			}                                                                   //
                                                                       //
			if (opt.transition == 0 && e.keyCode == 37) {                       // 1152
				opt.next = opt.next - 1;                                           // 1153
				opt.leftarrowpressed = 1;                                          // 1154
				if (opt.next < 0) opt.next = opt.slideamount - 1;                  // 1155
				callingNewSlide(opt, container);                                   // 1156
			}                                                                   //
		});                                                                  //
                                                                       //
		setBulPos(container, opt);                                           // 1160
	};                                                                    //
                                                                       //
	////////////////////////////                                          //
	// SET THE SWIPE FUNCTION //                                          //
	////////////////////////////                                          //
	var swipeAction = function (container, opt) {                         // 1167
		// TOUCH ENABLED SCROLL                                              //
		var aps = "vertical";                                                // 1169
                                                                       //
		if (opt.touchenabled == "on") {                                      // 1171
			if (opt.drag_block_vertical == true) aps = "none";                  // 1172
                                                                       //
			container.swipe({                                                   // 1175
				allowPageScroll: aps,                                              // 1176
				fingers: opt.swipe_min_touches,                                    // 1177
				treshold: opt.swipe_treshold,                                      // 1178
				swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
					switch (direction) {                                              // 1180
						case "left":                                                     // 1181
							if (opt.transition == 0) {                                      // 1182
								opt.next = opt.next + 1;                                       // 1183
								if (opt.next == opt.slideamount) opt.next = 0;                 // 1184
								callingNewSlide(opt, container);                               // 1185
							}                                                               //
							break;                                                          // 1187
						case "right":                                                    // 1188
							if (opt.transition == 0) {                                      // 1189
								opt.next = opt.next - 1;                                       // 1190
								opt.leftarrowpressed = 1;                                      // 1191
								if (opt.next < 0) opt.next = opt.slideamount - 1;              // 1192
								callingNewSlide(opt, container);                               // 1193
							}                                                               //
							break;                                                          // 1195
						case "up":                                                       // 1195
							if (aps == "none") jQuery("html, body").animate({ scrollTop: container.offset().top + container.height() + "px" });
							break;                                                          // 1199
						case "down":                                                     // 1200
							if (aps == "none") jQuery("html, body").animate({ scrollTop: container.offset().top - jQuery(window).height() + "px" });
							break;                                                          // 1203
					}                                                                 // 1203
				}                                                                  //
			});                                                                 //
		}                                                                    //
	};                                                                    //
                                                                       //
	////////////////////////////////////////////////////////////////      //
	// SHOW AND HIDE THE THUMBS IF MOUE GOES OUT OF THE BANNER  ///       //
	//////////////////////////////////////////////////////////////        //
	var hideThumbs = function (container, opt) {                          // 1218
                                                                       //
		var bullets = container.parent().find('.tp-bullets'),                // 1220
		    ca = container.parent().find('.tparrows');                       //
                                                                       //
		if (bullets == null) {                                               // 1223
			container.append('<div class=".tp-bullets"></div>');                // 1224
			var bullets = container.parent().find('.tp-bullets');               // 1225
		}                                                                    //
                                                                       //
		if (ca == null) {                                                    // 1228
			container.append('<div class=".tparrows"></div>');                  // 1229
			var ca = container.parent().find('.tparrows');                      // 1230
		}                                                                    //
                                                                       //
		//var bp = (thumbs.parent().outerHeight(true) - opt.height)/2;       //
                                                                       //
		//	ADD THUMBNAIL IMAGES FOR THE BULLETS //                           //
		container.data('hideThumbs', opt.hideThumbs);                        // 1237
                                                                       //
		bullets.addClass("hidebullets");                                     // 1239
		ca.addClass("hidearrows");                                           // 1240
                                                                       //
		if (is_mobile()) {                                                   // 1242
			try {                                                               // 1243
				container.hammer().on('touch', function () {                       // 1244
					container.addClass("hovered");                                    // 1245
					if (opt.onHoverStop == "on") container.trigger('stoptimer');      // 1246
					clearTimeout(container.data('hideThumbs'));                       // 1248
					bullets.removeClass("hidebullets");                               // 1249
					ca.removeClass("hidearrows");                                     // 1250
				});                                                                //
                                                                       //
				container.hammer().on('release', function () {                     // 1255
					container.removeClass("hovered");                                 // 1256
					container.trigger('starttimer');                                  // 1257
					if (!container.hasClass("hovered") && !bullets.hasClass("hovered")) container.data('hideThumbs', setTimeout(function () {
						bullets.addClass("hidebullets");                                 // 1260
						ca.addClass("hidearrows");                                       // 1261
						container.trigger('starttimer');                                 // 1262
					}, opt.hideNavDelayOnMobile));                                    //
				});                                                                //
			} catch (e) {}                                                      //
		} else {                                                             //
			bullets.hover(function () {                                         // 1268
				opt.overnav = true;                                                // 1269
				if (opt.onHoverStop == "on") container.trigger('stoptimer');       // 1270
				bullets.addClass("hovered");                                       // 1272
				clearTimeout(container.data('hideThumbs'));                        // 1273
				bullets.removeClass("hidebullets");                                // 1274
				ca.removeClass("hidearrows");                                      // 1275
			}, function () {                                                    //
				opt.overnav = false;                                               // 1278
				container.trigger('starttimer');                                   // 1279
				bullets.removeClass("hovered");                                    // 1280
				if (!container.hasClass("hovered") && !bullets.hasClass("hovered")) container.data('hideThumbs', setTimeout(function () {
					bullets.addClass("hidebullets");                                  // 1283
					ca.addClass("hidearrows");                                        // 1284
				}, opt.hideThumbs));                                               //
			});                                                                 //
                                                                       //
			ca.hover(function () {                                              // 1289
				opt.overnav = true;                                                // 1290
				if (opt.onHoverStop == "on") container.trigger('stoptimer');       // 1291
				bullets.addClass("hovered");                                       // 1293
				clearTimeout(container.data('hideThumbs'));                        // 1294
				bullets.removeClass("hidebullets");                                // 1295
				ca.removeClass("hidearrows");                                      // 1296
			}, function () {                                                    //
				opt.overnav = false;                                               // 1300
				container.trigger('starttimer');                                   // 1301
				bullets.removeClass("hovered");                                    // 1302
			});                                                                 //
                                                                       //
			container.on('mouseenter', function () {                            // 1307
				container.addClass("hovered");                                     // 1308
				if (opt.onHoverStop == "on") container.trigger('stoptimer');       // 1309
				clearTimeout(container.data('hideThumbs'));                        // 1311
				bullets.removeClass("hidebullets");                                // 1312
				ca.removeClass("hidearrows");                                      // 1313
			});                                                                 //
                                                                       //
			container.on('mouseleave', function () {                            // 1318
				container.removeClass("hovered");                                  // 1319
				container.trigger('starttimer');                                   // 1320
				if (!container.hasClass("hovered") && !bullets.hasClass("hovered")) container.data('hideThumbs', setTimeout(function () {
					bullets.addClass("hidebullets");                                  // 1323
					ca.addClass("hidearrows");                                        // 1324
				}, opt.hideThumbs));                                               //
			});                                                                 //
		}                                                                    //
	};                                                                    //
                                                                       //
	//////////////////////////////                                        //
	//	SET POSITION OF BULLETS	//                                         //
	//////////////////////////////                                        //
	var setBulPos = function (container, opt) {                           // 1336
		var topcont = container.parent();                                    // 1337
		var bullets = topcont.find('.tp-bullets');                           // 1338
                                                                       //
		if (opt.navigationType == "thumb") {                                 // 1340
			bullets.find('.thumb').each(function (i) {                          // 1341
				var thumb = jQuery(this);                                          // 1342
                                                                       //
				thumb.css({ 'width': opt.thumbWidth * opt.bw + "px", 'height': opt.thumbHeight * opt.bh + "px" });
			});                                                                 //
			var bup = bullets.find('.tp-mask');                                 // 1347
                                                                       //
			bup.width(opt.thumbWidth * opt.thumbAmount * opt.bw);               // 1349
			bup.height(opt.thumbHeight * opt.bh);                               // 1350
			bup.parent().width(opt.thumbWidth * opt.thumbAmount * opt.bw);      // 1351
			bup.parent().height(opt.thumbHeight * opt.bh);                      // 1352
		}                                                                    //
                                                                       //
		var tl = topcont.find('.tp-leftarrow');                              // 1356
		var tr = topcont.find('.tp-rightarrow');                             // 1357
                                                                       //
		if (opt.navigationType == "thumb" && opt.navigationArrows == "nexttobullets") opt.navigationArrows = "solo";
		// IM CASE WE HAVE NAVIGATION BULLETS TOGETHER WITH ARROWS           //
		if (opt.navigationArrows == "nexttobullets") {                       // 1361
			tl.prependTo(bullets).css({ 'float': 'left' });                     // 1362
			tr.insertBefore(bullets.find('.tpclear')).css({ 'float': 'left' });
		}                                                                    //
		var loff = 0;                                                        // 1365
		if (opt.forceFullWidth == "on") loff = 0 - opt.container.parent().offset().left;
                                                                       //
		var gridposX = 0,                                                    // 1369
		    gridposY = 0;                                                    //
                                                                       //
		if (opt.navigationInGrid == "on") {                                  // 1372
			gridposX = container.width() > opt.startwidth ? (container.width() - opt.startwidth) / 2 : 0, gridposY = container.height() > opt.startheight ? (container.height() - opt.startheight) / 2 : 0;
		}                                                                    //
                                                                       //
		if (opt.navigationArrows != "none" && opt.navigationArrows != "nexttobullets") {
			var lv = opt.soloArrowLeftValign,                                   // 1380
			    lh = opt.soloArrowLeftHalign,                                   //
			    rv = opt.soloArrowRightValign,                                  //
			    rh = opt.soloArrowRightHalign,                                  //
			    lvo = opt.soloArrowLeftVOffset,                                 //
			    lho = opt.soloArrowLeftHOffset,                                 //
			    rvo = opt.soloArrowRightVOffset,                                //
			    rho = opt.soloArrowRightHOffset;                                //
                                                                       //
			tl.css({ 'position': 'absolute' });                                 // 1389
			tr.css({ 'position': 'absolute' });                                 // 1390
                                                                       //
			if (lv == "center") tl.css({ 'top': '50%', 'marginTop': lvo - Math.round(tl.innerHeight() / 2) + "px" });else if (lv == "bottom") tl.css({ 'top': 'auto', 'bottom': 0 + lvo + "px" });else if (lv == "top") tl.css({ 'bottom': 'auto', 'top': 0 + lvo + "px" });
                                                                       //
			if (lh == "center") tl.css({ 'left': '50%', 'marginLeft': loff + lho - Math.round(tl.innerWidth() / 2) + "px" });else if (lh == "left") tl.css({ 'left': gridposX + lho + loff + "px" });else if (lh == "right") tl.css({ 'right': gridposX + lho - loff + "px" });
                                                                       //
			if (rv == "center") tr.css({ 'top': '50%', 'marginTop': rvo - Math.round(tr.innerHeight() / 2) + "px" });else if (rv == "bottom") tr.css({ 'top': 'auto', 'bottom': 0 + rvo + "px" });else if (rv == "top") tr.css({ 'bottom': 'auto', 'top': 0 + rvo + "px" });
                                                                       //
			if (rh == "center") tr.css({ 'left': '50%', 'marginLeft': loff + rho - Math.round(tr.innerWidth() / 2) + "px" });else if (rh == "left") tr.css({ 'left': gridposX + rho + loff + "px" });else if (rh == "right") tr.css({ 'right': gridposX + rho - loff + "px" });
                                                                       //
			if (tl.position() != null) tl.css({ 'top': Math.round(parseInt(tl.position().top, 0)) + "px" });
                                                                       //
			if (tr.position() != null) tr.css({ 'top': Math.round(parseInt(tr.position().top, 0)) + "px" });
		}                                                                    //
                                                                       //
		if (opt.navigationArrows == "none") {                                // 1424
			tl.css({ 'visibility': 'hidden' });                                 // 1425
			tr.css({ 'visibility': 'hidden' });                                 // 1426
		}                                                                    //
                                                                       //
		// SET THE POSITIONS OF THE BULLETS // THUMBNAILS                    //
		var nv = opt.navigationVAlign,                                       // 1430
		    nh = opt.navigationHAlign,                                       //
		    nvo = opt.navigationVOffset * opt.bh,                            //
		    nho = opt.navigationHOffset * opt.bw;                            //
                                                                       //
		if (nv == "center") bullets.css({ 'top': '50%', 'marginTop': nvo - Math.round(bullets.innerHeight() / 2) + "px" });
		if (nv == "bottom") bullets.css({ 'bottom': 0 + nvo + "px" });       // 1436
		if (nv == "top") bullets.css({ 'top': 0 + nvo + "px" });             // 1437
                                                                       //
		if (nh == "center") bullets.css({ 'left': '50%', 'marginLeft': loff + nho - Math.round(bullets.innerWidth() / 2) + "px" });
		if (nh == "left") bullets.css({ 'left': 0 + nho + loff + "px" });    // 1440
		if (nh == "right") bullets.css({ 'right': 0 + nho - loff + "px" });  // 1441
	};                                                                    //
                                                                       //
	/*******************************************************              //
 	-	HANDLING OF PREVIEWS AND CUSTOM PREVIEWS	-                         //
 *******************************************************/              //
                                                                       //
	var handleSpecialPreviews = function (opt) {                          // 1449
                                                                       //
		var container = opt.container;                                       // 1451
		// FILL WITH INFOS THE NAVIGATION ARROWS                             //
		opt.beforli = opt.next - 1;                                          // 1453
		opt.comingli = opt.next + 1;                                         // 1454
                                                                       //
		if (opt.beforli < 0) opt.beforli = opt.slideamount - 1;              // 1456
		if (opt.comingli >= opt.slideamount) opt.comingli = 0;               // 1457
                                                                       //
		var comingli = container.find('>ul:first-child >li:eq(' + opt.comingli + ')'),
		    beforli = container.find('>ul:first-child >li:eq(' + opt.beforli + ')'),
		    previmgsrc = beforli.find('.defaultimg').attr('src'),            //
		    nextimgsrc = comingli.find('.defaultimg').attr('src');           //
                                                                       //
		// SAVE REFERENCES                                                   //
		if (opt.arr == undefined) {                                          // 1465
			opt.arr = container.parent().find('.tparrows'), opt.rar = container.parent().find('.tp-rightarrow'), opt.lar = container.parent().find('.tp-leftarrow'), opt.raimg = opt.rar.find('.tp-arr-imgholder'), opt.laimg = opt.lar.find('.tp-arr-imgholder'), opt.raimg_b = opt.rar.find('.tp-arr-imgholder2'), opt.laimg_b = opt.lar.find('.tp-arr-imgholder2'), opt.ratit = opt.rar.find('.tp-arr-titleholder'), opt.latit = opt.lar.find('.tp-arr-titleholder');
		}                                                                    //
                                                                       //
		// READ REFERENCES                                                   //
		var arr = opt.arr,                                                   // 1478
		    rar = opt.rar,                                                   //
		    lar = opt.lar,                                                   //
		    raimg = opt.raimg,                                               //
		    laimg = opt.laimg,                                               //
		    raimg_b = opt.raimg_b,                                           //
		    laimg_b = opt.laimg_b,                                           //
		    ratit = opt.ratit,                                               //
		    latit = opt.latit;                                               //
                                                                       //
		if (comingli.data('title') != undefined) ratit.html(comingli.data('title'));
		if (beforli.data('title') != undefined) latit.html(beforli.data('title'));
                                                                       //
		if (rar.hasClass("itishovered")) {                                   // 1493
			rar.width(ratit.outerWidth(true) + parseInt(rar.css('minWidth'), 0));
		}                                                                    //
                                                                       //
		if (lar.hasClass("itishovered")) {                                   // 1497
			lar.width(latit.outerWidth(true) + parseInt(lar.css('minWidth'), 0));
		}                                                                    //
                                                                       //
		if (arr.hasClass("preview2") && !arr.hasClass("hashoveralready")) {  // 1501
                                                                       //
			arr.addClass("hashoveralready");                                    // 1503
                                                                       //
			if (!is_mobile()) arr.hover(function () {                           // 1505
                                                                       //
				var arr = jQuery(this),                                            // 1508
				    th = arr.find('.tp-arr-titleholder');                          //
				if (jQuery(window).width() > 767) arr.width(th.outerWidth(true) + parseInt(arr.css('minWidth'), 0));
				arr.addClass("itishovered");                                       // 1512
			}, function () {                                                    //
				var arr = jQuery(this),                                            // 1514
				    th = arr.find('.tp-arr-titleholder');                          //
				arr.css({ width: parseInt(arr.css('minWidth'), 0) });              // 1516
				arr.removeClass("itishovered");                                    // 1517
			});else {                                                           //
				var arr = jQuery(this),                                            // 1520
				    th = arr.find('.tp-arr-titleholder');                          //
				th.addClass("alwayshidden");                                       // 1522
				punchgs.TweenLite.set(th, { autoAlpha: 0 });                       // 1523
			}                                                                   //
		}                                                                    //
                                                                       //
		if (beforli.data('thumb') != undefined) previmgsrc = beforli.data('thumb');
		if (comingli.data('thumb') != undefined) nextimgsrc = comingli.data('thumb');
                                                                       //
		// CHANGE THE IMAGE SOURCE (AND ANIMATE IF PREVIEW4 MODE IS ON       //
		if (!arr.hasClass("preview4")) {                                     // 1533
                                                                       //
			punchgs.TweenLite.to(raimg, 0.5, { autoAlpha: 0, onComplete: function () {
					raimg.css({ 'backgroundImage': 'url(' + nextimgsrc + ')' });      // 1536
					laimg.css({ 'backgroundImage': 'url(' + previmgsrc + ')' });      // 1537
				} });                                                              //
			punchgs.TweenLite.to(laimg, 0.5, { autoAlpha: 0, onComplete: function () {
					punchgs.TweenLite.to(raimg, 0.5, { autoAlpha: 1, delay: 0.2 });   // 1540
					punchgs.TweenLite.to(laimg, 0.5, { autoAlpha: 1, delay: 0.2 });   // 1541
				} });                                                              //
		} else {                                                             //
                                                                       //
			raimg_b.css({ 'backgroundImage': 'url(' + nextimgsrc + ')' });      // 1545
			laimg_b.css({ 'backgroundImage': 'url(' + previmgsrc + ')' });      // 1546
                                                                       //
			punchgs.TweenLite.fromTo(raimg_b, 0.8, { force3D: punchgs.force3d, x: 0 }, { x: -raimg.width(), ease: punchgs.Power3.easeOut, delay: 1, onComplete: function () {
					raimg.css({ 'backgroundImage': 'url(' + nextimgsrc + ')' });      // 1549
					punchgs.TweenLite.set(raimg_b, { x: 0 });                         // 1550
				} });                                                              //
			punchgs.TweenLite.fromTo(laimg_b, 0.8, { force3D: punchgs.force3d, x: 0 }, { x: raimg.width(), ease: punchgs.Power3.easeOut, delay: 1, onComplete: function () {
					laimg.css({ 'backgroundImage': 'url(' + previmgsrc + ')' });      // 1553
					punchgs.TweenLite.set(laimg_b, { x: 0 });                         // 1554
				} });                                                              //
                                                                       //
			punchgs.TweenLite.fromTo(raimg, 0.8, { x: 0 }, { force3D: punchgs.force3d, x: -raimg.width(), ease: punchgs.Power3.easeOut, delay: 1, onComplete: function () {
					punchgs.TweenLite.set(raimg, { x: 0 });                           // 1560
				} });                                                              //
			punchgs.TweenLite.fromTo(laimg, 0.8, { x: 0 }, { force3D: punchgs.force3d, x: raimg.width(), ease: punchgs.Power3.easeOut, delay: 1, onComplete: function () {
					punchgs.TweenLite.set(laimg, { x: 0 });                           // 1563
				} });                                                              //
		}                                                                    //
                                                                       //
		// HOVER EFFECTS ARE SPECIAL ON PREVIEW4                             //
		if (rar.hasClass("preview4") && !rar.hasClass("hashoveralready")) {  // 1568
                                                                       //
			rar.addClass("hashoveralready");                                    // 1570
			rar.hover(function () {                                             // 1571
				var iw = jQuery(this).find('.tp-arr-iwrapper');                    // 1572
				var all = jQuery(this).find('.tp-arr-allwrapper');                 // 1573
				punchgs.TweenLite.fromTo(iw, 0.4, { x: iw.width() }, { x: 0, delay: 0.3, ease: punchgs.Power3.easeOut, overwrite: "all" });
				punchgs.TweenLite.to(all, 0.2, { autoAlpha: 1, overwrite: "all" });
			}, function () {                                                    //
				var iw = jQuery(this).find('.tp-arr-iwrapper');                    // 1578
				var all = jQuery(this).find('.tp-arr-allwrapper');                 // 1579
				punchgs.TweenLite.to(iw, 0.4, { x: iw.width(), ease: punchgs.Power3.easeOut, delay: 0.2, overwrite: "all" });
				punchgs.TweenLite.to(all, 0.2, { delay: 0.6, autoAlpha: 0, overwrite: "all" });
			});                                                                 //
                                                                       //
			lar.hover(function () {                                             // 1585
				var iw = jQuery(this).find('.tp-arr-iwrapper');                    // 1586
				var all = jQuery(this).find('.tp-arr-allwrapper');                 // 1587
				punchgs.TweenLite.fromTo(iw, 0.4, { x: 0 - iw.width() }, { x: 0, delay: 0.3, ease: punchgs.Power3.easeOut, overwrite: "all" });
				punchgs.TweenLite.to(all, 0.2, { autoAlpha: 1, overwrite: "all" });
			}, function () {                                                    //
				var iw = jQuery(this).find('.tp-arr-iwrapper');                    // 1592
				var all = jQuery(this).find('.tp-arr-allwrapper');                 // 1593
				punchgs.TweenLite.to(iw, 0.4, { x: 0 - iw.width(), ease: punchgs.Power3.easeOut, delay: 0.2, overwrite: "all" });
				punchgs.TweenLite.to(all, 0.2, { delay: 0.6, autoAlpha: 0, overwrite: "all" });
			});                                                                 //
		}                                                                    //
		// END OF NAVIGATION ARROW CONTENT FILLING                           //
	};                                                                    //
	//////////////////////////////////////////////////////////            //
	//	-	SET THE IMAGE SIZE TO FIT INTO THE CONTIANER -  //               //
	////////////////////////////////////////////////////////              //
	var setSize = function (img, opt) {                                   // 1605
                                                                       //
		opt.container.closest('.forcefullwidth_wrapper_tp_banner').find('.tp-fullwidth-forcer').css({ 'height': opt.container.height() });
		opt.container.closest('.rev_slider_wrapper').css({ 'height': opt.container.height() });
                                                                       //
		opt.width = parseInt(opt.container.width(), 0);                      // 1612
		opt.height = parseInt(opt.container.height(), 0);                    // 1613
                                                                       //
		opt.bw = opt.width / opt.startwidth;                                 // 1617
		opt.bh = opt.height / opt.startheight;                               // 1618
                                                                       //
		if (opt.bh > opt.bw) opt.bh = opt.bw;                                // 1620
		if (opt.bh < opt.bw) opt.bw = opt.bh;                                // 1621
		if (opt.bw < opt.bh) opt.bh = opt.bw;                                // 1622
		if (opt.bh > 1) {                                                    // 1623
			opt.bw = 1;opt.bh = 1;                                              // 1623
		}                                                                    //
		if (opt.bw > 1) {                                                    // 1624
			opt.bw = 1;opt.bh = 1;                                              // 1624
		}                                                                    //
                                                                       //
		//opt.height= opt.startheight * opt.bh;                              //
		opt.height = Math.round(opt.startheight * (opt.width / opt.startwidth));
                                                                       //
		if (opt.height > opt.startheight && opt.autoHeight != "on") opt.height = opt.startheight;
                                                                       //
		if (opt.fullScreen == "on") {                                        // 1634
			opt.height = opt.bw * opt.startheight;                              // 1635
			var cow = opt.container.parent().width();                           // 1636
			var coh = jQuery(window).height();                                  // 1637
                                                                       //
			if (opt.fullScreenOffsetContainer != undefined) {                   // 1639
				try {                                                              // 1640
					var offcontainers = opt.fullScreenOffsetContainer.split(",");     // 1641
					jQuery.each(offcontainers, function (index, searchedcont) {       // 1642
						coh = coh - jQuery(searchedcont).outerHeight(true);              // 1643
						if (coh < opt.minFullScreenHeight) coh = opt.minFullScreenHeight;
					});                                                               //
				} catch (e) {}                                                     //
                                                                       //
				try {                                                              // 1648
                                                                       //
					if (opt.fullScreenOffset.split("%").length > 1 && opt.fullScreenOffset != undefined && opt.fullScreenOffset.length > 0) {
                                                                       //
						coh = coh - jQuery(window).height() * parseInt(opt.fullScreenOffset, 0) / 100;
					} else {                                                          //
						if (opt.fullScreenOffset != undefined && opt.fullScreenOffset.length > 0) coh = coh - parseInt(opt.fullScreenOffset, 0);
					}                                                                 //
                                                                       //
					if (coh < opt.minFullScreenHeight) coh = opt.minFullScreenHeight;
				} catch (e) {}                                                     //
			}                                                                   //
                                                                       //
			opt.container.parent().height(coh);                                 // 1664
                                                                       //
			opt.container.closest('.rev_slider_wrapper').height(coh);           // 1666
			opt.container.css({ 'height': '100%' });                            // 1667
                                                                       //
			opt.height = coh;                                                   // 1669
			if (opt.minHeight != undefined && opt.height < opt.minHeight) opt.height = opt.minHeight;
		} else {                                                             //
			if (opt.minHeight != undefined && opt.height < opt.minHeight) opt.height = opt.minHeight;
                                                                       //
			opt.container.height(opt.height);                                   // 1676
		}                                                                    //
                                                                       //
		opt.slotw = Math.ceil(opt.width / opt.slots);                        // 1680
                                                                       //
		if (opt.fullScreen == "on") opt.sloth = Math.ceil(jQuery(window).height() / opt.slots);else opt.sloth = Math.ceil(opt.height / opt.slots);
                                                                       //
		if (opt.autoHeight == "on") opt.sloth = Math.ceil(img.height() / opt.slots);
	};                                                                    //
                                                                       //
	/////////////////////////////////////////                             //
	//	-	PREPARE THE SLIDES / SLOTS -  //                                 //
	///////////////////////////////////////                               //
	var prepareSlides = function (container, opt) {                       // 1701
                                                                       //
		container.find('.tp-caption').each(function () {                     // 1703
			jQuery(this).addClass(jQuery(this).data('transition'));jQuery(this).addClass('start');
		});                                                                  //
                                                                       //
		// PREPARE THE UL CONTAINER TO HAVEING MAX HEIGHT AND HEIGHT FOR ANY SITUATION
		container.find('>ul:first').css({ overflow: 'hidden', width: '100%', height: '100%', maxHeight: container.parent().css('maxHeight') }).addClass("tp-revslider-mainul");
		if (opt.autoHeight == "on") {                                        // 1707
			container.find('>ul:first').css({ overflow: 'hidden', width: '100%', height: '100%', maxHeight: "none" });
			container.css({ 'maxHeight': 'none' });                             // 1709
			container.parent().css({ 'maxHeight': 'none' });                    // 1710
		}                                                                    //
                                                                       //
		container.find('>ul:first >li').each(function (j) {                  // 1713
			var li = jQuery(this);                                              // 1714
			li.addClass("tp-revslider-slidesli");                               // 1715
                                                                       //
			// MAKE LI OVERFLOW HIDDEN FOR FURTHER ISSUES                       //
			li.css({ 'width': '100%', 'height': '100%', 'overflow': 'hidden' });
                                                                       //
			// IF LINK ON SLIDE EXISTS, NEED TO CREATE A PROPER LAYER FOR IT.   //
			if (li.data('link') != undefined) {                                 // 1721
				var link = li.data('link');                                        // 1722
				var target = "_self";                                              // 1723
				var zindex = 60;                                                   // 1724
				if (li.data('slideindex') == "back") zindex = 0;                   // 1725
				var linktoslide = checksl = li.data('linktoslide');                // 1726
				if (linktoslide != undefined) {                                    // 1727
					if (linktoslide != "next" && linktoslide != "prev") container.find('>ul:first-child >li').each(function () {
						var t = jQuery(this);                                            // 1730
						if (t.data('origindex') + 1 == checksl) linktoslide = t.index() + 1;
					});                                                               //
				}                                                                  //
				if (li.data('target') != undefined) target = li.data('target');    // 1734
				if (link != "slide") linktoslide = "no";                           // 1735
				var apptxt = '<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:' + zindex + ';" data-x="center" data-y="center" data-linktoslide="' + linktoslide + '" data-start="0"><a style="width:100%;height:100%;display:block"';
				if (link != "slide") apptxt = apptxt + ' target="' + target + '" href="' + link + '"';
				apptxt = apptxt + '><span style="width:100%;height:100%;display:block"></span></a></div>';
                                                                       //
				li.append(apptxt);                                                 // 1740
			}                                                                   //
		});                                                                  //
                                                                       //
		// RESOLVE OVERFLOW HIDDEN OF MAIN CONTAINER                         //
		container.parent().css({ 'overflow': 'visible' });                   // 1745
                                                                       //
		container.find('>ul:first >li >img').each(function (j) {             // 1748
                                                                       //
			var img = jQuery(this);                                             // 1750
                                                                       //
			img.addClass('defaultimg');                                         // 1752
			if (img.data('lazyload') != undefined && img.data('lazydone') != 1) {} else {
				setSize(img, opt);                                                 // 1756
			}                                                                   //
                                                                       //
			if (isIE(8)) {                                                      // 1759
				img.data('kenburns', "off");                                       // 1760
			}                                                                   //
                                                                       //
			// TURN OF KEN BURNS IF WE ARE ON MOBILE AND IT IS WISHED SO        //
			if (opt.panZoomDisableOnMobile == "on" && is_mobile()) {            // 1764
				img.data('kenburns', "off");                                       // 1765
				img.data('bgfit', "cover");                                        // 1766
			}                                                                   //
                                                                       //
			img.wrap('<div class="slotholder" style="width:100%;height:100%;"' + 'data-duration="' + img.data('duration') + '"' + 'data-zoomstart="' + img.data("zoomstart") + '"' + 'data-zoomend="' + img.data("zoomend") + '"' + 'data-rotationstart="' + img.data("rotationstart") + '"' + 'data-rotationend="' + img.data("rotationend") + '"' + 'data-ease="' + img.data("ease") + '"' + 'data-duration="' + img.data("duration") + '"' + 'data-bgpositionend="' + img.data("bgpositionend") + '"' + 'data-bgposition="' + img.data("bgposition") + '"' + 'data-duration="' + img.data("duration") + '"' + 'data-kenburns="' + img.data("kenburns") + '"' + 'data-easeme="' + img.data("ease") + '"' + 'data-bgfit="' + img.data("bgfit") + '"' + 'data-bgfitend="' + img.data("bgfitend") + '"' + 'data-owidth="' + img.data("owidth") + '"' + 'data-oheight="' + img.data("oheight") + '"' + '></div>');
                                                                       //
			if (opt.dottedOverlay != "none" && opt.dottedOverlay != undefined) img.closest('.slotholder').append('<div class="tp-dottedoverlay ' + opt.dottedOverlay + '"></div>');
                                                                       //
			var src = img.attr('src'),                                          // 1791
			    ll = img.data('lazyload'),                                      //
			    bgfit = img.data('bgfit'),                                      //
			    bgrepeat = img.data('bgrepeat'),                                //
			    bgposition = img.data('bgposition');                            //
                                                                       //
			if (bgfit == undefined) bgfit = "cover";                            // 1798
			if (bgrepeat == undefined) bgrepeat = "no-repeat";                  // 1799
			if (bgposition == undefined) bgposition = "center center";          // 1800
                                                                       //
			var pari = img.closest('.slotholder');                              // 1803
			img.replaceWith('<div class="tp-bgimg defaultimg" data-lazyload="' + img.data('lazyload') + '" data-bgfit="' + bgfit + '"data-bgposition="' + bgposition + '" data-bgrepeat="' + bgrepeat + '" data-lazydone="' + img.data('lazydone') + '" src="' + src + '" data-src="' + src + '" style="background-color:' + img.css("backgroundColor") + ';background-repeat:' + bgrepeat + ';background-image:url(' + src + ');background-size:' + bgfit + ';background-position:' + bgposition + ';width:100%;height:100%;"></div>');
                                                                       //
			if (isIE(8)) {                                                      // 1806
				pari.find('.tp-bgimg').css({ backgroundImage: "none", 'background-image': 'none' });
				pari.find('.tp-bgimg').append('<img class="ieeightfallbackimage defaultimg" src="' + src + '" style="width:100%">');
			}                                                                   //
                                                                       //
			img.css({ 'opacity': 0 });                                          // 1811
			img.data('li-id', j);                                               // 1812
		});                                                                  //
	};                                                                    //
                                                                       //
	///////////////////////                                               //
	// PREPARE THE SLIDE //                                               //
	//////////////////////                                                //
	var prepareOneSlide = function (slotholder, opt, visible, vorh) {     // 1821
                                                                       //
		var sh = slotholder,                                                 // 1823
		    img = sh.find('.defaultimg'),                                    //
		    scalestart = sh.data('zoomstart'),                               //
		    rotatestart = sh.data('rotationstart');                          //
                                                                       //
		if (img.data('currotate') != undefined) rotatestart = img.data('currotate');
		if (img.data('curscale') != undefined && vorh == "box") scalestart = img.data('curscale') * 100;else if (img.data('curscale') != undefined) scalestart = img.data('curscale');
                                                                       //
		setSize(img, opt);                                                   // 1836
                                                                       //
		var src = img.data('src'),                                           // 1838
		    bgcolor = img.css('backgroundColor'),                            //
		    w = opt.width,                                                   //
		    h = opt.height,                                                  //
		    fulloff = img.data("fxof"),                                      //
		    fullyoff = 0;                                                    //
                                                                       //
		if (opt.autoHeight == "on") h = opt.container.height();              // 1845
		if (fulloff == undefined) fulloff = 0;                               // 1846
                                                                       //
		var off = 0,                                                         // 1850
		    bgfit = img.data('bgfit'),                                       //
		    bgrepeat = img.data('bgrepeat'),                                 //
		    bgposition = img.data('bgposition');                             //
                                                                       //
		if (bgfit == undefined) bgfit = "cover";                             // 1855
		if (bgrepeat == undefined) bgrepeat = "no-repeat";                   // 1856
		if (bgposition == undefined) bgposition = "center center";           // 1857
                                                                       //
		if (isIE(8)) {                                                       // 1859
			sh.data('kenburns', "off");                                         // 1860
			var imgsrc = src;                                                   // 1861
			src = "";                                                           // 1862
		}                                                                    //
                                                                       //
		switch (vorh) {                                                      // 1865
			// BOX ANIMATION PREPARING                                          //
			case "box":                                                         // 1867
				// SET THE MINIMAL SIZE OF A BOX                                   //
				var basicsize = 0,                                                 // 1869
				    x = 0,                                                         //
				    y = 0;                                                         //
                                                                       //
				if (opt.sloth > opt.slotw) basicsize = opt.sloth;else basicsize = opt.slotw;
                                                                       //
				if (!visible) {                                                    // 1878
					var off = 0 - basicsize;                                          // 1879
				}                                                                  //
                                                                       //
				opt.slotw = basicsize;                                             // 1882
				opt.sloth = basicsize;                                             // 1883
				var x = 0;                                                         // 1884
				var y = 0;                                                         // 1885
                                                                       //
				if (sh.data('kenburns') == "on") {                                 // 1887
					bgfit = scalestart;                                               // 1888
					if (bgfit.toString().length < 4) bgfit = calculateKenBurnScales(bgfit, sh, opt);
				}                                                                  //
                                                                       //
				for (var j = 0; j < opt.slots; j++) {                              // 1893
                                                                       //
					y = 0;                                                            // 1895
					for (var i = 0; i < opt.slots; i++) {                             // 1896
                                                                       //
						sh.append('<div class="slot" ' + 'style="position:absolute;' + 'top:' + (fullyoff + y) + 'px;' + 'left:' + (fulloff + x) + 'px;' + 'width:' + basicsize + 'px;' + 'height:' + basicsize + 'px;' + 'overflow:hidden;">' + '<div class="slotslide" data-x="' + x + '" data-y="' + y + '" ' + 'style="position:absolute;' + 'top:' + 0 + 'px;' + 'left:' + 0 + 'px;' + 'width:' + basicsize + 'px;' + 'height:' + basicsize + 'px;' + 'overflow:hidden;">' + '<div style="position:absolute;' + 'top:' + (0 - y) + 'px;' + 'left:' + (0 - x) + 'px;' + 'width:' + w + 'px;' + 'height:' + h + 'px;' + 'background-color:' + bgcolor + ';' + 'background-image:url(' + src + ');' + 'background-repeat:' + bgrepeat + ';' + 'background-size:' + bgfit + ';background-position:' + bgposition + ';">' + '</div></div></div>');
						y = y + basicsize;                                               // 1925
                                                                       //
						if (isIE(8)) {                                                   // 1927
                                                                       //
							sh.find('.slot ').last().find('.slotslide').append('<img src="' + imgsrc + '">');
							ieimgposition(sh, opt);                                         // 1930
						}                                                                //
                                                                       //
						if (scalestart != undefined && rotatestart != undefined) punchgs.TweenLite.set(sh.find('.slot').last(), { rotationZ: rotatestart });
					}                                                                 //
					x = x + basicsize;                                                // 1936
				}                                                                  //
				break;                                                             // 1938
                                                                       //
			// SLOT ANIMATION PREPARING                                         // 1938
			case "vertical":                                                    // 1941
			case "horizontal":                                                  // 1942
				if (sh.data('kenburns') == "on") {                                 // 1943
					bgfit = scalestart;                                               // 1944
					if (bgfit.toString().length < 4) bgfit = calculateKenBurnScales(bgfit, sh, opt);
				}                                                                  //
				if (vorh == "horizontal") {                                        // 1948
					if (!visible) var off = 0 - opt.slotw;                            // 1949
					for (var i = 0; i < opt.slots; i++) {                             // 1950
						sh.append('<div class="slot" style="position:absolute;' + 'top:' + (0 + fullyoff) + 'px;' + 'left:' + (fulloff + i * opt.slotw) + 'px;' + 'overflow:hidden;width:' + (opt.slotw + 0.6) + 'px;' + 'height:' + h + 'px">' + '<div class="slotslide" style="position:absolute;' + 'top:0px;left:' + off + 'px;' + 'width:' + (opt.slotw + 0.6) + 'px;' + 'height:' + h + 'px;overflow:hidden;">' + '<div style="background-color:' + bgcolor + ';' + 'position:absolute;top:0px;' + 'left:' + (0 - i * opt.slotw) + 'px;' + 'width:' + w + 'px;height:' + h + 'px;' + 'background-image:url(' + src + ');' + 'background-repeat:' + bgrepeat + ';' + 'background-size:' + bgfit + ';background-position:' + bgposition + ';">' + '</div></div></div>');
						if (scalestart != undefined && rotatestart != undefined) punchgs.TweenLite.set(sh.find('.slot').last(), { rotationZ: rotatestart });
						if (isIE(8)) {                                                   // 1970
							sh.find('.slot ').last().find('.slotslide').append('<img class="ieeightfallbackimage" src="' + imgsrc + '" style="width:100%;height:auto">');
							ieimgposition(sh, opt);                                         // 1972
						}                                                                //
					}                                                                 //
				} else {                                                           //
					if (!visible) var off = 0 - opt.sloth;                            // 1976
					for (var i = 0; i < opt.slots + 2; i++) {                         // 1977
						sh.append('<div class="slot" style="position:absolute;' + 'top:' + (fullyoff + i * opt.sloth) + 'px;' + 'left:' + fulloff + 'px;' + 'overflow:hidden;' + 'width:' + w + 'px;' + 'height:' + opt.sloth + 'px">' + '<div class="slotslide" style="position:absolute;' + 'top:' + off + 'px;' + 'left:0px;width:' + w + 'px;' + 'height:' + opt.sloth + 'px;' + 'overflow:hidden;">' + '<div style="background-color:' + bgcolor + ';' + 'position:absolute;' + 'top:' + (0 - i * opt.sloth) + 'px;' + 'left:0px;' + 'width:' + w + 'px;height:' + h + 'px;' + 'background-image:url(' + src + ');' + 'background-repeat:' + bgrepeat + ';' + 'background-size:' + bgfit + ';background-position:' + bgposition + ';">' + '</div></div></div>');
						if (scalestart != undefined && rotatestart != undefined) punchgs.TweenLite.set(sh.find('.slot').last(), { rotationZ: rotatestart });
						if (isIE(8)) {                                                   // 2002
							sh.find('.slot ').last().find('.slotslide').append('<img class="ieeightfallbackimage" src="' + imgsrc + '" style="width:100%;height:auto;">');
							ieimgposition(sh, opt);                                         // 2004
						}                                                                //
					}                                                                 //
				}                                                                  //
				break;                                                             // 2008
		}                                                                    // 2008
	};                                                                    //
                                                                       //
	/***********************************************                      //
 	-	MOVE IE8 IMAGE IN RIGHT POSITION	-                                 //
 ***********************************************/                      //
                                                                       //
	var ieimgposition = function (nextsh, opt) {                          // 2016
                                                                       //
		if (isIE(8)) {                                                       // 2018
                                                                       //
			var ie8img = nextsh.find('.ieeightfallbackimage');                  // 2020
                                                                       //
			var ie8w = ie8img.width(),                                          // 2022
			    ie8h = ie8img.height();                                         //
                                                                       //
			if (opt.startwidth / opt.startheight < nextsh.data('owidth') / nextsh.data('oheight')) ie8img.css({ width: "auto", height: "100%" });else ie8img.css({ width: "100%", height: "auto" });
                                                                       //
			setTimeout(function () {                                            // 2033
                                                                       //
				var ie8w = ie8img.width(),                                         // 2035
				    ie8h = ie8img.height(),                                        //
				    bgp = nextsh.data('bgposition');                               //
                                                                       //
				if (bgp == "center center") ie8img.css({ position: "absolute", top: opt.height / 2 - ie8h / 2 + "px", left: opt.width / 2 - ie8w / 2 + "px" });
                                                                       //
				if (bgp == "center top" || bgp == "top center") ie8img.css({ position: "absolute", top: "0px", left: opt.width / 2 - ie8w / 2 + "px" });
                                                                       //
				if (bgp == "center bottom" || bgp == "bottom center") ie8img.css({ position: "absolute", bottom: "0px", left: opt.width / 2 - ie8w / 2 + "px" });
                                                                       //
				if (bgp == "right top" || bgp == "top right") ie8img.css({ position: "absolute", top: "0px", right: "0px" });
                                                                       //
				if (bgp == "right bottom" || bgp == "bottom right") ie8img.css({ position: "absolute", bottom: "0px", right: "0px" });
                                                                       //
				if (bgp == "right center" || bgp == "center right") ie8img.css({ position: "absolute", top: opt.height / 2 - ie8h / 2 + "px", right: "0px" });
                                                                       //
				if (bgp == "left bottom" || bgp == "bottom left") ie8img.css({ position: "absolute", bottom: "0px", left: "0px" });
                                                                       //
				if (bgp == "left center" || bgp == "center left") ie8img.css({ position: "absolute", top: opt.height / 2 - ie8h / 2 + "px", left: "0px" });
			}, 20);                                                             //
		}                                                                    //
	};                                                                    //
                                                                       //
	///////////////////////                                               //
	//	REMOVE SLOTS	//                                                    //
	/////////////////////                                                 //
	var removeSlots = function (container, opt, where) {                  // 2071
		where.find('.slot').each(function () {                               // 2072
			jQuery(this).remove();                                              // 2073
		});                                                                  //
		opt.transition = 0;                                                  // 2075
	};                                                                    //
                                                                       //
	/*******************************************                          //
 	-	PREPARE LOADING OF IMAGES	-                                        //
 ********************************************/                         //
	var loadAllPrepared = function (container, alreadyinload) {           // 2082
                                                                       //
		container.find('img, .defaultimg').each(function (i) {               // 2084
			var img = jQuery(this),                                             // 2085
			    ill = img.data('lazyload');                                     //
                                                                       //
			if (ill != img.attr('src') && alreadyinload < 3 && ill != undefined && ill != 'undefined') {
                                                                       //
				if (ill != undefined && ill != 'undefined') {                      // 2090
					img.attr('src', ill);                                             // 2091
                                                                       //
					var limg = new Image();                                           // 2093
                                                                       //
					limg.onload = function (i) {                                      // 2095
						img.data('lazydone', 1);                                         // 2096
						if (img.hasClass("defaultimg")) setDefImg(img, limg);            // 2097
					};                                                                //
					limg.error = function () {                                        // 2099
						img.data('lazydone', 1);                                         // 2100
					};                                                                //
                                                                       //
					limg.src = img.attr('src');                                       // 2103
					if (limg.complete) {                                              // 2104
						if (img.hasClass("defaultimg")) setDefImg(img, limg);            // 2105
						img.data('lazydone', 1);                                         // 2106
					}                                                                 //
				}                                                                  //
			} else {                                                            //
                                                                       //
				if ((ill === undefined || ill === 'undefined') && img.data('lazydone') != 1) {
					var limg = new Image();                                           // 2113
					limg.onload = function () {                                       // 2114
						if (img.hasClass("defaultimg")) setDefImg(img, limg);            // 2115
						img.data('lazydone', 1);                                         // 2116
					};                                                                //
					limg.error = function () {                                        // 2118
						img.data('lazydone', 1);                                         // 2119
					};                                                                //
                                                                       //
					if (img.attr('src') != undefined && img.attr('src') != 'undefined') {
						limg.src = img.attr('src');                                      // 2124
					} else limg.src = img.data('src');                                //
                                                                       //
					if (limg.complete) {                                              // 2128
						if (img.hasClass("defaultimg")) {                                // 2129
							setDefImg(img, limg);                                           // 2130
						}                                                                //
						img.data('lazydone', 1);                                         // 2132
					}                                                                 //
				}                                                                  //
			}                                                                   //
		});                                                                  //
	};                                                                    //
                                                                       //
	var setDefImg = function (img, limg) {                                // 2139
		var nextli = img.closest('li'),                                      // 2140
		    ww = limg.width,                                                 //
		    hh = limg.height;                                                //
                                                                       //
		nextli.data('owidth', ww);                                           // 2144
		nextli.data('oheight', hh);                                          // 2145
		nextli.find('.slotholder').data('owidth', ww);                       // 2146
		nextli.find('.slotholder').data('oheight', hh);                      // 2147
		nextli.data('loadeddone', 1);                                        // 2148
	};                                                                    //
                                                                       //
	var waitForLoads = function (element, call, opt) {                    // 2151
                                                                       //
		loadAllPrepared(element, 0);                                         // 2153
		var inter = setInterval(function () {                                // 2154
			opt.bannertimeronpause = true;                                      // 2155
			opt.container.trigger('stoptimer');                                 // 2156
			opt.cd = 0;                                                         // 2157
			var found = 0;                                                      // 2158
			element.find('img, .defaultimg').each(function (i) {                // 2159
				if (jQuery(this).data('lazydone') != 1) {                          // 2160
					found++;                                                          // 2161
				}                                                                  //
			});                                                                 //
                                                                       //
			if (found > 0) loadAllPrepared(element, found);else {               // 2166
				clearInterval(inter);                                              // 2169
				if (call != undefined) call();                                     // 2170
			}                                                                   //
		}, 100);                                                             //
	};                                                                    //
                                                                       //
	//////////////////////////////                                        //
	//	-	SWAP THE SLIDES -  //                                            //
	////////////////////////////                                          //
	var swapSlide = function (container, opt) {                           // 2181
                                                                       //
		try {                                                                // 2183
			var actli = container.find('>ul:first-child >li:eq(' + opt.act + ')');
		} catch (e) {                                                        //
			var actli = container.find('>ul:first-child >li:eq(1)');            // 2186
		}                                                                    //
		opt.lastslide = opt.act;                                             // 2188
		var nextli = container.find('>ul:first-child >li:eq(' + opt.next + ')');
                                                                       //
		var defimg = nextli.find('.defaultimg');                             // 2191
                                                                       //
		opt.bannertimeronpause = true;                                       // 2194
		container.trigger('stoptimer');                                      // 2195
		opt.cd = 0;                                                          // 2196
                                                                       //
		if (defimg.data('lazyload') != undefined && defimg.data('lazyload') != "undefined" && defimg.data('lazydone') != 1) {
                                                                       //
			if (!isIE(8)) defimg.css({ backgroundImage: 'url("' + nextli.find('.defaultimg').data('lazyload') + '")' });else {
				defimg.attr('src', nextli.find('.defaultimg').data('lazyload'));   // 2203
			}                                                                   //
                                                                       //
			defimg.data('src', nextli.find('.defaultimg').data('lazyload'));    // 2206
			defimg.data('lazydone', 1);                                         // 2207
			defimg.data('orgw', 0);                                             // 2208
			nextli.data('loadeddone', 1);                                       // 2209
                                                                       //
			container.find('.tp-loader').css({ display: "block" });             // 2211
			waitForLoads(container.find('.tp-static-layers'), function () {     // 2212
				waitForLoads(nextli, function () {                                 // 2213
					var nextsh = nextli.find('.slotholder');                          // 2214
					if (nextsh.data('kenburns') == "on") {                            // 2215
						var waitfordimension = setInterval(function () {                 // 2216
							var ow = nextsh.data('owidth');                                 // 2217
							if (ow >= 0) {                                                  // 2218
								clearInterval(waitfordimension);                               // 2219
								swapSlideCall(opt, defimg, container);                         // 2220
							}                                                               //
						}, 10);                                                          //
					} else swapSlideCall(opt, defimg, container);                     //
				}, opt);                                                           //
			}, opt);                                                            //
		} else {                                                             //
                                                                       //
			if (nextli.data('loadeddone') === undefined) {                      // 2230
				nextli.data('loadeddone', 1);                                      // 2231
				waitForLoads(nextli, function () {                                 // 2232
					swapSlideCall(opt, defimg, container);                            // 2233
				}, opt);                                                           //
			} else swapSlideCall(opt, defimg, container);                       //
		}                                                                    //
	};                                                                    //
                                                                       //
	var swapSlideCall = function (opt, defimg, container) {               // 2242
		opt.bannertimeronpause = false;                                      // 2243
		opt.cd = 0;                                                          // 2244
		container.trigger('nulltimer');                                      // 2245
		container.find('.tp-loader').css({ display: "none" });               // 2246
		setSize(defimg, opt);                                                // 2247
		setBulPos(container, opt);                                           // 2248
		setSize(defimg, opt);                                                // 2249
		swapSlideProgress(container, opt);                                   // 2250
	};                                                                    //
                                                                       //
	/******************************                                       //
 	-	SWAP SLIDE PROGRESS	-                                              //
 ********************************/                                     //
	/*!SWAP SLIDE*/                                                       //
	var swapSlideProgress = function (container, opt) {                   // 2258
                                                                       //
		container.trigger('revolution.slide.onbeforeswap');                  // 2261
                                                                       //
		opt.transition = 1;                                                  // 2263
		opt.videoplaying = false;                                            // 2264
		//konsole.log("VideoPlay set to False due swapSlideProgress");       //
                                                                       //
		try {                                                                // 2267
			var actli = container.find('>ul:first-child >li:eq(' + opt.act + ')');
		} catch (e) {                                                        //
			var actli = container.find('>ul:first-child >li:eq(1)');            // 2270
		}                                                                    //
                                                                       //
		opt.lastslide = opt.act;                                             // 2273
                                                                       //
		var nextli = container.find('>ul:first-child >li:eq(' + opt.next + ')');
                                                                       //
		setTimeout(function () {                                             // 2277
			handleSpecialPreviews(opt);                                         // 2278
		}, 200);                                                             //
                                                                       //
		var actsh = actli.find('.slotholder'),                               // 2281
		    nextsh = nextli.find('.slotholder');                             //
                                                                       //
		if (nextsh.data('kenburns') == "on" || actsh.data('kenburns') == "on") {
			stopKenBurn(container, opt);                                        // 2285
			container.find('.kenburnimg').remove();                             // 2286
		}                                                                    //
                                                                       //
		// IF DELAY HAS BEEN SET VIA THE SLIDE, WE TAKE THE NEW VALUE, OTHER WAY THE OLD ONE...
		if (nextli.data('delay') != undefined) {                             // 2291
			opt.cd = 0;                                                         // 2292
			opt.delay = nextli.data('delay');                                   // 2293
		} else {                                                             //
			opt.delay = opt.origcd;                                             // 2295
		}                                                                    //
                                                                       //
		if (opt.firststart == 1) punchgs.TweenLite.set(actli, { autoAlpha: 0 });
                                                                       //
		punchgs.TweenLite.set(actli, { zIndex: 18 });                        // 2302
		punchgs.TweenLite.set(nextli, { autoAlpha: 0, zIndex: 20 });         // 2303
                                                                       //
		///////////////////////////                                          //
		//	REMOVE THE CAPTIONS //                                            //
		///////////////////////////                                          //
		var removetime = 0;                                                  // 2308
		if (actli.index() != nextli.index() && opt.firststart != 1) {        // 2309
			removetime = removeTheCaptions(actli, opt);                         // 2310
		}                                                                    //
                                                                       //
		if (actli.data('saveperformance') != "on") removetime = 0;           // 2314
                                                                       //
		setTimeout(function () {                                             // 2316
			//opt.cd=0;                                                         //
			//container.trigger('nulltimer');                                   //
			container.trigger('restarttimer');                                  // 2319
			slideAnimation(container, opt, nextli, actli, actsh, nextsh);       // 2320
		}, removetime);                                                      //
	};                                                                    //
                                                                       //
	/******************************************                           //
 	-	START THE LAYER ANIMATION 	-                                       //
 *******************************************/                          //
                                                                       //
	var slideAnimation = function (container, opt, nextli, actli, actsh, nextsh) {
                                                                       //
		// IF THERE IS AN OTHER FIRST SLIDE START HAS BEED SELECTED          //
		if (nextli.data('differentissplayed') == 'prepared') {               // 2333
			nextli.data('differentissplayed', 'done');                          // 2334
			nextli.data('transition', nextli.data('savedtransition'));          // 2335
			nextli.data('slotamount', nextli.data('savedslotamount'));          // 2336
			nextli.data('masterspeed', nextli.data('savedmasterspeed'));        // 2337
		}                                                                    //
                                                                       //
		if (nextli.data('fstransition') != undefined && nextli.data('differentissplayed') != "done") {
			nextli.data('savedtransition', nextli.data('transition'));          // 2342
			nextli.data('savedslotamount', nextli.data('slotamount'));          // 2343
			nextli.data('savedmasterspeed', nextli.data('masterspeed'));        // 2344
                                                                       //
			nextli.data('transition', nextli.data('fstransition'));             // 2346
			nextli.data('slotamount', nextli.data('fsslotamount'));             // 2347
			nextli.data('masterspeed', nextli.data('fsmasterspeed'));           // 2348
                                                                       //
			nextli.data('differentissplayed', 'prepared');                      // 2350
		}                                                                    //
                                                                       //
		container.find('.active-revslide').removeClass('.active-revslide');  // 2353
		nextli.addClass("active-revslide");                                  // 2354
                                                                       //
		///////////////////////////////////////                              //
		// TRANSITION CHOOSE - RANDOM EFFECTS//                              //
		///////////////////////////////////////                              //
                                                                       //
		if (nextli.data('transition') == undefined) nextli.data('transition', "random");
                                                                       //
		var nexttrans = 0,                                                   // 2363
		    transtext = nextli.data('transition').split(","),                //
		    curtransid = nextli.data('nexttransid') == undefined ? -1 : nextli.data('nexttransid');
                                                                       //
		if (nextli.data('randomtransition') == "on") curtransid = Math.round(Math.random() * transtext.length);else curtransid = curtransid + 1;
                                                                       //
		if (curtransid == transtext.length) curtransid = 0;                  // 2372
		nextli.data('nexttransid', curtransid);                              // 2373
                                                                       //
		var comingtransition = transtext[curtransid];                        // 2377
                                                                       //
		if (opt.ie) {                                                        // 2379
			if (comingtransition == "boxfade") comingtransition = "boxslide";   // 2380
			if (comingtransition == "slotfade-vertical") comingtransition = "slotzoom-vertical";
			if (comingtransition == "slotfade-horizontal") comingtransition = "slotzoom-horizontal";
		}                                                                    //
                                                                       //
		if (isIE(8)) {                                                       // 2385
			comingtransition = 11;                                              // 2386
		}                                                                    //
                                                                       //
		var specials = 0;                                                    // 2390
                                                                       //
		if (opt.parallax == "scroll" && opt.parallaxFirstGo == undefined) {  // 2392
			opt.parallaxFirstGo = true;                                         // 2393
			scrollParallax(container, opt);                                     // 2394
			setTimeout(function () {                                            // 2395
				scrollParallax(container, opt);                                    // 2396
			}, 210);                                                            //
			setTimeout(function () {                                            // 2398
				scrollParallax(container, opt);                                    // 2399
			}, 420);                                                            //
		}                                                                    //
                                                                       //
		/*	if (opt.ffnn == undefined) opt.ffnn=0;                            //
  	comingtransition=opt.ffnn;                                          //
  			if ( direction==1)                                                //
  		opt.ffnn=opt.ffnn-1;                                               //
  	else                                                                //
  		opt.ffnn=opt.ffnn+1;                                               //
  			if (opt.ffnn>46) opt.ffnn=0;                                      //
  	if (opt.ffnn<0) opt.ffnn = 46;                                      //
  			jQuery('.logo').html('Next Anim:'+comingtransition);              //
                                                                       //
  	if (comingtransition=="boxslide" || comingtransition == "boxfade" || comingtransition == "papercut" ||
  		comingtransition==0 || comingtransition == 1 || comingtransition == 16)
  		comingtransition = 9;*/                                            //
                                                                       //
		/* Transition Name ,                                                 //
     Transition Code,                                                  //
     Transition Sub Code,                                              //
     Max Slots,                                                        //
     MasterSpeed Delays,                                               //
     Preparing Slots (box,slideh, slidev),                             //
     Call on nextsh (null = no, true/false for visibility first preparing),
     Call on actsh (null = no, true/false for visibility first preparing),
  */                                                                   //
                                                                       //
		if (comingtransition == "slidehorizontal") {                         // 2438
			comingtransition = "slideleft";                                     // 2439
			if (opt.leftarrowpressed == 1) comingtransition = "slideright";     // 2440
		}                                                                    //
                                                                       //
		if (comingtransition == "slidevertical") {                           // 2444
			comingtransition = "slideup";                                       // 2445
			if (opt.leftarrowpressed == 1) comingtransition = "slidedown";      // 2446
		}                                                                    //
                                                                       //
		if (comingtransition == "parallaxhorizontal") {                      // 2450
			comingtransition = "parallaxtoleft";                                // 2451
			if (opt.leftarrowpressed == 1) comingtransition = "parallaxtoright";
		}                                                                    //
                                                                       //
		if (comingtransition == "parallaxvertical") {                        // 2457
			comingtransition = "parallaxtotop";                                 // 2458
			if (opt.leftarrowpressed == 1) comingtransition = "parallaxtobottom";
		}                                                                    //
                                                                       //
		var transitionsArray = [['boxslide', 0, 1, 10, 0, 'box', false, null, 0], ['boxfade', 1, 0, 10, 0, 'box', false, null, 1], ['slotslide-horizontal', 2, 0, 0, 200, 'horizontal', true, false, 2], ['slotslide-vertical', 3, 0, 0, 200, 'vertical', true, false, 3], ['curtain-1', 4, 3, 0, 0, 'horizontal', true, true, 4], ['curtain-2', 5, 3, 0, 0, 'horizontal', true, true, 5], ['curtain-3', 6, 3, 25, 0, 'horizontal', true, true, 6], ['slotzoom-horizontal', 7, 0, 0, 400, 'horizontal', true, true, 7], ['slotzoom-vertical', 8, 0, 0, 0, 'vertical', true, true, 8], ['slotfade-horizontal', 9, 0, 0, 500, 'horizontal', true, null, 9], ['slotfade-vertical', 10, 0, 0, 500, 'vertical', true, null, 10], ['fade', 11, 0, 1, 300, 'horizontal', true, null, 11], ['slideleft', 12, 0, 1, 0, 'horizontal', true, true, 12], ['slideup', 13, 0, 1, 0, 'horizontal', true, true, 13], ['slidedown', 14, 0, 1, 0, 'horizontal', true, true, 14], ['slideright', 15, 0, 1, 0, 'horizontal', true, true, 15], ['papercut', 16, 0, 0, 600, '', null, null, 16], ['3dcurtain-horizontal', 17, 0, 20, 100, 'vertical', false, true, 17], ['3dcurtain-vertical', 18, 0, 10, 100, 'horizontal', false, true, 18], ['cubic', 19, 0, 20, 600, 'horizontal', false, true, 19], ['cube', 19, 0, 20, 600, 'horizontal', false, true, 20], ['flyin', 20, 0, 4, 600, 'vertical', false, true, 21], ['turnoff', 21, 0, 1, 1600, 'horizontal', false, true, 22], ['incube', 22, 0, 20, 200, 'horizontal', false, true, 23], ['cubic-horizontal', 23, 0, 20, 500, 'vertical', false, true, 24], ['cube-horizontal', 23, 0, 20, 500, 'vertical', false, true, 25], ['incube-horizontal', 24, 0, 20, 500, 'vertical', false, true, 26], ['turnoff-vertical', 25, 0, 1, 200, 'horizontal', false, true, 27], ['fadefromright', 12, 1, 1, 0, 'horizontal', true, true, 28], ['fadefromleft', 15, 1, 1, 0, 'horizontal', true, true, 29], ['fadefromtop', 14, 1, 1, 0, 'horizontal', true, true, 30], ['fadefrombottom', 13, 1, 1, 0, 'horizontal', true, true, 31], ['fadetoleftfadefromright', 12, 2, 1, 0, 'horizontal', true, true, 32], ['fadetorightfadetoleft', 15, 2, 1, 0, 'horizontal', true, true, 33], ['fadetobottomfadefromtop', 14, 2, 1, 0, 'horizontal', true, true, 34], ['fadetotopfadefrombottom', 13, 2, 1, 0, 'horizontal', true, true, 35], ['parallaxtoright', 12, 3, 1, 0, 'horizontal', true, true, 36], ['parallaxtoleft', 15, 3, 1, 0, 'horizontal', true, true, 37], ['parallaxtotop', 14, 3, 1, 0, 'horizontal', true, true, 38], ['parallaxtobottom', 13, 3, 1, 0, 'horizontal', true, true, 39], ['scaledownfromright', 12, 4, 1, 0, 'horizontal', true, true, 40], ['scaledownfromleft', 15, 4, 1, 0, 'horizontal', true, true, 41], ['scaledownfromtop', 14, 4, 1, 0, 'horizontal', true, true, 42], ['scaledownfrombottom', 13, 4, 1, 0, 'horizontal', true, true, 43], ['zoomout', 13, 5, 1, 0, 'horizontal', true, true, 44], ['zoomin', 13, 6, 1, 0, 'horizontal', true, true, 45], ['notransition', 26, 0, 1, 0, 'horizontal', true, null, 46]];
                                                                       //
		var flatTransitions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
		var premiumTransitions = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                                                                       //
		var nexttrans = 0;                                                   // 2519
		var specials = 1;                                                    // 2520
		var STAindex = 0;                                                    // 2521
		var indexcounter = 0;                                                // 2522
		var STA = new Array();                                               // 2523
                                                                       //
		//START THE KEN BURN PAN ZOOM ANIMATION                              //
		if (nextsh.data('kenburns') == "on") {                               // 2526
			if (comingtransition == "boxslide" || comingtransition == 0 || comingtransition == "boxfade" || comingtransition == 1 || comingtransition == "papercut" || comingtransition == 16) comingtransition = 11;
                                                                       //
			startKenBurn(container, opt, true, true);                           // 2533
		}                                                                    //
                                                                       //
		// RANDOM TRANSITIONS                                                //
		if (comingtransition == "random") {                                  // 2539
			comingtransition = Math.round(Math.random() * transitionsArray.length - 1);
			if (comingtransition > transitionsArray.length - 1) comingtransition = transitionsArray.length - 1;
		}                                                                    //
                                                                       //
		// RANDOM FLAT TRANSITIONS                                           //
		if (comingtransition == "random-static") {                           // 2545
			comingtransition = Math.round(Math.random() * flatTransitions.length - 1);
			if (comingtransition > flatTransitions.length - 1) comingtransition = flatTransitions.length - 1;
			comingtransition = flatTransitions[comingtransition];               // 2548
		}                                                                    //
                                                                       //
		// RANDOM PREMIUM TRANSITIONS                                        //
		if (comingtransition == "random-premium") {                          // 2552
			comingtransition = Math.round(Math.random() * premiumTransitions.length - 1);
			if (comingtransition > premiumTransitions.length - 1) comingtransition = premiumTransitions.length - 1;
			comingtransition = premiumTransitions[comingtransition];            // 2555
		}                                                                    //
                                                                       //
		//joomla only change: avoid problematic transitions that don't compatible with mootools
		var problematicTransitions = [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
		if (opt.isJoomla == true && window.MooTools != undefined && problematicTransitions.indexOf(comingtransition) != -1) {
                                                                       //
			var newTransIndex = Math.round(Math.random() * (premiumTransitions.length - 2)) + 1;
                                                                       //
			//some limits fix                                                   //
			if (newTransIndex > premiumTransitions.length - 1) newTransIndex = premiumTransitions.length - 1;
                                                                       //
			if (newTransIndex == 0) newTransIndex = 1;                          // 2568
                                                                       //
			comingtransition = premiumTransitions[newTransIndex];               // 2571
		}                                                                    //
                                                                       //
		function findTransition() {                                          // 2576
			// FIND THE RIGHT TRANSITION PARAMETERS HERE                        //
			jQuery.each(transitionsArray, function (inde, trans) {              // 2578
				if (trans[0] == comingtransition || trans[8] == comingtransition) {
					nexttrans = trans[1];                                             // 2580
					specials = trans[2];                                              // 2581
					STAindex = indexcounter;                                          // 2582
				}                                                                  //
				indexcounter = indexcounter + 1;                                   // 2584
			});                                                                 //
		}                                                                    //
                                                                       //
		findTransition();                                                    // 2588
                                                                       //
		// CHECK IF WE HAVE IE8 AND THAN FALL BACK ON FLAT TRANSITIONS       //
		if (isIE(8) && nexttrans > 15 && nexttrans < 28) {                   // 2591
			comingtransition = Math.round(Math.random() * flatTransitions.length - 1);
			if (comingtransition > flatTransitions.length - 1) comingtransition = flatTransitions.length - 1;
			comingtransition = flatTransitions[comingtransition];               // 2594
			indexcounter = 0;                                                   // 2595
			findTransition();                                                   // 2596
		}                                                                    //
                                                                       //
		// WHICH DIRECTION DID WE HAD ?                                      //
		var direction = -1;                                                  // 2603
		if (opt.leftarrowpressed == 1 || opt.act > opt.next) direction = 1;  // 2604
                                                                       //
		opt.leftarrowpressed = 0;                                            // 2608
                                                                       //
		if (nexttrans > 26) nexttrans = 26;                                  // 2610
		if (nexttrans < 0) nexttrans = 0;                                    // 2611
                                                                       //
		// DEFINE THE MASTERSPEED FOR THE SLIDE //                           //
		var masterspeed = 300;                                               // 2615
		if (nextli.data('masterspeed') != undefined && nextli.data('masterspeed') > 99 && nextli.data('masterspeed') < opt.delay) masterspeed = nextli.data('masterspeed');
		if (nextli.data('masterspeed') != undefined && nextli.data('masterspeed') > opt.delay) masterspeed = opt.delay;
                                                                       //
		// PREPARED DEFAULT SETTINGS PER TRANSITION                          //
		STA = transitionsArray[STAindex];                                    // 2622
                                                                       //
		/////////////////////////////////////////////                        //
		// SET THE BULLETS SELECTED OR UNSELECTED  //                        //
		/////////////////////////////////////////////                        //
		container.parent().find(".bullet").each(function () {                // 2627
			var bul = jQuery(this),                                             // 2628
			    buli = bul.index();                                             //
			bul.removeClass("selected");                                        // 2630
                                                                       //
			if (opt.navigationArrows == "withbullet" || opt.navigationArrows == "nexttobullets") buli = bul.index() - 1;
                                                                       //
			if (buli == opt.next) bul.addClass('selected');                     // 2635
		});                                                                  //
                                                                       //
		///////////////////////////////                                      //
		//	MAIN TIMELINE DEFINITION //                                       //
		///////////////////////////////                                      //
                                                                       //
		var mtl = new punchgs.TimelineLite({ onComplete: function () {       // 2643
				letItFree(container, opt, nextsh, actsh, nextli, actli, mtl);      // 2644
			} });                                                               //
		//SET DEFAULT IMG UNVISIBLE AT START                                 //
		mtl.add(punchgs.TweenLite.set(nextsh.find('.defaultimg'), { opacity: 0 }));
		mtl.pause();                                                         // 2648
                                                                       //
		/////////////////////////////////////////////                        //
		//	SET THE ACTUAL AMOUNT OF SLIDES !!     //                         //
		//  SET A RANDOM AMOUNT OF SLOTS          //                         //
		///////////////////////////////////////////                          //
		if (nextli.data('slotamount') == undefined || nextli.data('slotamount') < 1) {
			opt.slots = Math.round(Math.random() * 12 + 4);                     // 2658
			if (comingtransition == "boxslide") opt.slots = Math.round(Math.random() * 6 + 3);else if (comingtransition == "flyin") opt.slots = Math.round(Math.random() * 4 + 1);
		} else {                                                             //
			opt.slots = nextli.data('slotamount');                              // 2665
		}                                                                    //
                                                                       //
		/////////////////////////////////////////////                        //
		//	SET THE ACTUAL AMOUNT OF SLIDES !!     //                         //
		//  SET A RANDOM AMOUNT OF SLOTS          //                         //
		///////////////////////////////////////////                          //
		if (nextli.data('rotate') == undefined) opt.rotate = 0;else if (nextli.data('rotate') == 999) opt.rotate = Math.round(Math.random() * 360);else opt.rotate = nextli.data('rotate');
		if (!jQuery.support.transition || opt.ie || opt.ie9) opt.rotate = 0;
                                                                       //
		//////////////////////////////                                       //
		//	FIRST START 			//                                                 //
		//////////////////////////////                                       //
		if (opt.firststart == 1) opt.firststart = 0;                         // 2688
                                                                       //
		// ADJUST MASTERSPEED                                                //
		masterspeed = masterspeed + STA[4];                                  // 2692
                                                                       //
		if ((nexttrans == 4 || nexttrans == 5 || nexttrans == 6) && opt.slots < 3) opt.slots = 3;
                                                                       //
		// ADJUST SLOTS                                                      //
		if (STA[3] != 0) opt.slots = Math.min(opt.slots, STA[3]);            // 2697
		if (nexttrans == 9) opt.slots = opt.width / 20;                      // 2698
		if (nexttrans == 10) opt.slots = opt.height / 20;                    // 2699
                                                                       //
		// prepareOneSlide                                                   //
                                                                       //
		if (STA[7] != null) prepareOneSlide(actsh, opt, STA[7], STA[5]);     // 2703
		if (STA[6] != null) prepareOneSlide(nextsh, opt, STA[6], STA[5]);    // 2704
                                                                       //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 0) {                                                // 2710
			// BOXSLIDE                                                         //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			var maxz = Math.ceil(opt.height / opt.sloth);                       // 2714
			var curz = 0;                                                       // 2715
			nextsh.find('.slotslide').each(function (j) {                       // 2716
				var ss = jQuery(this);                                             // 2717
				curz = curz + 1;                                                   // 2718
				if (curz == maxz) curz = 0;                                        // 2719
                                                                       //
				mtl.add(punchgs.TweenLite.from(ss, masterspeed / 600, { opacity: 0, top: 0 - opt.sloth, left: 0 - opt.slotw, rotation: opt.rotate, force3D: "auto", ease: punchgs.Power2.easeOut }), (j * 15 + curz * 30) / 1500);
			});                                                                 //
		}                                                                    //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 1) {                                                // 2728
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			var maxtime,                                                        // 2731
			    maxj = 0;                                                       //
                                                                       //
			nextsh.find('.slotslide').each(function (j) {                       // 2734
				var ss = jQuery(this),                                             // 2735
				    rand = Math.random() * masterspeed + 300,                      //
				    rand2 = Math.random() * 500 + 200;                             //
				if (rand + rand2 > maxtime) {                                      // 2738
					maxtime = rand2 + rand2;                                          // 2739
					maxj = j;                                                         // 2740
				}                                                                  //
				mtl.add(punchgs.TweenLite.from(ss, rand / 1000, { autoAlpha: 0, force3D: "auto", rotation: opt.rotate, ease: punchgs.Power2.easeInOut }), rand2 / 1000);
			});                                                                 //
		}                                                                    //
                                                                       //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 2) {                                                // 2751
                                                                       //
			var subtl = new punchgs.TimelineLite();                             // 2753
			// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT                      //
			actsh.find('.slotslide').each(function () {                         // 2755
				var ss = jQuery(this);                                             // 2756
				subtl.add(punchgs.TweenLite.to(ss, masterspeed / 1000, { left: opt.slotw, force3D: "auto", rotation: 0 - opt.rotate }), 0);
				mtl.add(subtl, 0);                                                 // 2758
			});                                                                 //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function () {                        // 2762
				var ss = jQuery(this);                                             // 2763
				subtl.add(punchgs.TweenLite.from(ss, masterspeed / 1000, { left: 0 - opt.slotw, force3D: "auto", rotation: opt.rotate }), 0);
				mtl.add(subtl, 0);                                                 // 2765
			});                                                                 //
		}                                                                    //
                                                                       //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 3) {                                                // 2774
			var subtl = new punchgs.TimelineLite();                             // 2775
                                                                       //
			// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT                      //
			actsh.find('.slotslide').each(function () {                         // 2778
				var ss = jQuery(this);                                             // 2779
				subtl.add(punchgs.TweenLite.to(ss, masterspeed / 1000, { top: opt.sloth, rotation: opt.rotate, force3D: "auto", transformPerspective: 600 }), 0);
				mtl.add(subtl, 0);                                                 // 2781
			});                                                                 //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function () {                        // 2786
				var ss = jQuery(this);                                             // 2787
				subtl.add(punchgs.TweenLite.from(ss, masterspeed / 1000, { top: 0 - opt.sloth, rotation: opt.rotate, ease: punchgs.Power2.easeOut, force3D: "auto", transformPerspective: 600 }), 0);
				mtl.add(subtl, 0);                                                 // 2789
			});                                                                 //
		}                                                                    //
                                                                       //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 4 || nexttrans == 5) {                              // 2798
                                                                       //
			setTimeout(function () {                                            // 2800
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 2801
			}, 100);                                                            //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			var cspeed = masterspeed / 1000,                                    // 2806
			    ticker = cspeed,                                                //
			    subtl = new punchgs.TimelineLite();                             //
                                                                       //
			actsh.find('.slotslide').each(function (i) {                        // 2810
				var ss = jQuery(this);                                             // 2811
				var del = i * cspeed / opt.slots;                                  // 2812
				if (nexttrans == 5) del = (opt.slots - i - 1) * cspeed / opt.slots / 1.5;
				subtl.add(punchgs.TweenLite.to(ss, cspeed * 3, { transformPerspective: 600, force3D: "auto", top: 0 + opt.height, opacity: 0.5, rotation: opt.rotate, ease: punchgs.Power2.easeInOut, delay: del }), 0);
				mtl.add(subtl, 0);                                                 // 2815
			});                                                                 //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function (i) {                       // 2819
				var ss = jQuery(this);                                             // 2820
				var del = i * cspeed / opt.slots;                                  // 2821
				if (nexttrans == 5) del = (opt.slots - i - 1) * cspeed / opt.slots / 1.5;
				subtl.add(punchgs.TweenLite.from(ss, cspeed * 3, { top: 0 - opt.height, opacity: 0.5, rotation: opt.rotate, force3D: "auto", ease: punchgs.Power2.easeInOut, delay: del }), 0);
				mtl.add(subtl, 0);                                                 // 2825
			});                                                                 //
		}                                                                    //
                                                                       //
		/////////////////////////////////////                                //
		// THE SLOTSLIDE - TRANSITION I.  //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 6) {                                                // 2835
                                                                       //
			if (opt.slots < 2) opt.slots = 2;                                   // 2838
			if (opt.slots % 2) opt.slots = opt.slots + 1;                       // 2839
                                                                       //
			var subtl = new punchgs.TimelineLite();                             // 2841
                                                                       //
			//SET DEFAULT IMG UNVISIBLE                                         //
			setTimeout(function () {                                            // 2844
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 2845
			}, 100);                                                            //
                                                                       //
			actsh.find('.slotslide').each(function (i) {                        // 2848
				var ss = jQuery(this);                                             // 2849
				if (i + 1 < opt.slots / 2) var tempo = (i + 2) * 90;else var tempo = (2 + opt.slots - i) * 90;
                                                                       //
				subtl.add(punchgs.TweenLite.to(ss, (masterspeed + tempo) / 1000, { top: 0 + opt.height, opacity: 1, force3D: "auto", rotation: opt.rotate, ease: punchgs.Power2.easeInOut }), 0);
				mtl.add(subtl, 0);                                                 // 2856
			});                                                                 //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function (i) {                       // 2860
				var ss = jQuery(this);                                             // 2861
                                                                       //
				if (i + 1 < opt.slots / 2) var tempo = (i + 2) * 90;else var tempo = (2 + opt.slots - i) * 90;
                                                                       //
				subtl.add(punchgs.TweenLite.from(ss, (masterspeed + tempo) / 1000, { top: 0 - opt.height, opacity: 1, force3D: "auto", rotation: opt.rotate, ease: punchgs.Power2.easeInOut }), 0);
				mtl.add(subtl, 0);                                                 // 2870
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////                                 //
		// THE SLOTSZOOM - TRANSITION II. //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 7) {                                                // 2878
                                                                       //
			masterspeed = masterspeed * 2;                                      // 2880
			if (masterspeed > opt.delay) masterspeed = opt.delay;               // 2881
			var subtl = new punchgs.TimelineLite();                             // 2882
                                                                       //
			//SET DEFAULT IMG UNVISIBLE                                         //
			setTimeout(function () {                                            // 2885
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 2886
			}, 100);                                                            //
                                                                       //
			// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT                      //
			actsh.find('.slotslide').each(function () {                         // 2890
				var ss = jQuery(this).find('div');                                 // 2891
				subtl.add(punchgs.TweenLite.to(ss, masterspeed / 1000, {           // 2892
					left: 0 - opt.slotw / 2 + 'px',                                   // 2893
					top: 0 - opt.height / 2 + 'px',                                   // 2894
					width: opt.slotw * 2 + "px",                                      // 2895
					height: opt.height * 2 + "px",                                    // 2896
					opacity: 0,                                                       // 2897
					rotation: opt.rotate,                                             // 2898
					force3D: "auto",                                                  // 2899
					ease: punchgs.Power2.easeOut }), 0);                              // 2900
				mtl.add(subtl, 0);                                                 // 2901
			});                                                                 //
                                                                       //
			//////////////////////////////////////////////////////////////      //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT //     //
			///////////////////////////////////////////////////////////////     //
			nextsh.find('.slotslide').each(function (i) {                       // 2908
				var ss = jQuery(this).find('div');                                 // 2909
                                                                       //
				subtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: 0, top: 0, opacity: 0, transformPerspective: 600 }, { left: 0 - i * opt.slotw + 'px',
					ease: punchgs.Power2.easeOut,                                     // 2914
					force3D: "auto",                                                  // 2915
					top: 0 + 'px',                                                    // 2916
					width: opt.width,                                                 // 2917
					height: opt.height,                                               // 2918
					opacity: 1, rotation: 0,                                          // 2919
					delay: 0.1 }), 0);                                                // 2920
				mtl.add(subtl, 0);                                                 // 2921
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////                                 //
		// THE SLOTSZOOM - TRANSITION II. //                                 //
		////////////////////////////////////                                 //
		if (nexttrans == 8) {                                                // 2931
                                                                       //
			masterspeed = masterspeed * 3;                                      // 2933
			if (masterspeed > opt.delay) masterspeed = opt.delay;               // 2934
			var subtl = new punchgs.TimelineLite();                             // 2935
                                                                       //
			// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT                      //
			actsh.find('.slotslide').each(function () {                         // 2940
				var ss = jQuery(this).find('div');                                 // 2941
				subtl.add(punchgs.TweenLite.to(ss, masterspeed / 1000, { left: 0 - opt.width / 2 + 'px',
					top: 0 - opt.sloth / 2 + 'px',                                    // 2944
					width: opt.width * 2 + "px",                                      // 2945
					height: opt.sloth * 2 + "px",                                     // 2946
					force3D: "auto",                                                  // 2947
					opacity: 0, rotation: opt.rotate }), 0);                          // 2948
				mtl.add(subtl, 0);                                                 // 2949
			});                                                                 //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT //     //
			///////////////////////////////////////////////////////////////     //
			nextsh.find('.slotslide').each(function (i) {                       // 2956
				var ss = jQuery(this).find('div');                                 // 2957
                                                                       //
				subtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: 0, top: 0, opacity: 0, force3D: "auto" }, { 'left': 0 + 'px',
					'top': 0 - i * opt.sloth + 'px',                                  // 2962
					'width': nextsh.find('.defaultimg').data('neww') + "px",          // 2963
					'height': nextsh.find('.defaultimg').data('newh') + "px",         // 2964
					opacity: 1, rotation: 0                                           // 2965
				}), 0);                                                            //
				mtl.add(subtl, 0);                                                 // 2967
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSFADE - TRANSITION III.   //                              //
		//////////////////////////////////////                               //
		if (nexttrans == 9 || nexttrans == 10) {                             // 2975
			var ssamount = 0;                                                   // 2976
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function (i) {                       // 2978
				var ss = jQuery(this);                                             // 2979
				ssamount++;                                                        // 2980
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { autoAlpha: 0, force3D: "auto", transformPerspective: 600 }, { autoAlpha: 1, ease: punchgs.Power2.easeInOut, delay: i * 5 / 1000 }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		///////////////////////////                                          //
		// SIMPLE FADE ANIMATION //                                          //
		///////////////////////////                                          //
		if (nexttrans == 11 || nexttrans == 26) {                            // 2990
                                                                       //
			var ssamount = 0;                                                   // 2993
			if (nexttrans == 26) masterspeed = 0;                               // 2994
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function (i) {                       // 2997
				var ss = jQuery(this);                                             // 2998
				mtl.add(punchgs.TweenLite.from(ss, masterspeed / 1000, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power2.easeInOut }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		if (nexttrans == 12 || nexttrans == 13 || nexttrans == 14 || nexttrans == 15) {
			masterspeed = masterspeed;                                          // 3004
			if (masterspeed > opt.delay) masterspeed = opt.delay;               // 3005
			//masterspeed = 1000;                                               //
                                                                       //
			setTimeout(function () {                                            // 3008
				punchgs.TweenLite.set(actsh.find('.defaultimg'), { autoAlpha: 0 });
			}, 100);                                                            //
                                                                       //
			var oow = opt.width,                                                // 3013
			    ooh = opt.height,                                               //
			    ssn = nextsh.find('.slotslide'),                                //
			    twx = 0,                                                        //
			    twy = 0,                                                        //
			    op = 1,                                                         //
			    scal = 1,                                                       //
			    fromscale = 1,                                                  //
			    easeitout = punchgs.Power2.easeInOut,                           //
			    easeitin = punchgs.Power2.easeInOut,                            //
			    speedy = masterspeed / 1000,                                    //
			    speedy2 = speedy;                                               //
                                                                       //
			if (opt.fullWidth == "on" || opt.fullScreen == "on") {              // 3027
				oow = ssn.width();                                                 // 3028
				ooh = ssn.height();                                                // 3029
			}                                                                   //
                                                                       //
			if (nexttrans == 12) twx = oow;else if (nexttrans == 15) twx = 0 - oow;else if (nexttrans == 13) twy = ooh;else if (nexttrans == 14) twy = 0 - ooh;
                                                                       //
			// DEPENDING ON EXTENDED SPECIALS, DIFFERENT SCALE AND OPACITY FUNCTIONS NEED TO BE ADDED
			if (specials == 1) op = 0;                                          // 3046
			if (specials == 2) op = 0;                                          // 3047
			if (specials == 3) {                                                // 3048
				easeitout = punchgs.Power2.easeInOut;                              // 3049
				easeitin = punchgs.Power1.easeInOut;                               // 3050
				speedy = masterspeed / 1200;                                       // 3051
			}                                                                   //
                                                                       //
			if (specials == 4 || specials == 5) scal = 0.6;                     // 3054
			if (specials == 6) scal = 1.4;                                      // 3056
                                                                       //
			if (specials == 5 || specials == 6) {                               // 3060
				fromscale = 1.4;                                                   // 3061
				op = 0;                                                            // 3062
				oow = 0;                                                           // 3063
				ooh = 0;twx = 0;twy = 0;                                           // 3064
			}                                                                   //
			if (specials == 6) fromscale = 0.6;                                 // 3066
			var dd = 0;                                                         // 3067
                                                                       //
			mtl.add(punchgs.TweenLite.from(ssn, speedy, { left: twx, top: twy, scale: fromscale, opacity: op, rotation: opt.rotate, ease: easeitin, force3D: "auto" }), 0);
                                                                       //
			var ssa = actsh.find('.slotslide');                                 // 3072
                                                                       //
			if (specials == 4 || specials == 5) {                               // 3074
				oow = 0;ooh = 0;                                                   // 3075
			}                                                                   //
                                                                       //
			if (specials != 1) switch (nexttrans) {                             // 3078
				case 12:                                                           // 3080
					mtl.add(punchgs.TweenLite.to(ssa, speedy2, { 'left': 0 - oow + 'px', force3D: "auto", scale: scal, opacity: op, rotation: opt.rotate, ease: easeitout }), 0);
					break;                                                            // 3082
				case 15:                                                           // 3082
					mtl.add(punchgs.TweenLite.to(ssa, speedy2, { 'left': oow + 'px', force3D: "auto", scale: scal, opacity: op, rotation: opt.rotate, ease: easeitout }), 0);
					break;                                                            // 3085
				case 13:                                                           // 3085
					mtl.add(punchgs.TweenLite.to(ssa, speedy2, { 'top': 0 - ooh + 'px', force3D: "auto", scale: scal, opacity: op, rotation: opt.rotate, ease: easeitout }), 0);
					break;                                                            // 3088
				case 14:                                                           // 3088
					mtl.add(punchgs.TweenLite.to(ssa, speedy2, { 'top': ooh + 'px', force3D: "auto", scale: scal, opacity: op, rotation: opt.rotate, ease: easeitout }), 0);
					break;                                                            // 3091
			}                                                                   // 3091
		}                                                                    //
                                                                       //
		//////////////////////////////////////                               //
		// THE SLOTSLIDE - TRANSITION XVI.  //                               //
		//////////////////////////////////////                               //
		if (nexttrans == 16) {                                               // 3099
			// PAPERCUT                                                         //
                                                                       //
			var subtl = new punchgs.TimelineLite();                             // 3102
			mtl.add(punchgs.TweenLite.set(actli, { 'position': 'absolute', 'z-index': 20 }), 0);
			mtl.add(punchgs.TweenLite.set(nextli, { 'position': 'absolute', 'z-index': 15 }), 0);
                                                                       //
			// PREPARE THE CUTS                                                 //
			actli.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>');
                                                                       //
			actli.find('.tp-half-one').clone(true).appendTo(actli).addClass("tp-half-two");
			actli.find('.tp-half-two').removeClass('tp-half-one');              // 3111
                                                                       //
			var oow = opt.width,                                                // 3113
			    ooh = opt.height;                                               //
			if (opt.autoHeight == "on") ooh = container.height();               // 3115
                                                                       //
			actli.find('.tp-half-one .defaultimg').wrap('<div class="tp-papercut" style="width:' + oow + 'px;height:' + ooh + 'px;"></div>');
			actli.find('.tp-half-two .defaultimg').wrap('<div class="tp-papercut" style="width:' + oow + 'px;height:' + ooh + 'px;"></div>');
			actli.find('.tp-half-two .defaultimg').css({ position: 'absolute', top: '-50%' });
			actli.find('.tp-half-two .tp-caption').wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>');
                                                                       //
			mtl.add(punchgs.TweenLite.set(actli.find('.tp-half-two'), { width: oow, height: ooh, overflow: 'hidden', zIndex: 15, position: 'absolute', top: ooh / 2, left: '0px', transformPerspective: 600, transformOrigin: "center bottom" }), 0);
                                                                       //
			mtl.add(punchgs.TweenLite.set(actli.find('.tp-half-one'), { width: oow, height: ooh / 2, overflow: 'visible', zIndex: 10, position: 'absolute', top: '0px', left: '0px', transformPerspective: 600, transformOrigin: "center top" }), 0);
                                                                       //
			// ANIMATE THE CUTS                                                 //
			var img = actli.find('.defaultimg'),                                // 3131
			    ro1 = Math.round(Math.random() * 20 - 10),                      //
			    ro2 = Math.round(Math.random() * 20 - 10),                      //
			    ro3 = Math.round(Math.random() * 20 - 10),                      //
			    xof = Math.random() * 0.4 - 0.2,                                //
			    yof = Math.random() * 0.4 - 0.2,                                //
			    sc1 = Math.random() * 1 + 1,                                    //
			    sc2 = Math.random() * 1 + 1,                                    //
			    sc3 = Math.random() * 0.3 + 0.3;                                //
                                                                       //
			mtl.add(punchgs.TweenLite.set(actli.find('.tp-half-one'), { overflow: 'hidden' }), 0);
			mtl.add(punchgs.TweenLite.fromTo(actli.find('.tp-half-one'), masterspeed / 800, { width: oow, height: ooh / 2, position: 'absolute', top: '0px', left: '0px', force3D: "auto", transformOrigin: "center top" }, { scale: sc1, rotation: ro1, y: 0 - ooh - ooh / 4, autoAlpha: 0, ease: punchgs.Power2.easeInOut }), 0);
			mtl.add(punchgs.TweenLite.fromTo(actli.find('.tp-half-two'), masterspeed / 800, { width: oow, height: ooh, overflow: 'hidden', position: 'absolute', top: ooh / 2, left: '0px', force3D: "auto", transformOrigin: "center bottom" }, { scale: sc2, rotation: ro2, y: ooh + ooh / 4, ease: punchgs.Power2.easeInOut, autoAlpha: 0, onComplete: function () {
					// CLEAN UP                                                       //
					punchgs.TweenLite.set(actli, { 'position': 'absolute', 'z-index': 15 });
					punchgs.TweenLite.set(nextli, { 'position': 'absolute', 'z-index': 20 });
					if (actli.find('.tp-half-one').length > 0) {                      // 3151
						actli.find('.tp-half-one .defaultimg').unwrap();                 // 3152
						actli.find('.tp-half-one .slotholder').unwrap();                 // 3153
					}                                                                 //
					actli.find('.tp-half-two').remove();                              // 3155
				} }), 0);                                                          //
                                                                       //
			subtl.add(punchgs.TweenLite.set(nextsh.find('.defaultimg'), { autoAlpha: 1 }), 0);
                                                                       //
			if (actli.html() != null) mtl.add(punchgs.TweenLite.fromTo(nextli, (masterspeed - 200) / 1000, { scale: sc3, x: opt.width / 4 * xof, y: ooh / 4 * yof, rotation: ro3, force3D: "auto", transformOrigin: "center center", ease: punchgs.Power2.easeOut }, { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0 }), 0);
                                                                       //
			mtl.add(subtl, 0);                                                  // 3165
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XVII.  //                              //
		///////////////////////////////////////                              //
		if (nexttrans == 17) {                                               // 3173
			// 3D CURTAIN HORIZONTAL                                            //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
                                                                       //
			nextsh.find('.slotslide').each(function (j) {                       // 3178
				var ss = jQuery(this);                                             // 3179
                                                                       //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 800, { opacity: 0, rotationY: 0, scale: 0.9, rotationX: -110, force3D: "auto", transformPerspective: 600, transformOrigin: "center center" }, { opacity: 1, top: 0, left: 0, scale: 1, rotation: 0, rotationX: 0, force3D: "auto", rotationY: 0, ease: punchgs.Power3.easeOut, delay: j * 0.06 }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XVIII.  //                             //
		///////////////////////////////////////                              //
		if (nexttrans == 18) {                                               // 3193
			// 3D CURTAIN VERTICAL                                              //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			nextsh.find('.slotslide').each(function (j) {                       // 3196
				var ss = jQuery(this);                                             // 3197
                                                                       //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 500, { autoAlpha: 0, rotationY: 310, scale: 0.9, rotationX: 10, force3D: "auto", transformPerspective: 600, transformOrigin: "center center" }, { autoAlpha: 1, top: 0, left: 0, scale: 1, rotation: 0, rotationX: 0, force3D: "auto", rotationY: 0, ease: punchgs.Power3.easeOut, delay: j * 0.06 }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XIX.  //                               //
		///////////////////////////////////////                              //
		if (nexttrans == 19 || nexttrans == 22) {                            // 3212
			// IN CUBE                                                          //
                                                                       //
			var subtl = new punchgs.TimelineLite();                             // 3214
			//SET DEFAULT IMG UNVISIBLE                                         //
                                                                       //
			mtl.add(punchgs.TweenLite.set(actli, { zIndex: 20 }), 0);           // 3217
			mtl.add(punchgs.TweenLite.set(nextli, { zIndex: 20 }), 0);          // 3218
			setTimeout(function () {                                            // 3219
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 3220
			}, 100);                                                            //
			var chix = nextli.css('z-index'),                                   // 3222
			    chix2 = actli.css('z-index'),                                   //
			    rot = 90,                                                       //
			    op = 1,                                                         //
			    torig = "center center ";                                       //
                                                                       //
			if (direction == 1) rot = -90;                                      // 3228
                                                                       //
			if (nexttrans == 19) {                                              // 3230
				torig = torig + "-" + opt.height / 2;                              // 3231
				op = 0;                                                            // 3232
			} else {                                                            //
				torig = torig + opt.height / 2;                                    // 3235
			}                                                                   //
                                                                       //
			// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT        //
			punchgs.TweenLite.set(container, { transformStyle: "flat", backfaceVisibility: "hidden", transformPerspective: 600 });
                                                                       //
			nextsh.find('.slotslide').each(function (j) {                       // 3241
				var ss = jQuery(this);                                             // 3242
                                                                       //
				subtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { transformStyle: "flat", backfaceVisibility: "hidden", left: 0, rotationY: opt.rotate, z: 10, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationX: rot }, { left: 0, rotationY: 0, top: 0, z: 0, scale: 1, force3D: "auto", rotationX: 0, delay: j * 50 / 1000, ease: punchgs.Power2.easeInOut }), 0);
				subtl.add(punchgs.TweenLite.to(ss, 0.1, { autoAlpha: 1, delay: j * 50 / 1000 }), 0);
				mtl.add(subtl);                                                    // 3248
			});                                                                 //
                                                                       //
			actsh.find('.slotslide').each(function (j) {                        // 3251
				var ss = jQuery(this);                                             // 3252
				var rot = -90;                                                     // 3253
				if (direction == 1) rot = 90;                                      // 3254
                                                                       //
				subtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { transformStyle: "flat", backfaceVisibility: "hidden", autoAlpha: 1, rotationY: 0, top: 0, z: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationX: 0 }, { autoAlpha: 1, rotationY: opt.rotate, top: 0, z: 10, scale: 1, rotationX: rot, delay: j * 50 / 1000, force3D: "auto", ease: punchgs.Power2.easeInOut }), 0);
                                                                       //
				mtl.add(subtl);                                                    // 3260
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XX.  //                                //
		///////////////////////////////////////                              //
		if (nexttrans == 20) {                                               // 3270
			// FLYIN                                                            //
                                                                       //
			setTimeout(function () {                                            // 3273
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 3274
			}, 100);                                                            //
			var chix = nextli.css('z-index'),                                   // 3276
			    chix2 = actli.css('z-index');                                   //
                                                                       //
			if (direction == 1) {                                               // 3279
				var ofx = -opt.width;                                              // 3280
				var rot = 70;                                                      // 3281
				var torig = "left center -" + opt.height / 2;                      // 3282
			} else {                                                            //
				var ofx = opt.width;                                               // 3284
				var rot = -70;                                                     // 3285
				var torig = "right center -" + opt.height / 2;                     // 3286
			}                                                                   //
                                                                       //
			nextsh.find('.slotslide').each(function (j) {                       // 3290
				var ss = jQuery(this);                                             // 3291
                                                                       //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1500, { left: ofx, rotationX: 40, z: -600, opacity: op, top: 0, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: rot }, { left: 0, delay: j * 50 / 1000, ease: punchgs.Power2.easeInOut }), 0);
                                                                       //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { rotationX: 40, z: -600, opacity: op, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: rot }, { rotationX: 0, opacity: 1, top: 0, z: 0, scale: 1, rotationY: 0, delay: j * 50 / 1000, ease: punchgs.Power2.easeInOut }), 0);
                                                                       //
				mtl.add(punchgs.TweenLite.to(ss, 0.1, { opacity: 1, force3D: "auto", delay: j * 50 / 1000 + masterspeed / 2000 }), 0);
			});                                                                 //
			actsh.find('.slotslide').each(function (j) {                        // 3304
				var ss = jQuery(this);                                             // 3305
                                                                       //
				if (direction != 1) {                                              // 3307
					var ofx = -opt.width;                                             // 3308
					var rot = 70;                                                     // 3309
					var torig = "left center -" + opt.height / 2;                     // 3310
				} else {                                                           //
					var ofx = opt.width;                                              // 3312
					var rot = -70;                                                    // 3313
					var torig = "right center -" + opt.height / 2;                    // 3314
				}                                                                  //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { opacity: 1, rotationX: 0, top: 0, z: 0, scale: 1, left: 0, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: 0 }, { opacity: 1, rotationX: 40, top: 0, z: -600, left: ofx, force3D: "auto", scale: 0.8, rotationY: rot, delay: j * 50 / 1000, ease: punchgs.Power2.easeInOut }), 0);
				mtl.add(punchgs.TweenLite.to(ss, 0.1, { force3D: "auto", opacity: 0, delay: j * 50 / 1000 + (masterspeed / 1000 - masterspeed / 10000) }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XX.  //                                //
		///////////////////////////////////////                              //
		if (nexttrans == 21 || nexttrans == 25) {                            // 3326
			// TURNOFF                                                          //
                                                                       //
			//SET DEFAULT IMG UNVISIBLE                                         //
                                                                       //
			setTimeout(function () {                                            // 3331
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 3332
			}, 100);                                                            //
			var chix = nextli.css('z-index'),                                   // 3334
			    chix2 = actli.css('z-index'),                                   //
			    rot = 90,                                                       //
			    ofx = -opt.width,                                               //
			    rot2 = -rot;                                                    //
                                                                       //
			if (direction == 1) {                                               // 3340
				if (nexttrans == 25) {                                             // 3341
					var torig = "center top 0";                                       // 3342
					rot = opt.rotate;                                                 // 3343
				} else {                                                           //
					var torig = "left center 0";                                      // 3345
					rot2 = opt.rotate;                                                // 3346
				}                                                                  //
			} else {                                                            //
				ofx = opt.width;                                                   // 3350
				rot = -90;                                                         // 3351
				if (nexttrans == 25) {                                             // 3352
					var torig = "center bottom 0";                                    // 3353
					rot2 = -rot;                                                      // 3354
					rot = opt.rotate;                                                 // 3355
				} else {                                                           //
					var torig = "right center 0";                                     // 3357
					rot2 = opt.rotate;                                                // 3358
				}                                                                  //
			}                                                                   //
                                                                       //
			nextsh.find('.slotslide').each(function (j) {                       // 3362
				var ss = jQuery(this);                                             // 3363
                                                                       //
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: 0, transformStyle: "flat", rotationX: rot2, z: 0, autoAlpha: 0, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: rot }, { left: 0, rotationX: 0, top: 0, z: 0, autoAlpha: 1, scale: 1, rotationY: 0, force3D: "auto", ease: punchgs.Power3.easeInOut }), 0);
			});                                                                 //
                                                                       //
			if (direction != 1) {                                               // 3372
				ofx = -opt.width;                                                  // 3373
				rot = 90;                                                          // 3374
                                                                       //
				if (nexttrans == 25) {                                             // 3376
					torig = "center top 0";                                           // 3377
					rot2 = -rot;                                                      // 3378
					rot = opt.rotate;                                                 // 3379
				} else {                                                           //
					torig = "left center 0";                                          // 3381
					rot2 = opt.rotate;                                                // 3382
				}                                                                  //
			} else {                                                            //
				ofx = opt.width;                                                   // 3386
				rot = -90;                                                         // 3387
				if (nexttrans == 25) {                                             // 3388
					torig = "center bottom 0";                                        // 3389
					rot2 = -rot;                                                      // 3390
					rot = opt.rotate;                                                 // 3391
				} else {                                                           //
					torig = "right center 0";                                         // 3393
					rot2 = opt.rotate;                                                // 3394
				}                                                                  //
			}                                                                   //
                                                                       //
			actsh.find('.slotslide').each(function (j) {                        // 3398
				var ss = jQuery(this);                                             // 3399
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: 0, transformStyle: "flat", rotationX: 0, z: 0, autoAlpha: 1, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: 0 }, { left: 0, rotationX: rot2, top: 0, z: 0, autoAlpha: 1, force3D: "auto", scale: 1, rotationY: rot, ease: punchgs.Power1.easeInOut }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		////////////////////////////////////////                             //
		// THE SLOTSLIDE - TRANSITION XX.  //                                //
		///////////////////////////////////////                              //
		if (nexttrans == 23 || nexttrans == 24) {                            // 3411
			// cube-horizontal - inboxhorizontal                                //
                                                                       //
			//SET DEFAULT IMG UNVISIBLE                                         //
			setTimeout(function () {                                            // 3415
				actsh.find('.defaultimg').css({ opacity: 0 });                     // 3416
			}, 100);                                                            //
			var chix = nextli.css('z-index'),                                   // 3418
			    chix2 = actli.css('z-index'),                                   //
			    rot = -90,                                                      //
			    op = 1,                                                         //
			    opx = 0;                                                        //
                                                                       //
			if (direction == 1) rot = 90;                                       // 3424
			if (nexttrans == 23) {                                              // 3425
				var torig = "center center -" + opt.width / 2;                     // 3426
				op = 0;                                                            // 3427
			} else var torig = "center center " + opt.width / 2;                //
                                                                       //
			punchgs.TweenLite.set(container, { transformStyle: "preserve-3d", backfaceVisibility: "hidden", perspective: 2500 });
			nextsh.find('.slotslide').each(function (j) {                       // 3432
				var ss = jQuery(this);                                             // 3433
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: opx, rotationX: opt.rotate, force3D: "auto", opacity: op, top: 0, scale: 1, transformPerspective: 600, transformOrigin: torig, rotationY: rot }, { left: 0, rotationX: 0, autoAlpha: 1, top: 0, z: 0, scale: 1, rotationY: 0, delay: j * 50 / 500, ease: punchgs.Power2.easeInOut }), 0);
			});                                                                 //
                                                                       //
			rot = 90;                                                           // 3439
			if (direction == 1) rot = -90;                                      // 3440
                                                                       //
			actsh.find('.slotslide').each(function (j) {                        // 3442
				var ss = jQuery(this);                                             // 3443
				mtl.add(punchgs.TweenLite.fromTo(ss, masterspeed / 1000, { left: 0, autoAlpha: 1, rotationX: 0, top: 0, z: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: torig, rotationY: 0 }, { left: opx, autoAlpha: 1, rotationX: opt.rotate, top: 0, scale: 1, rotationY: rot, delay: j * 50 / 500, ease: punchgs.Power2.easeInOut }), 0);
			});                                                                 //
		}                                                                    //
                                                                       //
		// SHOW FIRST LI && ANIMATE THE CAPTIONS                             //
		mtl.pause();                                                         // 3455
		animateTheCaptions(nextli, opt, null, mtl);                          // 3456
		punchgs.TweenLite.to(nextli, 0.001, { autoAlpha: 1 });               // 3457
                                                                       //
		var data = {};                                                       // 3459
		data.slideIndex = opt.next + 1;                                      // 3460
		data.slide = nextli;                                                 // 3461
		container.trigger('revolution.slide.onchange', data);                // 3462
		setTimeout(function () {                                             // 3463
			container.trigger('revolution.slide.onafterswap');                  // 3463
		}, masterspeed);                                                     //
		container.trigger('revolution.slide.onvideostop');                   // 3464
	};                                                                    //
                                                                       //
	/**************************************                               //
 	-	GIVE FREE THE TRANSITIOSN	-                                        //
 **************************************/                               //
	var letItFree = function (container, opt, nextsh, actsh, nextli, actli, mtl) {
		punchgs.TweenLite.to(nextsh.find('.defaultimg'), 0.001, { autoAlpha: 1, onComplete: function () {
				removeSlots(container, opt, nextli);                               // 3478
			} });                                                               //
		if (nextli.index() != actli.index()) {                               // 3480
			punchgs.TweenLite.to(actli, 0.2, { autoAlpha: 0, onComplete: function () {
					removeSlots(container, opt, actli);                               // 3482
				} });                                                              //
		}                                                                    //
		opt.act = opt.next;                                                  // 3485
		if (opt.navigationType == "thumb") moveSelectedThumb(container);     // 3486
		if (nextsh.data('kenburns') == "on") {                               // 3487
			startKenBurn(container, opt);                                       // 3488
		}                                                                    //
		container.find('.current-sr-slide-visible').removeClass("current-sr-slide-visible");
		nextli.addClass("current-sr-slide-visible");                         // 3491
		if (opt.parallax == "scroll" || opt.parallax == "scroll+mouse" || opt.parallax == "mouse+scroll") {
			scrollParallax(container, opt);                                     // 3493
		}                                                                    //
                                                                       //
		mtl.clear();                                                         // 3496
	};                                                                    //
                                                                       //
	//////////////////////////////////////////                            //
	// CHANG THE YOUTUBE PLAYER STATE HERE //                             //
	////////////////////////////////////////                              //
	var onPlayerStateChange = function (event) {                          // 3504
                                                                       //
		var embedCode = event.target.getVideoEmbedCode();                    // 3506
		var ytcont = jQuery('#' + embedCode.split('id="')[1].split('"')[0]);
		var container = ytcont.closest('.tp-simpleresponsive');              // 3508
		var player = ytcont.parent().data('player');                         // 3509
                                                                       //
		if (event.data == YT.PlayerState.PLAYING) {                          // 3511
                                                                       //
			var bt = container.find('.tp-bannertimer');                         // 3513
			var opt = bt.data('opt');                                           // 3514
                                                                       //
			if (ytcont.closest('.tp-caption').data('volume') == "mute") player.mute();
                                                                       //
			opt.videoplaying = true;                                            // 3520
			container.trigger('stoptimer');                                     // 3521
			container.trigger('revolution.slide.onvideoplay');                  // 3522
		} else {                                                             //
                                                                       //
			var bt = container.find('.tp-bannertimer');                         // 3526
			var opt = bt.data('opt');                                           // 3527
                                                                       //
			if (event.data != -1 && event.data != 3) {                          // 3529
                                                                       //
				opt.videoplaying = false;                                          // 3531
				container.trigger('starttimer');                                   // 3532
				container.trigger('revolution.slide.onvideostop');                 // 3533
			}                                                                   //
                                                                       //
			if (event.data == 0 && opt.nextslideatend == true) opt.container.revnext();else {
                                                                       //
				opt.videoplaying = false;                                          // 3541
				container.trigger('starttimer');                                   // 3542
				container.trigger('revolution.slide.onvideostop');                 // 3543
			}                                                                   //
		}                                                                    //
	};                                                                    //
                                                                       //
	////////////////////////                                              //
	// VIMEO ADD EVENT /////                                              //
	////////////////////////                                              //
	var addEvent = function (element, eventName, callback) {              // 3556
                                                                       //
		if (element.addEventListener) element.addEventListener(eventName, callback, false);else element.attachEvent(eventName, callback, false);
	};                                                                    //
                                                                       //
	/////////////////////////////////////                                 //
	// EVENT HANDLING FOR VIMEO VIDEOS //                                 //
	/////////////////////////////////////                                 //
                                                                       //
	var vimeoready_auto = function (player_id, autoplay) {                // 3572
                                                                       //
		var froogaloop = $f(player_id),                                      // 3574
		    vimcont = jQuery('#' + player_id),                               //
		    container = vimcont.closest('.tp-simpleresponsive'),             //
		    nextcaption = vimcont.closest('.tp-caption');                    //
                                                                       //
		setTimeout(function () {                                             // 3579
			froogaloop.addEvent('ready', function (data) {                      // 3580
				if (autoplay) froogaloop.api('play');                              // 3581
                                                                       //
				froogaloop.addEvent('play', function (data) {                      // 3584
					var bt = container.find('.tp-bannertimer');                       // 3585
					var opt = bt.data('opt');                                         // 3586
                                                                       //
					opt.videoplaying = true;                                          // 3588
					container.trigger('stoptimer');                                   // 3589
					if (nextcaption.data('volume') == "mute") froogaloop.api('setVolume', "0");
				});                                                                //
                                                                       //
				froogaloop.addEvent('finish', function (data) {                    // 3594
					var bt = container.find('.tp-bannertimer');                       // 3595
					var opt = bt.data('opt');                                         // 3596
					opt.videoplaying = false;                                         // 3597
					container.trigger('starttimer');                                  // 3598
                                                                       //
					container.trigger('revolution.slide.onvideoplay'); //opt.videostartednow=1;
					if (opt.nextslideatend == true) opt.container.revnext();          // 3601
				});                                                                //
                                                                       //
				froogaloop.addEvent('pause', function (data) {                     // 3606
					var bt = container.find('.tp-bannertimer');                       // 3607
					var opt = bt.data('opt');                                         // 3608
					opt.videoplaying = false;                                         // 3609
					container.trigger('starttimer');                                  // 3610
					container.trigger('revolution.slide.onvideostop'); //opt.videostoppednow=1;
				});                                                                //
                                                                       //
				// PLAY VIDEO IF THUMBNAIL HAS BEEN CLICKED                        //
				nextcaption.find('.tp-thumb-image').click(function () {            // 3615
					punchgs.TweenLite.to(jQuery(this), 0.3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut });
					froogaloop.api("play");                                           // 3617
				});                                                                //
			});                                                                 //
		}, 150);                                                             //
	};                                                                    //
                                                                       //
	/////////////////////////////////////                                 //
	// RESIZE HTML5VIDEO FOR FULLSCREEN//                                 //
	/////////////////////////////////////                                 //
	var updateHTML5Size = function (pc, container) {                      // 3628
		var windowW = container.width();                                     // 3629
		var windowH = container.height();                                    // 3630
		var mediaAspect = pc.data('mediaAspect');                            // 3631
		if (mediaAspect == undefined) mediaAspect = 1;                       // 3632
                                                                       //
		var windowAspect = windowW / windowH;                                // 3635
                                                                       //
		pc.css({ position: "absolute" });                                    // 3637
		var video = pc.find('video');                                        // 3638
                                                                       //
		if (windowAspect < mediaAspect) {                                    // 3641
			// taller                                                           //
			punchgs.TweenLite.to(pc, 0.0001, { width: windowH * mediaAspect, force3D: "auto", top: 0,
				left: 0 - (windowH * mediaAspect - windowW) / 2,                   // 3644
				height: windowH });                                                // 3645
		} else {                                                             //
			// wider                                                            //
			punchgs.TweenLite.to(pc, 0.0001, { width: windowW, force3D: "auto", top: 0 - (windowW / mediaAspect - windowH) / 2,
				left: 0,                                                           // 3650
				height: windowW / mediaAspect });                                  // 3651
		}                                                                    //
	};                                                                    //
                                                                       //
	/////////////////////////////////////                                 //
	//	-	CREATE ANIMATION OBJECT	-  //                                    //
	/////////////////////////////////////                                 //
	var newAnimObject = function () {                                     // 3660
		var a = new Object();                                                // 3661
		a.x = 0;                                                             // 3662
		a.y = 0;                                                             // 3663
		a.rotationX = 0;                                                     // 3664
		a.rotationY = 0;                                                     // 3665
		a.rotationZ = 0;                                                     // 3666
		a.scale = 1;                                                         // 3667
		a.scaleX = 1;                                                        // 3668
		a.scaleY = 1;                                                        // 3669
		a.skewX = 0;                                                         // 3670
		a.skewY = 0;                                                         // 3671
		a.opacity = 0;                                                       // 3672
		a.transformOrigin = "center, center";                                // 3673
		a.transformPerspective = 400;                                        // 3674
		a.rotation = 0;                                                      // 3675
		return a;                                                            // 3676
	};                                                                    //
                                                                       //
	///////////////////////////////////////////////////                   //
	// ANALYSE AND READ OUT DATAS FROM HTML CAPTIONS //                   //
	///////////////////////////////////////////////////                   //
	var getAnimDatas = function (frm, data) {                             // 3682
                                                                       //
		var customarray = data.split(';');                                   // 3684
		jQuery.each(customarray, function (index, param) {                   // 3685
                                                                       //
			param = param.split(":");                                           // 3687
                                                                       //
			var w = param[0],                                                   // 3689
			    v = param[1];                                                   //
			if (w == "rotationX") frm.rotationX = parseInt(v, 0);               // 3691
			if (w == "rotationY") frm.rotationY = parseInt(v, 0);               // 3692
			if (w == "rotationZ") frm.rotationZ = parseInt(v, 0);               // 3693
			if (w == "rotationZ") frm.rotation = parseInt(v, 0);                // 3694
			if (w == "scaleX") frm.scaleX = parseFloat(v);                      // 3695
			if (w == "scaleY") frm.scaleY = parseFloat(v);                      // 3696
			if (w == "opacity") frm.opacity = parseFloat(v);                    // 3697
			if (w == "skewX") frm.skewX = parseInt(v, 0);                       // 3698
			if (w == "skewY") frm.skewY = parseInt(v, 0);                       // 3699
			if (w == "x") frm.x = parseInt(v, 0);                               // 3700
			if (w == "y") frm.y = parseInt(v, 0);                               // 3701
			if (w == "z") frm.z = parseInt(v, 0);                               // 3702
			if (w == "transformOrigin") frm.transformOrigin = v.toString();     // 3703
			if (w == "transformPerspective") frm.transformPerspective = parseInt(v, 0);
		});                                                                  //
                                                                       //
		return frm;                                                          // 3707
	};                                                                    //
	///////////////////////////////////////////////////////////////////   //
	// ANALYSE AND READ OUT DATAS FROM HTML CAPTIONS ANIMATION STEPS //   //
	///////////////////////////////////////////////////////////////////   //
	var getAnimSteps = function (data) {                                  // 3712
                                                                       //
		var paramarray = data.split("animation:");                           // 3714
		var params = new Object();                                           // 3715
                                                                       //
		params.animation = getAnimDatas(newAnimObject(), paramarray[1]);     // 3717
		var customarray = paramarray[0].split(';');                          // 3718
                                                                       //
		jQuery.each(customarray, function (index, param) {                   // 3720
			param = param.split(":");                                           // 3721
			var w = param[0],                                                   // 3722
			    v = param[1];                                                   //
			if (w == "typ") params.typ = v;                                     // 3724
			if (w == "speed") params.speed = parseInt(v, 0) / 1000;             // 3725
			if (w == "start") params.start = parseInt(v, 0) / 1000;             // 3726
			if (w == "elementdelay") params.elementdelay = parseFloat(v);       // 3727
			if (w == "ease") params.ease = v;                                   // 3728
		});                                                                  //
                                                                       //
		return params;                                                       // 3731
	};                                                                    //
                                                                       //
	////////////////////////                                              //
	// SHOW THE CAPTION  //                                               //
	///////////////////////                                               //
	var animateTheCaptions = function (nextli, opt, recalled, mtl) {      // 3740
                                                                       //
		// MAKE SURE THE ANIMATION ENDS WITH A CLEANING ON MOZ TRANSFORMS    //
		function animcompleted() {}                                          // 3743
                                                                       //
		function tlstart() {}                                                // 3746
                                                                       //
		if (nextli.data('ctl') == undefined) {                               // 3749
			nextli.data('ctl', new punchgs.TimelineLite());                     // 3750
		}                                                                    //
                                                                       //
		var ctl = nextli.data('ctl'),                                        // 3753
		    offsetx = 0,                                                     //
		    offsety = 0,                                                     //
		    allcaptions = nextli.find('.tp-caption'),                        //
		    allstaticcaptions = opt.container.find('.tp-static-layers').find('.tp-caption');
                                                                       //
		ctl.pause();                                                         // 3760
                                                                       //
		jQuery.each(allstaticcaptions, function (index, staticcapt) {        // 3762
			allcaptions.push(staticcapt);                                       // 3763
		});                                                                  //
                                                                       //
		allcaptions.each(function (i) {                                      // 3766
			var internrecalled = recalled,                                      // 3767
			    staticdirection = -1,                                           //
			    // 1 -> In,  2-> Out  0-> Ignore  -1-> Not Static               //
			nextcaption = jQuery(this);                                         // 3769
                                                                       //
			if (nextcaption.hasClass("tp-static-layer")) {                      // 3771
				var nss = nextcaption.data('startslide'),                          // 3772
				    nes = nextcaption.data('endslide');                            //
                                                                       //
				if (nss == -1 || nss == "-1") nextcaption.data('startslide', 0);   // 3775
                                                                       //
				if (nes == -1 || nes == "-1") nextcaption.data('endslide', opt.slideamount);
                                                                       //
				if (nss == 0 && nes == opt.slideamount - 1) nextcaption.data('endslide', opt.slideamount + 1);
                                                                       //
				// RESET SETTIGNS AFTER SETTING THEM AGAIN                         //
				nss = nextcaption.data('startslide'), nes = nextcaption.data('endslide');
                                                                       //
				// IF STATIC ITEM CURRENTLY NOT VISIBLE                            //
				if (!nextcaption.hasClass("tp-is-shown")) {                        // 3791
					// IF ITEM SHOULD BECOME VISIBLE                                  //
                                                                       //
					if (nss <= opt.next && nes >= opt.next || nss == opt.next || nes == opt.next) {
                                                                       //
						nextcaption.addClass("tp-is-shown");                             // 3798
						staticdirection = 1;                                             // 3799
					} else {                                                          //
                                                                       //
						staticdirection = 0;                                             // 3802
					}                                                                 //
					// IF STATIC ITEM ALREADY VISIBLE                                 //
				} else {                                                           //
						if (nes == opt.next || nss > opt.next || nes < opt.next) {       // 3806
                                                                       //
							staticdirection = 2;                                            // 3810
							//nextcaption.removeClass("tp-is-shown");                       //
						} else {                                                         //
								staticdirection = 0;                                           // 3813
							}                                                               //
					}                                                                 //
                                                                       //
				//if (staticdirection==2) staticdirection = 0;                     //
			}                                                                   //
                                                                       //
			offsetx = opt.width / 2 - opt.startwidth * opt.bw / 2;              // 3822
                                                                       //
			var xbw = opt.bw;                                                   // 3824
			var xbh = opt.bh;                                                   // 3825
                                                                       //
			if (opt.fullScreen == "on") offsety = opt.height / 2 - opt.startheight * opt.bh / 2;
                                                                       //
			if (opt.autoHeight == "on" || opt.minHeight != undefined && opt.minHeight > 0) offsety = opt.container.height() / 2 - opt.startheight * opt.bh / 2;;
                                                                       //
			if (offsety < 0) offsety = 0;                                       // 3834
                                                                       //
			var handlecaption = 0;                                              // 3838
                                                                       //
			// HIDE CAPTION IF RESOLUTION IS TOO LOW                            //
			if (opt.width < opt.hideCaptionAtLimit && nextcaption.data('captionhidden') == "on") {
				nextcaption.addClass("tp-hidden-caption");                         // 3842
				handlecaption = 1;                                                 // 3843
			} else {                                                            //
				if (opt.width < opt.hideAllCaptionAtLimit || opt.width < opt.hideAllCaptionAtLilmit) {
					nextcaption.addClass("tp-hidden-caption");                        // 3846
					handlecaption = 1;                                                // 3847
				} else {                                                           //
					nextcaption.removeClass("tp-hidden-caption");                     // 3849
				}                                                                  //
			}                                                                   //
                                                                       //
			if (handlecaption == 0) {                                           // 3855
                                                                       //
				// ADD A CLICK LISTENER TO THE CAPTION                             //
				if (nextcaption.data('linktoslide') != undefined && !nextcaption.hasClass("hasclicklistener")) {
					nextcaption.addClass("hasclicklistener");                         // 3859
					nextcaption.css({ 'cursor': 'pointer' });                         // 3860
					if (nextcaption.data('linktoslide') != "no") {                    // 3861
						nextcaption.click(function () {                                  // 3862
							var nextcaption = jQuery(this);                                 // 3863
							var dir = nextcaption.data('linktoslide');                      // 3864
							if (dir != "next" && dir != "prev") {                           // 3865
								opt.container.data('showus', dir);                             // 3866
								opt.container.parent().find('.tp-rightarrow').click();         // 3867
							} else if (dir == "next") opt.container.parent().find('.tp-rightarrow').click();else if (dir == "prev") opt.container.parent().find('.tp-leftarrow').click();
						});                                                              //
					}                                                                 //
				} // END OF CLICK LISTENER                                         //
                                                                       //
				if (offsetx < 0) offsetx = 0;                                      // 3879
                                                                       //
				if (nextcaption.hasClass("tp-videolayer") || nextcaption.find('iframe').length > 0 || nextcaption.find('video').length > 0) {
                                                                       //
					// YOUTUBE AND VIMEO LISTENRES INITIALISATION                     //
					var frameID = "iframe" + Math.round(Math.random() * 100000 + 1),  // 3885
					    vidw = nextcaption.data("videowidth"),                        //
					    vidh = nextcaption.data("videoheight"),                       //
					    vida = nextcaption.data("videoattributes"),                   //
					    vidytid = nextcaption.data('ytid'),                           //
					    vimeoid = nextcaption.data('vimeoid'),                        //
					    videopreload = nextcaption.data('videpreload'),               //
					    videomp = nextcaption.data('videomp4'),                       //
					    videowebm = nextcaption.data('videowebm'),                    //
					    videoogv = nextcaption.data('videoogv'),                      //
					    videocontrols = nextcaption.data('videocontrols'),            //
					    httpprefix = "http",                                          //
					    videoloop = nextcaption.data('videoloop') == "loop" ? "loop" : nextcaption.data('videoloop') == "loopandnoslidestop" ? "loop" : "";
                                                                       //
					if (nextcaption.data('thumbimage') != undefined && nextcaption.data('videoposter') == undefined) nextcaption.data('videoposter', nextcaption.data('thumbimage'));
                                                                       //
					// ADD YOUTUBE IFRAME IF NEEDED                                   //
					if (vidytid != undefined && String(vidytid).length > 1 && nextcaption.find('iframe').length == 0) {
						httpprefix = "https";                                            // 3904
                                                                       //
						if (videocontrols == "none") {                                   // 3906
							vida = vida.replace("controls=1", "controls=0");                // 3907
							if (vida.toLowerCase().indexOf('controls') == -1) vida = vida + "&controls=0";
						}                                                                //
						nextcaption.append('<iframe style="visible:hidden" src="' + httpprefix + '://www.youtube.com/embed/' + vidytid + '?' + vida + '" width="' + vidw + '" height="' + vidh + '" style="width:' + vidw + 'px;height:' + vidh + 'px"></iframe>');
					}                                                                 //
                                                                       //
					// ADD VIMEO IFRAME IF NEEDED                                     //
					if (vimeoid != undefined && String(vimeoid).length > 1 && nextcaption.find('iframe').length == 0) {
						if (location.protocol === 'https:') httpprefix = "https";        // 3916
                                                                       //
						nextcaption.append('<iframe style="visible:hidden" src="' + httpprefix + '://player.vimeo.com/video/' + vimeoid + '?' + vida + '" width="' + vidw + '" height="' + vidh + '" style="width:' + vidw + 'px;height:' + vidh + 'px"></iframe>');
					}                                                                 //
                                                                       //
					// ADD HTML5 VIDEO IF NEEDED                                      //
					if ((videomp != undefined || videowebm != undefined) && nextcaption.find('video').length == 0) {
                                                                       //
						if (videocontrols != "controls") videocontrols = "";             // 3925
						var apptxt = '<video style="visible:hidden" class="" ' + videoloop + ' preload="' + videopreload + '" width="' + vidw + '" height="' + vidh + '"';
						/*if (nextcaption.data('videoposter')!=undefined)                //
      	apptxt = apptxt + 'poster="'+nextcaption.data('videoposter')+'">';
      	apptxt = apptxt + '<source src="'+videomp+'" type="video/mp4" />';
      	apptxt = apptxt + '<source src="'+videowebm+'" type="video/webm" />';
      	apptxt = apptxt + '<source src="'+videoogv+'" type="video/ogg" />';
      	apptxt = apptxt + '</video>';                                   //
      nextcaption.append(apptxt);*/                                    //
                                                                       //
						if (nextcaption.data('videoposter') != undefined) if (nextcaption.data('videoposter') != undefined) apptxt = apptxt + 'poster="' + nextcaption.data('videoposter') + '">';
						if (videowebm != undefined && get_browser().toLowerCase() == "firefox") apptxt = apptxt + '<source src="' + videowebm + '" type="video/webm" />';
						if (videomp != undefined) apptxt = apptxt + '<source src="' + videomp + '" type="video/mp4" />';
						if (videoogv != undefined) apptxt = apptxt + '<source src="' + videoogv + '" type="video/ogg" />';
						apptxt = apptxt + '</video>';                                    // 3940
						nextcaption.append(apptxt);                                      // 3941
                                                                       //
						if (videocontrols == "controls") nextcaption.append('<div class="tp-video-controls">' + '<div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div>' + '<div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div>' + '<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div>' + '<div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>' + '<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>' + '</div>');
					}                                                                 //
                                                                       //
					// RESET DEFAULTS                                                 //
					var autoplaywason = false;                                        // 3954
					if (nextcaption.data('autoplayonlyfirsttime') == true || nextcaption.data('autoplayonlyfirsttime') == "true" || nextcaption.data('autoplay') == true) {
						nextcaption.data('autoplay', true);                              // 3956
						autoplaywason = true;                                            // 3957
					}                                                                 //
                                                                       //
					nextcaption.find('iframe').each(function () {                     // 3961
						var ifr = jQuery(this);                                          // 3962
                                                                       //
						punchgs.TweenLite.to(ifr, 0.1, { autoAlpha: 1, zIndex: 0, transformStyle: "preserve-3d", z: 0, rotationX: 0, force3D: "auto" });
						if (is_mobile()) {                                               // 3965
							var oldsrc = ifr.attr('src');                                   // 3966
							ifr.attr('src', "");                                            // 3967
							ifr.attr('src', oldsrc);                                        // 3968
						}                                                                //
                                                                       //
						// START YOUTUBE HANDLING                                        //
						opt.nextslideatend = nextcaption.data('nextslideatend');         // 3973
                                                                       //
						// IF VIDEOPOSTER EXISTING                                       //
						if (nextcaption.data('videoposter') != undefined && nextcaption.data('videoposter').length > 2 && nextcaption.data('autoplay') != true && !internrecalled) {
							if (nextcaption.find('.tp-thumb-image').length == 0) nextcaption.append('<div class="tp-thumb-image" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url(' + nextcaption.data('videoposter') + '); background-size:cover"></div>');else punchgs.TweenLite.set(nextcaption.find('.tp-thumb-image'), { autoAlpha: 1 });
						}                                                                //
                                                                       //
						// IF IFRAME IS A YOUTUBE FRAME                                  //
						if (ifr.attr('src').toLowerCase().indexOf('youtube') >= 0) {     // 3984
                                                                       //
							// IF LISTENER DOES NOT EXIST YET                               //
							if (!ifr.hasClass("HasListener")) {                             // 3987
								try {                                                          // 3988
									ifr.attr('id', frameID);                                      // 3989
									var player;                                                   // 3990
									var ytint = setInterval(function () {                         // 3991
										if (YT != undefined) if (typeof YT.Player != undefined && typeof YT.Player != "undefined") {
											player = new YT.Player(frameID, {                           // 3994
												events: {                                                  // 3995
													"onStateChange": onPlayerStateChange,                     // 3996
													'onReady': function (event) {                             // 3997
														var embedCode = event.target.getVideoEmbedCode(),        // 3998
														    ytcont = jQuery('#' + embedCode.split('id="')[1].split('"')[0]),
														    nextcaption = ytcont.closest('.tp-caption'),         //
														    videorate = nextcaption.data('videorate'),           //
														    videostart = nextcaption.data('videostart');         //
                                                                       //
														if (videorate != undefined) event.target.setPlaybackRate(parseFloat(videorate));
                                                                       //
														/*if (nextcaption.data('autoplay')==true || autoplaywason)
              	event.target.playVideo();*/                             //
                                                                       //
														if (!is_mobile() && nextcaption.data('autoplay') == true || autoplaywason) {
															nextcaption.data('timerplay', setTimeout(function () {  // 4012
																event.target.playVideo();                              // 4013
															}, nextcaption.data('start')));                         //
														}                                                        //
                                                                       //
														// PLAY VIDEO IF THUMBNAIL HAS BEEN CLICKED              //
														nextcaption.find('.tp-thumb-image').click(function () {  // 4018
															punchgs.TweenLite.to(jQuery(this), 0.3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut });
															if (!is_mobile()) {                                     // 4020
																player.playVideo();                                    // 4021
															}                                                       //
														});                                                      //
													}                                                         //
												}                                                          //
											});                                                         //
										}                                                            //
										ifr.addClass("HasListener");                                 // 4029
										nextcaption.data('player', player);                          // 4030
										clearInterval(ytint);                                        // 4031
									}, 100);                                                      //
								} catch (e) {}                                                 //
							} else {                                                        //
								if (!recalled) {                                               // 4035
									var player = nextcaption.data('player');                      // 4036
									if (nextcaption.data('forcerewind') == "on" && !is_mobile()) player.seekTo(0);
                                                                       //
									if (!is_mobile() && nextcaption.data('autoplay') == true || autoplaywason) {
										nextcaption.data('timerplay', setTimeout(function () {       // 4041
											player.playVideo();                                         // 4042
										}, nextcaption.data('start')));                              //
									}                                                             //
								}                                                              //
							} // END YOUTUBE HANDLING                                       //
						} else                                                           //
                                                                       //
							// START VIMEO HANDLING                                         //
							if (ifr.attr('src').toLowerCase().indexOf('vimeo') >= 0) {      // 4052
								if (!ifr.hasClass("HasListener")) {                            // 4053
									ifr.addClass("HasListener");                                  // 4054
									ifr.attr('id', frameID);                                      // 4055
									var isrc = ifr.attr('src');                                   // 4056
									var queryParameters = {},                                     // 4057
									    queryString = isrc,                                       //
									    re = /([^&=]+)=([^&]*)/g,                                 //
									    m;                                                        //
									// Creates a map with the query string parameters             //
									while (m = re.exec(queryString)) {                            // 4060
										queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
									}                                                             //
                                                                       //
									if (queryParameters['player_id'] != undefined) isrc = isrc.replace(queryParameters['player_id'], frameID);else isrc = isrc + "&player_id=" + frameID;
                                                                       //
									try {                                                         // 4069
										isrc = isrc.replace('api=0', 'api=1');                       // 4069
									} catch (e) {}                                                //
                                                                       //
									isrc = isrc + "&api=1";                                       // 4071
                                                                       //
									ifr.attr('src', isrc);                                        // 4073
									var player = nextcaption.find('iframe')[0];                   // 4074
									var vimint = setInterval(function () {                        // 4075
										if ($f != undefined) {                                       // 4076
											if (typeof $f(frameID).api != undefined && typeof $f(frameID).api != "undefined") {
                                                                       //
												$f(player).addEvent('ready', function () {                 // 4079
													vimeoready_auto(frameID, autoplaywason);                  // 4080
												});                                                        //
												clearInterval(vimint);                                     // 4082
											}                                                           //
										}                                                            //
									}, 100);                                                      //
								} else {                                                       //
									if (!recalled) {                                              // 4088
										if (!is_mobile() && (nextcaption.data('autoplay') == true || nextcaption.data('forcerewind') == "on")) {
                                                                       //
											var ifr = nextcaption.find('iframe');                       // 4091
											var id = ifr.attr('id');                                    // 4092
											var froogaloop = $f(id);                                    // 4093
											if (nextcaption.data('forcerewind') == "on") froogaloop.api("seekTo", 0);
											nextcaption.data('timerplay', setTimeout(function () {      // 4096
												if (nextcaption.data('autoplay') == true) froogaloop.api("play");
											}, nextcaption.data('start')));                             //
										}                                                            //
									}                                                             //
								} // END HAS LISTENER HANDLING                                 //
							} // END OF VIMEO HANDLING                                      //
					}); // END OF LOOP THROUGH IFRAMES                                //
                                                                       //
					// START OF HTML5 VIDEOS                                          //
					if (is_mobile() && nextcaption.data('disablevideoonmobile') == 1 || isIE(8)) nextcaption.find('video').remove();
					//if (is_mobile() && jQuery(window).width()<569)  nextcaption.find('video').remove()
                                                                       //
					if (nextcaption.find('video').length > 0) {                       // 4112
						nextcaption.find('video').each(function (i) {                    // 4113
                                                                       //
							var video = this,                                               // 4115
							    jvideo = jQuery(this);                                      //
                                                                       //
							if (!jvideo.parent().hasClass("html5vid")) jvideo.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:auto;height:auto"></div>');
                                                                       //
							var html5vid = jvideo.parent();                                 // 4122
                                                                       //
							// WAITING FOR META DATAS                                       //
                                                                       //
							addEvent(video, 'loadedmetadata', (function (html5vid) {        // 4126
								html5vid.data('metaloaded', 1);                                // 4127
							})(html5vid));                                                  //
                                                                       //
							clearInterval(html5vid.data('interval'));                       // 4131
							html5vid.data('interval', setInterval(function () {             // 4132
								if (html5vid.data('metaloaded') == 1 || video.duration != NaN) {
									clearInterval(html5vid.data('interval'));                     // 4134
									// FIRST TIME LOADED THE HTML5 VIDEO                          //
									if (!html5vid.hasClass("HasListener")) {                      // 4136
										html5vid.addClass("HasListener");                            // 4137
                                                                       //
										if (nextcaption.data('dottedoverlay') != "none" && nextcaption.data('dottedoverlay') != undefined) if (nextcaption.find('.tp-dottedoverlay').length != 1) html5vid.append('<div class="tp-dottedoverlay ' + nextcaption.data('dottedoverlay') + '"></div>');
                                                                       //
										if (jvideo.attr('control') == undefined) {                   // 4143
											if (html5vid.find('.tp-video-play-button').length == 0) html5vid.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><div class="tp-revstop"></div></div>');
											html5vid.find('video, .tp-poster, .tp-video-play-button').click(function () {
												if (html5vid.hasClass("videoisplaying")) video.pause();else video.play();
											});                                                         //
										}                                                            //
                                                                       //
										if (nextcaption.data('forcecover') == 1 || nextcaption.hasClass('fullscreenvideo')) {
											if (nextcaption.data('forcecover') == 1) {                  // 4155
												updateHTML5Size(html5vid, opt.container);                  // 4156
												html5vid.addClass("fullcoveredvideo");                     // 4157
												nextcaption.addClass("fullcoveredvideo");                  // 4158
											}                                                           //
											html5vid.css({ width: "100%", height: "100%" });            // 4160
										}                                                            //
                                                                       //
										var playButton = nextcaption.find('.tp-vid-play-pause')[0],  // 4165
										    muteButton = nextcaption.find('.tp-vid-mute')[0],        //
										    fullScreenButton = nextcaption.find('.tp-vid-full-screen')[0],
										    seekBar = nextcaption.find('.tp-seek-bar')[0],           //
										    volumeBar = nextcaption.find('.tp-volume-bar')[0];       //
                                                                       //
										if (playButton != undefined) {                               // 4171
											// Event listener for the play/pause button                 //
											addEvent(playButton, "click", function () {                 // 4173
												if (video.paused == true)                                  // 4174
													// Play the video                                         //
													video.play();else                                         // 4176
													// Pause the video                                        //
													video.pause();                                            // 4179
											});                                                         //
                                                                       //
											// Event listener for the mute button                       //
											addEvent(muteButton, "click", function () {                 // 4183
												if (video.muted == false) {                                // 4184
													// Mute the video                                         //
													video.muted = true;                                       // 4186
                                                                       //
													// Update the button text                                 //
													muteButton.innerHTML = "Unmute";                          // 4189
												} else {                                                   //
													// Unmute the video                                       //
													video.muted = false;                                      // 4192
                                                                       //
													// Update the button text                                 //
													muteButton.innerHTML = "Mute";                            // 4195
												}                                                          //
											});                                                         //
                                                                       //
											// Event listener for the full-screen button                //
											addEvent(fullScreenButton, "click", function () {           // 4200
												if (video.requestFullscreen) {                             // 4201
													video.requestFullscreen();                                // 4202
												} else if (video.mozRequestFullScreen) {                   //
													video.mozRequestFullScreen(); // Firefox                  // 4204
												} else if (video.webkitRequestFullscreen) {                //
														video.webkitRequestFullscreen(); // Chrome and Safari    // 4206
													}                                                         //
											});                                                         //
                                                                       //
											// Event listener for the seek bar                          //
											addEvent(seekBar, "change", function () {                   // 4212
												// Calculate the new time                                  //
												var time = video.duration * (seekBar.value / 100);         // 4214
												// Update the video time                                   //
												video.currentTime = time;                                  // 4216
											});                                                         //
                                                                       //
											// Update the seek bar as the video plays                   //
											addEvent(video, "timeupdate", function () {                 // 4221
												// Calculate the slider value                              //
												var value = 100 / video.duration * video.currentTime;      // 4223
                                                                       //
												// Update the slider value                                 //
												seekBar.value = value;                                     // 4226
											});                                                         //
                                                                       //
											// Pause the video when the seek handle is being dragged    //
											addEvent(seekBar, "mousedown", function () {                // 4230
												video.pause();                                             // 4231
											});                                                         //
                                                                       //
											// Play the video when the seek handle is dropped           //
											addEvent(seekBar, "mouseup", function () {                  // 4235
												video.play();                                              // 4236
											});                                                         //
                                                                       //
											// Event listener for the volume bar                        //
											addEvent(volumeBar, "change", function () {                 // 4240
												// Update the video volume                                 //
												video.volume = volumeBar.value;                            // 4242
											});                                                         //
										}                                                            //
                                                                       //
										// VIDEO EVENT LISTENER FOR "PLAY"                           //
										addEvent(video, "play", function () {                        // 4248
											if (nextcaption.data('volume') == "mute") video.muted = true;
                                                                       //
											html5vid.addClass("videoisplaying");                        // 4252
                                                                       //
											if (nextcaption.data('videoloop') == "loopandnoslidestop") {
												opt.videoplaying = false;                                  // 4255
												opt.container.trigger('starttimer');                       // 4256
												opt.container.trigger('revolution.slide.onvideostop');     // 4257
											} else {                                                    //
                                                                       //
												opt.videoplaying = true;                                   // 4260
												opt.container.trigger('stoptimer');                        // 4261
												opt.container.trigger('revolution.slide.onvideoplay');     // 4262
											}                                                           //
                                                                       //
											var playButton = nextcaption.find('.tp-vid-play-pause')[0],
											    muteButton = nextcaption.find('.tp-vid-mute')[0];       //
											if (playButton != undefined) playButton.innerHTML = "Pause";
											if (muteButton != undefined && video.muted) muteButton.innerHTML = "Unmute";
										});                                                          //
                                                                       //
										// VIDEO EVENT LISTENER FOR "PAUSE"                          //
										addEvent(video, "pause", function () {                       // 4274
											html5vid.removeClass("videoisplaying");                     // 4275
											opt.videoplaying = false;                                   // 4276
											opt.container.trigger('starttimer');                        // 4277
											opt.container.trigger('revolution.slide.onvideostop');      // 4278
											var playButton = nextcaption.find('.tp-vid-play-pause')[0];
											if (playButton != undefined) playButton.innerHTML = "Play";
										});                                                          //
                                                                       //
										// VIDEO EVENT LISTENER FOR "END"                            //
										addEvent(video, "ended", function () {                       // 4286
											html5vid.removeClass("videoisplaying");                     // 4287
											opt.videoplaying = false;                                   // 4288
											opt.container.trigger('starttimer');                        // 4289
											opt.container.trigger('revolution.slide.onvideostop');      // 4290
											if (opt.nextslideatend == true) opt.container.revnext();    // 4291
										});                                                          //
									} // END OF LISTENER DECLARATION                              //
                                                                       //
									var autoplaywason = false;                                    // 4297
									if (nextcaption.data('autoplayonlyfirsttime') == true || nextcaption.data('autoplayonlyfirsttime') == "true") autoplaywason = true;
                                                                       //
									var mediaaspect = 16 / 9;                                     // 4301
									if (nextcaption.data('aspectratio') == "4:3") mediaaspect = 4 / 3;
									html5vid.data('mediaAspect', mediaaspect);                    // 4303
                                                                       //
									if (html5vid.closest('.tp-caption').data('forcecover') == 1) {
										updateHTML5Size(html5vid, opt.container);                    // 4306
										html5vid.addClass("fullcoveredvideo");                       // 4307
									}                                                             //
                                                                       //
									jvideo.css({ display: "block" });                             // 4310
									opt.nextslideatend = nextcaption.data('nextslideatend');      // 4311
                                                                       //
									// IF VIDEO SHOULD BE AUTOPLAYED                              //
									if (nextcaption.data('autoplay') == true || autoplaywason == true) {
                                                                       //
										if (nextcaption.data('videoloop') == "loopandnoslidestop") {
											opt.videoplaying = false;                                   // 4318
											opt.container.trigger('starttimer');                        // 4319
											opt.container.trigger('revolution.slide.onvideostop');      // 4320
										} else {                                                     //
											opt.videoplaying = true;                                    // 4322
											opt.container.trigger('stoptimer');                         // 4323
											opt.container.trigger('revolution.slide.onvideoplay');      // 4324
										}                                                            //
                                                                       //
										if (nextcaption.data('forcerewind') == "on" && !html5vid.hasClass("videoisplaying")) if (video.currentTime > 0) video.currentTime = 0;
                                                                       //
										if (nextcaption.data('volume') == "mute") video.muted = true;
                                                                       //
										html5vid.data('timerplay', setTimeout(function () {          // 4334
                                                                       //
											if (nextcaption.data('forcerewind') == "on" && !html5vid.hasClass("videoisplaying")) if (video.currentTime > 0) video.currentTime = 0;
                                                                       //
											if (nextcaption.data('volume') == "mute") video.muted = true;
                                                                       //
											video.play();                                               // 4343
										}, 10 + nextcaption.data('start')));                         //
									}                                                             //
                                                                       //
									if (html5vid.data('ww') == undefined) html5vid.data('ww', jvideo.attr('width'));
									if (html5vid.data('hh') == undefined) html5vid.data('hh', jvideo.attr('height'));
                                                                       //
									if (!nextcaption.hasClass("fullscreenvideo") && nextcaption.data('forcecover') == 1) {
										try {                                                        // 4351
											html5vid.width(html5vid.data('ww') * opt.bw);               // 4352
											html5vid.height(html5vid.data('hh') * opt.bh);              // 4353
										} catch (e) {}                                               //
									}                                                             //
                                                                       //
									clearInterval(html5vid.data('interval'));                     // 4357
								}                                                              //
							}), 100); // END OF SET INTERVAL                                //
						});                                                              //
					} // END OF HTML5 VIDEO FUNCTIONS                                 //
                                                                       //
					// IF AUTOPLAY IS ON, WE NEED SOME STOP FUNCTION ON               //
					if (nextcaption.data('autoplay') == true) {                       // 4365
						setTimeout(function () {                                         // 4366
                                                                       //
							if (nextcaption.data('videoloop') != "loopandnoslidestop") {    // 4368
								opt.videoplaying = true;                                       // 4369
								opt.container.trigger('stoptimer');                            // 4370
							}                                                               //
						}, 200);                                                         //
						if (nextcaption.data('videoloop') != "loopandnoslidestop") {     // 4373
							opt.videoplaying = true;                                        // 4374
							opt.container.trigger('stoptimer');                             // 4375
						}                                                                //
                                                                       //
						if (nextcaption.data('autoplayonlyfirsttime') == true || nextcaption.data('autoplayonlyfirsttime') == "true") {
							nextcaption.data('autoplay', false);                            // 4379
							nextcaption.data('autoplayonlyfirsttime', false);               // 4380
						}                                                                //
					}                                                                 //
				}                                                                  //
                                                                       //
				// NEW ENGINE                                                      //
				//if (nextcaption.hasClass("randomrotate") && (opt.ie || opt.ie9)) nextcaption.removeClass("randomrotate").addClass("sfb");
				//	nextcaption.removeClass('noFilterClass');                       //
                                                                       //
				var imw = 0;                                                       // 4394
				var imh = 0;                                                       // 4395
                                                                       //
				if (nextcaption.find('img').length > 0) {                          // 4397
					var im = nextcaption.find('img');                                 // 4398
					if (im.width() == 0) im.css({ width: "auto" });                   // 4399
					if (im.height() == 0) im.css({ height: "auto" });                 // 4400
                                                                       //
					if (im.data('ww') == undefined && im.width() > 0) im.data('ww', im.width());
					if (im.data('hh') == undefined && im.height() > 0) im.data('hh', im.height());
                                                                       //
					var ww = im.data('ww');                                           // 4405
					var hh = im.data('hh');                                           // 4406
                                                                       //
					if (ww == undefined) ww = 0;                                      // 4408
					if (hh == undefined) hh = 0;                                      // 4409
                                                                       //
					im.width(ww * opt.bw);                                            // 4411
					im.height(hh * opt.bh);                                           // 4412
					imw = im.width();                                                 // 4413
					imh = im.height();                                                // 4414
				} else {                                                           //
                                                                       //
					if (nextcaption.find('iframe').length > 0 || nextcaption.find('video').length > 0) {
                                                                       //
						var html5vid = false,                                            // 4419
						    im = nextcaption.find('iframe');                             //
						if (im.length == 0) {                                            // 4421
							im = nextcaption.find('video');                                 // 4422
							html5vid = true;                                                // 4423
						}                                                                //
						im.css({ display: "block" });                                    // 4425
                                                                       //
						if (nextcaption.data('ww') == undefined) nextcaption.data('ww', im.width());
						if (nextcaption.data('hh') == undefined) nextcaption.data('hh', im.height());
                                                                       //
						var ww = nextcaption.data('ww'),                                 // 4430
						    hh = nextcaption.data('hh');                                 //
                                                                       //
						var nc = nextcaption;                                            // 4433
						if (nc.data('fsize') == undefined) nc.data('fsize', parseInt(nc.css('font-size'), 0) || 0);
						if (nc.data('pt') == undefined) nc.data('pt', parseInt(nc.css('paddingTop'), 0) || 0);
						if (nc.data('pb') == undefined) nc.data('pb', parseInt(nc.css('paddingBottom'), 0) || 0);
						if (nc.data('pl') == undefined) nc.data('pl', parseInt(nc.css('paddingLeft'), 0) || 0);
						if (nc.data('pr') == undefined) nc.data('pr', parseInt(nc.css('paddingRight'), 0) || 0);
                                                                       //
						if (nc.data('mt') == undefined) nc.data('mt', parseInt(nc.css('marginTop'), 0) || 0);
						if (nc.data('mb') == undefined) nc.data('mb', parseInt(nc.css('marginBottom'), 0) || 0);
						if (nc.data('ml') == undefined) nc.data('ml', parseInt(nc.css('marginLeft'), 0) || 0);
						if (nc.data('mr') == undefined) nc.data('mr', parseInt(nc.css('marginRight'), 0) || 0);
                                                                       //
						if (nc.data('bt') == undefined) nc.data('bt', parseInt(nc.css('borderTop'), 0) || 0);
						if (nc.data('bb') == undefined) nc.data('bb', parseInt(nc.css('borderBottom'), 0) || 0);
						if (nc.data('bl') == undefined) nc.data('bl', parseInt(nc.css('borderLeft'), 0) || 0);
						if (nc.data('br') == undefined) nc.data('br', parseInt(nc.css('borderRight'), 0) || 0);
                                                                       //
						if (nc.data('lh') == undefined) nc.data('lh', parseInt(nc.css('lineHeight'), 0) || 0);
                                                                       //
						// IE8 FIX FOR AUTO LINEHEIGHT                                   //
						if (nc.data('lh') == "auto") nc.data('lh', nc.data('fsize') + 4);
                                                                       //
						var fvwidth = opt.width,                                         // 4455
						    fvheight = opt.height;                                       //
						if (fvwidth > opt.startwidth) fvwidth = opt.startwidth;          // 4457
						if (fvheight > opt.startheight) fvheight = opt.startheight;      // 4458
                                                                       //
						if (!nextcaption.hasClass('fullscreenvideo')) nextcaption.css({  // 4460
                                                                       //
							'font-size': nc.data('fsize') * opt.bw + "px",                  // 4463
                                                                       //
							'padding-top': nc.data('pt') * opt.bh + "px",                   // 4465
							'padding-bottom': nc.data('pb') * opt.bh + "px",                // 4466
							'padding-left': nc.data('pl') * opt.bw + "px",                  // 4467
							'padding-right': nc.data('pr') * opt.bw + "px",                 // 4468
                                                                       //
							'margin-top': nc.data('mt') * opt.bh + "px",                    // 4470
							'margin-bottom': nc.data('mb') * opt.bh + "px",                 // 4471
							'margin-left': nc.data('ml') * opt.bw + "px",                   // 4472
							'margin-right': nc.data('mr') * opt.bw + "px",                  // 4473
                                                                       //
							'border-top': nc.data('bt') * opt.bh + "px",                    // 4475
							'border-bottom': nc.data('bb') * opt.bh + "px",                 // 4476
							'border-left': nc.data('bl') * opt.bw + "px",                   // 4477
							'border-right': nc.data('br') * opt.bw + "px",                  // 4478
                                                                       //
							'line-height': nc.data('lh') * opt.bh + "px",                   // 4480
							'height': hh * opt.bh + 'px'                                    // 4481
						});else {                                                        //
                                                                       //
							offsetx = 0;offsety = 0;                                        // 4485
							nextcaption.data('x', 0);                                       // 4486
							nextcaption.data('y', 0);                                       // 4487
                                                                       //
							var ovhh = opt.height;                                          // 4489
							if (opt.autoHeight == "on") ovhh = opt.container.height();      // 4490
							nextcaption.css({                                               // 4492
                                                                       //
								'width': opt.width,                                            // 4494
								'height': ovhh                                                 // 4495
							});                                                             //
						}                                                                //
                                                                       //
						if (html5vid == false) {                                         // 4499
							im.width(ww * opt.bw);                                          // 4500
							im.height(hh * opt.bh);                                         // 4501
						} else if (nextcaption.data('forcecover') != 1 && !nextcaption.hasClass('fullscreenvideo')) {
							im.width(ww * opt.bw);                                          // 4507
							im.height(hh * opt.bh);                                         // 4508
						}                                                                //
                                                                       //
						imw = im.width();                                                // 4512
						imh = im.height();                                               // 4513
					} else {                                                          //
                                                                       //
						nextcaption.find('.tp-resizeme, .tp-resizeme *').each(function () {
							calcCaptionResponsive(jQuery(this), opt);                       // 4520
						});                                                              //
                                                                       //
						if (nextcaption.hasClass("tp-resizeme")) {                       // 4523
							nextcaption.find('*').each(function () {                        // 4524
								calcCaptionResponsive(jQuery(this), opt);                      // 4525
							});                                                             //
						}                                                                //
                                                                       //
						calcCaptionResponsive(nextcaption, opt);                         // 4529
                                                                       //
						imh = nextcaption.outerHeight(true);                             // 4531
						imw = nextcaption.outerWidth(true);                              // 4532
                                                                       //
						// NEXTCAPTION FRONTCORNER CHANGES                               //
						var ncch = nextcaption.outerHeight();                            // 4535
						var bgcol = nextcaption.css('backgroundColor');                  // 4536
						nextcaption.find('.frontcorner').css({                           // 4537
							'borderWidth': ncch + "px",                                     // 4538
							'left': 0 - ncch + 'px',                                        // 4539
							'borderRight': '0px solid transparent',                         // 4540
							'borderTopColor': bgcol                                         // 4541
						});                                                              //
                                                                       //
						nextcaption.find('.frontcornertop').css({                        // 4544
							'borderWidth': ncch + "px",                                     // 4545
							'left': 0 - ncch + 'px',                                        // 4546
							'borderRight': '0px solid transparent',                         // 4547
							'borderBottomColor': bgcol                                      // 4548
						});                                                              //
                                                                       //
						// NEXTCAPTION BACKCORNER CHANGES                                //
						nextcaption.find('.backcorner').css({                            // 4552
							'borderWidth': ncch + "px",                                     // 4553
							'right': 0 - ncch + 'px',                                       // 4554
							'borderLeft': '0px solid transparent',                          // 4555
							'borderBottomColor': bgcol                                      // 4556
						});                                                              //
                                                                       //
						// NEXTCAPTION BACKCORNER CHANGES                                //
						nextcaption.find('.backcornertop').css({                         // 4560
							'borderWidth': ncch + "px",                                     // 4561
							'right': 0 - ncch + 'px',                                       // 4562
							'borderLeft': '0px solid transparent',                          // 4563
							'borderTopColor': bgcol                                         // 4564
						});                                                              //
					}                                                                 //
				}                                                                  //
                                                                       //
				if (opt.fullScreenAlignForce == "on") {                            // 4572
					//xbw = 1;                                                        //
					//xbh = 1;                                                        //
					offsetx = 0;                                                      // 4575
					offsety = 0;                                                      // 4576
				}                                                                  //
                                                                       //
				if (nextcaption.data('voffset') == undefined) nextcaption.data('voffset', 0);
				if (nextcaption.data('hoffset') == undefined) nextcaption.data('hoffset', 0);
                                                                       //
				var vofs = nextcaption.data('voffset') * xbw;                      // 4584
				var hofs = nextcaption.data('hoffset') * xbw;                      // 4585
                                                                       //
				var crw = opt.startwidth * xbw;                                    // 4587
				var crh = opt.startheight * xbw;                                   // 4588
                                                                       //
				if (opt.fullScreenAlignForce == "on") {                            // 4590
					crw = opt.container.width();                                      // 4591
					crh = opt.container.height();                                     // 4592
				}                                                                  //
                                                                       //
				// CENTER THE CAPTION HORIZONTALLY                                 //
				if (nextcaption.data('x') == "center" || nextcaption.data('xcenter') == 'center') {
					nextcaption.data('xcenter', 'center');                            // 4599
					//nextcaption.data('x',(crw/2 - nextcaption.outerWidth(true)/2)/xbw+  hofs);
					nextcaption.data('x', crw / 2 - nextcaption.outerWidth(true) / 2 + hofs);
				}                                                                  //
                                                                       //
				// ALIGN LEFT THE CAPTION HORIZONTALLY                             //
				if (nextcaption.data('x') == "left" || nextcaption.data('xleft') == 'left') {
					nextcaption.data('xleft', 'left');                                // 4608
                                                                       //
					nextcaption.data('x', 0 / xbw + hofs);                            // 4610
				}                                                                  //
                                                                       //
				// ALIGN RIGHT THE CAPTION HORIZONTALLY                            //
				if (nextcaption.data('x') == "right" || nextcaption.data('xright') == 'right') {
					nextcaption.data('xright', 'right');                              // 4616
					nextcaption.data('x', (crw - nextcaption.outerWidth(true) + hofs) / xbw);
					//konsole.log("crw:"+crw+"  width:"+nextcaption.outerWidth(true)+"  xbw:"+xbw);
					//konsole.log("x-pos:"+nextcaption.data('x'))                     //
				}                                                                  //
                                                                       //
				// CENTER THE CAPTION VERTICALLY                                   //
				if (nextcaption.data('y') == "center" || nextcaption.data('ycenter') == 'center') {
					nextcaption.data('ycenter', 'center');                            // 4625
					nextcaption.data('y', crh / 2 - nextcaption.outerHeight(true) / 2 + vofs);
				}                                                                  //
                                                                       //
				// ALIGN TOP THE CAPTION VERTICALLY                                //
				if (nextcaption.data('y') == "top" || nextcaption.data('ytop') == 'top') {
					nextcaption.data('ytop', 'top');                                  // 4631
					nextcaption.data('y', 0 / opt.bh + vofs);                         // 4632
				}                                                                  //
                                                                       //
				// ALIGN BOTTOM THE CAPTION VERTICALLY                             //
				if (nextcaption.data('y') == "bottom" || nextcaption.data('ybottom') == 'bottom') {
					nextcaption.data('ybottom', 'bottom');                            // 4638
					nextcaption.data('y', (crh - nextcaption.outerHeight(true) + vofs) / xbw);
				}                                                                  //
                                                                       //
				// THE TRANSITIONS OF CAPTIONS                                     //
				// MDELAY AND MSPEED                                               //
				if (nextcaption.data('start') == undefined) nextcaption.data('start', 1000);
                                                                       //
				var easedata = nextcaption.data('easing');                         // 4651
				if (easedata == undefined) easedata = "punchgs.Power1.easeOut";    // 4652
                                                                       //
				var mdelay = nextcaption.data('start') / 1000,                     // 4655
				    mspeed = nextcaption.data('speed') / 1000;                     //
                                                                       //
				if (nextcaption.data('x') == "center" || nextcaption.data('xcenter') == 'center') var calcx = nextcaption.data('x') + offsetx;else {
                                                                       //
					var calcx = xbw * nextcaption.data('x') + offsetx;                // 4663
				}                                                                  //
                                                                       //
				if (nextcaption.data('y') == "center" || nextcaption.data('ycenter') == 'center') var calcy = nextcaption.data('y') + offsety;else {
					//if (opt.fullScreenAlignForce == "on" && (nextcaption.data('y')=="bottom" || nextcaption.data('ybottom')=='bottom'))
					//	opt.bh = 1;                                                    //
                                                                       //
					var calcy = opt.bh * nextcaption.data('y') + offsety;             // 4673
				}                                                                  //
                                                                       //
				punchgs.TweenLite.set(nextcaption, { top: calcy, left: calcx, overwrite: "auto" });
                                                                       //
				if (staticdirection == 0) internrecalled = true;                   // 4679
                                                                       //
				if (nextcaption.data('timeline') != undefined && !internrecalled) {
					if (staticdirection != 2) nextcaption.data('timeline').gotoAndPlay(0);
					internrecalled = true;                                            // 4685
				}                                                                  //
                                                                       //
				if (!internrecalled) {                                             // 4688
                                                                       //
					// CLEAR THE TIMELINE, SINCE IT CAN BE DAMAGED, OR PAUSED AT A FEW PART
					if (nextcaption.data('timeline') != undefined) {                  // 4693
						//nextcaption.data('timeline').clear();                          //
					}                                                                 //
                                                                       //
					var tl = new punchgs.TimelineLite({ smoothChildTiming: true, onStart: tlstart });
					tl.pause();                                                       // 4698
                                                                       //
					if (opt.fullScreenAlignForce == "on") {                           // 4701
						//calcy = nextcaption.data('y')+offsety;                         //
					}                                                                 //
                                                                       //
					var animobject = nextcaption;                                     // 4705
					if (nextcaption.data('mySplitText') != undefined) nextcaption.data('mySplitText').revert();
                                                                       //
					if (nextcaption.data('splitin') == "chars" || nextcaption.data('splitin') == "words" || nextcaption.data('splitin') == "lines" || nextcaption.data('splitout') == "chars" || nextcaption.data('splitout') == "words" || nextcaption.data('splitout') == "lines") {
						if (nextcaption.find('a').length > 0) nextcaption.data('mySplitText', new punchgs.SplitText(nextcaption.find('a'), { type: "lines,words,chars", charsClass: "tp-splitted", wordsClass: "tp-splitted", linesClass: "tp-splitted" }));else if (nextcaption.find('.tp-layer-inner-rotation').length > 0) nextcaption.data('mySplitText', new punchgs.SplitText(nextcaption.find('.tp-layer-inner-rotation'), { type: "lines,words,chars", charsClass: "tp-splitted", wordsClass: "tp-splitted", linesClass: "tp-splitted" }));else nextcaption.data('mySplitText', new punchgs.SplitText(nextcaption, { type: "lines,words,chars", charsClass: "tp-splitted", wordsClass: "tp-splitted", linesClass: "tp-splitted" }));
                                                                       //
						nextcaption.addClass("splitted");                                // 4718
					}                                                                 //
                                                                       //
					if (nextcaption.data('splitin') == "chars") animobject = nextcaption.data('mySplitText').chars;
                                                                       //
					if (nextcaption.data('splitin') == "words") animobject = nextcaption.data('mySplitText').words;
                                                                       //
					if (nextcaption.data('splitin') == "lines") animobject = nextcaption.data('mySplitText').lines;
                                                                       //
					var frm = newAnimObject();                                        // 4734
					var endfrm = newAnimObject();                                     // 4735
                                                                       //
					if (nextcaption.data('repeat') != undefined) repeatV = nextcaption.data('repeat');
					if (nextcaption.data('yoyo') != undefined) yoyoV = nextcaption.data('yoyo');
					if (nextcaption.data('repeatdelay') != undefined) repeatdelayV = nextcaption.data('repeatdelay');
                                                                       //
					var ncc = nextcaption.attr('class');                              // 4742
                                                                       //
					// WHICH ANIMATION TYPE SHOULD BE USED                            //
					if (ncc.match("customin")) frm = getAnimDatas(frm, nextcaption.data('customin'));else if (ncc.match("randomrotate")) {
                                                                       //
						frm.scale = Math.random() * 3 + 1;                               // 4749
						frm.rotation = Math.round(Math.random() * 200 - 100);            // 4750
						frm.x = Math.round(Math.random() * 200 - 100);                   // 4751
						frm.y = Math.round(Math.random() * 200 - 100);                   // 4752
					} else if (ncc.match('lfr') || ncc.match('skewfromright')) frm.x = 15 + opt.width;else if (ncc.match('lfl') || ncc.match('skewfromleft')) frm.x = -15 - imw;else if (ncc.match('sfl') || ncc.match('skewfromleftshort')) frm.x = -50;else if (ncc.match('sfr') || ncc.match('skewfromrightshort')) frm.x = 50;else if (ncc.match('lft')) frm.y = -25 - imh;else if (ncc.match('lfb')) frm.y = 25 + opt.height;else if (ncc.match('sft')) frm.y = -50;else if (ncc.match('sfb')) frm.y = 50;
                                                                       //
					if (ncc.match('skewfromright') || nextcaption.hasClass('skewfromrightshort')) frm.skewX = -85;else if (ncc.match('skewfromleft') || nextcaption.hasClass('skewfromleftshort')) frm.skewX = 85;
                                                                       //
					if (ncc.match("fade") || ncc.match('sft') || ncc.match('sfl') || ncc.match('sfb') || ncc.match('skewfromleftshort') || ncc.match('sfr') || ncc.match('skewfromrightshort')) frm.opacity = 0;
                                                                       //
					// FOR SAFARI WE NEED TO REMOVE 3D ROTATIONS                      //
					if (get_browser().toLowerCase() == "safari") {                    // 4781
						//frm.rotationX=0;frm.rotationY=0;                               //
					}                                                                 //
                                                                       //
					var elemdelay = nextcaption.data('elementdelay') == undefined ? 0 : nextcaption.data('elementdelay');
					endfrm.ease = frm.ease = nextcaption.data('easing') == undefined ? punchgs.Power1.easeInOut : nextcaption.data('easing');
                                                                       //
					// DISTANCES SHOULD BE RESIZED ALSO                               //
                                                                       //
					frm.data = new Object();                                          // 4791
					frm.data.oldx = frm.x;                                            // 4792
					frm.data.oldy = frm.y;                                            // 4793
                                                                       //
					endfrm.data = new Object();                                       // 4795
					endfrm.data.oldx = endfrm.x;                                      // 4796
					endfrm.data.oldy = endfrm.y;                                      // 4797
                                                                       //
					frm.x = frm.x * xbw;                                              // 4799
					frm.y = frm.y * xbw;                                              // 4800
                                                                       //
					var newtl = new punchgs.TimelineLite();                           // 4802
                                                                       //
					if (staticdirection != 2) {                                       // 4805
                                                                       //
						// CHANGE to punchgs.TweenLite.  if Yoyo and Repeat is used. Dont forget to laod the Right Tools for it !!
						if (ncc.match("customin")) {                                     // 4808
							if (animobject != nextcaption) tl.add(punchgs.TweenLite.set(nextcaption, { force3D: "auto", opacity: 1, scaleX: 1, scaleY: 1, rotationX: 0, rotationY: 0, rotationZ: 0, skewX: 0, skewY: 0, z: 0, x: 0, y: 0, visibility: 'visible', delay: 0, overwrite: "all" }));
							frm.visibility = "hidden";                                      // 4811
							endfrm.visibility = "visible";                                  // 4812
							endfrm.overwrite = "all";                                       // 4813
							endfrm.opacity = 1;                                             // 4814
							endfrm.onComplete = animcompleted();                            // 4815
							endfrm.delay = mdelay;                                          // 4816
							endfrm.force3D = "auto";                                        // 4817
                                                                       //
							tl.add(newtl.staggerFromTo(animobject, mspeed, frm, endfrm, elemdelay), "frame0");
						} else {                                                         //
                                                                       //
							frm.visibility = "visible";                                     // 4823
							frm.transformPerspective = 600;                                 // 4824
							if (animobject != nextcaption) tl.add(punchgs.TweenLite.set(nextcaption, { force3D: "auto", opacity: 1, scaleX: 1, scaleY: 1, rotationX: 0, rotationY: 0, rotationZ: 0, skewX: 0, skewY: 0, z: 0, x: 0, y: 0, visibility: 'visible', delay: 0, overwrite: "all" }));
                                                                       //
							endfrm.visibility = "visible";                                  // 4828
							endfrm.delay = mdelay;                                          // 4829
							endfrm.onComplete = animcompleted();                            // 4830
							endfrm.opacity = 1;                                             // 4831
							endfrm.force3D = "auto";                                        // 4832
							if (ncc.match("randomrotate") && animobject != nextcaption) {   // 4833
                                                                       //
								for (var i = 0; i < animobject.length; i++) {                  // 4835
									var obj = new Object();                                       // 4836
									var endobj = new Object();                                    // 4837
									jQuery.extend(obj, frm);                                      // 4838
									jQuery.extend(endobj, endfrm);                                // 4839
									frm.scale = Math.random() * 3 + 1;                            // 4840
									frm.rotation = Math.round(Math.random() * 200 - 100);         // 4841
									frm.x = Math.round(Math.random() * 200 - 100);                // 4842
									frm.y = Math.round(Math.random() * 200 - 100);                // 4843
                                                                       //
									if (i != 0) endobj.delay = mdelay + i * elemdelay;            // 4845
                                                                       //
									tl.append(punchgs.TweenLite.fromTo(animobject[i], mspeed, obj, endobj), "frame0");
								}                                                              //
							} else tl.add(newtl.staggerFromTo(animobject, mspeed, frm, endfrm, elemdelay), "frame0");
							//tl.add(punchgs.TweenLite.fromTo(nextcaption,mspeed,frm,endfrm),"frame0");
						}                                                                //
					}                                                                 //
                                                                       //
					// SAVE IT TO NCAPTION BEFORE NEW STEPS WILL BE ADDED             //
					nextcaption.data('timeline', tl);                                 // 4860
                                                                       //
					// FURTHER ANIMATIONS IN CASE THERE ARE MORE THAN ONE STEP IN THE ANIMATION CHAIN
					var frames = new Array();                                         // 4863
					if (nextcaption.data('frames') != undefined) {                    // 4864
						var rowtext = nextcaption.data('frames');                        // 4865
						rowtext = rowtext.replace(/\s+/g, '');                           // 4866
						rowtext = rowtext.replace("{", "");                              // 4867
						var spframes = rowtext.split('}');                               // 4868
						jQuery.each(spframes, function (index, spframe) {                // 4869
							if (spframe.length > 0) {                                       // 4870
								var params = getAnimSteps(spframe);                            // 4871
                                                                       //
								addMoveCaption(nextcaption, opt, params, "frame" + (index + 10), xbw);
							}                                                               //
						});                                                              //
					} // END OF ANIMATION STEPS                                       //
                                                                       //
					tl = nextcaption.data('timeline');                                // 4879
					// IF THERE IS ANY EXIT ANIM DEFINED                              //
					// For Static Layers -> 1 -> In,  2-> Out  0-> Ignore  -1-> Not Static
					if (nextcaption.data('end') != undefined && (staticdirection == -1 || staticdirection == 2)) {
						endMoveCaption(nextcaption, opt, nextcaption.data('end') / 1000, frm, "frame99", xbw);
					} else {                                                          //
						if (staticdirection == -1 || staticdirection == 2) endMoveCaption(nextcaption, opt, 999999, frm, "frame99", xbw);else endMoveCaption(nextcaption, opt, 200, frm, "frame99", xbw);
					}                                                                 //
                                                                       //
					// SAVE THE TIMELINE IN DOM ELEMENT                               //
					tl = nextcaption.data('timeline');                                // 4892
					nextcaption.data('timeline', tl);                                 // 4893
					callCaptionLoops(nextcaption, xbw);                               // 4894
					tl.resume();                                                      // 4895
				}                                                                  //
			}                                                                   //
                                                                       //
			if (internrecalled) {                                               // 4899
				killCaptionLoops(nextcaption);                                     // 4900
				callCaptionLoops(nextcaption, xbw);                                // 4901
                                                                       //
				if (nextcaption.data('timeline') != undefined) {                   // 4903
					var tweens = nextcaption.data('timeline').getTweensOf();          // 4904
					jQuery.each(tweens, function (index, tween) {                     // 4905
						if (tween.vars.data != undefined) {                              // 4906
							var newx = tween.vars.data.oldx * xbw;                          // 4907
							var newy = tween.vars.data.oldy * xbw;                          // 4908
							if (tween.progress() != 1 && tween.progress() != 0) {           // 4909
								try {                                                          // 4910
									//tween.updateTo({x:newx, y:newy},true);                      //
									tween.vars.x = newx;                                          // 4912
									tween.vary.y = newy;                                          // 4913
								} catch (e) {}                                                 //
							} else {                                                        //
								if (tween.progress() == 1) {                                   // 4918
									punchgs.TweenLite.set(tween.target, { x: newx, y: newy });    // 4919
								}                                                              //
							}                                                               //
						}                                                                //
					});                                                               //
				}                                                                  //
			}                                                                   //
		});                                                                  //
                                                                       //
		var bt = jQuery('body').find('#' + opt.container.attr('id')).find('.tp-bannertimer');
		bt.data('opt', opt);                                                 // 4930
                                                                       //
		if (mtl != undefined) setTimeout(function () {                       // 4934
			mtl.resume();                                                       // 4935
		}, 30);                                                              //
	};                                                                    //
                                                                       //
	var get_browser = function () {                                       // 4941
		var N = navigator.appName,                                           // 4942
		    ua = navigator.userAgent,                                        //
		    tem;                                                             //
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];              // 4945
		return M[0];                                                         // 4946
	};                                                                    //
	var get_browser_version = function () {                               // 4948
		var N = navigator.appName,                                           // 4949
		    ua = navigator.userAgent,                                        //
		    tem;                                                             //
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];              // 4952
		return M[1];                                                         // 4953
	};                                                                    //
                                                                       //
	/////////////////////////////////////////////////////////////////     //
	//	-	CALCULATE THE RESPONSIVE SIZES OF THE CAPTIONS	-	  //            //
	/////////////////////////////////////////////////////////////////     //
	var calcCaptionResponsive = function (nc, opt) {                      // 4959
		if (nc.data('fsize') == undefined) nc.data('fsize', parseInt(nc.css('font-size'), 0) || 0);
		if (nc.data('pt') == undefined) nc.data('pt', parseInt(nc.css('paddingTop'), 0) || 0);
		if (nc.data('pb') == undefined) nc.data('pb', parseInt(nc.css('paddingBottom'), 0) || 0);
		if (nc.data('pl') == undefined) nc.data('pl', parseInt(nc.css('paddingLeft'), 0) || 0);
		if (nc.data('pr') == undefined) nc.data('pr', parseInt(nc.css('paddingRight'), 0) || 0);
                                                                       //
		if (nc.data('mt') == undefined) nc.data('mt', parseInt(nc.css('marginTop'), 0) || 0);
		if (nc.data('mb') == undefined) nc.data('mb', parseInt(nc.css('marginBottom'), 0) || 0);
		if (nc.data('ml') == undefined) nc.data('ml', parseInt(nc.css('marginLeft'), 0) || 0);
		if (nc.data('mr') == undefined) nc.data('mr', parseInt(nc.css('marginRight'), 0) || 0);
                                                                       //
		if (nc.data('bt') == undefined) nc.data('bt', parseInt(nc.css('borderTopWidth'), 0) || 0);
		if (nc.data('bb') == undefined) nc.data('bb', parseInt(nc.css('borderBottomWidth'), 0) || 0);
		if (nc.data('bl') == undefined) nc.data('bl', parseInt(nc.css('borderLeftWidth'), 0) || 0);
		if (nc.data('br') == undefined) nc.data('br', parseInt(nc.css('borderRightWidth'), 0) || 0);
                                                                       //
		if (nc.data('ls') == undefined) nc.data('ls', parseInt(nc.css('letterSpacing'), 0) || 0);
                                                                       //
		if (nc.data('lh') == undefined) nc.data('lh', parseInt(nc.css('lineHeight'), 0) || "auto");
		if (nc.data('minwidth') == undefined) nc.data('minwidth', parseInt(nc.css('minWidth'), 0) || 0);
		if (nc.data('minheight') == undefined) nc.data('minheight', parseInt(nc.css('minHeight'), 0) || 0);
		if (nc.data('maxwidth') == undefined) nc.data('maxwidth', parseInt(nc.css('maxWidth'), 0) || "none");
		if (nc.data('maxheight') == undefined) nc.data('maxheight', parseInt(nc.css('maxHeight'), 0) || "none");
		if (nc.data('wii') == undefined) nc.data('wii', parseInt(nc.css('width'), 0) || 0);
		if (nc.data('hii') == undefined) nc.data('hii', parseInt(nc.css('height'), 0) || 0);
                                                                       //
		if (nc.data('wan') == undefined) nc.data('wan', nc.css("-webkit-transition"));
		if (nc.data('moan') == undefined) nc.data('moan', nc.css("-moz-animation-transition"));
		if (nc.data('man') == undefined) nc.data('man', nc.css("-ms-animation-transition"));
		if (nc.data('ani') == undefined) nc.data('ani', nc.css("transition"));
                                                                       //
		// IE8 FIX FOR AUTO LINEHEIGHT                                       //
		if (nc.data('lh') == "auto") nc.data('lh', nc.data('fsize') + 4);    // 4992
                                                                       //
		if (!nc.hasClass("tp-splitted")) {                                   // 4997
                                                                       //
			nc.css("-webkit-transition", "none");                               // 5000
			nc.css("-moz-transition", "none");                                  // 5001
			nc.css("-ms-transition", "none");                                   // 5002
			nc.css("transition", "none");                                       // 5003
                                                                       //
			punchgs.TweenLite.set(nc, {                                         // 5005
				fontSize: Math.round(nc.data('fsize') * opt.bw) + "px",            // 5006
                                                                       //
				letterSpacing: Math.floor(nc.data('ls') * opt.bw) + "px",          // 5008
                                                                       //
				paddingTop: Math.round(nc.data('pt') * opt.bh) + "px",             // 5010
				paddingBottom: Math.round(nc.data('pb') * opt.bh) + "px",          // 5011
				paddingLeft: Math.round(nc.data('pl') * opt.bw) + "px",            // 5012
				paddingRight: Math.round(nc.data('pr') * opt.bw) + "px",           // 5013
                                                                       //
				marginTop: nc.data('mt') * opt.bh + "px",                          // 5015
				marginBottom: nc.data('mb') * opt.bh + "px",                       // 5016
				marginLeft: nc.data('ml') * opt.bw + "px",                         // 5017
				marginRight: nc.data('mr') * opt.bw + "px",                        // 5018
                                                                       //
				borderTopWidth: Math.round(nc.data('bt') * opt.bh) + "px",         // 5020
				borderBottomWidth: Math.round(nc.data('bb') * opt.bh) + "px",      // 5021
				borderLeftWidth: Math.round(nc.data('bl') * opt.bw) + "px",        // 5022
				borderRightWidth: Math.round(nc.data('br') * opt.bw) + "px",       // 5023
                                                                       //
				lineHeight: Math.round(nc.data('lh') * opt.bh) + "px",             // 5025
				minWidth: nc.data('minwidth') * opt.bw + "px",                     // 5026
				minHeight: nc.data('minheight') * opt.bh + "px",                   // 5027
                                                                       //
				/* width:(nc.data('wii') * opt.bw) + "px",                         //
     height:(nc.data('hii') * opt.bh) + "px",														 */         //
                                                                       //
				overwrite: "auto"                                                  // 5032
			});                                                                 //
			setTimeout(function () {                                            // 5034
				nc.css("-webkit-transition", nc.data('wan'));                      // 5035
				nc.css("-moz-transition", nc.data('moan'));                        // 5036
				nc.css("-ms-transition", nc.data('man'));                          // 5037
				nc.css("transition", nc.data('ani'));                              // 5038
			}, 30);                                                             //
                                                                       //
			//konsole.log(nc.data('maxwidth')+"  "+nc.data('maxheight'));       //
			if (nc.data('maxheight') != 'none') nc.css({ 'maxHeight': nc.data('maxheight') * opt.bh + "px" });
                                                                       //
			if (nc.data('maxwidth') != 'none') nc.css({ 'maxWidth': nc.data('maxwidth') * opt.bw + "px" });
		}                                                                    //
	};                                                                    //
                                                                       //
	/******************************                                       //
 	-	CAPTION LOOPS	-                                                    //
 ********************************/                                     //
                                                                       //
	var callCaptionLoops = function (nextcaption, factor) {               // 5058
                                                                       //
		// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS                       //
		nextcaption.find('.rs-pendulum').each(function () {                  // 5061
			var el = jQuery(this);                                              // 5062
			if (el.data('timeline') == undefined) {                             // 5063
				el.data('timeline', new punchgs.TimelineLite());                   // 5064
				var startdeg = el.data('startdeg') == undefined ? -20 : el.data('startdeg'),
				    enddeg = el.data('enddeg') == undefined ? 20 : el.data('enddeg'),
				    speed = el.data('speed') == undefined ? 2 : el.data('speed'),  //
				    origin = el.data('origin') == undefined ? "50% 50%" : el.data('origin'),
				    easing = el.data('easing') == undefined ? punchgs.Power2.easeInOut : el.data('ease');
                                                                       //
				startdeg = startdeg * factor;                                      // 5071
				enddeg = enddeg * factor;                                          // 5072
                                                                       //
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", rotation: startdeg, transformOrigin: origin }, { rotation: enddeg, ease: easing }));
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", rotation: enddeg, transformOrigin: origin }, { rotation: startdeg, ease: easing, onComplete: function () {
						el.data('timeline').restart();                                   // 5076
					} }));                                                            //
			}                                                                   //
		});                                                                  //
                                                                       //
		// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS                       //
		nextcaption.find('.rs-rotate').each(function () {                    // 5083
			var el = jQuery(this);                                              // 5084
			if (el.data('timeline') == undefined) {                             // 5085
				el.data('timeline', new punchgs.TimelineLite());                   // 5086
				var startdeg = el.data('startdeg') == undefined ? 0 : el.data('startdeg'),
				    enddeg = el.data('enddeg') == undefined ? 360 : el.data('enddeg');
				speed = el.data('speed') == undefined ? 2 : el.data('speed'), origin = el.data('origin') == undefined ? "50% 50%" : el.data('origin'), easing = el.data('easing') == undefined ? punchgs.Power2.easeInOut : el.data('easing');
                                                                       //
				startdeg = startdeg * factor;                                      // 5093
				enddeg = enddeg * factor;                                          // 5094
                                                                       //
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", rotation: startdeg, transformOrigin: origin }, { rotation: enddeg, ease: easing, onComplete: function () {
						el.data('timeline').restart();                                   // 5097
					} }));                                                            //
			}                                                                   //
		});                                                                  //
                                                                       //
		// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS                       //
		nextcaption.find('.rs-slideloop').each(function () {                 // 5104
			var el = jQuery(this);                                              // 5105
			if (el.data('timeline') == undefined) {                             // 5106
				el.data('timeline', new punchgs.TimelineLite());                   // 5107
				var xs = el.data('xs') == undefined ? 0 : el.data('xs'),           // 5108
				    ys = el.data('ys') == undefined ? 0 : el.data('ys'),           //
				    xe = el.data('xe') == undefined ? 0 : el.data('xe'),           //
				    ye = el.data('ye') == undefined ? 0 : el.data('ye'),           //
				    speed = el.data('speed') == undefined ? 2 : el.data('speed'),  //
				    easing = el.data('easing') == undefined ? punchgs.Power2.easeInOut : el.data('easing');
                                                                       //
				xs = xs * factor;                                                  // 5115
				ys = ys * factor;                                                  // 5116
				xe = xe * factor;                                                  // 5117
				ye = ye * factor;                                                  // 5118
                                                                       //
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", x: xs, y: ys }, { x: xe, y: ye, ease: easing }));
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", x: xe, y: ye }, { x: xs, y: ys, onComplete: function () {
						el.data('timeline').restart();                                   // 5122
					} }));                                                            //
			}                                                                   //
		});                                                                  //
                                                                       //
		// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS                       //
		nextcaption.find('.rs-pulse').each(function () {                     // 5129
			var el = jQuery(this);                                              // 5130
			if (el.data('timeline') == undefined) {                             // 5131
				el.data('timeline', new punchgs.TimelineLite());                   // 5132
				var zoomstart = el.data('zoomstart') == undefined ? 0 : el.data('zoomstart'),
				    zoomend = el.data('zoomend') == undefined ? 0 : el.data('zoomend'),
				    speed = el.data('speed') == undefined ? 2 : el.data('speed'),  //
				    easing = el.data('easing') == undefined ? punchgs.Power2.easeInOut : el.data('easing');
                                                                       //
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", scale: zoomstart }, { scale: zoomend, ease: easing }));
				el.data('timeline').append(new punchgs.TweenLite.fromTo(el, speed, { force3D: "auto", scale: zoomend }, { scale: zoomstart, onComplete: function () {
						el.data('timeline').restart();                                   // 5140
					} }));                                                            //
			}                                                                   //
		});                                                                  //
                                                                       //
		nextcaption.find('.rs-wave').each(function () {                      // 5146
			var el = jQuery(this);                                              // 5147
			if (el.data('timeline') == undefined) {                             // 5148
				el.data('timeline', new punchgs.TimelineLite());                   // 5149
                                                                       //
				var angle = el.data('angle') == undefined ? 10 : el.data('angle'),
				    radius = el.data('radius') == undefined ? 10 : el.data('radius'),
				    speed = el.data('speed') == undefined ? -20 : el.data('speed'),
				    origin = el.data('origin') == undefined ? -20 : el.data('origin');
                                                                       //
				angle = angle * factor;                                            // 5156
				radius = radius * factor;                                          // 5157
                                                                       //
				var angobj = { a: 0, ang: angle, element: el, unit: radius };      // 5159
                                                                       //
				el.data('timeline').append(new punchgs.TweenLite.fromTo(angobj, speed, { a: 360 }, { a: 0,
					force3D: "auto",                                                  // 5165
					ease: punchgs.Linear.easeNone,                                    // 5166
					onUpdate: function () {                                           // 5167
                                                                       //
						var rad = angobj.a * (Math.PI / 180);                            // 5169
						punchgs.TweenLite.to(angobj.element, 0.1, { force3D: "auto", x: Math.cos(rad) * angobj.unit, y: angobj.unit * (1 - Math.sin(rad)) });
					},                                                                //
					onComplete: function () {                                         // 5173
						el.data('timeline').restart();                                   // 5174
					}                                                                 //
				}));                                                               //
			}                                                                   //
		});                                                                  //
	};                                                                    //
                                                                       //
	var killCaptionLoops = function (nextcaption) {                       // 5183
		// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS                       //
		nextcaption.find('.rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave').each(function () {
			var el = jQuery(this);                                              // 5186
			if (el.data('timeline') != undefined) {                             // 5187
				el.data('timeline').pause();                                       // 5188
				el.data('timeline', null);                                         // 5189
			}                                                                   //
		});                                                                  //
	};                                                                    //
                                                                       //
	//////////////////////////                                            //
	//	REMOVE THE CAPTIONS //                                             //
	/////////////////////////                                             //
	var removeTheCaptions = function (actli, opt) {                       // 5197
                                                                       //
		var removetime = 0;                                                  // 5199
                                                                       //
		var allcaptions = actli.find('.tp-caption'),                         // 5201
		    allstaticcaptions = opt.container.find('.tp-static-layers').find('.tp-caption');
                                                                       //
		jQuery.each(allstaticcaptions, function (index, staticcapt) {        // 5205
			allcaptions.push(staticcapt);                                       // 5206
		});                                                                  //
                                                                       //
		allcaptions.each(function (i) {                                      // 5209
                                                                       //
			var staticdirection = -1; // 1 -> In,  2-> Out  0-> Ignore  -1-> Not Static
                                                                       //
			var nextcaption = jQuery(this);                                     // 5215
			if (nextcaption.hasClass("tp-static-layer")) {                      // 5216
                                                                       //
				if (nextcaption.data('startslide') == -1 || nextcaption.data('startslide') == "-1") nextcaption.data('startslide', 0);
                                                                       //
				if (nextcaption.data('endslide') == -1 || nextcaption.data('endslide') == "-1") nextcaption.data('endslide', opt.slideamount);
                                                                       //
				// IF STATIC ITEM CURRENTLY NOT VISIBLE                            //
				if (nextcaption.hasClass("tp-is-shown")) {                         // 5227
                                                                       //
					if (nextcaption.data('startslide') > opt.next || nextcaption.data('endslide') < opt.next) {
                                                                       //
						staticdirection = 2;                                             // 5232
						nextcaption.removeClass("tp-is-shown");                          // 5233
					} else {                                                          //
						staticdirection = 0;                                             // 5235
					}                                                                 //
				} else {                                                           //
					staticdirection = 2;                                              // 5238
				}                                                                  //
			}                                                                   //
                                                                       //
			if (staticdirection != 0) {                                         // 5247
                                                                       //
				killCaptionLoops(nextcaption);                                     // 5249
                                                                       //
				if (nextcaption.find('iframe').length > 0) {                       // 5251
					// VIMEO VIDEO PAUSE                                              //
					//if (nextcaption.data('vimeoid')!=undefined && String(nextcaption.data('vimeoid')).length>0)
					punchgs.TweenLite.to(nextcaption.find('iframe'), 0.2, { autoAlpha: 0 });
					if (is_mobile()) nextcaption.find('iframe').remove();             // 5255
					try {                                                             // 5256
						var ifr = nextcaption.find('iframe');                            // 5257
						var id = ifr.attr('id');                                         // 5258
						var froogaloop = $f(id);                                         // 5259
						froogaloop.api("pause");                                         // 5260
						clearTimeout(nextcaption.data('timerplay'));                     // 5261
					} catch (e) {}                                                    //
                                                                       //
					try {                                                             // 5264
						var player = nextcaption.data('player');                         // 5265
						player.stopVideo();                                              // 5266
						clearTimeout(nextcaption.data('timerplay'));                     // 5267
					} catch (e) {}                                                    //
				}                                                                  //
                                                                       //
				// IF HTML5 VIDEO IS EMBEDED                                       //
				if (nextcaption.find('video').length > 0) {                        // 5272
					try {                                                             // 5273
						nextcaption.find('video').each(function (i) {                    // 5274
							var html5vid = jQuery(this).parent();                           // 5275
							var videoID = html5vid.attr('id');                              // 5276
							clearTimeout(html5vid.data('timerplay'));                       // 5277
							var video = this;                                               // 5278
							video.pause();                                                  // 5279
						});                                                              //
					} catch (e) {}                                                    //
				} // END OF VIDEO JS FUNCTIONS                                     //
				try {                                                              // 5283
                                                                       //
					//var tl = punchgs.TimelineLite.exportRoot();                     //
					var tl = nextcaption.data('timeline');                            // 5286
					var endstarts = tl.getLabelTime("frame99");                       // 5287
					var curtime = tl.time();                                          // 5288
					if (endstarts > curtime) {                                        // 5289
                                                                       //
						// WE NEED TO STOP ALL OTHER NIMATIONS                           //
						var tweens = tl.getTweensOf(nextcaption);                        // 5292
						jQuery.each(tweens, function (index, tw) {                       // 5293
                                                                       //
							if (index != 0) tw.pause();                                     // 5295
						});                                                              //
						if (nextcaption.css('opacity') != 0) {                           // 5298
							var spp = nextcaption.data('endspeed') == undefined ? nextcaption.data('speed') : nextcaption.data('endspeed');
							if (spp > removetime) removetime = spp;                         // 5300
							tl.play("frame99");                                             // 5301
						} else tl.progress(1, false);                                    //
					}                                                                 //
				} catch (e) {}                                                     //
			}                                                                   //
		});                                                                  //
                                                                       //
		return removetime;                                                   // 5312
	};                                                                    //
                                                                       //
	//////////////////////////////                                        //
	//	MOVE THE CAPTIONS  //                                              //
	////////////////////////////                                          //
	var addMoveCaption = function (nextcaption, opt, params, frame, downscale) {
		var tl = nextcaption.data('timeline');                               // 5319
                                                                       //
		var newtl = new punchgs.TimelineLite();                              // 5321
                                                                       //
		var animobject = nextcaption;                                        // 5323
                                                                       //
		if (params.typ == "chars") animobject = nextcaption.data('mySplitText').chars;else if (params.typ == "words") animobject = nextcaption.data('mySplitText').words;else if (params.typ == "lines") animobject = nextcaption.data('mySplitText').lines;
		params.animation.ease = params.ease;                                 // 5330
                                                                       //
		if (params.animation.rotationZ != undefined) params.animation.rotation = params.animation.rotationZ;
		params.animation.data = new Object();                                // 5333
		params.animation.data.oldx = params.animation.x;                     // 5334
		params.animation.data.oldy = params.animation.y;                     // 5335
                                                                       //
		params.animation.x = params.animation.x * downscale;                 // 5337
		params.animation.y = params.animation.y * downscale;                 // 5338
                                                                       //
		tl.add(newtl.staggerTo(animobject, params.speed, params.animation, params.elementdelay), params.start);
		tl.addLabel(frame, params.start);                                    // 5342
                                                                       //
		nextcaption.data('timeline', tl);                                    // 5344
	};                                                                    //
	//////////////////////////////                                        //
	//	MOVE OUT THE CAPTIONS  //                                          //
	////////////////////////////                                          //
	var endMoveCaption = function (nextcaption, opt, mdelay, backwards, frame, downscale) {
                                                                       //
		var tl = nextcaption.data('timeline'),                               // 5352
		    newtl = new punchgs.TimelineLite();                              //
                                                                       //
		var frm = newAnimObject(),                                           // 5355
		    mspeed = nextcaption.data('endspeed') == undefined ? nextcaption.data('speed') : nextcaption.data('endspeed'),
		    ncc = nextcaption.attr('class');                                 //
                                                                       //
		frm.ease = nextcaption.data('endeasing') == undefined ? punchgs.Power1.easeInOut : nextcaption.data('endeasing');
                                                                       //
		mspeed = mspeed / 1000;                                              // 5361
                                                                       //
		if (ncc.match('ltr') || ncc.match('ltl') || ncc.match('str') || ncc.match('stl') || ncc.match('ltt') || ncc.match('ltb') || ncc.match('stt') || ncc.match('stb') || ncc.match('skewtoright') || ncc.match('skewtorightshort') || ncc.match('skewtoleft') || ncc.match('skewtoleftshort') || ncc.match('fadeout') || ncc.match("randomrotateout")) {
                                                                       //
			if (ncc.match('skewtoright') || ncc.match('skewtorightshort')) frm.skewX = 35;else if (ncc.match('skewtoleft') || ncc.match('skewtoleftshort')) frm.skewX = -35;
                                                                       //
			if (ncc.match('ltr') || ncc.match('skewtoright')) frm.x = opt.width + 60;else if (ncc.match('ltl') || ncc.match('skewtoleft')) frm.x = 0 - (opt.width + 60);else if (ncc.match('ltt')) frm.y = 0 - (opt.height + 60);else if (ncc.match('ltb')) frm.y = opt.height + 60;else if (ncc.match('str') || ncc.match('skewtorightshort')) {
				frm.x = 50;frm.opacity = 0;                                        // 5395
			} else if (ncc.match('stl') || ncc.match('skewtoleftshort')) {      //
				frm.x = -50;frm.opacity = 0;                                       // 5397
			} else if (ncc.match('stt')) {                                      //
				frm.y = -50;frm.opacity = 0;                                       // 5399
			} else if (ncc.match('stb')) {                                      //
				frm.y = 50;frm.opacity = 0;                                        // 5401
			} else if (ncc.match("randomrotateout")) {                          //
				frm.x = Math.random() * opt.width;                                 // 5403
				frm.y = Math.random() * opt.height;                                // 5404
				frm.scale = Math.random() * 2 + 0.3;                               // 5405
				frm.rotation = Math.random() * 360 - 180;                          // 5406
				frm.opacity = 0;                                                   // 5407
			} else if (ncc.match('fadeout')) {                                  //
				frm.opacity = 0;                                                   // 5409
			}                                                                   //
                                                                       //
			if (ncc.match('skewtorightshort')) frm.x = 270;else if (ncc.match('skewtoleftshort')) frm.x = -270;
			frm.data = new Object();                                            // 5415
			frm.data.oldx = frm.x;                                              // 5416
			frm.data.oldy = frm.y;                                              // 5417
			frm.x = frm.x * downscale;                                          // 5418
			frm.y = frm.y * downscale;                                          // 5419
                                                                       //
			frm.overwrite = "auto";                                             // 5421
			var animobject = nextcaption;                                       // 5422
			var animobject = nextcaption;                                       // 5423
			if (nextcaption.data('splitout') == "chars") animobject = nextcaption.data('mySplitText').chars;else if (nextcaption.data('splitout') == "words") animobject = nextcaption.data('mySplitText').words;else if (nextcaption.data('splitout') == "lines") animobject = nextcaption.data('mySplitText').lines;
			var elemdelay = nextcaption.data('endelementdelay') == undefined ? 0 : nextcaption.data('endelementdelay');
			//tl.add(punchgs.TweenLite.to(nextcaption,mspeed,frm),mdelay);      //
			tl.add(newtl.staggerTo(animobject, mspeed, frm, elemdelay), mdelay);
		} else if (nextcaption.hasClass("customout")) {                      //
                                                                       //
			frm = getAnimDatas(frm, nextcaption.data('customout'));             // 5439
			var animobject = nextcaption;                                       // 5440
			if (nextcaption.data('splitout') == "chars") animobject = nextcaption.data('mySplitText').chars;else if (nextcaption.data('splitout') == "words") animobject = nextcaption.data('mySplitText').words;else if (nextcaption.data('splitout') == "lines") animobject = nextcaption.data('mySplitText').lines;
                                                                       //
			var elemdelay = nextcaption.data('endelementdelay') == undefined ? 0 : nextcaption.data('endelementdelay');
			frm.onStart = function () {                                         // 5448
                                                                       //
				punchgs.TweenLite.set(nextcaption, {                               // 5450
					transformPerspective: frm.transformPerspective,                   // 5451
					transformOrigin: frm.transformOrigin,                             // 5452
					overwrite: "auto"                                                 // 5453
				});                                                                //
			};                                                                  //
                                                                       //
			frm.data = new Object();                                            // 5457
			frm.data.oldx = frm.x;                                              // 5458
			frm.data.oldy = frm.y;                                              // 5459
                                                                       //
			frm.x = frm.x * downscale;                                          // 5461
			frm.y = frm.y * downscale;                                          // 5462
                                                                       //
			tl.add(newtl.staggerTo(animobject, mspeed, frm, elemdelay), mdelay);
		} else {                                                             //
			backwards.delay = 0;                                                // 5468
			tl.add(punchgs.TweenLite.to(nextcaption, mspeed, backwards), mdelay);
		}                                                                    //
                                                                       //
		tl.addLabel(frame, mdelay);                                          // 5473
                                                                       //
		nextcaption.data('timeline', tl);                                    // 5475
	};                                                                    //
                                                                       //
	///////////////////////////                                           //
	//	REMOVE THE LISTENERS //                                            //
	///////////////////////////                                           //
	var removeAllListeners = function (container, opt) {                  // 5481
		container.children().each(function () {                              // 5482
			try {                                                               // 5483
				jQuery(this).die('click');                                         // 5483
			} catch (e) {}                                                      //
			try {                                                               // 5484
				jQuery(this).die('mouseenter');                                    // 5484
			} catch (e) {}                                                      //
			try {                                                               // 5485
				jQuery(this).die('mouseleave');                                    // 5485
			} catch (e) {}                                                      //
			try {                                                               // 5486
				jQuery(this).unbind('hover');                                      // 5486
			} catch (e) {}                                                      //
		});                                                                  //
		try {                                                                // 5488
			container.die('click', 'mouseenter', 'mouseleave');                 // 5488
		} catch (e) {}                                                       //
		clearInterval(opt.cdint);                                            // 5489
		container = null;                                                    // 5490
	};                                                                    //
                                                                       //
	///////////////////////////                                           //
	//	-	countDown	-	//                                                   //
	/////////////////////////                                             //
	var countDown = function (container, opt) {                           // 5496
		opt.cd = 0;                                                          // 5497
		opt.loop = 0;                                                        // 5498
		if (opt.stopAfterLoops != undefined && opt.stopAfterLoops > -1) opt.looptogo = opt.stopAfterLoops;else opt.looptogo = 9999999;
                                                                       //
		if (opt.stopAtSlide != undefined && opt.stopAtSlide > -1) opt.lastslidetoshow = opt.stopAtSlide;else opt.lastslidetoshow = 999;
                                                                       //
		opt.stopLoop = "off";                                                // 5509
                                                                       //
		if (opt.looptogo == 0) opt.stopLoop = "on";                          // 5511
                                                                       //
		if (opt.slideamount > 1 && !(opt.stopAfterLoops == 0 && opt.stopAtSlide == 1)) {
			var bt = container.find('.tp-bannertimer');                         // 5515
                                                                       //
			// LISTENERS  //container.trigger('stoptimer');                     //
			container.on('stoptimer', function () {                             // 5519
				var bt = jQuery(this).find('.tp-bannertimer');                     // 5520
				bt.data('tween').pause();                                          // 5521
				if (opt.hideTimerBar == "on") bt.css({ visibility: "hidden" });    // 5522
			});                                                                 //
			container.on('starttimer', function () {                            // 5524
                                                                       //
				if (opt.conthover != 1 && opt.videoplaying != true && opt.width > opt.hideSliderAtLimit && opt.bannertimeronpause != true && opt.overnav != true) if (opt.stopLoop == "on" && opt.next == opt.lastslidetoshow - 1 || opt.noloopanymore == 1) opt.noloopanymore = 1;else {
                                                                       //
					bt.css({ visibility: "visible" });                                // 5531
					bt.data('tween').resume();                                        // 5532
				}                                                                  //
                                                                       //
				if (opt.hideTimerBar == "on") bt.css({ visibility: "hidden" });    // 5535
			});                                                                 //
			container.on('restarttimer', function () {                          // 5537
				var bt = jQuery(this).find('.tp-bannertimer');                     // 5538
				if (opt.stopLoop == "on" && opt.next == opt.lastslidetoshow - 1 || opt.noloopanymore == 1) opt.noloopanymore = 1;else {
                                                                       //
					bt.css({ visibility: "visible" });                                // 5543
					bt.data('tween').kill();                                          // 5544
					bt.data('tween', punchgs.TweenLite.fromTo(bt, opt.delay / 1000, { width: "0%" }, { force3D: "auto", width: "100%", ease: punchgs.Linear.easeNone, onComplete: countDownNext, delay: 1 }));
				}                                                                  //
				if (opt.hideTimerBar == "on") bt.css({ visibility: "hidden" });    // 5548
			});                                                                 //
                                                                       //
			container.on('nulltimer', function () {                             // 5551
				bt.data('tween').pause(0);                                         // 5552
				if (opt.hideTimerBar == "on") bt.css({ visibility: "hidden" });    // 5553
			});                                                                 //
                                                                       //
			var countDownNext = function () {                                   // 5558
				if (jQuery('body').find(container).length == 0) {                  // 5559
					removeAllListeners(container, opt);                               // 5560
					clearInterval(opt.cdint);                                         // 5561
				}                                                                  //
                                                                       //
				container.trigger("revolution.slide.slideatend");                  // 5564
                                                                       //
				//STATE OF API CHANGED -> MOVE TO AIP BETTER                       //
				if (container.data('conthover-changed') == 1) {                    // 5567
					opt.conthover = container.data('conthover');                      // 5568
					container.data('conthover-changed', 0);                           // 5569
				}                                                                  //
                                                                       //
				// SWAP TO NEXT BANNER                                             //
				opt.act = opt.next;                                                // 5573
				opt.next = opt.next + 1;                                           // 5574
                                                                       //
				if (opt.next > container.find('>ul >li').length - 1) {             // 5576
					opt.next = 0;                                                     // 5577
					opt.looptogo = opt.looptogo - 1;                                  // 5578
                                                                       //
					if (opt.looptogo <= 0) {                                          // 5580
						opt.stopLoop = "on";                                             // 5581
					}                                                                 //
				}                                                                  //
                                                                       //
				// STOP TIMER IF NO LOOP NO MORE NEEDED.                           //
                                                                       //
				if (opt.stopLoop == "on" && opt.next == opt.lastslidetoshow - 1) {
					container.find('.tp-bannertimer').css({ 'visibility': 'hidden' });
					container.trigger('revolution.slide.onstop');                     // 5590
					opt.noloopanymore = 1;                                            // 5591
				} else {                                                           //
					bt.data('tween').restart();                                       // 5593
				}                                                                  //
                                                                       //
				// SWAP THE SLIDES                                                 //
				swapSlide(container, opt);                                         // 5597
			};                                                                  //
                                                                       //
			bt.data('tween', punchgs.TweenLite.fromTo(bt, opt.delay / 1000, { width: "0%" }, { force3D: "auto", width: "100%", ease: punchgs.Linear.easeNone, onComplete: countDownNext, delay: 1 }));
			bt.data('opt', opt);                                                // 5602
                                                                       //
			container.hover(function () {                                       // 5605
                                                                       //
				if (opt.onHoverStop == "on" && !is_mobile()) {                     // 5608
					container.trigger('stoptimer');                                   // 5609
                                                                       //
					container.trigger('revolution.slide.onpause');                    // 5611
					var nextsh = container.find('>ul >li:eq(' + opt.next + ') .slotholder');
					nextsh.find('.defaultimg').each(function () {                     // 5613
						var dimg = jQuery(this);                                         // 5614
						if (dimg.data('kenburn') != undefined) {                         // 5615
							dimg.data('kenburn').pause();                                   // 5616
						}                                                                //
					});                                                               //
				}                                                                  //
			}, function () {                                                    //
				if (container.data('conthover') != 1) {                            // 5622
					container.trigger('revolution.slide.onresume');                   // 5623
					container.trigger('starttimer');                                  // 5624
                                                                       //
					var nextsh = container.find('>ul >li:eq(' + opt.next + ') .slotholder');
					nextsh.find('.defaultimg').each(function () {                     // 5627
						var dimg = jQuery(this);                                         // 5628
						if (dimg.data('kenburn') != undefined) {                         // 5629
							dimg.data('kenburn').play();                                    // 5630
						}                                                                //
					});                                                               //
				}                                                                  //
			});                                                                 //
		}                                                                    //
	};                                                                    //
                                                                       //
	//////////////////                                                    //
	// IS MOBILE ?? //                                                    //
	//////////////////                                                    //
	var is_mobile = function () {                                         // 5642
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'Android', 'webos',, 'iPod', 'iPhone', 'iPad', 'Blackberry', 'BlackBerry'];
		var ismobile = false;                                                // 5644
		for (var i in babelHelpers.sanitizeForInObject(agents)) {            // 5645
                                                                       //
			if (navigator.userAgent.split(agents[i]).length > 1) {              // 5647
				ismobile = true;                                                   // 5648
			}                                                                   //
		}                                                                    //
		return ismobile;                                                     // 5652
	};                                                                    //
                                                                       //
	/**************************************************************************
  * Revolution Slider - PAN ZOOM MODULE                                //
  * @version: 1.0 (03.06.2013)                                         //
  * @author ThemePunch                                                 //
 **************************************************************************/
                                                                       //
	/***********************************************                      //
 	-	KEN BURN BACKGROUND FIT CALCULATOR	-                               //
 ***********************************************/                      //
	var calculateKenBurnScales = function (proc, sloth, opt) {            // 5666
		var ow = sloth.data('owidth');                                       // 5667
		var oh = sloth.data('oheight');                                      // 5668
                                                                       //
		if (ow / oh > opt.width / opt.height) {                              // 5670
			var factor = opt.container.width() / ow;                            // 5671
			var nheight = oh * factor;                                          // 5672
			var hfactor = nheight / opt.container.height() * proc;              // 5673
			proc = proc * (100 / hfactor);                                      // 5674
			hfactor = 100;                                                      // 5675
			proc = proc;                                                        // 5676
			return proc + "% " + hfactor + "%" + " 1";                          // 5677
		} else {                                                             //
			var factor = opt.container.width() / ow;                            // 5679
			var nheight = oh * factor;                                          // 5680
			var hfactor = nheight / opt.container.height() * proc;              // 5681
			return proc + "% " + hfactor + "%";                                 // 5682
		}                                                                    //
	};                                                                    //
                                                                       //
	/******************************                                       //
 	-	startKenBurn	-                                                     //
 ********************************/                                     //
	var startKenBurn = function (container, opt, recalc, prepareonly) {   // 5691
                                                                       //
		try {                                                                // 5693
			var actli = container.find('>ul:first-child >li:eq(' + opt.act + ')');
		} catch (e) {                                                        //
			var actli = container.find('>ul:first-child >li:eq(1)');            // 5696
		}                                                                    //
                                                                       //
		opt.lastslide = opt.act;                                             // 5699
                                                                       //
		var nextli = container.find('>ul:first-child >li:eq(' + opt.next + ')'),
		    nextsh = nextli.find('.slotholder'),                             //
		    bgps = nextsh.data('bgposition'),                                //
		    bgpe = nextsh.data('bgpositionend'),                             //
		    zos = nextsh.data('zoomstart') / 100,                            //
		    zoe = nextsh.data('zoomend') / 100,                              //
		    ros = nextsh.data('rotationstart'),                              //
		    roe = nextsh.data('rotationend'),                                //
		    bgfs = nextsh.data('bgfit'),                                     //
		    bgfe = nextsh.data('bgfitend'),                                  //
		    easeme = nextsh.data('easeme'),                                  //
		    dur = nextsh.data('duration') / 1000,                            //
		    bgfb = 100;                                                      //
                                                                       //
		if (bgfs == undefined) bgfs = 100;                                   // 5717
		if (bgfe == undefined) bgfe = 100;                                   // 5718
		var obgfs = bgfs,                                                    // 5719
		    obgfe = bgfe;                                                    //
                                                                       //
		bgfs = calculateKenBurnScales(bgfs, nextsh, opt);                    // 5722
		bgfe = calculateKenBurnScales(bgfe, nextsh, opt);                    // 5723
		bgfb = calculateKenBurnScales(100, nextsh, opt);                     // 5724
                                                                       //
		if (zos == undefined) zos = 1;                                       // 5727
		if (zoe == undefined) zoe = 1;                                       // 5728
		if (ros == undefined) ros = 0;                                       // 5729
		if (roe == undefined) roe = 0;                                       // 5730
                                                                       //
		if (zos < 1) zos = 1;                                                // 5732
		if (zoe < 1) zoe = 1;                                                // 5733
                                                                       //
		var imgobj = new Object();                                           // 5736
		imgobj.w = parseInt(bgfb.split(" ")[0], 0), imgobj.h = parseInt(bgfb.split(" ")[1], 0);
                                                                       //
		var turned = false;                                                  // 5740
		if (bgfb.split(" ")[2] == "1") {                                     // 5741
			turned = true;                                                      // 5742
		}                                                                    //
                                                                       //
		nextsh.find('.defaultimg').each(function () {                        // 5745
			var defimg = jQuery(this);                                          // 5746
			if (nextsh.find('.kenburnimg').length == 0) nextsh.append('<div class="kenburnimg" style="position:absolute;z-index:1;width:100%;height:100%;top:0px;left:0px;"><img src="' + defimg.attr('src') + '" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;position:absolute;width:' + imgobj.w + '%;height:' + imgobj.h + '%;"></div>');else {
				nextsh.find('.kenburnimg img').css({ width: imgobj.w + '%', height: imgobj.h + '%' });
			}                                                                   //
                                                                       //
			var kbimg = nextsh.find('.kenburnimg img');                         // 5755
                                                                       //
			var imgs = calculateKenBurnImgPos(opt, bgps, bgfs, kbimg, turned),  // 5758
			    imge = calculateKenBurnImgPos(opt, bgpe, bgfe, kbimg, turned);  //
                                                                       //
			if (turned) {                                                       // 5761
				imgs.w = obgfs / 100;                                              // 5762
				imge.w = obgfe / 100;                                              // 5763
			}                                                                   //
                                                                       //
			if (prepareonly) {                                                  // 5768
                                                                       //
				punchgs.TweenLite.set(kbimg, { autoAlpha: 0,                       // 5770
					transformPerspective: 1200,                                       // 5771
					transformOrigin: "0% 0%",                                         // 5772
					top: 0, left: 0,                                                  // 5773
					scale: imgs.w,                                                    // 5774
					x: imgs.x,                                                        // 5775
					y: imgs.y });                                                     // 5776
				var sx = imgs.w,                                                   // 5777
				    ww = sx * kbimg.width() - opt.width,                           //
				    hh = sx * kbimg.height() - opt.height,                         //
				    hor = Math.abs(imgs.x / ww * 100),                             //
				    ver = Math.abs(imgs.y / hh * 100);                             //
				if (hh == 0) ver = 0;                                              // 5782
				if (ww == 0) hor = 0;                                              // 5783
				defimg.data('bgposition', hor + "% " + ver + "%");                 // 5784
				if (!isIE(8)) defimg.data('currotate', getRotationDegrees(kbimg));
				if (!isIE(8)) defimg.data('curscale', imgobj.w * sx + "%  " + (imgobj.h * sx + "%"));
                                                                       //
				nextsh.find('.kenburnimg').remove();                               // 5788
			} else defimg.data('kenburn', punchgs.TweenLite.fromTo(kbimg, dur, { autoAlpha: 1, force3D: punchgs.force3d, transformOrigin: "0% 0%", top: 0, left: 0, scale: imgs.w, x: imgs.x, y: imgs.y }, { autoAlpha: 1, rotationZ: roe, ease: easeme, x: imge.x, y: imge.y, scale: imge.w, onUpdate: function () {
					var sx = kbimg[0]._gsTransform.scaleX;                            // 5792
					var ww = sx * kbimg.width() - opt.width,                          // 5793
					    hh = sx * kbimg.height() - opt.height,                        //
					    hor = Math.abs(kbimg[0]._gsTransform.x / ww * 100),           //
					    ver = Math.abs(kbimg[0]._gsTransform.y / hh * 100);           //
					if (hh == 0) ver = 0;                                             // 5797
					if (ww == 0) hor = 0;                                             // 5798
                                                                       //
					defimg.data('bgposition', hor + "% " + ver + "%");                // 5800
                                                                       //
					if (!isIE(8)) defimg.data('currotate', getRotationDegrees(kbimg));
					if (!isIE(8)) defimg.data('curscale', imgobj.w * sx + "%  " + (imgobj.h * sx + "%"));
					//punchgs.TweenLite.set(defimg,{rotation:defimg.data('currotate'), backgroundPosition:defimg.data('bgposition'), backgroundSize:defimg.data('curscale')});
				} }));                                                             //
		});                                                                  //
	};                                                                    //
                                                                       //
	/*************************************************                    //
 	-	CALCULATE KENBURNS IMAGE POSITIONS	-                               //
 **************************************************/                   //
                                                                       //
	var calculateKenBurnImgPos = function (opt, bgp, bgf, img, turned) {  // 5813
		var imgobj = new Object();                                           // 5814
                                                                       //
		if (!turned) imgobj.w = parseInt(bgf.split(" ")[0], 0) / 100;else imgobj.w = parseInt(bgf.split(" ")[1], 0) / 100;
                                                                       //
		switch (bgp) {                                                       // 5821
			case "left top":                                                    // 5822
			case "top left":                                                    // 5823
				imgobj.x = 0;                                                      // 5824
				imgobj.y = 0;                                                      // 5825
				break;                                                             // 5826
			case "center top":                                                  // 5826
			case "top center":                                                  // 5828
				imgobj.x = ((0 - img.width()) * imgobj.w + parseInt(opt.width, 0)) / 2;
				imgobj.y = 0;                                                      // 5830
				break;                                                             // 5831
			case "top right":                                                   // 5831
			case "right top":                                                   // 5833
				imgobj.x = (0 - img.width()) * imgobj.w + parseInt(opt.width, 0);  // 5834
				imgobj.y = 0;                                                      // 5835
                                                                       //
				break;                                                             // 5837
			case "center left":                                                 // 5838
			case "left center":                                                 // 5839
				imgobj.x = 0;                                                      // 5840
				imgobj.y = ((0 - img.height()) * imgobj.w + parseInt(opt.height, 0)) / 2;
				break;                                                             // 5842
			case "center center":                                               // 5843
				imgobj.x = ((0 - img.width()) * imgobj.w + parseInt(opt.width, 0)) / 2;
				imgobj.y = ((0 - img.height()) * imgobj.w + parseInt(opt.height, 0)) / 2;
                                                                       //
				break;                                                             // 5847
			case "center right":                                                // 5847
			case "right center":                                                // 5849
				imgobj.x = (0 - img.width()) * imgobj.w + parseInt(opt.width, 0);  // 5850
				imgobj.y = ((0 - img.height()) * imgobj.w + parseInt(opt.height, 0)) / 2;
                                                                       //
				break;                                                             // 5853
			case "bottom left":                                                 // 5853
			case "left bottom":                                                 // 5855
				imgobj.x = 0;                                                      // 5856
				imgobj.y = (0 - img.height()) * imgobj.w + parseInt(opt.height, 0);
                                                                       //
				break;                                                             // 5859
			case "bottom center":                                               // 5860
			case "center bottom":                                               // 5861
				imgobj.x = ((0 - img.width()) * imgobj.w + parseInt(opt.width, 0)) / 2;
				imgobj.y = (0 - img.height()) * imgobj.w + parseInt(opt.height, 0);
				break;                                                             // 5864
			case "bottom right":                                                // 5864
			case "right bottom":                                                // 5866
				imgobj.x = (0 - img.width()) * imgobj.w + parseInt(opt.width, 0);  // 5867
				imgobj.y = (0 - img.height()) * imgobj.w + parseInt(opt.height, 0);
				break;                                                             // 5869
		}                                                                    // 5869
                                                                       //
		return imgobj;                                                       // 5874
	};                                                                    //
                                                                       //
	/******************************                                       //
 	-	GET ROTATION DEGREES	-                                             //
 ********************************/                                     //
	var getRotationDegrees = function (obj) {                             // 5880
		var matrix = obj.css("-webkit-transform") || obj.css("-moz-transform") || obj.css("-ms-transform") || obj.css("-o-transform") || obj.css("transform");
		if (matrix !== 'none') {                                             // 5886
			var values = matrix.split('(')[1].split(')')[0].split(',');         // 5887
			var a = values[0];                                                  // 5888
			var b = values[1];                                                  // 5889
			var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));         // 5890
		} else {                                                             //
			var angle = 0;                                                      // 5891
		}                                                                    //
		return angle < 0 ? angle += 360 : angle;                             // 5892
	};                                                                    //
                                                                       //
	/******************************                                       //
 	-	STOP KEN BURN	-                                                    //
 ********************************/                                     //
	var stopKenBurn = function (container, opt) {                         // 5899
                                                                       //
		try {                                                                // 5901
			var actli = container.find('>ul:first-child >li:eq(' + opt.act + ')');
		} catch (e) {                                                        //
			var actli = container.find('>ul:first-child >li:eq(1)');            // 5904
		}                                                                    //
                                                                       //
		opt.lastslide = opt.act;                                             // 5907
                                                                       //
		var nextli = container.find('>ul:first-child >li:eq(' + opt.next + ')');
                                                                       //
		var actsh = actli.find('.slotholder');                               // 5912
		var nextsh = nextli.find('.slotholder');                             // 5913
                                                                       //
		container.find('.defaultimg').each(function () {                     // 5915
			var defimg = jQuery(this);                                          // 5916
			punchgs.TweenLite.killTweensOf(defimg, false);                      // 5917
			punchgs.TweenLite.set(defimg, { scale: 1, rotationZ: 0 });          // 5918
			punchgs.TweenLite.killTweensOf(defimg.data('kenburn img'), false);  // 5919
			if (defimg.data('kenburn') != undefined) {                          // 5920
				defimg.data('kenburn').pause();                                    // 5921
			}                                                                   //
			if (defimg.data('currotate') != undefined && defimg.data('bgposition') != undefined && defimg.data('curscale') != undefined) punchgs.TweenLite.set(defimg, { rotation: defimg.data('currotate'), backgroundPosition: defimg.data('bgposition'), backgroundSize: defimg.data('curscale') });
			if (defimg != undefined && defimg.data('kenburn img') != undefined && defimg.data('kenburn img').length > 0) punchgs.TweenLite.set(defimg.data('kenburn img'), { autoAlpha: 0 });
		});                                                                  //
	};                                                                    //
                                                                       //
	//// END OF KENBURNS EXTNESION                                        //
                                                                       //
	/**************************************************************************
  * Revolution Slider - PARALLAX MODULE                                //
  * @version: 1.1 (23.06.2013)                                         //
  * @author ThemePunch                                                 //
 **************************************************************************/
                                                                       //
	/******************************                                       //
 	-	PARALLAX EFFECT	-                                                  //
 ********************************/                                     //
	var checkForParallax = function (container, opt) {                    // 5944
		if (is_mobile() && opt.parallaxDisableOnMobile == "on") return false;
                                                                       //
		container.find('>ul:first-child >li').each(function () {             // 5947
			var li = jQuery(this);                                              // 5948
			for (var i = 1; i <= 10; i++) li.find('.rs-parallaxlevel-' + i).each(function () {
				var pw = jQuery(this);                                             // 5951
				pw.wrap('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:' + pw.css('zIndex') + '" class="tp-parallax-container" data-parallaxlevel="' + opt.parallaxLevels[i - 1] + '"></div>');
			});                                                                 //
		});                                                                  //
                                                                       //
		if (opt.parallax == "mouse" || opt.parallax == "scroll+mouse" || opt.parallax == "mouse+scroll") {
                                                                       //
			container.mouseenter(function (event) {                             // 5960
				var currslide = container.find('.current-sr-slide-visible');       // 5961
				var t = container.offset().top,                                    // 5962
				    l = container.offset().left,                                   //
				    ex = event.pageX - l,                                          //
				    ey = event.pageY - t;                                          //
				currslide.data("enterx", ex);                                      // 5966
				currslide.data("entery", ey);                                      // 5967
			});                                                                 //
                                                                       //
			container.on('mousemove.hoverdir, mouseleave.hoverdir', function (event) {
				var currslide = container.find('.current-sr-slide-visible');       // 5972
				switch (event.type) {                                              // 5973
                                                                       //
					case "mousemove":                                                 // 5975
                                                                       //
						var t = container.offset().top,                                  // 5977
						    l = container.offset().left,                                 //
						    mh = currslide.data("enterx"),                               //
						    mv = currslide.data("entery"),                               //
						    diffh = mh - (event.pageX - l),                              //
						    diffv = mv - (event.pageY - t);                              //
                                                                       //
						currslide.find(".tp-parallax-container").each(function () {      // 5984
							var pc = jQuery(this),                                          // 5985
							    pl = parseInt(pc.data('parallaxlevel'), 0) / 100,           //
							    offsh = diffh * pl,                                         //
							    offsv = diffv * pl;                                         //
							if (opt.parallax == "scroll+mouse" || opt.parallax == "mouse+scroll") punchgs.TweenLite.to(pc, 0.4, { force3D: "auto", x: offsh, ease: punchgs.Power3.easeOut, overwrite: "all" });else punchgs.TweenLite.to(pc, 0.4, { force3D: "auto", x: offsh, y: offsv, ease: punchgs.Power3.easeOut, overwrite: "all" });
						});                                                              //
                                                                       //
						break;                                                           // 5995
					case "mouseleave":                                                // 5995
						currslide.find(".tp-parallax-container").each(function () {      // 5997
							var pc = jQuery(this);                                          // 5998
							if (opt.parallax == "scroll+mouse" || opt.parallax == "mouse+scroll") punchgs.TweenLite.to(pc, 1.5, { force3D: "auto", x: 0, ease: punchgs.Power3.easeOut });else punchgs.TweenLite.to(pc, 1.5, { force3D: "auto", x: 0, y: 0, ease: punchgs.Power3.easeOut });
						});                                                              //
						break;                                                           // 6004
				}                                                                  // 6004
			});                                                                 //
                                                                       //
			if (is_mobile()) window.ondeviceorientation = function (event) {    // 6008
				var y = Math.round(event.beta || 0),                               // 6010
				    x = Math.round(event.gamma || 0);                              //
                                                                       //
				var currslide = container.find('.current-sr-slide-visible');       // 6013
                                                                       //
				if (jQuery(window).width() > jQuery(window).height()) {            // 6016
					var xx = x;                                                       // 6017
					x = y;                                                            // 6018
					y = xx;                                                           // 6019
				}                                                                  //
                                                                       //
				var curh = 360 / container.width() * x,                            // 6023
				    curv = 180 / container.height() * y;                           //
                                                                       //
				currslide.find(".tp-parallax-container").each(function () {        // 6029
					var pc = jQuery(this),                                            // 6030
					    pl = parseInt(pc.data('parallaxlevel'), 0) / 100,             //
					    offsh = curh * pl,                                            //
					    offsv = curv * pl;                                            //
					punchgs.TweenLite.to(pc, 0.2, { force3D: "auto", x: offsh, y: offsv, ease: punchgs.Power3.easeOut });
				});                                                                //
                                                                       //
				// y: -90 -> +90,  x:-180 -> +180                                  //
                                                                       //
				//jQuery('.logo-container').html("h:"+curh+"  v:"+curv);           //
			};                                                                  //
		}                                                                    //
		if (opt.parallax == "scroll" || opt.parallax == "scroll+mouse" || opt.parallax == "mouse+scroll") {
                                                                       //
			jQuery(window).on('scroll', function (event) {                      // 6044
				scrollParallax(container, opt);                                    // 6045
			});                                                                 //
		}                                                                    //
	};                                                                    //
                                                                       //
	/***************************************                              //
 	-	SET POST OF SCROLL PARALLAX	-                                      //
 ***************************************/                              //
	var scrollParallax = function (container, opt) {                      // 6053
		if (is_mobile() && opt.parallaxDisableOnMobile == "on") return false;
		var t = container.offset().top,                                      // 6055
		    st = jQuery(window).scrollTop(),                                 //
		    dist = t + container.height() / 2,                               //
		    mv = t + container.height() / 2 - st,                            //
		    wh = jQuery(window).height() / 2,                                //
		    diffv = wh - mv;                                                 //
                                                                       //
		if (dist < wh) diffv = diffv - (wh - dist);                          // 6062
		var currslide = container.find('.current-sr-slide-visible');         // 6063
		container.find(".tp-parallax-container").each(function (i) {         // 6064
			var pc = jQuery(this),                                              // 6065
			    pl = parseInt(pc.data('parallaxlevel'), 0) / 100,               //
			    offsv = diffv * pl;                                             //
			pc.data('parallaxoffset', offsv);                                   // 6068
			punchgs.TweenLite.to(pc, 0.2, { force3D: "auto", y: offsv, ease: punchgs.Power3.easeOut });
		});                                                                  //
                                                                       //
		if (opt.parallaxBgFreeze != "on") {                                  // 6072
			var pl = opt.parallaxLevels[0] / 100,                               // 6073
			    offsv = diffv * pl;                                             //
			punchgs.TweenLite.to(container, 0.2, { force3D: "auto", y: offsv, ease: punchgs.Power3.easeOut });
		}                                                                    //
	};                                                                    //
                                                                       //
	/**************************************************************************
  * Revolution Slider - THUMBNAIL MODULE                               //
  * @version: 1.0 (03.06.2013)                                         //
  * @author ThemePunch                                                 //
 **************************************************************************/
                                                                       //
	////////////////////////////////                                      //
	//	-	CREATE THE BULLETS -  //                                         //
	////////////////////////////////                                      //
	var createThumbs = function (container, opt) {                        // 6089
                                                                       //
		var cap = container.parent();                                        // 6091
                                                                       //
		if (opt.navigationType == "thumb" || opt.navsecond == "both") {      // 6095
			cap.append('<div class="tp-bullets tp-thumbs ' + opt.navigationStyle + '"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>');
		}                                                                    //
		var bullets = cap.find('.tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer');
		var bup = bullets.parent();                                          // 6099
                                                                       //
		bup.width(opt.thumbWidth * opt.thumbAmount);                         // 6101
		bup.height(opt.thumbHeight);                                         // 6102
		bup.parent().width(opt.thumbWidth * opt.thumbAmount);                // 6103
		bup.parent().height(opt.thumbHeight);                                // 6104
                                                                       //
		container.find('>ul:first >li').each(function (i) {                  // 6106
			var li = container.find(">ul:first >li:eq(" + i + ")");             // 6107
			var bgcolor = li.find(".defaultimg").css("backgroundColor");        // 6108
			if (li.data('thumb') != undefined) var src = li.data('thumb');else var src = li.find("img:first").attr('src');
                                                                       //
			bullets.append('<div class="bullet thumb" style="background-color:' + bgcolor + ';position:relative;width:' + opt.thumbWidth + 'px;height:' + opt.thumbHeight + 'px;background-image:url(' + src + ') !important;background-size:cover;background-position:center center;"></div>');
			var bullet = bullets.find('.bullet:first');                         // 6116
		});                                                                  //
		//bullets.append('<div style="clear:both"></div>');                  //
		var minwidth = 10;                                                   // 6119
                                                                       //
		// ADD THE BULLET CLICK FUNCTION HERE                                //
		bullets.find('.bullet').each(function (i) {                          // 6123
			var bul = jQuery(this);                                             // 6124
                                                                       //
			if (i == opt.slideamount - 1) bul.addClass('last');                 // 6126
			if (i == 0) bul.addClass('first');                                  // 6127
			bul.width(opt.thumbWidth);                                          // 6128
			bul.height(opt.thumbHeight);                                        // 6129
                                                                       //
			if (minwidth < bul.outerWidth(true)) minwidth = bul.outerWidth(true);
			bul.click(function () {                                             // 6132
				if (opt.transition == 0 && bul.index() != opt.act) {               // 6133
					opt.next = bul.index();                                           // 6134
					callingNewSlide(opt, container);                                  // 6135
				}                                                                  //
			});                                                                 //
		});                                                                  //
                                                                       //
		var max = minwidth * container.find('>ul:first >li').length;         // 6141
                                                                       //
		var thumbconwidth = bullets.parent().width();                        // 6143
		opt.thumbWidth = minwidth;                                           // 6144
                                                                       //
		////////////////////////                                             //
		// SLIDE TO POSITION  //                                             //
		////////////////////////                                             //
		if (thumbconwidth < max) {                                           // 6151
			jQuery(document).mousemove(function (e) {                           // 6152
				jQuery('body').data('mousex', e.pageX);                            // 6153
			});                                                                 //
                                                                       //
			// ON MOUSE MOVE ON THE THUMBNAILS EVERYTHING SHOULD MOVE :)        //
                                                                       //
			bullets.parent().mouseenter(function () {                           // 6160
				var $this = jQuery(this);                                          // 6161
                                                                       //
				var offset = $this.offset(),                                       // 6163
				    x = jQuery('body').data('mousex') - offset.left,               //
				    thumbconwidth = $this.width(),                                 //
				    minwidth = $this.find('.bullet:first').outerWidth(true),       //
				    max = minwidth * container.find('>ul:first >li').length,       //
				    diff = max - thumbconwidth + 15,                               //
				    steps = diff / thumbconwidth;                                  //
                                                                       //
				$this.addClass("over");                                            // 6171
				x = x - 30;                                                        // 6172
                                                                       //
				//ANIMATE TO POSITION                                              //
				var pos = 0 - x * steps;                                           // 6175
				if (pos > 0) pos = 0;                                              // 6176
				if (pos < 0 - max + thumbconwidth) pos = 0 - max + thumbconwidth;  // 6177
				moveThumbSliderToPosition($this, pos, 200);                        // 6178
			});                                                                 //
                                                                       //
			bullets.parent().mousemove(function () {                            // 6181
                                                                       //
				var $this = jQuery(this),                                          // 6183
				    offset = $this.offset(),                                       //
				    x = jQuery('body').data('mousex') - offset.left,               //
				    thumbconwidth = $this.width(),                                 //
				    minwidth = $this.find('.bullet:first').outerWidth(true),       //
				    max = minwidth * container.find('>ul:first >li').length - 1,   //
				    diff = max - thumbconwidth + 15,                               //
				    steps = diff / thumbconwidth;                                  //
                                                                       //
				x = x - 3;                                                         // 6192
				if (x < 6) x = 0;                                                  // 6193
				if (x + 3 > thumbconwidth - 6) x = thumbconwidth;                  // 6194
                                                                       //
				//ANIMATE TO POSITION                                              //
				var pos = 0 - x * steps;                                           // 6197
				if (pos > 0) pos = 0;                                              // 6198
				if (pos < 0 - max + thumbconwidth) pos = 0 - max + thumbconwidth;  // 6199
				moveThumbSliderToPosition($this, pos, 0);                          // 6200
			});                                                                 //
                                                                       //
			bullets.parent().mouseleave(function () {                           // 6204
				var $this = jQuery(this);                                          // 6205
				$this.removeClass("over");                                         // 6206
				moveSelectedThumb(container);                                      // 6207
			});                                                                 //
		}                                                                    //
	};                                                                    //
                                                                       //
	///////////////////////////////                                       //
	//	SelectedThumbInPosition //                                         //
	//////////////////////////////                                        //
	var moveSelectedThumb = function (container) {                        // 6218
                                                                       //
		var bullets = container.parent().find('.tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer'),
		    $this = bullets.parent(),                                        //
		    offset = $this.offset(),                                         //
		    minwidth = $this.find('.bullet:first').outerWidth(true),         //
		    x = $this.find('.bullet.selected').index() * minwidth,           //
		    thumbconwidth = $this.width(),                                   //
		    minwidth = $this.find('.bullet:first').outerWidth(true),         //
		    max = minwidth * container.find('>ul:first >li').length,         //
		    diff = max - thumbconwidth,                                      //
		    steps = diff / thumbconwidth,                                    //
		    pos = 0 - x;                                                     //
                                                                       //
		if (pos > 0) pos = 0;                                                // 6232
		if (pos < 0 - max + thumbconwidth) pos = 0 - max + thumbconwidth;    // 6233
		if (!$this.hasClass("over")) {                                       // 6234
			moveThumbSliderToPosition($this, pos, 200);                         // 6235
		}                                                                    //
	};                                                                    //
                                                                       //
	////////////////////////////////////                                  //
	//	MOVE THUMB SLIDER TO POSITION //                                   //
	///////////////////////////////////                                   //
	var moveThumbSliderToPosition = function ($this, pos, speed) {        // 6243
		punchgs.TweenLite.to($this.find('.tp-thumbcontainer'), 0.2, { force3D: "auto", left: pos, ease: punchgs.Power3.easeOut, overwrite: "auto" });
	};                                                                    //
})(jQuery);                                                            //
                                                                       //
/// END OF THUMBNAIL EXTNESIONS                                        //
                                                                       //
// SOME ERROR MESSAGES IN CASE THE PLUGIN CAN NOT BE LOADED            //
function revslider_showDoubleJqueryError(sliderID) {                   // 6258
	var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
	errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
	errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
	errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
	errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>";
	jQuery(sliderID).show().html(errorMessage);                           // 6264
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
