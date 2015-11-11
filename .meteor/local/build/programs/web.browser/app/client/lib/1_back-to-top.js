(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/1_back-to-top.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//** jQuery Scroll to Top Control script- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com.
//** Available/ usage terms at http://www.dynamicdrive.com (March 30th, 09')
//** v1.1 (April 7th, 09'):                                            //
//** 1) Adds ability to scroll to an absolute position (from top of page) or specific element on the page instead.
//** 2) Fixes scroll animation not working in Opera.                   //
                                                                       //
var scrolltotop = {                                                    // 8
	//startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
	//scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
	setting: { startline: 100, scrollto: 0, scrollduration: 1000, fadeduration: [500, 100] },
	controlHTML: '', //<img src="assets/img/up.png" style="width:51px; height:42px" /> //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: { offsetx: 5, offsety: 5 }, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links
                                                                       //
	state: { isvisible: false, shouldvisible: false },                    // 16
                                                                       //
	scrollup: function () {                                               // 18
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({ opacity: 0 }); //hide control immediately after clicking it
		var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
		if (typeof dest == "string" && jQuery('#' + dest).length == 1) //check element set by string exists
			dest = jQuery('#' + dest).offset().top;else dest = 0;               // 23
		this.$body.animate({ scrollTop: dest }, this.setting.scrollduration);
	},                                                                    //
                                                                       //
	keepfixed: function () {                                              // 29
		var $window = jQuery(window);                                        // 30
		var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
		var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
		this.$control.css({ left: controlx + 'px', top: controly + 'px' });  // 33
	},                                                                    //
                                                                       //
	togglecontrol: function () {                                          // 36
		var scrolltop = jQuery(window).scrollTop();                          // 37
		if (!this.cssfixedsupport) this.keepfixed();                         // 38
		this.state.shouldvisible = scrolltop >= this.setting.startline ? true : false;
		if (this.state.shouldvisible && !this.state.isvisible) {             // 41
			this.$control.stop().animate({ opacity: 1 }, this.setting.fadeduration[0]);
			this.state.isvisible = true;                                        // 43
		} else if (this.state.shouldvisible == false && this.state.isvisible) {
			this.$control.stop().animate({ opacity: 0 }, this.setting.fadeduration[1]);
			this.state.isvisible = false;                                       // 47
		}                                                                    //
	},                                                                    //
                                                                       //
	init: function () {                                                   // 51
		jQuery(document).ready(function ($) {                                // 52
			var mainobj = scrolltotop;                                          // 53
			var iebrws = document.all;                                          // 54
			mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode == "CSS1Compat" && window.XMLHttpRequest; //not IE or IE7+ browsers in standards mode
			mainobj.$body = window.opera ? document.compatMode == "CSS1Compat" ? $('html') : $('body') : $('html,body');
			mainobj.$control = $('<div id="topcontrol">' + mainobj.controlHTML + '</div>').css({ position: mainobj.cssfixedsupport ? 'fixed' : 'absolute', bottom: mainobj.controlattrs.offsety, right: mainobj.controlattrs.offsetx, opacity: 0, cursor: 'pointer' }).attr({ title: 'Scroll Back to Top' }).click(function () {
				mainobj.scrollup();return false;                                   // 60
			}).appendTo('body');                                                //
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != '') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({ width: mainobj.$control.width() }); //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol();                                            // 64
			$('a[href="' + mainobj.anchorkeyword + '"]').click(function () {    // 65
				mainobj.scrollup();                                                // 66
				return false;                                                      // 67
			});                                                                 //
			$(window).bind('scroll resize', function (e) {                      // 69
				mainobj.togglecontrol();                                           // 70
			});                                                                 //
		});                                                                  //
	}                                                                     //
};                                                                     //
                                                                       //
scrolltotop.init();                                                    // 76
/////////////////////////////////////////////////////////////////////////

}).call(this);
