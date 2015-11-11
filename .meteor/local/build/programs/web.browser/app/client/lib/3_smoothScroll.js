(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/3_smoothScroll.js                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// SmoothScroll for websites v1.2.1                                    //
// Licensed under the terms of the MIT license.                        //
                                                                       //
// People involved                                                     //
//  - Balazs Galambosi (maintainer)                                    //
//  - Michael Herf     (Pulse Algorithm)                               //
                                                                       //
(function () {                                                         // 8
                                                                       //
    // Scroll Variables (tweakable)                                    //
    var defaultOptions = {                                             // 11
                                                                       //
        // Scrolling Core                                              //
        frameRate: 150, // [Hz]                                        // 14
        animationTime: 400, // [px]                                    // 15
        stepSize: 120, // [px]                                         // 16
                                                                       //
        // Pulse (less tweakable)                                      //
        // ratio of "tail" to "acceleration"                           //
        pulseAlgorithm: true,                                          // 20
        pulseScale: 8,                                                 // 21
        pulseNormalize: 1,                                             // 22
                                                                       //
        // Acceleration                                                //
        accelerationDelta: 20, // 20                                   // 25
        accelerationMax: 1, // 1                                       // 26
                                                                       //
        // Keyboard Settings                                           //
        keyboardSupport: true, // option                               // 29
        arrowScroll: 50, // [px]                                       // 30
                                                                       //
        // Other                                                       //
        touchpadSupport: true,                                         // 33
        fixedBackground: true,                                         // 34
        excluded: ""                                                   // 35
    };                                                                 //
                                                                       //
    var options = defaultOptions;                                      // 38
                                                                       //
    // Other Variables                                                 //
    var isExcluded = false;                                            // 42
    var isFrame = false;                                               // 43
    var direction = { x: 0, y: 0 };                                    // 44
    var initDone = false;                                              // 45
    var root = document.documentElement;                               // 46
    var activeElement;                                                 // 47
    var observer;                                                      // 48
    var deltaBuffer = [120, 120, 120];                                 // 49
                                                                       //
    var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32,   // 51
        pageup: 33, pagedown: 34, end: 35, home: 36 };                 // 52
                                                                       //
    /***********************************************                   //
     * SETTINGS                                                        //
     ***********************************************/                  //
                                                                       //
    var options = defaultOptions;                                      // 59
                                                                       //
    /***********************************************                   //
     * INITIALIZE                                                      //
     ***********************************************/                  //
                                                                       //
    /**                                                                //
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */                                                                //
    function initTest() {                                              // 69
                                                                       //
        var disableKeyboard = false;                                   // 71
                                                                       //
        // disable keyboard support if anything above requested it     //
        if (disableKeyboard) {                                         // 74
            removeEvent("keydown", keydown);                           // 75
        }                                                              //
                                                                       //
        if (options.keyboardSupport && !disableKeyboard) {             // 78
            addEvent("keydown", keydown);                              // 79
        }                                                              //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Sets up scrolls array, determines if frames are involved.       //
     */                                                                //
    function init() {                                                  // 86
                                                                       //
        if (!document.body) return;                                    // 88
                                                                       //
        var body = document.body;                                      // 90
        var html = document.documentElement;                           // 91
        var windowHeight = window.innerHeight;                         // 92
        var scrollHeight = body.scrollHeight;                          // 93
                                                                       //
        // check compat mode for root element                          //
        root = document.compatMode.indexOf('CSS') >= 0 ? html : body;  // 96
        activeElement = body;                                          // 97
                                                                       //
        initTest();                                                    // 99
        initDone = true;                                               // 100
                                                                       //
        // Checks if this script is running in a frame                 //
        if (top != self) {                                             // 103
            isFrame = true;                                            // 104
        }                                                              //
                                                                       //
        /**                                                            //
         * This fixes a bug where the areas left and right to          //
         * the content does not trigger the onmousewheel event         //
         * on some pages. e.g.: html, body { height: 100% }            //
         */                                                            //
        else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
                                                                       //
                // DOMChange (throttle): fix height                    //
                var pending = false;                                   // 117
                var refresh = function () {                            // 118
                    if (!pending && html.scrollHeight != document.height) {
                        pending = true; // add a new pending action    // 120
                        setTimeout(function () {                       // 121
                            html.style.height = document.height + 'px';
                            pending = false;                           // 123
                        }, 500); // act rarely to stay fast            //
                    }                                                  //
                };                                                     //
                html.style.height = 'auto';                            // 127
                setTimeout(refresh, 10);                               // 128
                                                                       //
                // clearfix                                            //
                if (root.offsetHeight <= windowHeight) {               // 131
                    var underlay = document.createElement("div");      // 132
                    underlay.style.clear = "both";                     // 133
                    body.appendChild(underlay);                        // 134
                }                                                      //
            }                                                          //
                                                                       //
        // disable fixed background                                    //
        if (!options.fixedBackground && !isExcluded) {                 // 139
            body.style.backgroundAttachment = "scroll";                // 140
            html.style.backgroundAttachment = "scroll";                // 141
        }                                                              //
    }                                                                  //
                                                                       //
    /************************************************                  //
     * SCROLLING                                                       //
     ************************************************/                 //
                                                                       //
    var que = [];                                                      // 150
    var pending = false;                                               // 151
    var lastScroll = +new Date();                                      // 152
                                                                       //
    /**                                                                //
     * Pushes scroll actions to the scrolling queue.                   //
     */                                                                //
    function scrollArray(elem, left, top, delay) {                     // 157
                                                                       //
        delay || (delay = 1000);                                       // 159
        directionCheck(left, top);                                     // 160
                                                                       //
        if (options.accelerationMax != 1) {                            // 162
            var now = +new Date();                                     // 163
            var elapsed = now - lastScroll;                            // 164
            if (elapsed < options.accelerationDelta) {                 // 165
                var factor = (1 + 30 / elapsed) / 2;                   // 166
                if (factor > 1) {                                      // 167
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;                                    // 169
                    top *= factor;                                     // 170
                }                                                      //
            }                                                          //
            lastScroll = +new Date();                                  // 173
        }                                                              //
                                                                       //
        // push a scroll command                                       //
        que.push({                                                     // 177
            x: left,                                                   // 178
            y: top,                                                    // 179
            lastX: left < 0 ? 0.99 : -0.99,                            // 180
            lastY: top < 0 ? 0.99 : -0.99,                             // 181
            start: +new Date()                                         // 182
        });                                                            //
                                                                       //
        // don't act if there's a pending queue                        //
        if (pending) {                                                 // 186
            return;                                                    // 187
        }                                                              //
                                                                       //
        var scrollWindow = elem === document.body;                     // 190
                                                                       //
        var step = function (time) {                                   // 192
                                                                       //
            var now = +new Date();                                     // 194
            var scrollX = 0;                                           // 195
            var scrollY = 0;                                           // 196
                                                                       //
            for (var i = 0; i < que.length; i++) {                     // 198
                                                                       //
                var item = que[i];                                     // 200
                var elapsed = now - item.start;                        // 201
                var finished = elapsed >= options.animationTime;       // 202
                                                                       //
                // scroll position: [0, 1]                             //
                var position = finished ? 1 : elapsed / options.animationTime;
                                                                       //
                // easing [optional]                                   //
                if (options.pulseAlgorithm) {                          // 208
                    position = pulse(position);                        // 209
                }                                                      //
                                                                       //
                // only need the difference                            //
                var x = item.x * position - item.lastX >> 0;           // 213
                var y = item.y * position - item.lastY >> 0;           // 214
                                                                       //
                // add this to the total scrolling                     //
                scrollX += x;                                          // 217
                scrollY += y;                                          // 218
                                                                       //
                // update last values                                  //
                item.lastX += x;                                       // 221
                item.lastY += y;                                       // 222
                                                                       //
                // delete and step back if it's over                   //
                if (finished) {                                        // 225
                    que.splice(i, 1);i--;                              // 226
                }                                                      //
            }                                                          //
                                                                       //
            // scroll left and top                                     //
            if (scrollWindow) {                                        // 231
                window.scrollBy(scrollX, scrollY);                     // 232
            } else {                                                   //
                if (scrollX) elem.scrollLeft += scrollX;               // 235
                if (scrollY) elem.scrollTop += scrollY;                // 236
            }                                                          //
                                                                       //
            // clean up if there's nothing left to do                  //
            if (!left && !top) {                                       // 240
                que = [];                                              // 241
            }                                                          //
                                                                       //
            if (que.length) {                                          // 244
                requestFrame(step, elem, delay / options.frameRate + 1);
            } else {                                                   //
                pending = false;                                       // 247
            }                                                          //
        };                                                             //
                                                                       //
        // start a new queue of actions                                //
        requestFrame(step, elem, 0);                                   // 252
        pending = true;                                                // 253
    }                                                                  //
                                                                       //
    /***********************************************                   //
     * EVENTS                                                          //
     ***********************************************/                  //
                                                                       //
    /**                                                                //
     * Mouse wheel handler.                                            //
     * @param {Object} event                                           //
     */                                                                //
    function wheel(event) {                                            // 265
                                                                       //
        if (!initDone) {                                               // 267
            init();                                                    // 268
        }                                                              //
                                                                       //
        var target = event.target;                                     // 271
        var overflowing = overflowingAncestor(target);                 // 272
                                                                       //
        // use default if there's no overflowing                       //
        // element or default action is prevented                      //
        if (!overflowing || event.defaultPrevented || isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src)) {
            return true;                                               // 279
        }                                                              //
                                                                       //
        var deltaX = event.wheelDeltaX || 0;                           // 282
        var deltaY = event.wheelDeltaY || 0;                           // 283
                                                                       //
        // use wheelDelta if deltaX/Y is not available                 //
        if (!deltaX && !deltaY) {                                      // 286
            deltaY = event.wheelDelta || 0;                            // 287
        }                                                              //
                                                                       //
        // check if it's a touchpad scroll that should be ignored      //
        if (!options.touchpadSupport && isTouchpad(deltaY)) {          // 291
            return true;                                               // 292
        }                                                              //
                                                                       //
        // scale by step size                                          //
        // delta is 120 most of the time                               //
        // synaptics seems to send 1 sometimes                         //
        if (Math.abs(deltaX) > 1.2) {                                  // 298
            deltaX *= options.stepSize / 120;                          // 299
        }                                                              //
        if (Math.abs(deltaY) > 1.2) {                                  // 301
            deltaY *= options.stepSize / 120;                          // 302
        }                                                              //
                                                                       //
        scrollArray(overflowing, -deltaX, -deltaY);                    // 305
        event.preventDefault();                                        // 306
    }                                                                  //
                                                                       //
    /**                                                                //
     * Keydown event handler.                                          //
     * @param {Object} event                                           //
     */                                                                //
    function keydown(event) {                                          // 313
                                                                       //
        var target = event.target;                                     // 315
        var modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
                                                                       //
        // do nothing if user is editing text                          //
        // or using a modifier key (except shift)                      //
        // or in a dropdown                                            //
        if (/input|textarea|select|embed/i.test(target.nodeName) || target.isContentEditable || event.defaultPrevented || modifier) {
            return true;                                               // 326
        }                                                              //
        // spacebar should trigger button press                        //
        if (isNodeName(target, "button") && event.keyCode === key.spacebar) {
            return true;                                               // 331
        }                                                              //
                                                                       //
        var shift,                                                     // 334
            x = 0,                                                     //
            y = 0;                                                     //
        var elem = overflowingAncestor(activeElement);                 // 335
        var clientHeight = elem.clientHeight;                          // 336
                                                                       //
        if (elem == document.body) {                                   // 338
            clientHeight = window.innerHeight;                         // 339
        }                                                              //
                                                                       //
        switch (event.keyCode) {                                       // 342
            case key.up:                                               // 343
                y = -options.arrowScroll;                              // 344
                break;                                                 // 345
            case key.down:                                             // 345
                y = options.arrowScroll;                               // 347
                break;                                                 // 348
            case key.spacebar:                                         // 349
                // (+ shift)                                           //
                shift = event.shiftKey ? 1 : -1;                       // 350
                y = -shift * clientHeight * 0.9;                       // 351
                break;                                                 // 352
            case key.pageup:                                           // 352
                y = -clientHeight * 0.9;                               // 354
                break;                                                 // 355
            case key.pagedown:                                         // 355
                y = clientHeight * 0.9;                                // 357
                break;                                                 // 358
            case key.home:                                             // 359
                y = -elem.scrollTop;                                   // 360
                break;                                                 // 361
            case key.end:                                              // 362
                var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
                y = damt > 0 ? damt + 10 : 0;                          // 364
                break;                                                 // 365
            case key.left:                                             // 366
                x = -options.arrowScroll;                              // 367
                break;                                                 // 368
            case key.right:                                            // 368
                x = options.arrowScroll;                               // 370
                break;                                                 // 371
            default:                                                   // 371
                return true; // a key we don't care about              // 373
        }                                                              //
                                                                       //
        scrollArray(elem, x, y);                                       // 376
        event.preventDefault();                                        // 377
    }                                                                  //
                                                                       //
    /**                                                                //
     * Mousedown event only for updating activeElement                 //
     */                                                                //
    function mousedown(event) {                                        // 383
        activeElement = event.target;                                  // 384
    }                                                                  //
                                                                       //
    /***********************************************                   //
     * OVERFLOW                                                        //
     ***********************************************/                  //
                                                                       //
    var cache = {}; // cleared out every once in while                 // 392
    setInterval(function () {                                          // 393
        cache = {};                                                    // 393
    }, 10 * 1000);                                                     //
                                                                       //
    var uniqueID = (function () {                                      // 395
        var i = 0;                                                     // 396
        return function (el) {                                         // 397
            return el.uniqueID || (el.uniqueID = i++);                 // 398
        };                                                             //
    })();                                                              //
                                                                       //
    function setCache(elems, overflowing) {                            // 402
        for (var i = elems.length; i--;) cache[uniqueID(elems[i])] = overflowing;
        return overflowing;                                            // 405
    }                                                                  //
                                                                       //
    function overflowingAncestor(el) {                                 // 408
        var elems = [];                                                // 409
        var rootScrollHeight = root.scrollHeight;                      // 410
        do {                                                           // 411
            var cached = cache[uniqueID(el)];                          // 412
            if (cached) {                                              // 413
                return setCache(elems, cached);                        // 414
            }                                                          //
            elems.push(el);                                            // 416
            if (rootScrollHeight === el.scrollHeight) {                // 417
                if (!isFrame || root.clientHeight + 10 < rootScrollHeight) {
                    return setCache(elems, document.body); // scrolling root in WebKit
                }                                                      //
            } else if (el.clientHeight + 10 < el.scrollHeight) {       //
                    overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
                    if (overflow === "scroll" || overflow === "auto") {
                        return setCache(elems, el);                    // 424
                    }                                                  //
                }                                                      //
        } while (el = el.parentNode);                                  //
    }                                                                  //
                                                                       //
    /***********************************************                   //
     * HELPERS                                                         //
     ***********************************************/                  //
                                                                       //
    function addEvent(type, fn, bubble) {                              // 435
        window.addEventListener(type, fn, bubble || false);            // 436
    }                                                                  //
                                                                       //
    function removeEvent(type, fn, bubble) {                           // 439
        window.removeEventListener(type, fn, bubble || false);         // 440
    }                                                                  //
                                                                       //
    function isNodeName(el, tag) {                                     // 443
        return (el.nodeName || "").toLowerCase() === tag.toLowerCase();
    }                                                                  //
                                                                       //
    function directionCheck(x, y) {                                    // 447
        x = x > 0 ? 1 : -1;                                            // 448
        y = y > 0 ? 1 : -1;                                            // 449
        if (direction.x !== x || direction.y !== y) {                  // 450
            direction.x = x;                                           // 451
            direction.y = y;                                           // 452
            que = [];                                                  // 453
            lastScroll = 0;                                            // 454
        }                                                              //
    }                                                                  //
                                                                       //
    var deltaBufferTimer;                                              // 458
                                                                       //
    function isTouchpad(deltaY) {                                      // 460
        if (!deltaY) return;                                           // 461
        deltaY = Math.abs(deltaY);                                     // 462
        deltaBuffer.push(deltaY);                                      // 463
        deltaBuffer.shift();                                           // 464
        clearTimeout(deltaBufferTimer);                                // 465
        var allDivisable = isDivisible(deltaBuffer[0], 120) && isDivisible(deltaBuffer[1], 120) && isDivisible(deltaBuffer[2], 120);
        return !allDivisable;                                          // 469
    }                                                                  //
                                                                       //
    function isDivisible(n, divisor) {                                 // 472
        return Math.floor(n / divisor) == n / divisor;                 // 473
    }                                                                  //
                                                                       //
    var requestFrame = (function () {                                  // 476
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element, delay) {
            window.setTimeout(callback, delay || 1000 / 60);           // 480
        };                                                             //
    })();                                                              //
                                                                       //
    /***********************************************                   //
     * PULSE                                                           //
     ***********************************************/                  //
                                                                       //
    /**                                                                //
     * Viscous fluid with a pulse for part and decay for the rest.     //
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/                 //
     */                                                                //
    function pulse_(x) {                                               // 495
        var val, start, expx;                                          // 496
        // test                                                        //
        x = x * options.pulseScale;                                    // 498
        if (x < 1) {                                                   // 499
            // acceleartion                                            //
            val = x - (1 - Math.exp(-x));                              // 500
        } else {                                                       //
            // tail                                                    //
            // the previous animation ended here:                      //
            start = Math.exp(-1);                                      // 503
            // simple viscous drag                                     //
            x -= 1;                                                    // 505
            expx = 1 - Math.exp(-x);                                   // 506
            val = start + expx * (1 - start);                          // 507
        }                                                              //
        return val * options.pulseNormalize;                           // 509
    }                                                                  //
                                                                       //
    function pulse(x) {                                                // 512
        if (x >= 1) return 1;                                          // 513
        if (x <= 0) return 0;                                          // 514
                                                                       //
        if (options.pulseNormalize == 1) {                             // 516
            options.pulseNormalize /= pulse_(1);                       // 517
        }                                                              //
        return pulse_(x);                                              // 519
    }                                                                  //
                                                                       //
    var isChrome = /chrome/i.test(window.navigator.userAgent);         // 522
    var wheelEvent = null;                                             // 523
    if ("onwheel" in document.createElement("div")) wheelEvent = "wheel";else if ("onmousewheel" in document.createElement("div")) wheelEvent = "mousewheel";
                                                                       //
    if (wheelEvent && isChrome) {                                      // 529
        addEvent(wheelEvent, wheel);                                   // 530
        addEvent("mousedown", mousedown);                              // 531
        addEvent("load", init);                                        // 532
    }                                                                  //
})();                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
