(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/counter/jquery.counterup.js                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*!                                                                    //
* jquery.counterup.js 1.0                                              //
*                                                                      //
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal             //
* Released under the GPL v2 License                                    //
*                                                                      //
* Date: Nov 26, 2013                                                   //
*/                                                                     //
(function ($) {                                                        // 9
    "use strict";                                                      // 10
                                                                       //
    $.fn.counterUp = function (options) {                              // 12
                                                                       //
        // Defaults                                                    //
        var settings = $.extend({                                      // 15
            'time': 400,                                               // 16
            'delay': 10                                                // 17
        }, options);                                                   //
                                                                       //
        return this.each(function () {                                 // 20
                                                                       //
            // Store the object                                        //
            var $this = $(this);                                       // 23
            var $settings = settings;                                  // 24
                                                                       //
            var counterUpper = function () {                           // 26
                var nums = [];                                         // 27
                var divisions = $settings.time / $settings.delay;      // 28
                var num = $this.text();                                // 29
                var isComma = /[0-9]+,[0-9]+/.test(num);               // 30
                num = num.replace(/,/g, '');                           // 31
                var isInt = /^[0-9]+$/.test(num);                      // 32
                var isFloat = /^[0-9]+\.[0-9]+$/.test(num);            // 33
                var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
                                                                       //
                // Generate list of incremental numbers to display     //
                for (var i = divisions; i >= 1; i--) {                 // 37
                                                                       //
                    // Preserve as int if input was int                //
                    var newNum = parseInt(num / divisions * i);        // 40
                                                                       //
                    // Preserve float if input was float               //
                    if (isFloat) {                                     // 43
                        newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    }                                                  //
                                                                       //
                    // Preserve commas if input had commas             //
                    if (isComma) {                                     // 48
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }                                              //
                    }                                                  //
                                                                       //
                    nums.unshift(newNum);                              // 54
                }                                                      //
                                                                       //
                $this.data('counterup-nums', nums);                    // 57
                $this.text('0');                                       // 58
                                                                       //
                // Updates the number until we're done                 //
                var f = function () {                                  // 61
                    $this.text($this.data('counterup-nums').shift());  // 62
                    if ($this.data('counterup-nums').length) {         // 63
                        setTimeout($this.data('counterup-func'), $settings.delay);
                    } else {                                           //
                        delete $this.data('counterup-nums');           // 66
                        $this.data('counterup-nums', null);            // 67
                        $this.data('counterup-func', null);            // 68
                    }                                                  //
                };                                                     //
                $this.data('counterup-func', f);                       // 71
                                                                       //
                // Start the count up                                  //
                setTimeout($this.data('counterup-func'), $settings.delay);
            };                                                         //
                                                                       //
            // Perform counts when the element gets into view          //
            $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
        });                                                            //
    };                                                                 //
})(jQuery);                                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
