(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/cube-portfolio/cubeportfolio/js/jquery.cubeportfolio.js  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*!                                                                    //
 * Cube Portfolio - Responsive jQuery Grid Plugin                      //
 *                                                                     //
 * version: 2.3.3 (16 June, 2015)                                      //
 * require: jQuery v1.7+                                               //
 *                                                                     //
 * Copyright 2013-2015, Mihai Buricea (http://scriptpie.com/cubeportfolio/live-preview/)
 * Licensed under CodeCanyon License (http://codecanyon.net/licenses)  //
 *                                                                     //
 */                                                                    //
                                                                       //
(function ($, window, document, undefined) {                           // 12
    'use strict';                                                      // 13
                                                                       //
    function CubePortfolio(obj, options, callback) {                   // 15
        /*jshint validthis: true */                                    //
        var t = this,                                                  // 17
            initialCls = 'cbp',                                        //
            children;                                                  //
                                                                       //
        if ($.data(obj, 'cubeportfolio')) {                            // 21
            throw new Error('cubeportfolio is already initialized. Destroy it before initialize again!');
        }                                                              //
                                                                       //
        // attached this instance to obj                               //
        $.data(obj, 'cubeportfolio', t);                               // 26
                                                                       //
        // extend options                                              //
        t.options = $.extend({}, $.fn.cubeportfolio.options, options);
                                                                       //
        // store the state of the animation used for filters           //
        t.isAnimating = true;                                          // 32
                                                                       //
        // default filter for plugin                                   //
        t.defaultFilter = t.options.defaultFilter;                     // 35
                                                                       //
        // registered events (observator & publisher pattern)          //
        t.registeredEvents = [];                                       // 38
                                                                       //
        // skip events (observator & publisher pattern)                //
        t.skipEvents = [];                                             // 41
                                                                       //
        // has wrapper                                                 //
        t.addedWrapp = false;                                          // 44
                                                                       //
        // register callback function                                  //
        if ($.isFunction(callback)) {                                  // 47
            t._registerEvent('initFinish', callback, true);            // 48
        }                                                              //
                                                                       //
        // js element                                                  //
        t.obj = obj;                                                   // 52
                                                                       //
        // jquery element                                              //
        t.$obj = $(obj);                                               // 55
                                                                       //
        // when there are no .cbp-item                                 //
        children = t.$obj.children();                                  // 58
                                                                       //
        // if caption is active                                        //
        if (t.options.caption) {                                       // 61
            if (!CubePortfolio.Private.modernBrowser) {                // 62
                t.options.caption = 'minimal';                         // 63
            }                                                          //
                                                                       //
            // .cbp-caption-active is used only for css                //
            // so it will not generate a big css from sass if a caption is set
            initialCls += ' cbp-caption-active cbp-caption-' + t.options.caption;
        }                                                              //
                                                                       //
        t.$obj.addClass(initialCls);                                   // 71
                                                                       //
        if (children.length === 0 || children.first().hasClass('cbp-item')) {
            t.wrapInner(t.obj, 'cbp-wrapper');                         // 74
            t.addedWrapp = true;                                       // 75
        }                                                              //
                                                                       //
        // jquery wrapper element                                      //
        t.$ul = t.$obj.children().addClass('cbp-wrapper');             // 79
                                                                       //
        // wrap the $ul in a outside wrapper                           //
        t.wrapInner(t.obj, 'cbp-wrapper-outer');                       // 82
                                                                       //
        t.wrapper = t.$obj.children('.cbp-wrapper-outer');             // 84
                                                                       //
        t.blocks = t.$ul.children('.cbp-item');                        // 86
                                                                       //
        // wrap .cbp-item-wrap div inside .cbp-item                    //
        t.wrapInner(t.blocks, 'cbp-item-wrapper');                     // 89
                                                                       //
        // store main container width                                  //
        t.width = t.$obj.outerWidth();                                 // 92
                                                                       //
        // wait to load all images and then go further                 //
        t._load(t.$obj, t._display);                                   // 95
    }                                                                  //
                                                                       //
    $.extend(CubePortfolio.prototype, {                                // 98
                                                                       //
        storeData: function (blocks) {                                 // 100
            blocks.each(function (index, el) {                         // 101
                var block = $(el);                                     // 102
                                                                       //
                block.data('cbp', {                                    // 104
                    wrapper: block.children('.cbp-item-wrapper'),      // 105
                                                                       //
                    widthInitial: block.outerWidth(),                  // 107
                    heightInitial: block.outerHeight(),                // 108
                    width: null,                                       // 109
                    height: null,                                      // 110
                                                                       //
                    left: null,                                        // 112
                    leftNew: null,                                     // 113
                    top: null,                                         // 114
                    topNew: null                                       // 115
                });                                                    //
            });                                                        //
        },                                                             //
                                                                       //
        // http://bit.ly/pure-js-wrap                                  //
        wrapInner: function (items, classAttr) {                       // 121
            var t = this,                                              // 122
                item,                                                  //
                i,                                                     //
                div;                                                   //
                                                                       //
            classAttr = classAttr || '';                               // 127
                                                                       //
            if (items.length && items.length < 1) {                    // 129
                return; // there are no .cbp-item                      // 130
            } else if (items.length === undefined) {                   //
                    items = [items];                                   // 132
                }                                                      //
                                                                       //
            for (i = items.length - 1; i >= 0; i--) {                  // 135
                item = items[i];                                       // 136
                                                                       //
                div = document.createElement('div');                   // 138
                                                                       //
                div.setAttribute('class', classAttr);                  // 140
                                                                       //
                while (item.childNodes.length) {                       // 142
                    div.appendChild(item.childNodes[0]);               // 143
                }                                                      //
                                                                       //
                item.appendChild(div);                                 // 146
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Destroy function for all captions                           //
         */                                                            //
        _captionDestroy: function () {                                 // 155
            var t = this;                                              // 156
            t.$obj.removeClass('cbp-caption-active cbp-caption-' + t.options.caption);
        },                                                             //
                                                                       //
        /**                                                            //
         * Add resize event when browser width changes                 //
         */                                                            //
        resizeEvent: function () {                                     // 164
            var t = this,                                              // 165
                timeout,                                               //
                gridWidth;                                             //
                                                                       //
            // resize                                                  //
            $(window).on('resize.cbp', function () {                   // 169
                clearTimeout(timeout);                                 // 170
                                                                       //
                timeout = setTimeout(function () {                     // 172
                                                                       //
                    if (window.innerHeight == screen.height) {         // 174
                        // this is fulll screen mode. don't need to trigger a resize
                        return;                                        // 176
                    }                                                  //
                                                                       //
                    if (t.options.gridAdjustment === 'alignCenter') {  // 179
                        t.obj.style.maxWidth = '';                     // 180
                    }                                                  //
                                                                       //
                    gridWidth = t.$obj.outerWidth();                   // 183
                                                                       //
                    if (t.width !== gridWidth) {                       // 185
                                                                       //
                        // update the current width                    //
                        t.width = gridWidth;                           // 188
                                                                       //
                        t._gridAdjust();                               // 190
                                                                       //
                        // reposition the blocks                       //
                        t._layout();                                   // 193
                                                                       //
                        // repositionate the blocks with the best transition available
                        t.positionateItems();                          // 196
                                                                       //
                        // resize main container height                //
                        t._resizeMainContainer();                      // 199
                                                                       //
                        if (t.options.layoutMode === 'slider') {       // 201
                            t._updateSlider();                         // 202
                        }                                              //
                                                                       //
                        t._triggerEvent('resizeGrid');                 // 205
                    }                                                  //
                                                                       //
                    t._triggerEvent('resizeWindow');                   // 208
                }, 80);                                                //
            });                                                        //
        },                                                             //
                                                                       //
        /**                                                            //
         * Wait to load all images                                     //
         */                                                            //
        _load: function (obj, callback, args) {                        // 219
            var t = this,                                              // 220
                imgs,                                                  //
                imgsLength,                                            //
                imgsLoaded = 0;                                        //
                                                                       //
            args = args || [];                                         // 225
                                                                       //
            imgs = obj.find('img:uncached').map(function () {          // 227
                return this.src;                                       // 228
            });                                                        //
                                                                       //
            imgsLength = imgs.length;                                  // 231
                                                                       //
            if (imgsLength === 0) {                                    // 233
                callback.apply(t, args);                               // 234
            }                                                          //
                                                                       //
            $.each(imgs, function (i, src) {                           // 237
                var img = new Image();                                 // 238
                                                                       //
                $(img).one('load.cbp error.cbp', function () {         // 240
                    $(this).off('load.cbp error.cbp');                 // 241
                                                                       //
                    imgsLoaded++;                                      // 243
                    if (imgsLoaded === imgsLength) {                   // 244
                        callback.apply(t, args);                       // 245
                        return false;                                  // 246
                    }                                                  //
                });                                                    //
                                                                       //
                img.src = src;                                         // 251
            });                                                        //
        },                                                             //
                                                                       //
        /**                                                            //
         * Check if filters is present in url                          //
         */                                                            //
        _filterFromUrl: function () {                                  // 260
            var t = this,                                              // 261
                match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href);
                                                                       //
            if (match !== null) {                                      // 264
                t.defaultFilter = match[1];                            // 265
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Show the plugin                                             //
         */                                                            //
        _display: function () {                                        // 273
            var t = this;                                              // 274
                                                                       //
            // store to data some values of t.blocks                   //
            t.storeData(t.blocks);                                     // 277
                                                                       //
            if (t.options.layoutMode === 'grid') {                     // 279
                // set default filter if is present in url             //
                t._filterFromUrl();                                    // 281
            }                                                          //
                                                                       //
            if (t.defaultFilter !== '*') {                             // 284
                t.blocksOn = t.blocks.filter(t.defaultFilter);         // 285
                t.blocks.not(t.defaultFilter).addClass('cbp-item-off');
            } else {                                                   //
                t.blocksOn = t.blocks;                                 // 288
            }                                                          //
                                                                       //
            // plugins                                                 //
            t._plugins = $.map(CubePortfolio.Plugins, function (pluginName) {
                return pluginName(t);                                  // 293
            });                                                        //
                                                                       //
            t._triggerEvent('initStartRead');                          // 296
            t._triggerEvent('initStartWrite');                         // 297
                                                                       //
            t.localColumnWidth = t.options.gapVertical;                // 299
                                                                       //
            if (t.blocks.length) {                                     // 301
                t.localColumnWidth += t.blocks.first().data('cbp').widthInitial;
            }                                                          //
                                                                       //
            t.getColumnsType = $.isArray(t.options.mediaQueries) ? '_getColumnsBreakpoints' : '_getColumnsAuto';
                                                                       //
            t._gridAdjust();                                           // 307
                                                                       //
            // create mark-up for layout mode                          //
            t['_' + t.options.layoutMode + 'Markup']();                // 310
                                                                       //
            // make layout                                             //
            t._layout();                                               // 313
                                                                       //
            // positionate the blocks                                  //
            t.positionateItems();                                      // 316
                                                                       //
            // resize main container height                            //
            t._resizeMainContainer();                                  // 319
                                                                       //
            t._triggerEvent('initEndRead');                            // 321
            t._triggerEvent('initEndWrite');                           // 322
                                                                       //
            // plugin is ready to show and interact                    //
            t.$obj.addClass('cbp-ready');                              // 325
                                                                       //
            t._registerEvent('delayFrame', t.delayFrame);              // 327
                                                                       //
            //  the reason is to skip this event when you want from a plugin
            t._triggerEvent('delayFrame');                             // 330
        },                                                             //
                                                                       //
        positionateItems: function () {                                // 334
            var t = this,                                              // 335
                data;                                                  //
                                                                       //
            t.blocksOn.each(function (index, el) {                     // 338
                data = $(el).data('cbp');                              // 339
                                                                       //
                data.left = data.leftNew;                              // 341
                data.top = data.topNew;                                // 342
                                                                       //
                el.style.left = data.left + 'px';                      // 344
                el.style.top = data.top + 'px';                        // 345
            });                                                        //
        },                                                             //
                                                                       //
        delayFrame: function () {                                      // 349
            var t = this;                                              // 350
                                                                       //
            requestAnimationFrame(function () {                        // 352
                t.resizeEvent();                                       // 353
                                                                       //
                t._triggerEvent('initFinish');                         // 355
                                                                       //
                // animating is now false                              //
                t.isAnimating = false;                                 // 358
                                                                       //
                // trigger public event initComplete                   //
                t.$obj.trigger('initComplete.cbp');                    // 361
            });                                                        //
        },                                                             //
                                                                       //
        _gridAdjust: function () {                                     // 366
            var t = this;                                              // 367
                                                                       //
            // if responsive                                           //
            if (t.options.gridAdjustment === 'responsive') {           // 370
                t._responsiveLayout();                                 // 371
            } else {                                                   //
                t.blocks.each(function (index, el) {                   // 373
                    var data = $(el).data('cbp');                      // 374
                                                                       //
                    data.width = data.widthInitial;                    // 376
                    data.height = data.heightInitial;                  // 377
                });                                                    //
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Build the layout                                            //
         */                                                            //
        _layout: function () {                                         // 385
            var t = this;                                              // 386
                                                                       //
            t['_' + t.options.layoutMode + 'LayoutReset']();           // 388
                                                                       //
            t['_' + t.options.layoutMode + 'Layout']();                // 390
                                                                       //
            t.$obj.removeClass(function (index, css) {                 // 392
                return (css.match(/\bcbp-cols-\d+/gi) || []).join(' ');
            });                                                        //
                                                                       //
            t.$obj.addClass('cbp-cols-' + t.cols);                     // 396
        },                                                             //
                                                                       //
        // create mark                                                 //
        _sliderMarkup: function () {                                   // 401
            var t = this;                                              // 402
                                                                       //
            t.sliderStopEvents = false;                                // 404
                                                                       //
            t.sliderActive = 0;                                        // 406
                                                                       //
            t._registerEvent('updateSliderPosition', function () {     // 408
                t.$obj.addClass('cbp-mode-slider');                    // 409
            }, true);                                                  //
                                                                       //
            t.nav = $('<div/>', {                                      // 412
                'class': 'cbp-nav'                                     // 413
            });                                                        //
                                                                       //
            t.nav.on('click.cbp', '[data-slider-action]', function (e) {
                e.preventDefault();                                    // 417
                e.stopImmediatePropagation();                          // 418
                e.stopPropagation();                                   // 419
                                                                       //
                if (t.sliderStopEvents) {                              // 421
                    return;                                            // 422
                }                                                      //
                                                                       //
                var el = $(this),                                      // 425
                    action = el.attr('data-slider-action');            //
                                                                       //
                if (t['_' + action + 'Slider']) {                      // 428
                    t['_' + action + 'Slider'](el);                    // 429
                }                                                      //
            });                                                        //
                                                                       //
            if (t.options.showNavigation) {                            // 434
                t.controls = $('<div/>', {                             // 435
                    'class': 'cbp-nav-controls'                        // 436
                });                                                    //
                                                                       //
                t.navPrev = $('<div/>', {                              // 439
                    'class': 'cbp-nav-prev',                           // 440
                    'data-slider-action': 'prev'                       // 441
                }).appendTo(t.controls);                               //
                                                                       //
                t.navNext = $('<div/>', {                              // 444
                    'class': 'cbp-nav-next',                           // 445
                    'data-slider-action': 'next'                       // 446
                }).appendTo(t.controls);                               //
                                                                       //
                t.controls.appendTo(t.nav);                            // 450
            }                                                          //
                                                                       //
            if (t.options.showPagination) {                            // 453
                t.navPagination = $('<div/>', {                        // 454
                    'class': 'cbp-nav-pagination'                      // 455
                }).appendTo(t.nav);                                    //
            }                                                          //
                                                                       //
            if (t.controls || t.navPagination) {                       // 459
                t.nav.appendTo(t.$obj);                                // 460
            }                                                          //
                                                                       //
            t._updateSliderPagination();                               // 463
                                                                       //
            if (t.options.auto) {                                      // 465
                if (t.options.autoPauseOnHover) {                      // 466
                    t.mouseIsEntered = false;                          // 467
                    t.$obj.on('mouseenter.cbp', function (e) {         // 468
                        t.mouseIsEntered = true;                       // 469
                        t._stopSliderAuto();                           // 470
                    }).on('mouseleave.cbp', function (e) {             //
                        t.mouseIsEntered = false;                      // 472
                        t._startSliderAuto();                          // 473
                    });                                                //
                }                                                      //
                                                                       //
                t._startSliderAuto();                                  // 477
            }                                                          //
                                                                       //
            if (t.options.drag && CubePortfolio.Private.modernBrowser) {
                t._dragSlider();                                       // 481
            }                                                          //
        },                                                             //
                                                                       //
        _updateSlider: function () {                                   // 486
            var t = this;                                              // 487
                                                                       //
            t._updateSliderPosition();                                 // 489
                                                                       //
            t._updateSliderPagination();                               // 491
        },                                                             //
                                                                       //
        _updateSliderPagination: function () {                         // 495
            var t = this,                                              // 496
                pages,                                                 //
                i;                                                     //
                                                                       //
            if (t.options.showPagination) {                            // 500
                                                                       //
                // get number of pages                                 //
                pages = Math.ceil(t.blocksOn.length / t.cols);         // 503
                t.navPagination.empty();                               // 504
                                                                       //
                for (i = pages - 1; i >= 0; i--) {                     // 506
                    $('<div/>', {                                      // 507
                        'class': 'cbp-nav-pagination-item',            // 508
                        'data-slider-action': 'jumpTo'                 // 509
                    }).appendTo(t.navPagination);                      //
                }                                                      //
                                                                       //
                t.navPaginationItems = t.navPagination.children();     // 513
            }                                                          //
                                                                       //
            // enable disable the nav                                  //
            t._enableDisableNavSlider();                               // 517
        },                                                             //
                                                                       //
        _destroySlider: function () {                                  // 520
            var t = this;                                              // 521
                                                                       //
            if (t.options.layoutMode !== 'slider') {                   // 523
                return;                                                // 524
            }                                                          //
                                                                       //
            t.$obj.off('click.cbp');                                   // 527
                                                                       //
            t.$obj.removeClass('cbp-mode-slider');                     // 529
                                                                       //
            if (t.options.showNavigation) {                            // 531
                t.nav.remove();                                        // 532
            }                                                          //
                                                                       //
            if (t.navPagination) {                                     // 535
                t.navPagination.remove();                              // 536
            }                                                          //
        },                                                             //
                                                                       //
        _nextSlider: function (el) {                                   // 541
            var t = this;                                              // 542
                                                                       //
            if (t._isEndSlider()) {                                    // 544
                if (t.isRewindNav()) {                                 // 545
                    t.sliderActive = 0;                                // 546
                } else {                                               //
                    return;                                            // 548
                }                                                      //
            } else {                                                   //
                if (t.options.scrollByPage) {                          // 551
                    t.sliderActive = Math.min(t.sliderActive + t.cols, t.blocksOn.length - t.cols);
                } else {                                               //
                    t.sliderActive += 1;                               // 554
                }                                                      //
            }                                                          //
                                                                       //
            t._goToSlider();                                           // 558
        },                                                             //
                                                                       //
        _prevSlider: function (el) {                                   // 561
            var t = this;                                              // 562
                                                                       //
            if (t._isStartSlider()) {                                  // 564
                if (t.isRewindNav()) {                                 // 565
                    t.sliderActive = t.blocksOn.length - t.cols;       // 566
                } else {                                               //
                    return;                                            // 568
                }                                                      //
            } else {                                                   //
                if (t.options.scrollByPage) {                          // 571
                    t.sliderActive = Math.max(0, t.sliderActive - t.cols);
                } else {                                               //
                    t.sliderActive -= 1;                               // 574
                }                                                      //
            }                                                          //
                                                                       //
            t._goToSlider();                                           // 578
        },                                                             //
                                                                       //
        _jumpToSlider: function (el) {                                 // 581
            var t = this,                                              // 582
                index = Math.min(el.index() * t.cols, t.blocksOn.length - t.cols);
                                                                       //
            if (index === t.sliderActive) {                            // 585
                return;                                                // 586
            }                                                          //
                                                                       //
            t.sliderActive = index;                                    // 589
                                                                       //
            t._goToSlider();                                           // 591
        },                                                             //
                                                                       //
        _jumpDragToSlider: function (pos) {                            // 594
            var t = this,                                              // 595
                jumpWidth,                                             //
                offset,                                                //
                condition,                                             //
                index,                                                 //
                dragLeft = pos > 0 ? true : false;                     //
                                                                       //
            if (t.options.scrollByPage) {                              // 602
                jumpWidth = t.cols * t.localColumnWidth;               // 603
                offset = t.cols;                                       // 604
            } else {                                                   //
                jumpWidth = t.localColumnWidth;                        // 606
                offset = 1;                                            // 607
            }                                                          //
                                                                       //
            pos = Math.abs(pos);                                       // 610
            index = Math.floor(pos / jumpWidth) * offset;              // 611
            if (pos % jumpWidth > 20) {                                // 612
                index += offset;                                       // 613
            }                                                          //
                                                                       //
            if (dragLeft) {                                            // 616
                // drag to left                                        //
                t.sliderActive = Math.min(t.sliderActive + index, t.blocksOn.length - t.cols);
            } else {                                                   //
                // drag to right                                       //
                t.sliderActive = Math.max(0, t.sliderActive - index);  // 619
            }                                                          //
                                                                       //
            t._goToSlider();                                           // 622
        },                                                             //
                                                                       //
        _isStartSlider: function () {                                  // 625
            return this.sliderActive === 0;                            // 626
        },                                                             //
                                                                       //
        _isEndSlider: function () {                                    // 629
            var t = this;                                              // 630
            return t.sliderActive + t.cols > t.blocksOn.length - 1;    // 631
        },                                                             //
                                                                       //
        _goToSlider: function () {                                     // 634
            var t = this;                                              // 635
                                                                       //
            // enable disable the nav                                  //
            t._enableDisableNavSlider();                               // 638
                                                                       //
            t._updateSliderPosition();                                 // 640
        },                                                             //
                                                                       //
        _startSliderAuto: function () {                                // 644
            var t = this;                                              // 645
                                                                       //
            if (t.isDrag) {                                            // 647
                t._stopSliderAuto();                                   // 648
                return;                                                // 649
            }                                                          //
                                                                       //
            t.timeout = setTimeout(function () {                       // 652
                                                                       //
                // go to next slide                                    //
                t._nextSlider();                                       // 655
                                                                       //
                // start auto                                          //
                t._startSliderAuto();                                  // 658
            }, t.options.autoTimeout);                                 //
        },                                                             //
                                                                       //
        _stopSliderAuto: function () {                                 // 663
            clearTimeout(this.timeout);                                // 664
        },                                                             //
                                                                       //
        _enableDisableNavSlider: function () {                         // 667
            var t = this,                                              // 668
                page,                                                  //
                method;                                                //
                                                                       //
            if (!t.isRewindNav()) {                                    // 672
                method = t._isStartSlider() ? 'addClass' : 'removeClass';
                t.navPrev[method]('cbp-nav-stop');                     // 674
                                                                       //
                method = t._isEndSlider() ? 'addClass' : 'removeClass';
                t.navNext[method]('cbp-nav-stop');                     // 677
            }                                                          //
                                                                       //
            if (t.options.showPagination) {                            // 680
                                                                       //
                if (t.options.scrollByPage) {                          // 682
                    page = Math.ceil(t.sliderActive / t.cols);         // 683
                } else {                                               //
                    if (t._isEndSlider()) {                            // 685
                        page = t.navPaginationItems.length - 1;        // 686
                    } else {                                           //
                        page = Math.floor(t.sliderActive / t.cols);    // 688
                    }                                                  //
                }                                                      //
                                                                       //
                // add class active on pagination's items              //
                t.navPaginationItems.removeClass('cbp-nav-pagination-active').eq(page).addClass('cbp-nav-pagination-active');
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * If slider loop is enabled don't add classes to `next` and `prev` buttons
         */                                                            //
        isRewindNav: function () {                                     // 703
            var t = this;                                              // 704
                                                                       //
            if (!t.options.showNavigation) {                           // 706
                return true;                                           // 707
            }                                                          //
                                                                       //
            if (t.blocksOn.length <= t.cols) {                         // 710
                return false;                                          // 711
            }                                                          //
                                                                       //
            if (t.options.rewindNav) {                                 // 714
                return true;                                           // 715
            }                                                          //
                                                                       //
            return false;                                              // 718
        },                                                             //
                                                                       //
        sliderItemsLength: function () {                               // 721
            return this.blocksOn.length <= this.cols;                  // 722
        },                                                             //
                                                                       //
        /**                                                            //
         * Arrange the items in a slider layout                        //
         */                                                            //
        _sliderLayout: function () {                                   // 729
            var t = this;                                              // 730
                                                                       //
            t.blocksOn.each(function (index, el) {                     // 732
                var data = $(el).data('cbp');                          // 733
                                                                       //
                // update the values with the new ones                 //
                data.leftNew = Math.round(t.localColumnWidth * index);
                data.topNew = 0;                                       // 737
                                                                       //
                t.colVert.push(data.height + t.options.gapHorizontal);
            });                                                        //
                                                                       //
            t.sliderColVert = t.colVert.slice(t.sliderActive, t.sliderActive + t.cols);
                                                                       //
            t.ulWidth = t.localColumnWidth * t.blocksOn.length - t.options.gapVertical;
            t.$ul.width(t.ulWidth);                                    // 745
        },                                                             //
                                                                       //
        _updateSliderPosition: function () {                           // 749
            var t = this,                                              // 750
                value = -t.sliderActive * t.localColumnWidth;          //
                                                                       //
            t._triggerEvent('updateSliderPosition');                   // 753
                                                                       //
            if (CubePortfolio.Private.modernBrowser) {                 // 755
                t.$ul[0].style[CubePortfolio.Private.transform] = 'translate3d(' + value + 'px, 0px, 0)';
            } else {                                                   //
                t.$ul[0].style.left = value + 'px';                    // 758
            }                                                          //
                                                                       //
            t.sliderColVert = t.colVert.slice(t.sliderActive, t.sliderActive + t.cols);
                                                                       //
            t._resizeMainContainer();                                  // 763
        },                                                             //
                                                                       //
        _dragSlider: function () {                                     // 767
            var t = this,                                              // 768
                $document = $(document),                               //
                posInitial,                                            //
                pos,                                                   //
                target,                                                //
                ulPosition,                                            //
                ulMaxWidth,                                            //
                isAnimating = false,                                   //
                events = {},                                           //
                isTouch = false,                                       //
                touchStartEvent,                                       //
                isHover = false;                                       //
                                                                       //
            t.isDrag = false;                                          // 781
                                                                       //
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
                                                                       //
                events = {                                             // 787
                    start: 'touchstart.cbp',                           // 788
                    move: 'touchmove.cbp',                             // 789
                    end: 'touchend.cbp'                                // 790
                };                                                     //
                                                                       //
                isTouch = true;                                        // 793
            } else {                                                   //
                events = {                                             // 795
                    start: 'mousedown.cbp',                            // 796
                    move: 'mousemove.cbp',                             // 797
                    end: 'mouseup.cbp'                                 // 798
                };                                                     //
            }                                                          //
                                                                       //
            function dragStart(e) {                                    // 802
                if (t.sliderItemsLength()) {                           // 803
                    return;                                            // 804
                }                                                      //
                                                                       //
                if (!isTouch) {                                        // 807
                    e.preventDefault();                                // 808
                } else {                                               //
                    touchStartEvent = e;                               // 810
                }                                                      //
                                                                       //
                if (t.options.auto) {                                  // 813
                    t._stopSliderAuto();                               // 814
                }                                                      //
                                                                       //
                if (isAnimating) {                                     // 817
                    $(target).one('click.cbp', function () {           // 818
                        return false;                                  // 819
                    });                                                //
                    return;                                            // 821
                }                                                      //
                                                                       //
                target = $(e.target);                                  // 824
                posInitial = pointerEventToXY(e).x;                    // 825
                pos = 0;                                               // 826
                ulPosition = -t.sliderActive * t.localColumnWidth;     // 827
                ulMaxWidth = t.localColumnWidth * (t.blocksOn.length - t.cols);
                                                                       //
                $document.on(events.move, dragMove);                   // 830
                $document.on(events.end, dragEnd);                     // 831
                                                                       //
                t.$obj.addClass('cbp-mode-slider-dragStart');          // 833
            }                                                          //
                                                                       //
            function dragEnd(e) {                                      // 836
                t.$obj.removeClass('cbp-mode-slider-dragStart');       // 837
                                                                       //
                // put the state to animate                            //
                isAnimating = true;                                    // 840
                                                                       //
                if (pos !== 0) {                                       // 842
                    target.one('click.cbp', function () {              // 843
                        return false;                                  // 844
                    });                                                //
                                                                       //
                    t._jumpDragToSlider(pos);                          // 847
                                                                       //
                    t.$ul.one(CubePortfolio.Private.transitionend, afterDragEnd);
                } else {                                               //
                    afterDragEnd.call(t);                              // 851
                }                                                      //
                                                                       //
                $document.off(events.move);                            // 854
                $document.off(events.end);                             // 855
            }                                                          //
                                                                       //
            function dragMove(e) {                                     // 858
                pos = posInitial - pointerEventToXY(e).x;              // 859
                                                                       //
                if (pos > 8 || pos < -8) {                             // 861
                    e.preventDefault();                                // 862
                }                                                      //
                                                                       //
                t.isDrag = true;                                       // 865
                                                                       //
                var value = ulPosition - pos;                          // 867
                                                                       //
                if (pos < 0 && pos < ulPosition) {                     // 869
                    // to right                                        //
                    value = (ulPosition - pos) / 5;                    // 870
                } else if (pos > 0 && ulPosition - pos < -ulMaxWidth) {
                    // to left                                         //
                    value = -ulMaxWidth + (ulMaxWidth + ulPosition - pos) / 5;
                }                                                      //
                                                                       //
                if (CubePortfolio.Private.modernBrowser) {             // 875
                    t.$ul[0].style[CubePortfolio.Private.transform] = 'translate3d(' + value + 'px, 0px, 0)';
                } else {                                               //
                    t.$ul[0].style.left = value + 'px';                // 878
                }                                                      //
            }                                                          //
                                                                       //
            function afterDragEnd() {                                  // 883
                isAnimating = false;                                   // 884
                t.isDrag = false;                                      // 885
                                                                       //
                if (t.options.auto) {                                  // 887
                                                                       //
                    if (t.mouseIsEntered) {                            // 889
                        return;                                        // 890
                    }                                                  //
                                                                       //
                    t._startSliderAuto();                              // 893
                }                                                      //
            }                                                          //
                                                                       //
            function pointerEventToXY(e) {                             // 898
                                                                       //
                if (e.originalEvent !== undefined && e.originalEvent.touches !== undefined) {
                    e = e.originalEvent.touches[0];                    // 901
                }                                                      //
                                                                       //
                return {                                               // 904
                    x: e.pageX,                                        // 905
                    y: e.pageY                                         // 906
                };                                                     //
            }                                                          //
                                                                       //
            t.$ul.on(events.start, dragStart);                         // 910
        },                                                             //
                                                                       //
        /**                                                            //
         * Reset the slider layout                                     //
         */                                                            //
        _sliderLayoutReset: function () {                              // 918
            var t = this;                                              // 919
            t.colVert = [];                                            // 920
        },                                                             //
                                                                       //
        // create mark                                                 //
        _gridMarkup: function () {},                                   // 924
                                                                       //
        /**                                                            //
         * Arrange the items in a grid layout                          //
         */                                                            //
        _gridLayout: function () {                                     // 931
            var t = this;                                              // 932
                                                                       //
            t.blocksOn.each(function (index, el) {                     // 934
                var minVert = Math.min.apply(Math, t.colVert),         // 935
                    column = 0,                                        //
                    data = $(el).data('cbp'),                          //
                    setHeight,                                         //
                    colsLen,                                           //
                    i,                                                 //
                    len;                                               //
                                                                       //
                for (i = 0, len = t.colVert.length; i < len; i++) {    // 943
                    if (t.colVert[i] === minVert) {                    // 944
                        column = i;                                    // 945
                        break;                                         // 946
                    }                                                  //
                }                                                      //
                                                                       //
                // update the values with the new ones                 //
                data.leftNew = Math.round(t.localColumnWidth * column);
                data.topNew = Math.round(minVert);                     // 952
                                                                       //
                setHeight = minVert + data.height + t.options.gapHorizontal;
                colsLen = t.cols + 1 - len;                            // 955
                                                                       //
                for (i = 0; i < colsLen; i++) {                        // 957
                    t.colVert[column + i] = setHeight;                 // 958
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        /**                                                            //
         * Reset the grid layout                                       //
         */                                                            //
        _gridLayoutReset: function () {                                // 968
            var c,                                                     // 969
                t = this;                                              //
                                                                       //
            // @options gridAdjustment = alignCenter                   //
            if (t.options.gridAdjustment === 'alignCenter') {          // 972
                                                                       //
                // calculate numbers of columns                        //
                t.cols = Math.max(Math.floor((t.width + t.options.gapVertical) / t.localColumnWidth), 1);
                                                                       //
                t.width = t.cols * t.localColumnWidth - t.options.gapVertical;
                t.$obj.css('max-width', t.width);                      // 978
            } else {                                                   //
                                                                       //
                // calculate numbers of columns                        //
                t.cols = Math.max(Math.floor((t.width + t.options.gapVertical) / t.localColumnWidth), 1);
            }                                                          //
                                                                       //
            t.colVert = [];                                            // 987
            c = t.cols;                                                // 988
                                                                       //
            while (c--) {                                              // 990
                t.colVert.push(0);                                     // 991
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Make this plugin responsive                                 //
         */                                                            //
        _responsiveLayout: function () {                               // 998
            var t = this,                                              // 999
                widthWithoutGap,                                       //
                itemWidth;                                             //
                                                                       //
            if (!t.columnWidthCache) {                                 // 1003
                t.columnWidthCache = t.localColumnWidth;               // 1004
            } else {                                                   //
                t.localColumnWidth = t.columnWidthCache;               // 1006
            }                                                          //
                                                                       //
            // calculate numbers of cols                               //
            t.cols = t[t.getColumnsType]();                            // 1010
                                                                       //
            // calculate the with of items without the gaps between them
            widthWithoutGap = t.width - t.options.gapVertical * (t.cols - 1);
                                                                       //
            // calculate column with based on widthWithoutGap plus the gap
            t.localColumnWidth = parseInt(widthWithoutGap / t.cols, 10) + t.options.gapVertical;
                                                                       //
            itemWidth = t.localColumnWidth - t.options.gapVertical;    // 1018
                                                                       //
            t.blocks.each(function (index, item) {                     // 1020
                item.style.width = itemWidth + 'px';                   // 1021
                                                                       //
                $(item).data('cbp').width = itemWidth;                 // 1023
            });                                                        //
                                                                       //
            t.blocks.each(function (index, el) {                       // 1026
                var item = $(el);                                      // 1027
                                                                       //
                item.data('cbp').height = item.outerHeight();          // 1029
            });                                                        //
        },                                                             //
                                                                       //
        /**                                                            //
         * Get numbers of columns when t.options.mediaQueries is not an array
         */                                                            //
        _getColumnsAuto: function () {                                 // 1038
            var t = this;                                              // 1039
            return Math.max(Math.round(t.width / t.localColumnWidth), 1);
        },                                                             //
                                                                       //
        /**                                                            //
         * Get numbers of columns where t.options.mediaQueries is an array
         */                                                            //
        _getColumnsBreakpoints: function () {                          // 1046
            var t = this,                                              // 1047
                gridWidth = t.width - t.options.gapVertical,           //
                cols;                                                  //
                                                                       //
            $.each(t.options.mediaQueries, function (index, val) {     // 1051
                if (gridWidth >= val.width) {                          // 1052
                    cols = val.cols;                                   // 1053
                    return false;                                      // 1054
                }                                                      //
            });                                                        //
                                                                       //
            if (cols === undefined) {                                  // 1058
                cols = t.options.mediaQueries[t.options.mediaQueries.length - 1].cols;
            }                                                          //
                                                                       //
            return cols;                                               // 1062
        },                                                             //
                                                                       //
        /**                                                            //
         * Resize main container vertically                            //
         */                                                            //
        _resizeMainContainer: function () {                            // 1069
            var t = this,                                              // 1070
                cols = t.sliderColVert || t.colVert,                   //
                height;                                                //
                                                                       //
            // set container height for `overflow: hidden` to be applied
            height = Math.max(Math.max.apply(Math, cols) - t.options.gapHorizontal, 0);
                                                                       //
            if (height === t.height) {                                 // 1077
                return;                                                // 1078
            }                                                          //
                                                                       //
            t.obj.style.height = height + 'px';                        // 1081
                                                                       //
            // if _resizeMainContainer is called for the first time skip this event trigger
            if (t.height !== undefined) {                              // 1084
                if (CubePortfolio.Private.modernBrowser) {             // 1085
                    t.$obj.one(CubePortfolio.Private.transitionend, function () {
                        t.$obj.trigger('pluginResize.cbp');            // 1087
                    });                                                //
                } else {                                               //
                    t.$obj.trigger('pluginResize.cbp');                // 1090
                }                                                      //
            }                                                          //
                                                                       //
            t.height = height;                                         // 1094
        },                                                             //
                                                                       //
        _filter: function (filterName) {                               // 1097
            var t = this;                                              // 1098
                                                                       //
            // blocks that are visible before applying the filter      //
            t.blocksOnInitial = t.blocksOn;                            // 1101
                                                                       //
            // blocks visible after applying the filter                //
            t.blocksOn = t.blocks.filter(filterName);                  // 1104
                                                                       //
            // blocks off after applying the filter                    //
            t.blocksOff = t.blocks.not(filterName);                    // 1107
                                                                       //
            // call layout                                             //
            t._layout();                                               // 1110
                                                                       //
            // filter call layout                                      //
            t.filterLayout(filterName);                                // 1113
        },                                                             //
                                                                       //
        /**                                                            //
         *  Default filter layout if nothing overrides                 //
         */                                                            //
        filterLayout: function (filterName) {                          // 1120
            var t = this;                                              // 1121
                                                                       //
            t.blocksOff.addClass('cbp-item-off');                      // 1123
                                                                       //
            t.blocksOn.removeClass('cbp-item-off').each(function (index, el) {
                var data = $(el).data('cbp');                          // 1127
                                                                       //
                data.left = data.leftNew;                              // 1129
                data.top = data.topNew;                                // 1130
                                                                       //
                el.style.left = data.left + 'px';                      // 1132
                el.style.top = data.top + 'px';                        // 1133
            });                                                        //
                                                                       //
            // resize main container height                            //
            t._resizeMainContainer();                                  // 1137
                                                                       //
            t.filterFinish();                                          // 1139
        },                                                             //
                                                                       //
        /**                                                            //
         *  Trigger when a filter is finished                          //
         */                                                            //
        filterFinish: function () {                                    // 1146
            var t = this;                                              // 1147
                                                                       //
            t.isAnimating = false;                                     // 1149
                                                                       //
            t.$obj.trigger('filterComplete.cbp');                      // 1151
            t._triggerEvent('filterFinish');                           // 1152
        },                                                             //
                                                                       //
        /**                                                            //
         *  Register event                                             //
         */                                                            //
        _registerEvent: function (name, callbackFunction, oneTime) {   // 1159
            var t = this;                                              // 1160
                                                                       //
            if (!t.registeredEvents[name]) {                           // 1162
                t.registeredEvents[name] = [];                         // 1163
            }                                                          //
                                                                       //
            t.registeredEvents[name].push({                            // 1166
                func: callbackFunction,                                // 1167
                oneTime: oneTime || false                              // 1168
            });                                                        //
        },                                                             //
                                                                       //
        /**                                                            //
         *  Trigger event                                              //
         */                                                            //
        _triggerEvent: function (name, param) {                        // 1176
            var t = this,                                              // 1177
                i,                                                     //
                len;                                                   //
                                                                       //
            if (t.skipEvents[name]) {                                  // 1180
                delete t.skipEvents[name];                             // 1181
                return;                                                // 1182
            }                                                          //
                                                                       //
            if (t.registeredEvents[name]) {                            // 1185
                for (i = 0, len = t.registeredEvents[name].length; i < len; i++) {
                                                                       //
                    t.registeredEvents[name][i].func.call(t, param);   // 1188
                                                                       //
                    if (t.registeredEvents[name][i].oneTime) {         // 1190
                        t.registeredEvents[name].splice(i, 1);         // 1191
                        // function splice change the t.registeredEvents[name] array
                        // if event is one time you must set the i to the same value
                        // next time and set the length lower          //
                        i--;                                           // 1195
                        len--;                                         // 1196
                    }                                                  //
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         *  Delay trigger event                                        //
         */                                                            //
        _skipNextEvent: function (name) {                              // 1208
            var t = this;                                              // 1209
            t.skipEvents[name] = true;                                 // 1210
        },                                                             //
                                                                       //
        _addItems: function (els, callback) {                          // 1213
            var t = this,                                              // 1214
                items = $(els).filter('.cbp-item').addClass('cbp-loading-fadeIn').css('top', '1000%').wrapInner('<div class="cbp-item-wrapper"></div>');
                                                                       //
            if (!items.length) {                                       // 1221
                t.isAnimating = false;                                 // 1222
                                                                       //
                if ($.isFunction(callback)) {                          // 1224
                    callback.call(t);                                  // 1225
                }                                                      //
                return;                                                // 1227
            }                                                          //
                                                                       //
            t._load(items, function () {                               // 1230
                                                                       //
                t.$obj.addClass('cbp-addItems');                       // 1232
                                                                       //
                items.appendTo(t.$ul);                                 // 1234
                                                                       //
                // cache the new items to t.blocks                     //
                $.merge(t.blocks, items);                              // 1237
                                                                       //
                // push to data some values of items                   //
                t.storeData(items);                                    // 1240
                                                                       //
                if (t.defaultFilter !== '*') {                         // 1242
                    t.blocksOn = t.blocks.filter(t.defaultFilter);     // 1243
                    t.blocks.not(t.defaultFilter).addClass('cbp-item-off');
                } else {                                               //
                    t.blocksOn = t.blocks;                             // 1246
                }                                                      //
                                                                       //
                items.on(CubePortfolio.Private.animationend, function () {
                    t.$obj.find('.cbp-loading-fadeIn').removeClass('cbp-loading-fadeIn');
                    t.$obj.removeClass('cbp-addItems');                // 1251
                });                                                    //
                                                                       //
                t._triggerEvent('addItemsToDOM', items);               // 1254
                                                                       //
                t._gridAdjust();                                       // 1256
                                                                       //
                t._layout();                                           // 1258
                                                                       //
                t.positionateItems();                                  // 1260
                                                                       //
                // resize main container height                        //
                t._resizeMainContainer();                              // 1263
                                                                       //
                if (t.options.layoutMode === 'slider') {               // 1265
                    t._updateSlider();                                 // 1266
                }                                                      //
                                                                       //
                // if show count was actived, call show count function again
                if (t.elems) {                                         // 1270
                    CubePortfolio.Public.showCounter.call(t.obj, t.elems);
                }                                                      //
                                                                       //
                if (CubePortfolio.Private.modernBrowser) {             // 1274
                    items.last().one(CubePortfolio.Private.animationend, function () {
                        t.isAnimating = false;                         // 1276
                                                                       //
                        if ($.isFunction(callback)) {                  // 1278
                            callback.call(t);                          // 1279
                        }                                              //
                    });                                                //
                } else {                                               //
                    t.isAnimating = false;                             // 1283
                                                                       //
                    if ($.isFunction(callback)) {                      // 1285
                        callback.call(t);                              // 1286
                    }                                                  //
                }                                                      //
            });                                                        //
        }                                                              //
                                                                       //
    });                                                                //
                                                                       //
    /**                                                                //
     * jQuery plugin initializer                                       //
     */                                                                //
    $.fn.cubeportfolio = function (method, options, callback) {        // 1301
                                                                       //
        return this.each(function () {                                 // 1303
                                                                       //
            if (typeof method === 'object' || !method) {               // 1305
                return CubePortfolio.Public.init.call(this, method, callback);
            } else if (CubePortfolio.Public[method]) {                 //
                return CubePortfolio.Public[method].call(this, options, callback);
            }                                                          //
                                                                       //
            throw new Error('Method ' + method + ' does not exist on jquery.cubeportfolio.js');
        });                                                            //
    };                                                                 //
                                                                       //
    // Plugin default options                                          //
    $.fn.cubeportfolio.options = {                                     // 1318
        /**                                                            //
         *  Is used to define the wrapper for filters                  //
         *  Values: strings that represent the elements in the document (DOM selector).
         */                                                            //
        filters: '',                                                   // 1323
                                                                       //
        /**                                                            //
         *  Is used to define the wrapper for loadMore                 //
         *  Values: strings that represent the elements in the document (DOM selector).
         */                                                            //
        loadMore: '',                                                  // 1329
                                                                       //
        /**                                                            //
         *  How the loadMore functionality should behave. Load on click on the button or
         *  automatically when you scroll the page                     //
         *  Values: - click                                            //
         *          - auto                                             //
         */                                                            //
        loadMoreAction: 'click',                                       // 1337
                                                                       //
        /**                                                            //
         *  Layout Mode for this instance                              //
         *  Values: 'grid' or 'slider'                                 //
         */                                                            //
        layoutMode: 'grid',                                            // 1343
                                                                       //
        /**                                                            //
         *  Mouse and touch drag support                               //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        drag: true,                                                    // 1350
                                                                       //
        /**                                                            //
         *  Autoplay the slider                                        //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        auto: false,                                                   // 1357
                                                                       //
        /**                                                            //
         *  Autoplay interval timeout. Time is set in milisecconds     //
         *  1000 milliseconds equals 1 second.                         //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: only integers (ex: 1000, 2000, 5000)               //
         */                                                            //
        autoTimeout: 5000,                                             // 1365
                                                                       //
        /**                                                            //
         *  Stops autoplay when user hover the slider                  //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        autoPauseOnHover: true,                                        // 1372
                                                                       //
        /**                                                            //
         *  Show `next` and `prev` buttons for slider                  //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        showNavigation: true,                                          // 1379
                                                                       //
        /**                                                            //
         *  Show pagination for slider                                 //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        showPagination: true,                                          // 1386
                                                                       //
        /**                                                            //
         *  Enable slide to first item (last item)                     //
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        rewindNav: true,                                               // 1393
                                                                       //
        /**                                                            //
         *  Scroll by page and not by item. This option affect next/prev buttons and drag support
         *  Option available only for `layoutMode: 'slider'`           //
         *  Values: true or false                                      //
         */                                                            //
        scrollByPage: false,                                           // 1400
                                                                       //
        /**                                                            //
         *  Default filter for plugin                                  //
         *  Option available only for `layoutMode: 'grid'`             //
         *  Values: strings that represent the filter name(ex: *, .logo, .web-design, .design)
         */                                                            //
        defaultFilter: '*',                                            // 1407
                                                                       //
        /**                                                            //
         *  Enable / disable the deeplinking feature when you click on filters
         *  Option available only for `layoutMode: 'grid'`             //
         *  Values: true or false                                      //
         */                                                            //
        filterDeeplinking: false,                                      // 1414
                                                                       //
        /**                                                            //
         *  Defines which animation to use for items that will be shown or hidden after a filter has been activated.
         *  Option available only for `layoutMode: 'grid'`             //
         *  The plugin use the best browser features available (css3 transitions and transform, GPU acceleration).
         *  Values: - fadeOut                                          //
         *          - quicksand                                        //
         *          - bounceLeft                                       //
         *          - bounceTop                                        //
         *          - bounceBottom                                     //
         *          - moveLeft                                         //
         *          - slideLeft                                        //
         *          - fadeOutTop                                       //
         *          - sequentially                                     //
         *          - skew                                             //
         *          - slideDelay                                       //
         *          - rotateSides                                      //
         *          - flipOutDelay                                     //
         *          - flipOut                                          //
         *          - unfold                                           //
         *          - foldLeft                                         //
         *          - scaleDown                                        //
         *          - scaleSides                                       //
         *          - frontRow                                         //
         *          - flipBottom                                       //
         *          - rotateRoom                                       //
         */                                                            //
        animationType: 'fadeOut',                                      // 1442
                                                                       //
        /**                                                            //
         *  Adjust the layout grid                                     //
         *  Values: - default (no adjustment applied)                  //
         *          - alignCenter (align the grid on center of the page)
         *          - responsive (use a fluid grid to resize the grid)
         */                                                            //
        gridAdjustment: 'responsive',                                  // 1450
                                                                       //
        /**                                                            //
         * Define `media queries` for columns layout.                  //
         * Format: [{width: a, cols: d}, {width: b, cols: e}, {width: c, cols: f}],
         * where a, b, c are the grid width and d, e, f are the columns displayed.
         * e.g. [{width: 1100, cols: 4}, {width: 800, cols: 3}, {width: 480, cols: 2}] means
         * if (gridWidth >= 1100) => show 4 columns,                   //
         * if (gridWidth >= 800 && gridWidth < 1100) => show 3 columns,
         * if (gridWidth >= 480 && gridWidth < 800) => show 2 columns,
         * if (gridWidth < 480) => show 2 columns                      //
         * Keep in mind that a > b > c                                 //
         * This option is available only when `gridAdjustment: 'responsive'`
         * Values:  - array of objects of format: [{width: a, cols: d}, {width: b, cols: e}]
         *          - you can define as many objects as you want       //
         *          - if this option is `false` Cube Portfolio will adjust the items
         *            width automatically (default option for backward compatibility)
         */                                                            //
        mediaQueries: false,                                           // 1468
                                                                       //
        /**                                                            //
         *  Horizontal gap between items                               //
         *  Values: only integers (ex: 1, 5, 10)                       //
         */                                                            //
        gapHorizontal: 10,                                             // 1474
                                                                       //
        /**                                                            //
         *  Vertical gap between items                                 //
         *  Values: only integers (ex: 1, 5, 10)                       //
         */                                                            //
        gapVertical: 10,                                               // 1480
                                                                       //
        /**                                                            //
         *  Caption - the overlay that is shown when you put the mouse over an item
         *  NOTE: If you don't want to have captions set this option to an empty string ( caption: '')
         *  Values: - pushTop                                          //
         *          - pushDown                                         //
         *          - revealBottom                                     //
         *          - revealTop                                        //
         *          - moveRight                                        //
         *          - moveLeft                                         //
         *          - overlayBottomPush                                //
         *          - overlayBottom                                    //
         *          - overlayBottomReveal                              //
         *          - overlayBottomAlong                               //
         *          - overlayRightAlong                                //
         *          - minimal                                          //
         *          - fadeIn                                           //
         *          - zoom                                             //
         *          - opacity                                          //
         */                                                            //
        caption: 'pushTop',                                            // 1501
                                                                       //
        /**                                                            //
         *  The plugin will display his content based on the following values.
         *  Values: - default (the content will be displayed as soon as possible)
         *          - lazyLoading (the plugin will fully preload the images before displaying the items with a fadeIn effect)
         *          - fadeInToTop (the plugin will fully preload the images before displaying the items with a fadeIn effect from bottom to top)
         *          - sequentially (the plugin will fully preload the images before displaying the items with a sequentially effect)
         *          - bottomToTop (the plugin will fully preload the images before displaying the items with an animation from bottom to top)
         */                                                            //
        displayType: 'lazyLoading',                                    // 1511
                                                                       //
        /**                                                            //
         *  Defines the speed of displaying the items (when `displayType == default` this option will have no effect)
         *  Values: only integers, values in ms (ex: 200, 300, 500)    //
         */                                                            //
        displayTypeSpeed: 400,                                         // 1517
                                                                       //
        /**                                                            //
         *  This is used to define any clickable elements you wish to use to trigger lightbox popup on click.
         *  Values: strings that represent the elements in the document (DOM selector)
         */                                                            //
        lightboxDelegate: '.cbp-lightbox',                             // 1523
                                                                       //
        /**                                                            //
         *  Enable / disable gallery mode                              //
         *  Values: true or false                                      //
         */                                                            //
        lightboxGallery: true,                                         // 1529
                                                                       //
        /**                                                            //
         *  Attribute of the delegate item that contains caption for lightbox
         *  Values: html atributte                                     //
         */                                                            //
        lightboxTitleSrc: 'data-title',                                // 1535
                                                                       //
        /**                                                            //
         *  Markup of the lightbox counter                             //
         *  Values: html markup                                        //
         */                                                            //
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
                                                                       //
        /**                                                            //
         *  This is used to define any clickable elements you wish to use to trigger singlePage popup on click.
         *  Values: strings that represent the elements in the document (DOM selector)
         */                                                            //
        singlePageDelegate: '.cbp-singlePage',                         // 1547
                                                                       //
        /**                                                            //
         *  Enable / disable the deeplinking feature for singlePage popup
         *  Values: true or false                                      //
         */                                                            //
        singlePageDeeplinking: true,                                   // 1553
                                                                       //
        /**                                                            //
         *  Enable / disable the sticky navigation for singlePage popup
         *  Values: true or false                                      //
         */                                                            //
        singlePageStickyNavigation: true,                              // 1559
                                                                       //
        /**                                                            //
         *  Markup of the singlePage counter                           //
         *  Values: html markup                                        //
         */                                                            //
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
                                                                       //
        /**                                                            //
         *  Defines which animation to use when singlePage appear      //
         *  Values: - left                                             //
         *          - fade                                             //
         *          - right                                            //
         */                                                            //
        singlePageAnimation: 'left',                                   // 1573
                                                                       //
        /**                                                            //
         *  Use this callback to update singlePage content.            //
         *  The callback will trigger after the singlePage popup will open.
         *  @param url = the href attribute of the item clicked        //
         *  @param element = the item clicked                          //
         *  Values: function                                           //
         */                                                            //
        singlePageCallback: function (url, element) {                  // 1582
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
        },                                                             //
                                                                       //
        /**                                                            //
         *  This is used to define any clickable elements you wish to use to trigger singlePage Inline on click.
         *  Values: strings that represent the elements in the document (DOM selector)
         */                                                            //
        singlePageInlineDelegate: '.cbp-singlePageInline',             // 1590
                                                                       //
        /**                                                            //
         *  This is used to define the position of singlePage Inline block
         *  Values: - above ( above current element )                  //
         *          - below ( below current elemnet)                   //
         *          - top ( positon top )                              //
         *          - bottom ( positon bottom )                        //
         */                                                            //
        singlePageInlinePosition: 'top',                               // 1599
                                                                       //
        /**                                                            //
         *  Push the open panel in focus and at close go back to the former stage
         *  Values: true or false                                      //
         */                                                            //
        singlePageInlineInFocus: true,                                 // 1605
                                                                       //
        /**                                                            //
         *  Use this callback to update singlePage Inline content.     //
         *  The callback will trigger after the singlePage Inline will open.
         *  @param url = the href attribute of the item clicked        //
         *  @param element = the item clicked                          //
         *  Values: function                                           //
         */                                                            //
        singlePageInlineCallback: function (url, element) {            // 1614
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins = {};                                        // 1620
    $.fn.cubeportfolio.Constructor = CubePortfolio;                    // 1621
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 1625
    'use strict';                                                      // 1626
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 1628
                                                                       //
    function Filters(parent) {                                         // 1630
        var t = this;                                                  // 1631
                                                                       //
        t.parent = parent;                                             // 1633
                                                                       //
        t.filters = $(parent.options.filters);                         // 1635
                                                                       //
        t.wrap = $();                                                  // 1637
                                                                       //
        t.registerFilter();                                            // 1639
    }                                                                  //
                                                                       //
    Filters.prototype.registerFilter = function () {                   // 1643
        var t = this,                                                  // 1644
            parent = t.parent,                                         //
            filtersCallback;                                           //
                                                                       //
        t.filters.each(function (index, el) {                          // 1648
            var filter = $(el),                                        // 1649
                wrap;                                                  //
                                                                       //
            if (filter.hasClass('cbp-l-filters-dropdown')) {           // 1652
                wrap = filter.find('.cbp-l-filters-dropdownWrap');     // 1653
                                                                       //
                wrap.on({                                              // 1655
                    'mouseover.cbp': function () {                     // 1656
                        wrap.addClass('cbp-l-filters-dropdownWrap-open');
                    },                                                 //
                    'mouseleave.cbp': function () {                    // 1659
                        wrap.removeClass('cbp-l-filters-dropdownWrap-open');
                    }                                                  //
                });                                                    //
                                                                       //
                filtersCallback = function (me) {                      // 1664
                    wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
                    wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
                    me.addClass('cbp-filter-item-active');             // 1667
                    wrap.trigger('mouseleave.cbp');                    // 1668
                };                                                     //
                                                                       //
                t.wrap.add(wrap);                                      // 1671
            } else {                                                   //
                filtersCallback = function (me) {                      // 1674
                    me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
                };                                                     //
            }                                                          //
                                                                       //
            filtersCallback(filter.find('.cbp-filter-item').filter('[data-filter="' + parent.defaultFilter + '"]'));
                                                                       //
            filter.on('click.cbp', '.cbp-filter-item', function () {   // 1685
                var me = $(this);                                      // 1686
                                                                       //
                if (me.hasClass('cbp-filter-item-active')) {           // 1688
                    return;                                            // 1689
                }                                                      //
                                                                       //
                // get cubeportfolio data and check if is still animating (reposition) the items.
                if (!parent.isAnimating) {                             // 1693
                    filtersCallback.call(null, me);                    // 1694
                }                                                      //
                                                                       //
                // filter the items                                    //
                parent.$obj.cubeportfolio('filter', me.data('filter'));
            });                                                        //
                                                                       //
            // activate counter for filters                            //
            parent.$obj.cubeportfolio('showCounter', filter.find('.cbp-filter-item'), function () {
                // read from url and change filter active              //
                var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
                    item;                                              //
                if (match !== null) {                                  // 1706
                    item = filter.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
                    if (item.length) {                                 // 1708
                        filtersCallback.call(null, item);              // 1709
                    }                                                  //
                }                                                      //
            });                                                        //
        });                                                            //
    };                                                                 //
                                                                       //
    Filters.prototype.destroy = function () {                          // 1716
        var t = this;                                                  // 1717
                                                                       //
        t.filters.off('.cbp');                                         // 1719
        if (t.wrap) {                                                  // 1720
            t.wrap.off('.cbp');                                        // 1721
        }                                                              //
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.Filters = function (parent) {                // 1725
                                                                       //
        if (parent.options.filters === '') {                           // 1727
            return null;                                               // 1728
        }                                                              //
                                                                       //
        return new Filters(parent);                                    // 1731
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 1736
    'use strict';                                                      // 1737
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 1739
                                                                       //
    function LoadMore(parent) {                                        // 1741
        var t = this;                                                  // 1742
                                                                       //
        t.parent = parent;                                             // 1744
                                                                       //
        t.loadMore = $(parent.options.loadMore).find('.cbp-l-loadMore-link');
                                                                       //
        // load click or auto action                                   //
        if (parent.options.loadMoreAction.length) {                    // 1749
            t[parent.options.loadMoreAction]();                        // 1750
        }                                                              //
    }                                                                  //
                                                                       //
    LoadMore.prototype.click = function () {                           // 1755
        var t = this,                                                  // 1756
            numberOfClicks = 0;                                        //
                                                                       //
        t.loadMore.on('click.cbp', function (e) {                      // 1759
            var item = $(this);                                        // 1760
                                                                       //
            e.preventDefault();                                        // 1762
                                                                       //
            if (item.hasClass('cbp-l-loadMore-stop')) {                // 1764
                return;                                                // 1765
            }                                                          //
                                                                       //
            // set loading status                                      //
            item.addClass('cbp-l-loadMore-loading');                   // 1769
                                                                       //
            numberOfClicks++;                                          // 1771
                                                                       //
            // perform ajax request                                    //
            $.ajax({                                                   // 1774
                url: t.loadMore.attr('href'),                          // 1775
                type: 'GET',                                           // 1776
                dataType: 'HTML'                                       // 1777
            }).done(function (result) {                                //
                var items, itemsNext;                                  // 1779
                                                                       //
                // find current container                              //
                items = $(result).filter(function () {                 // 1782
                    return $(this).is('div' + '.cbp-loadMore-block' + numberOfClicks);
                });                                                    //
                                                                       //
                t.parent.$obj.cubeportfolio('appendItems', items.html(), function () {
                                                                       //
                    // put the original message back                   //
                    item.removeClass('cbp-l-loadMore-loading');        // 1789
                                                                       //
                    // check if we have more works                     //
                    itemsNext = $(result).filter(function () {         // 1792
                        return $(this).is('div' + '.cbp-loadMore-block' + (numberOfClicks + 1));
                    });                                                //
                                                                       //
                    if (itemsNext.length === 0) {                      // 1796
                        item.addClass('cbp-l-loadMore-stop');          // 1797
                    }                                                  //
                });                                                    //
            }).fail(function () {                                      //
                // error                                               //
            });                                                        //
        });                                                            //
    };                                                                 //
                                                                       //
    LoadMore.prototype.auto = function () {                            // 1809
        var t = this;                                                  // 1810
                                                                       //
        t.parent.$obj.on('initComplete.cbp', function () {             // 1812
            Object.create({                                            // 1813
                init: function () {                                    // 1814
                    var self = this;                                   // 1815
                                                                       //
                    // the job inactive                                //
                    self.isActive = false;                             // 1818
                                                                       //
                    self.numberOfClicks = 0;                           // 1820
                                                                       //
                    // set loading status                              //
                    t.loadMore.addClass('cbp-l-loadMore-loading');     // 1823
                                                                       //
                    // cache window selector                           //
                    self.window = $(window);                           // 1826
                                                                       //
                    // add events for scroll                           //
                    self.addEvents();                                  // 1829
                                                                       //
                    // trigger method on init                          //
                    self.getNewItems();                                // 1832
                },                                                     //
                                                                       //
                addEvents: function () {                               // 1835
                    var self = this,                                   // 1836
                        timeout;                                       //
                                                                       //
                    t.loadMore.on('click.cbp', function (e) {          // 1839
                        e.preventDefault();                            // 1840
                    });                                                //
                                                                       //
                    self.window.on('scroll.loadMoreObject', function () {
                                                                       //
                        clearTimeout(timeout);                         // 1845
                                                                       //
                        timeout = setTimeout(function () {             // 1847
                            if (!t.parent.isAnimating) {               // 1848
                                // get new items on scroll             //
                                self.getNewItems();                    // 1850
                            }                                          //
                        }, 80);                                        //
                    });                                                //
                                                                       //
                    // when the filter is completed                    //
                    t.parent.$obj.on('filterComplete.cbp', function () {
                        self.getNewItems();                            // 1858
                    });                                                //
                },                                                     //
                                                                       //
                getNewItems: function () {                             // 1862
                    var self = this,                                   // 1863
                        topLoadMore,                                   //
                        topWindow;                                     //
                                                                       //
                    if (self.isActive || t.loadMore.hasClass('cbp-l-loadMore-stop')) {
                        return;                                        // 1867
                    }                                                  //
                                                                       //
                    topLoadMore = t.loadMore.offset().top;             // 1870
                    topWindow = self.window.scrollTop() + self.window.height();
                                                                       //
                    if (topLoadMore > topWindow) {                     // 1873
                        return;                                        // 1874
                    }                                                  //
                                                                       //
                    // this job is now busy                            //
                    self.isActive = true;                              // 1878
                                                                       //
                    // increment number of clicks                      //
                    self.numberOfClicks++;                             // 1881
                                                                       //
                    // perform ajax request                            //
                    $.ajax({                                           // 1884
                        url: t.loadMore.attr('href'),                  // 1885
                        type: 'GET',                                   // 1886
                        dataType: 'HTML',                              // 1887
                        cache: true                                    // 1888
                    }).done(function (result) {                        //
                        var items, itemsNext;                          // 1891
                                                                       //
                        // find current container                      //
                        items = $(result).filter(function () {         // 1894
                            return $(this).is('div' + '.cbp-loadMore-block' + self.numberOfClicks);
                        });                                            //
                                                                       //
                        t.parent.$obj.cubeportfolio('appendItems', items.html(), function () {
                            // check if we have more works             //
                            itemsNext = $(result).filter(function () {
                                return $(this).is('div' + '.cbp-loadMore-block' + (self.numberOfClicks + 1));
                            });                                        //
                                                                       //
                            if (itemsNext.length === 0) {              // 1904
                                t.loadMore.addClass('cbp-l-loadMore-stop');
                                                                       //
                                // remove events                       //
                                self.window.off('scroll.loadMoreObject');
                                t.parent.$obj.off('filterComplete.cbp');
                            } else {                                   //
                                // make the job inactive               //
                                self.isActive = false;                 // 1912
                                                                       //
                                self.window.trigger('scroll.loadMoreObject');
                            }                                          //
                        });                                            //
                    }).fail(function () {                              //
                        // make the job inactive                       //
                        self.isActive = false;                         // 1920
                    });                                                //
                }                                                      //
            }).init();                                                 //
        });                                                            //
    };                                                                 //
                                                                       //
    LoadMore.prototype.destroy = function () {                         // 1929
        var t = this;                                                  // 1930
                                                                       //
        t.loadMore.off('.cbp');                                        // 1932
                                                                       //
        $(window).off('scroll.loadMoreObject');                        // 1934
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.LoadMore = function (parent) {               // 1937
                                                                       //
        if (parent.options.loadMore === '') {                          // 1939
            return null;                                               // 1940
        }                                                              //
                                                                       //
        return new LoadMore(parent);                                   // 1943
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 1948
    'use strict';                                                      // 1949
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 1951
                                                                       //
    var popup = {                                                      // 1953
                                                                       //
        /**                                                            //
         * init function for popup                                     //
         * @param cubeportfolio = cubeportfolio instance               //
         * @param type =  'lightbox' or 'singlePage'                   //
         */                                                            //
        init: function (cubeportfolio, type) {                         // 1960
            var t = this,                                              // 1961
                currentBlock;                                          //
                                                                       //
            // remember cubeportfolio instance                         //
            t.cubeportfolio = cubeportfolio;                           // 1965
                                                                       //
            // remember if this instance is for lightbox or for singlePage
            t.type = type;                                             // 1968
                                                                       //
            // remember if the popup is open or not                    //
            t.isOpen = false;                                          // 1971
                                                                       //
            t.options = t.cubeportfolio.options;                       // 1973
                                                                       //
            if (type === 'lightbox') {                                 // 1975
                t.cubeportfolio._registerEvent('resizeWindow', function () {
                    t.resizeImage();                                   // 1977
                });                                                    //
            }                                                          //
                                                                       //
            if (type === 'singlePageInline') {                         // 1981
                                                                       //
                t.startInline = -1;                                    // 1983
                                                                       //
                t.height = 0;                                          // 1985
                                                                       //
                // create markup, css and add events for SinglePageInline
                t._createMarkupSinglePageInline();                     // 1988
                                                                       //
                t.cubeportfolio._registerEvent('resizeGrid', function () {
                    if (t.isOpen) {                                    // 1991
                        // @todo must add support for this features in the future
                        t.close(); // workaround                       // 1993
                    }                                                  //
                });                                                    //
                                                                       //
                return;                                                // 1997
            }                                                          //
                                                                       //
            // create markup, css and add events for lightbox and singlePage
            t._createMarkup();                                         // 2001
                                                                       //
            if (type === 'singlePage') {                               // 2003
                                                                       //
                t.cubeportfolio._registerEvent('resizeWindow', function () {
                    if (t.options.singlePageStickyNavigation) {        // 2006
                                                                       //
                        var width = t.wrap[0].clientWidth;             // 2008
                                                                       //
                        if (width > 0) {                               // 2010
                            t.navigationWrap.width(width);             // 2011
                                                                       //
                            // set navigation width='window width' to center the divs
                            t.navigation.width(width);                 // 2014
                        }                                              //
                    }                                                  //
                });                                                    //
                                                                       //
                if (t.options.singlePageDeeplinking) {                 // 2020
                    t.url = location.href;                             // 2021
                                                                       //
                    if (t.url.slice(-1) === '#') {                     // 2023
                        t.url = t.url.slice(0, -1);                    // 2024
                    }                                                  //
                                                                       //
                    var links = t.url.split('#cbp=');                  // 2027
                    var url = links.shift(); // remove first item      // 2028
                                                                       //
                    $.each(links, function (index, link) {             // 2030
                                                                       //
                        t.cubeportfolio.blocksOn.each(function (index1, el) {
                            var singlePage = $(el).find(t.options.singlePageDelegate + '[href="' + link + '"]');
                                                                       //
                            if (singlePage.length) {                   // 2035
                                currentBlock = singlePage;             // 2036
                                return false;                          // 2037
                            }                                          //
                        });                                            //
                                                                       //
                        if (currentBlock) {                            // 2042
                            return false;                              // 2043
                        }                                              //
                    });                                                //
                                                                       //
                    if (currentBlock) {                                // 2048
                                                                       //
                        t.url = url;                                   // 2050
                                                                       //
                        var self = currentBlock,                       // 2052
                            gallery = self.attr('data-cbp-singlePage'),
                            blocks = [];                               //
                                                                       //
                        if (gallery) {                                 // 2056
                            blocks = self.closest($('.cbp-item')).find('[data-cbp-singlePage="' + gallery + '"]');
                        } else {                                       //
                            t.cubeportfolio.blocksOn.each(function (index, el) {
                                var item = $(el);                      // 2060
                                                                       //
                                if (item.not('.cbp-item-off')) {       // 2062
                                    item.find(t.options.singlePageDelegate).each(function (index2, el2) {
                                        if (!$(el2).attr('data-cbp-singlePage')) {
                                            blocks.push(el2);          // 2065
                                        }                              //
                                    });                                //
                                }                                      //
                            });                                        //
                        }                                              //
                                                                       //
                        t.openSinglePage(blocks, currentBlock[0]);     // 2072
                    } else if (links.length) {                         //
                        // @todo - hack to load items from loadMore    //
                        var fakeLink = document.createElement('a');    // 2075
                        fakeLink.setAttribute('href', links[0]);       // 2076
                        t.openSinglePage([fakeLink], fakeLink);        // 2077
                    }                                                  //
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Create markup, css and add events                           //
         */                                                            //
        _createMarkup: function () {                                   // 2088
            var t = this,                                              // 2089
                animationCls = '';                                     //
                                                                       //
            if (t.type === 'singlePage') {                             // 2092
                if (t.options.singlePageAnimation !== 'left') {        // 2093
                    animationCls = ' cbp-popup-singlePage-' + t.options.singlePageAnimation;
                }                                                      //
            }                                                          //
                                                                       //
            // wrap element                                            //
            t.wrap = $('<div/>', {                                     // 2099
                'class': 'cbp-popup-wrap cbp-popup-' + t.type + animationCls,
                'data-action': t.type === 'lightbox' ? 'close' : ''    // 2101
            }).on('click.cbp', function (e) {                          //
                if (t.stopEvents) {                                    // 2103
                    return;                                            // 2104
                }                                                      //
                                                                       //
                var action = $(e.target).attr('data-action');          // 2107
                                                                       //
                if (t[action]) {                                       // 2109
                    t[action]();                                       // 2110
                    e.preventDefault();                                // 2111
                }                                                      //
            });                                                        //
                                                                       //
            // content element                                         //
            t.content = $('<div/>', {                                  // 2116
                'class': 'cbp-popup-content'                           // 2117
            }).appendTo(t.wrap);                                       //
                                                                       //
            // append loading div                                      //
            $('<div/>', {                                              // 2121
                'class': 'cbp-popup-loadingBox'                        // 2122
            }).appendTo(t.wrap);                                       //
                                                                       //
            // add background only for ie8                             //
            if (CubePortfolio.Private.browser === 'ie8') {             // 2126
                t.bg = $('<div/>', {                                   // 2127
                    'class': 'cbp-popup-ie8bg',                        // 2128
                    'data-action': t.type === 'lightbox' ? 'close' : ''
                }).appendTo(t.wrap);                                   //
            }                                                          //
                                                                       //
            // create navigation wrap                                  //
            t.navigationWrap = $('<div/>', {                           // 2134
                'class': 'cbp-popup-navigation-wrap'                   // 2135
            }).appendTo(t.wrap);                                       //
                                                                       //
            // create navigation block                                 //
            t.navigation = $('<div/>', {                               // 2139
                'class': 'cbp-popup-navigation'                        // 2140
            }).appendTo(t.navigationWrap);                             //
                                                                       //
            // close                                                   //
            t.closeButton = $('<div/>', {                              // 2144
                'class': 'cbp-popup-close',                            // 2145
                'title': 'Close (Esc arrow key)',                      // 2146
                'data-action': 'close'                                 // 2147
            }).appendTo(t.navigation);                                 //
                                                                       //
            // next                                                    //
            t.nextButton = $('<div/>', {                               // 2151
                'class': 'cbp-popup-next',                             // 2152
                'title': 'Next (Right arrow key)',                     // 2153
                'data-action': 'next'                                  // 2154
            }).appendTo(t.navigation);                                 //
                                                                       //
            // prev                                                    //
            t.prevButton = $('<div/>', {                               // 2159
                'class': 'cbp-popup-prev',                             // 2160
                'title': 'Previous (Left arrow key)',                  // 2161
                'data-action': 'prev'                                  // 2162
            }).appendTo(t.navigation);                                 //
                                                                       //
            if (t.type === 'singlePage') {                             // 2166
                                                                       //
                if (t.options.singlePageCounter) {                     // 2168
                    // counter for singlePage                          //
                    t.counter = $(t.options.singlePageCounter).appendTo(t.navigation);
                    t.counter.text('');                                // 2171
                }                                                      //
                                                                       //
                t.content.on('click.cbp', t.options.singlePageDelegate, function (e) {
                    e.preventDefault();                                // 2175
                    var i,                                             // 2176
                        len = t.dataArray.length,                      //
                        href = this.getAttribute('href');              //
                                                                       //
                    for (i = 0; i < len; i++) {                        // 2180
                                                                       //
                        if (t.dataArray[i].url === href) {             // 2182
                            break;                                     // 2183
                        }                                              //
                    }                                                  //
                                                                       //
                    t.singlePageJumpTo(i - t.current);                 // 2187
                });                                                    //
                                                                       //
                // if there are some events than overrides the default scroll behaviour don't go to them
                t.wrap.on('mousewheel.cbp' + ' DOMMouseScroll.cbp', function (e) {
                    e.stopImmediatePropagation();                      // 2193
                });                                                    //
            }                                                          //
                                                                       //
            $(document).on('keydown.cbp', function (e) {               // 2198
                                                                       //
                // if is not open => return                            //
                if (!t.isOpen) {                                       // 2201
                    return;                                            // 2202
                }                                                      //
                                                                       //
                // if all events are stopped => return                 //
                if (t.stopEvents) {                                    // 2206
                    return;                                            // 2207
                }                                                      //
                                                                       //
                if (e.keyCode === 37) {                                // 2210
                    // prev key                                        //
                    t.prev();                                          // 2211
                } else if (e.keyCode === 39) {                         //
                    // next key                                        //
                    t.next();                                          // 2213
                } else if (e.keyCode === 27) {                         //
                    //esc key                                          //
                    t.close();                                         // 2215
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        _createMarkupSinglePageInline: function () {                   // 2221
            var t = this;                                              // 2222
                                                                       //
            // wrap element                                            //
            t.wrap = $('<div/>', {                                     // 2225
                'class': 'cbp-popup-singlePageInline'                  // 2226
            }).on('click.cbp', function (e) {                          //
                if (t.stopEvents) {                                    // 2228
                    return;                                            // 2229
                }                                                      //
                                                                       //
                var action = $(e.target).attr('data-action');          // 2232
                                                                       //
                if (action && t[action]) {                             // 2234
                    t[action]();                                       // 2235
                    e.preventDefault();                                // 2236
                }                                                      //
            });                                                        //
                                                                       //
            // content element                                         //
            t.content = $('<div/>', {                                  // 2241
                'class': 'cbp-popup-content'                           // 2242
            }).appendTo(t.wrap);                                       //
                                                                       //
            // append loading div                                      //
            // $('<div/>', {                                           //
            //     'class': 'cbp-popup-loadingBox'                     //
            // }).appendTo(t.wrap);                                    //
                                                                       //
            // create navigation block                                 //
            t.navigation = $('<div/>', {                               // 2251
                'class': 'cbp-popup-navigation'                        // 2252
            }).appendTo(t.wrap);                                       //
                                                                       //
            // close                                                   //
            t.closeButton = $('<div/>', {                              // 2256
                'class': 'cbp-popup-close',                            // 2257
                'title': 'Close (Esc arrow key)',                      // 2258
                'data-action': 'close'                                 // 2259
            }).appendTo(t.navigation);                                 //
        },                                                             //
                                                                       //
        destroy: function () {                                         // 2264
            var t = this,                                              // 2265
                body = $('body');                                      //
                                                                       //
            // remove off key down                                     //
            $(document).off('keydown.cbp');                            // 2269
                                                                       //
            // external lightbox and singlePageInline                  //
            body.off('click.cbp', t.options.lightboxDelegate);         // 2272
            body.off('click.cbp', t.options.singlePageDelegate);       // 2273
                                                                       //
            t.content.off('click.cbp', t.options.singlePageDelegate);  // 2275
                                                                       //
            t.cubeportfolio.$obj.off('click.cbp', t.options.singlePageInlineDelegate);
            t.cubeportfolio.$obj.off('click.cbp', t.options.lightboxDelegate);
            t.cubeportfolio.$obj.off('click.cbp', t.options.singlePageDelegate);
                                                                       //
            t.cubeportfolio.$obj.removeClass('cbp-popup-isOpening');   // 2281
                                                                       //
            t.cubeportfolio.$obj.find('.cbp-item').removeClass('cbp-singlePageInline-active');
                                                                       //
            t.wrap.remove();                                           // 2285
        },                                                             //
                                                                       //
        openLightbox: function (blocks, currentBlock) {                // 2288
            var t = this,                                              // 2289
                i = 0,                                                 //
                currentBlockHref,                                      //
                tempHref = [],                                         //
                element;                                               //
                                                                       //
            if (t.isOpen) {                                            // 2294
                return;                                                // 2295
            }                                                          //
                                                                       //
            // remember that the lightbox is open now                  //
            t.isOpen = true;                                           // 2299
                                                                       //
            // remember to stop all events after the lightbox has been shown
            t.stopEvents = false;                                      // 2302
                                                                       //
            // array with elements                                     //
            t.dataArray = [];                                          // 2305
                                                                       //
            // reset current                                           //
            t.current = null;                                          // 2308
                                                                       //
            currentBlockHref = currentBlock.getAttribute('href');      // 2310
            if (currentBlockHref === null) {                           // 2311
                throw new Error('HEI! Your clicked element doesn\'t have a href attribute.');
            }                                                          //
                                                                       //
            $.each(blocks, function (index, item) {                    // 2315
                var href = item.getAttribute('href'),                  // 2316
                    src = href,                                        //
                    // default if element is image                     //
                type = 'isImage',                                      // 2318
                    // default if element is image                     //
                videoLink;                                             // 2319
                                                                       //
                if ($.inArray(href, tempHref) === -1) {                // 2321
                                                                       //
                    if (currentBlockHref === href) {                   // 2323
                        t.current = i;                                 // 2324
                    } else if (!t.options.lightboxGallery) {           //
                        return;                                        // 2326
                    }                                                  //
                                                                       //
                    if (/youtube/i.test(href)) {                       // 2329
                                                                       //
                        videoLink = href.substring(href.lastIndexOf('v=') + 2);
                                                                       //
                        if (!/autoplay=/i.test(videoLink)) {           // 2333
                            videoLink += '&autoplay=1';                // 2334
                        }                                              //
                                                                       //
                        videoLink = videoLink.replace(/\?|&/, '?');    // 2337
                                                                       //
                        // create new href                             //
                        src = '//www.youtube.com/embed/' + videoLink;  // 2340
                                                                       //
                        type = 'isYoutube';                            // 2342
                    } else if (/vimeo/i.test(href)) {                  //
                                                                       //
                        videoLink = href.substring(href.lastIndexOf('/') + 1);
                                                                       //
                        if (!/autoplay=/i.test(videoLink)) {           // 2348
                            videoLink += '&autoplay=1';                // 2349
                        }                                              //
                                                                       //
                        videoLink = videoLink.replace(/\?|&/, '?');    // 2352
                                                                       //
                        // create new href                             //
                        src = '//player.vimeo.com/video/' + videoLink;
                                                                       //
                        type = 'isVimeo';                              // 2357
                    } else if (/ted\.com/i.test(href)) {               //
                                                                       //
                        // create new href                             //
                        src = 'http://embed.ted.com/talks/' + href.substring(href.lastIndexOf('/') + 1) + '.html';
                                                                       //
                        type = 'isTed';                                // 2364
                    } else if (/soundcloud\.com/i.test(href)) {        //
                                                                       //
                        // create new href                             //
                        src = href;                                    // 2369
                                                                       //
                        type = 'isSoundCloud';                         // 2371
                    } else if (/(\.mp4)|(\.ogg)|(\.ogv)|(\.webm)/i.test(href)) {
                                                                       //
                        if (href.indexOf('|') !== -1) {                // 2375
                            // create new href                         //
                            src = href.split('|');                     // 2377
                        } else {                                       //
                            // create new href                         //
                            src = href.split('%7C');                   // 2380
                        }                                              //
                                                                       //
                        type = 'isSelfHostedVideo';                    // 2383
                    } else if (/\.mp3$/i.test(href)) {                 //
                        src = href;                                    // 2386
                        type = 'isSelfHostedAudio';                    // 2387
                    }                                                  //
                                                                       //
                    t.dataArray.push({                                 // 2390
                        src: src,                                      // 2391
                        title: item.getAttribute(t.options.lightboxTitleSrc),
                        type: type                                     // 2393
                    });                                                //
                                                                       //
                    i++;                                               // 2396
                }                                                      //
                                                                       //
                tempHref.push(href);                                   // 2399
            });                                                        //
                                                                       //
            // total numbers of elements                               //
            t.counterTotal = t.dataArray.length;                       // 2404
                                                                       //
            if (t.counterTotal === 1) {                                // 2406
                t.nextButton.hide();                                   // 2407
                t.prevButton.hide();                                   // 2408
                t.dataActionImg = '';                                  // 2409
            } else {                                                   //
                t.nextButton.show();                                   // 2411
                t.prevButton.show();                                   // 2412
                t.dataActionImg = 'data-action="next"';                // 2413
            }                                                          //
                                                                       //
            // append to body                                          //
            t.wrap.appendTo(document.body);                            // 2417
                                                                       //
            t.scrollTop = $(window).scrollTop();                       // 2419
                                                                       //
            t.originalStyle = $('html').attr('style');                 // 2421
                                                                       //
            $('html').css({                                            // 2423
                overflow: 'hidden',                                    // 2424
                paddingRight: window.innerWidth - $(document).width()  // 2425
            });                                                        //
                                                                       //
            // show the wrapper (lightbox box)                         //
            t.wrap.show();                                             // 2429
                                                                       //
            // get the current element                                 //
            element = t.dataArray[t.current];                          // 2432
                                                                       //
            // call function if current element is image or video (iframe)
            t[element.type](element);                                  // 2435
        },                                                             //
                                                                       //
        openSinglePage: function (blocks, currentBlock) {              // 2439
            var t = this,                                              // 2440
                i = 0,                                                 //
                currentBlockHref,                                      //
                tempHref = [];                                         //
                                                                       //
            if (t.isOpen) {                                            // 2444
                return;                                                // 2445
            }                                                          //
                                                                       //
            // check singlePageInline and close it                     //
            if (t.cubeportfolio.singlePageInline && t.cubeportfolio.singlePageInline.isOpen) {
                t.cubeportfolio.singlePageInline.close();              // 2450
            }                                                          //
                                                                       //
            // remember that the lightbox is open now                  //
            t.isOpen = true;                                           // 2454
                                                                       //
            // remember to stop all events after the popup has been showing
            t.stopEvents = false;                                      // 2457
                                                                       //
            // array with elements                                     //
            t.dataArray = [];                                          // 2460
                                                                       //
            // reset current                                           //
            t.current = null;                                          // 2463
                                                                       //
            currentBlockHref = currentBlock.getAttribute('href');      // 2465
            if (currentBlockHref === null) {                           // 2466
                throw new Error('HEI! Your clicked element doesn\'t have a href attribute.');
            }                                                          //
                                                                       //
            $.each(blocks, function (index, item) {                    // 2471
                var href = item.getAttribute('href');                  // 2472
                                                                       //
                if ($.inArray(href, tempHref) === -1) {                // 2474
                                                                       //
                    if (currentBlockHref === href) {                   // 2476
                        t.current = i;                                 // 2477
                    }                                                  //
                                                                       //
                    t.dataArray.push({                                 // 2480
                        url: href,                                     // 2481
                        element: item                                  // 2482
                    });                                                //
                                                                       //
                    i++;                                               // 2485
                }                                                      //
                                                                       //
                tempHref.push(href);                                   // 2488
            });                                                        //
                                                                       //
            // total numbers of elements                               //
            t.counterTotal = t.dataArray.length;                       // 2492
                                                                       //
            if (t.counterTotal === 1) {                                // 2494
                t.nextButton.hide();                                   // 2495
                t.prevButton.hide();                                   // 2496
            } else {                                                   //
                t.nextButton.show();                                   // 2498
                t.prevButton.show();                                   // 2499
            }                                                          //
                                                                       //
            // append to body                                          //
            t.wrap.appendTo(document.body);                            // 2503
                                                                       //
            t.scrollTop = $(window).scrollTop();                       // 2505
                                                                       //
            $('html').css({                                            // 2507
                overflow: 'hidden',                                    // 2508
                paddingRight: window.innerWidth - $(document).width()  // 2509
            });                                                        //
                                                                       //
            // go to top of the page (reset scroll)                    //
            t.wrap.scrollTop(0);                                       // 2513
                                                                       //
            // show the wrapper                                        //
            t.wrap.show();                                             // 2516
                                                                       //
            // finish the open animation                               //
            t.finishOpen = 2;                                          // 2519
                                                                       //
            // if transitionend is not fulfilled                       //
            t.navigationMobile = $();                                  // 2522
            t.wrap.one(CubePortfolio.Private.transitionend, function () {
                var width;                                             // 2524
                                                                       //
                // make the navigation sticky                          //
                if (t.options.singlePageStickyNavigation) {            // 2527
                                                                       //
                    t.wrap.addClass('cbp-popup-singlePage-sticky');    // 2529
                                                                       //
                    width = t.wrap[0].clientWidth;                     // 2531
                    t.navigationWrap.width(width);                     // 2532
                                                                       //
                    if (CubePortfolio.Private.browser === 'android' || CubePortfolio.Private.browser === 'ios') {
                        // wrap element                                //
                        t.navigationMobile = $('<div/>', {             // 2536
                            'class': 'cbp-popup-singlePage cbp-popup-singlePage-sticky',
                            'id': t.wrap.attr('id')                    // 2538
                        }).on('click.cbp', function (e) {              //
                            if (t.stopEvents) {                        // 2540
                                return;                                // 2541
                            }                                          //
                                                                       //
                            var action = $(e.target).attr('data-action');
                                                                       //
                            if (t[action]) {                           // 2546
                                t[action]();                           // 2547
                                e.preventDefault();                    // 2548
                            }                                          //
                        });                                            //
                                                                       //
                        t.navigationMobile.appendTo(document.body).append(t.navigationWrap);
                    }                                                  //
                }                                                      //
                                                                       //
                t.finishOpen--;                                        // 2557
                if (t.finishOpen <= 0) {                               // 2558
                    t.updateSinglePageIsOpen.call(t);                  // 2559
                }                                                      //
            });                                                        //
                                                                       //
            if (CubePortfolio.Private.browser === 'ie8' || CubePortfolio.Private.browser === 'ie9') {
                                                                       //
                // make the navigation sticky                          //
                if (t.options.singlePageStickyNavigation) {            // 2567
                    var width = t.wrap[0].clientWidth;                 // 2568
                                                                       //
                    t.navigationWrap.width(width);                     // 2570
                                                                       //
                    setTimeout(function () {                           // 2572
                        t.wrap.addClass('cbp-popup-singlePage-sticky');
                    }, 1000);                                          //
                }                                                      //
                                                                       //
                t.finishOpen--;                                        // 2578
            }                                                          //
                                                                       //
            t.wrap.addClass('cbp-popup-loading');                      // 2581
                                                                       //
            // force reflow and then add class                         //
            t.wrap.offset();                                           // 2584
            t.wrap.addClass('cbp-popup-singlePage-open');              // 2585
                                                                       //
            // change link                                             //
            if (t.options.singlePageDeeplinking) {                     // 2588
                // ignore old #cbp from href                           //
                t.url = t.url.split('#cbp=')[0];                       // 2590
                location.href = t.url + '#cbp=' + t.dataArray[t.current].url;
            }                                                          //
                                                                       //
            // run callback function                                   //
            if ($.isFunction(t.options.singlePageCallback)) {          // 2595
                t.options.singlePageCallback.call(t, t.dataArray[t.current].url, t.dataArray[t.current].element);
            }                                                          //
        },                                                             //
                                                                       //
        openSinglePageInline: function (blocks, currentBlock, fromOpen) {
            var t = this,                                              // 2603
                start = 0,                                             //
                currentBlockHref,                                      //
                tempCurrent,                                           //
                cbpitem,                                               //
                parentElement;                                         //
                                                                       //
            fromOpen = fromOpen || false;                              // 2610
                                                                       //
            t.fromOpen = fromOpen;                                     // 2612
                                                                       //
            t.storeBlocks = blocks;                                    // 2614
            t.storeCurrentBlock = currentBlock;                        // 2615
                                                                       //
            // check singlePageInline and close it                     //
            if (t.isOpen) {                                            // 2618
                                                                       //
                tempCurrent = $(currentBlock).closest('.cbp-item').index();
                                                                       //
                if (t.dataArray[t.current].url !== currentBlock.getAttribute('href') || t.current !== tempCurrent) {
                    t.cubeportfolio.singlePageInline.close('open', {   // 2623
                        blocks: blocks,                                // 2624
                        currentBlock: currentBlock,                    // 2625
                        fromOpen: true                                 // 2626
                    });                                                //
                } else {                                               //
                    t.close();                                         // 2630
                }                                                      //
                                                                       //
                return;                                                // 2633
            }                                                          //
                                                                       //
            // remember that the lightbox is open now                  //
            t.isOpen = true;                                           // 2637
                                                                       //
            // remember to stop all events after the popup has been showing
            t.stopEvents = false;                                      // 2640
                                                                       //
            // array with elements                                     //
            t.dataArray = [];                                          // 2643
                                                                       //
            // reset current                                           //
            t.current = null;                                          // 2646
                                                                       //
            currentBlockHref = currentBlock.getAttribute('href');      // 2648
            if (currentBlockHref === null) {                           // 2649
                throw new Error('HEI! Your clicked element doesn\'t have a href attribute.');
            }                                                          //
                                                                       //
            cbpitem = $(currentBlock).closest('.cbp-item')[0];         // 2653
                                                                       //
            blocks.each(function (index, el) {                         // 2655
                if (cbpitem === el) {                                  // 2656
                    t.current = index;                                 // 2657
                }                                                      //
            });                                                        //
                                                                       //
            t.dataArray[t.current] = {                                 // 2661
                url: currentBlockHref,                                 // 2662
                element: currentBlock                                  // 2663
            };                                                         //
                                                                       //
            parentElement = $(t.dataArray[t.current].element).parents('.cbp-item').addClass('cbp-singlePageInline-active');
                                                                       //
            // total numbers of elements                               //
            t.counterTotal = blocks.length;                            // 2669
                                                                       //
            t.wrap.insertBefore(t.cubeportfolio.wrapper);              // 2671
                                                                       //
            if (t.options.singlePageInlinePosition === 'top') {        // 2673
                t.startInline = 0;                                     // 2674
                t.top = 0;                                             // 2675
                                                                       //
                t.firstRow = true;                                     // 2677
                t.lastRow = false;                                     // 2678
            } else if (t.options.singlePageInlinePosition === 'bottom') {
                t.startInline = t.counterTotal;                        // 2680
                t.top = t.cubeportfolio.height;                        // 2681
                                                                       //
                t.firstRow = false;                                    // 2683
                t.lastRow = true;                                      // 2684
            } else if (t.options.singlePageInlinePosition === 'above') {
                t.startInline = t.cubeportfolio.cols * Math.floor(t.current / t.cubeportfolio.cols);
                t.top = $(blocks[t.current]).data('cbp').top;          // 2687
                                                                       //
                if (t.startInline === 0) {                             // 2689
                    t.firstRow = true;                                 // 2690
                } else {                                               //
                    t.top -= t.options.gapHorizontal;                  // 2692
                    t.firstRow = false;                                // 2693
                }                                                      //
                                                                       //
                t.lastRow = false;                                     // 2696
            } else {                                                   //
                // below                                               //
                t.top = $(blocks[t.current]).data('cbp').top + $(blocks[t.current]).data('cbp').height;
                t.startInline = Math.min(t.cubeportfolio.cols * (Math.floor(t.current / t.cubeportfolio.cols) + 1), t.counterTotal);
                                                                       //
                t.firstRow = false;                                    // 2703
                t.lastRow = t.startInline === t.counterTotal ? true : false;
            }                                                          //
                                                                       //
            t.wrap[0].style.height = t.wrap.outerHeight(true) + 'px';  // 2707
                                                                       //
            // debouncer for inline content                            //
            t.deferredInline = $.Deferred();                           // 2710
                                                                       //
            if (t.options.singlePageInlineInFocus) {                   // 2712
                                                                       //
                t.scrollTop = $(window).scrollTop();                   // 2714
                                                                       //
                var goToScroll = t.cubeportfolio.$obj.offset().top + t.top - 100;
                                                                       //
                if (t.scrollTop !== goToScroll) {                      // 2718
                    $('html,body').animate({                           // 2719
                        scrollTop: goToScroll                          // 2720
                    }, 350).promise().then(function () {               //
                        t._resizeSinglePageInline();                   // 2724
                        t.deferredInline.resolve();                    // 2725
                    });                                                //
                } else {                                               //
                    t._resizeSinglePageInline();                       // 2728
                    t.deferredInline.resolve();                        // 2729
                }                                                      //
            } else {                                                   //
                t._resizeSinglePageInline();                           // 2732
                t.deferredInline.resolve();                            // 2733
            }                                                          //
                                                                       //
            t.cubeportfolio.$obj.addClass('cbp-popup-singlePageInline-open');
                                                                       //
            t.wrap.css({                                               // 2738
                top: t.top                                             // 2739
            });                                                        //
                                                                       //
            // register callback function                              //
            if ($.isFunction(t.options.singlePageInlineCallback)) {    // 2743
                t.options.singlePageInlineCallback.call(t, t.dataArray[t.current].url, t.dataArray[t.current].element);
            }                                                          //
        },                                                             //
                                                                       //
        _resizeSinglePageInline: function () {                         // 2748
            var t = this;                                              // 2749
                                                                       //
            t.height = t.firstRow || t.lastRow ? t.wrap.outerHeight(true) : t.wrap.outerHeight(true) - t.options.gapHorizontal;
                                                                       //
            t.storeBlocks.each(function (index, el) {                  // 2753
                if (index < t.startInline) {                           // 2754
                    if (CubePortfolio.Private.modernBrowser) {         // 2755
                        el.style[CubePortfolio.Private.transform] = '';
                    } else {                                           //
                        el.style.marginTop = '';                       // 2758
                    }                                                  //
                } else {                                               //
                    if (CubePortfolio.Private.modernBrowser) {         // 2761
                        el.style[CubePortfolio.Private.transform] = 'translate3d(0px, ' + t.height + 'px, 0)';
                    } else {                                           //
                        el.style.marginTop = t.height + 'px';          // 2764
                    }                                                  //
                }                                                      //
            });                                                        //
                                                                       //
            t.cubeportfolio.obj.style.height = t.cubeportfolio.height + t.height + 'px';
        },                                                             //
                                                                       //
        _revertResizeSinglePageInline: function () {                   // 2772
            var t = this;                                              // 2773
                                                                       //
            // reset deferred object                                   //
            t.deferredInline = $.Deferred();                           // 2776
                                                                       //
            t.storeBlocks.each(function (index, el) {                  // 2778
                if (CubePortfolio.Private.modernBrowser) {             // 2779
                    el.style[CubePortfolio.Private.transform] = '';    // 2780
                } else {                                               //
                    el.style.marginTop = '';                           // 2782
                }                                                      //
            });                                                        //
                                                                       //
            t.cubeportfolio.obj.style.height = t.cubeportfolio.height + 'px';
        },                                                             //
                                                                       //
        appendScriptsToWrap: function (scripts) {                      // 2789
            var t = this,                                              // 2790
                index = 0,                                             //
                loadScripts = function (item) {                        //
                var script = document.createElement('script'),         // 2793
                    src = item.src;                                    //
                                                                       //
                script.type = 'text/javascript';                       // 2796
                                                                       //
                if (script.readyState) {                               // 2798
                    // ie                                              //
                    script.onreadystatechange = function () {          // 2799
                        if (script.readyState == 'loaded' || script.readyState == 'complete') {
                            script.onreadystatechange = null;          // 2801
                            index++;                                   // 2802
                            if (scripts[index]) {                      // 2803
                                loadScripts(scripts[index]);           // 2804
                            }                                          //
                        }                                              //
                    };                                                 //
                } else {                                               //
                    script.onload = function () {                      // 2809
                        index++;                                       // 2810
                        if (scripts[index]) {                          // 2811
                            loadScripts(scripts[index]);               // 2812
                        }                                              //
                    };                                                 //
                }                                                      //
                                                                       //
                if (src) {                                             // 2817
                    script.src = src;                                  // 2818
                } else {                                               //
                    script.text = item.text;                           // 2820
                }                                                      //
                                                                       //
                t.content[0].appendChild(script);                      // 2823
            };                                                         //
                                                                       //
            loadScripts(scripts[0]);                                   // 2827
        },                                                             //
                                                                       //
        updateSinglePage: function (html, scripts, isWrap) {           // 2830
            var t = this,                                              // 2831
                counterMarkup,                                         //
                animationFinish;                                       //
                                                                       //
            t.content.addClass('cbp-popup-content').removeClass('cbp-popup-content-basic');
                                                                       //
            if (isWrap === false) {                                    // 2837
                t.content.removeClass('cbp-popup-content').addClass('cbp-popup-content-basic');
            }                                                          //
                                                                       //
            // update counter navigation                               //
            if (t.counter) {                                           // 2842
                counterMarkup = $(t._getCounterMarkup(t.options.singlePageCounter, t.current + 1, t.counterTotal));
                t.counter.text(counterMarkup.text());                  // 2844
            }                                                          //
                                                                       //
            t.content.html(html);                                      // 2847
                                                                       //
            if (scripts) {                                             // 2849
                t.appendScriptsToWrap(scripts);                        // 2850
            }                                                          //
                                                                       //
            // trigger public event                                    //
            t.cubeportfolio.$obj.trigger('updateSinglePageStart.cbp');
                                                                       //
            t.finishOpen--;                                            // 2856
                                                                       //
            if (t.finishOpen <= 0) {                                   // 2858
                t.updateSinglePageIsOpen.call(t);                      // 2859
            }                                                          //
        },                                                             //
                                                                       //
        updateSinglePageIsOpen: function () {                          // 2863
            var t = this,                                              // 2864
                selectorSlider;                                        //
                                                                       //
            t.wrap.addClass('cbp-popup-ready');                        // 2867
            t.wrap.removeClass('cbp-popup-loading');                   // 2868
                                                                       //
            // instantiate slider if exists                            //
            selectorSlider = t.content.find('.cbp-slider');            // 2871
            if (selectorSlider) {                                      // 2872
                selectorSlider.find('.cbp-slider-item').addClass('cbp-item');
                t.slider = selectorSlider.cubeportfolio({              // 2874
                    layoutMode: 'slider',                              // 2875
                    mediaQueries: [{                                   // 2876
                        width: 1,                                      // 2877
                        cols: 1                                        // 2878
                    }],                                                //
                    gapHorizontal: 0,                                  // 2880
                    gapVertical: 0,                                    // 2881
                    caption: '',                                       // 2882
                    coverRatio: '' });                                 // 2883
            } else // wp version only                                  //
                {                                                      // 2885
                    t.slider = null;                                   // 2886
                }                                                      //
                                                                       //
            // scroll bug on android and ios                           //
            if (CubePortfolio.Private.browser === 'android' || CubePortfolio.Private.browser === 'ios') {
                $('html').css({                                        // 2891
                    position: 'fixed'                                  // 2892
                });                                                    //
            }                                                          //
                                                                       //
            // trigger public event                                    //
            t.cubeportfolio.$obj.trigger('updateSinglePageComplete.cbp');
        },                                                             //
                                                                       //
        updateSinglePageInline: function (html, scripts) {             // 2902
            var t = this;                                              // 2903
                                                                       //
            t.content.html(html);                                      // 2905
                                                                       //
            if (scripts) {                                             // 2907
                t.appendScriptsToWrap(scripts);                        // 2908
            }                                                          //
            // trigger public event                                    //
            t.cubeportfolio.$obj.trigger('updateSinglePageInlineStart.cbp');
                                                                       //
            t.singlePageInlineIsOpen.call(t);                          // 2913
        },                                                             //
                                                                       //
        singlePageInlineIsOpen: function () {                          // 2917
            var t = this;                                              // 2918
                                                                       //
            function finishLoading() {                                 // 2920
                t.wrap.addClass('cbp-popup-singlePageInline-ready');   // 2921
                t.wrap[0].style.height = '';                           // 2922
                                                                       //
                t._resizeSinglePageInline();                           // 2924
                                                                       //
                // trigger public event                                //
                t.cubeportfolio.$obj.trigger('updateSinglePageInlineComplete.cbp');
            }                                                          //
                                                                       //
            // wait to load all images                                 //
            t.cubeportfolio._load(t.wrap, function () {                // 2931
                                                                       //
                // instantiate slider if exists                        //
                var selectorSlider = t.content.find('.cbp-slider');    // 2935
                                                                       //
                if (selectorSlider.length) {                           // 2937
                    selectorSlider.find('.cbp-slider-item').addClass('cbp-item');
                                                                       //
                    selectorSlider.one('initComplete.cbp', function () {
                        t.deferredInline.done(finishLoading);          // 2941
                    });                                                //
                                                                       //
                    selectorSlider.on('pluginResize.cbp', function () {
                        t.deferredInline.done(finishLoading);          // 2945
                    });                                                //
                                                                       //
                    t.slider = selectorSlider.cubeportfolio({          // 2948
                        layoutMode: 'slider',                          // 2949
                        displayType: 'default',                        // 2950
                        mediaQueries: [{                               // 2951
                            width: 1,                                  // 2952
                            cols: 1                                    // 2953
                        }],                                            //
                        gapHorizontal: 0,                              // 2955
                        gapVertical: 0,                                // 2956
                        caption: '',                                   // 2957
                        coverRatio: '' });                             // 2958
                } else // wp version only                              //
                    {                                                  // 2960
                        t.slider = null;                               // 2961
                        t.deferredInline.done(finishLoading);          // 2962
                    }                                                  //
            });                                                        //
        },                                                             //
                                                                       //
        isImage: function (el) {                                       // 2970
            var t = this,                                              // 2971
                img = new Image();                                     //
                                                                       //
            t.tooggleLoading(true);                                    // 2974
                                                                       //
            if ($('<img src="' + el.src + '">').is('img:uncached')) {  // 2976
                                                                       //
                $(img).on('load.cbp' + ' error.cbp', function () {     // 2978
                                                                       //
                    t.updateImagesMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
                                                                       //
                    t.tooggleLoading(false);                           // 2982
                });                                                    //
                img.src = el.src;                                      // 2985
            } else {                                                   //
                                                                       //
                t.updateImagesMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
                                                                       //
                t.tooggleLoading(false);                               // 2991
            }                                                          //
        },                                                             //
                                                                       //
        isVimeo: function (el) {                                       // 2995
            var t = this;                                              // 2996
                                                                       //
            t.updateVideoMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        isYoutube: function (el) {                                     // 3001
            var t = this;                                              // 3002
            t.updateVideoMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        isTed: function (el) {                                         // 3007
            var t = this;                                              // 3008
            t.updateVideoMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        isSoundCloud: function (el) {                                  // 3012
            var t = this;                                              // 3013
            t.updateVideoMarkup(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        isSelfHostedVideo: function (el) {                             // 3017
            var t = this;                                              // 3018
            t.updateSelfHostedVideo(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        isSelfHostedAudio: function (el) {                             // 3022
            var t = this;                                              // 3023
            t.updateSelfHostedAudio(el.src, el.title, t._getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal));
        },                                                             //
                                                                       //
        _getCounterMarkup: function (markup, current, total) {         // 3027
            if (!markup.length) {                                      // 3028
                return '';                                             // 3029
            }                                                          //
                                                                       //
            var mapObj = {                                             // 3032
                current: current,                                      // 3033
                total: total                                           // 3034
            };                                                         //
                                                                       //
            return markup.replace(/\{\{current}}|\{\{total}}/gi, function (matched) {
                return mapObj[matched.slice(2, -2)];                   // 3038
            });                                                        //
        },                                                             //
                                                                       //
        updateSelfHostedVideo: function (src, title, counter) {        // 3042
            var t = this,                                              // 3043
                i;                                                     //
                                                                       //
            t.wrap.addClass('cbp-popup-lightbox-isIframe');            // 3046
                                                                       //
            var markup = '<div class="cbp-popup-lightbox-iframe">' + '<video controls="controls" height="auto" style="width: 100%">';
                                                                       //
            for (i = 0; i < src.length; i++) {                         // 3051
                if (/(\.mp4)/i.test(src[i])) {                         // 3052
                    markup += '<source src="' + src[i] + '" type="video/mp4">';
                } else if (/(\.ogg)|(\.ogv)/i.test(src[i])) {          //
                    markup += '<source src="' + src[i] + '" type="video/ogg">';
                } else if (/(\.webm)/i.test(src[i])) {                 //
                    markup += '<source src="' + src[i] + '" type="video/webm">';
                }                                                      //
            }                                                          //
                                                                       //
            markup += 'Your browser does not support the video tag.' + '</video>' + '<div class="cbp-popup-lightbox-bottom">' + (title ? '<div class="cbp-popup-lightbox-title">' + title + '</div>' : '') + counter + '</div>' + '</div>';
                                                                       //
            t.content.html(markup);                                    // 3069
                                                                       //
            t.wrap.addClass('cbp-popup-ready');                        // 3071
                                                                       //
            t.preloadNearbyImages();                                   // 3073
        },                                                             //
                                                                       //
        updateSelfHostedAudio: function (src, title, counter) {        // 3076
            var t = this,                                              // 3077
                i;                                                     //
                                                                       //
            t.wrap.addClass('cbp-popup-lightbox-isIframe');            // 3080
                                                                       //
            var markup = '<div class="cbp-popup-lightbox-iframe">' + '<audio controls="controls" height="auto" style="width: 100%">' + '<source src="' + src + '" type="audio/mpeg">' + 'Your browser does not support the audio tag.' + '</audio>' + '<div class="cbp-popup-lightbox-bottom">' + (title ? '<div class="cbp-popup-lightbox-title">' + title + '</div>' : '') + counter + '</div>' + '</div>';
                                                                       //
            t.content.html(markup);                                    // 3093
                                                                       //
            t.wrap.addClass('cbp-popup-ready');                        // 3095
                                                                       //
            t.preloadNearbyImages();                                   // 3097
        },                                                             //
                                                                       //
        updateVideoMarkup: function (src, title, counter) {            // 3100
            var t = this;                                              // 3101
            t.wrap.addClass('cbp-popup-lightbox-isIframe');            // 3102
                                                                       //
            var markup = '<div class="cbp-popup-lightbox-iframe">' + '<iframe src="' + src + '" frameborder="0" allowfullscreen scrolling="no"></iframe>' + '<div class="cbp-popup-lightbox-bottom">' + (title ? '<div class="cbp-popup-lightbox-title">' + title + '</div>' : '') + counter + '</div>' + '</div>';
                                                                       //
            t.content.html(markup);                                    // 3112
            t.wrap.addClass('cbp-popup-ready');                        // 3113
            t.preloadNearbyImages();                                   // 3114
        },                                                             //
                                                                       //
        updateImagesMarkup: function (src, title, counter) {           // 3117
            var t = this;                                              // 3118
                                                                       //
            t.wrap.removeClass('cbp-popup-lightbox-isIframe');         // 3120
                                                                       //
            var markup = '<div class="cbp-popup-lightbox-figure">' + '<img src="' + src + '" class="cbp-popup-lightbox-img" ' + t.dataActionImg + ' />' + '<div class="cbp-popup-lightbox-bottom">' + (title ? '<div class="cbp-popup-lightbox-title">' + title + '</div>' : '') + counter + '</div>' + '</div>';
                                                                       //
            t.content.html(markup);                                    // 3130
                                                                       //
            t.wrap.addClass('cbp-popup-ready');                        // 3132
                                                                       //
            t.resizeImage();                                           // 3134
                                                                       //
            t.preloadNearbyImages();                                   // 3136
        },                                                             //
                                                                       //
        next: function () {                                            // 3139
            var t = this;                                              // 3140
            t[t.type + 'JumpTo'](1);                                   // 3141
        },                                                             //
                                                                       //
        prev: function () {                                            // 3144
            var t = this;                                              // 3145
            t[t.type + 'JumpTo'](-1);                                  // 3146
        },                                                             //
                                                                       //
        lightboxJumpTo: function (index) {                             // 3149
            var t = this,                                              // 3150
                el;                                                    //
                                                                       //
            t.current = t.getIndex(t.current + index);                 // 3153
                                                                       //
            // get the current element                                 //
            el = t.dataArray[t.current];                               // 3156
                                                                       //
            // call function if current element is image or video (iframe)
            t[el.type](el);                                            // 3159
        },                                                             //
                                                                       //
        singlePageJumpTo: function (index) {                           // 3163
            var t = this;                                              // 3164
                                                                       //
            t.current = t.getIndex(t.current + index);                 // 3166
                                                                       //
            // register singlePageCallback function                    //
            if ($.isFunction(t.options.singlePageCallback)) {          // 3169
                t.resetWrap();                                         // 3170
                                                                       //
                // go to top of the page (reset scroll)                //
                t.wrap.scrollTop(0);                                   // 3173
                                                                       //
                t.wrap.addClass('cbp-popup-loading');                  // 3175
                t.options.singlePageCallback.call(t, t.dataArray[t.current].url, t.dataArray[t.current].element);
                                                                       //
                if (t.options.singlePageDeeplinking) {                 // 3178
                    location.href = t.url + '#cbp=' + t.dataArray[t.current].url;
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        resetWrap: function () {                                       // 3184
            var t = this;                                              // 3185
                                                                       //
            if (t.type === 'singlePage' && t.options.singlePageDeeplinking) {
                location.href = t.url + '#';                           // 3188
            }                                                          //
        },                                                             //
                                                                       //
        getIndex: function (index) {                                   // 3192
            var t = this;                                              // 3193
                                                                       //
            // go to interval [0, (+ or -)this.counterTotal.length - 1]
            index = index % t.counterTotal;                            // 3196
                                                                       //
            // if index is less then 0 then go to interval (0, this.counterTotal - 1]
            if (index < 0) {                                           // 3199
                index = t.counterTotal + index;                        // 3200
            }                                                          //
                                                                       //
            return index;                                              // 3203
        },                                                             //
                                                                       //
        close: function (method, data) {                               // 3206
            var t = this;                                              // 3207
                                                                       //
            function finishClose() {                                   // 3209
                // reset content                                       //
                t.content.html('');                                    // 3211
                                                                       //
                // hide the wrap                                       //
                t.wrap.detach();                                       // 3214
                                                                       //
                t.cubeportfolio.$obj.removeClass('cbp-popup-singlePageInline-open cbp-popup-singlePageInline-close');
                                                                       //
                if (method === 'promise') {                            // 3218
                    if ($.isFunction(data.callback)) {                 // 3219
                        data.callback.call(t.cubeportfolio);           // 3220
                    }                                                  //
                }                                                      //
            }                                                          //
                                                                       //
            function checkFocusInline() {                              // 3225
                if (t.options.singlePageInlineInFocus && method !== 'promise') {
                    $('html,body').animate({                           // 3227
                        scrollTop: t.scrollTop                         // 3228
                    }, 350).promise().then(function () {               //
                        finishClose();                                 // 3232
                    });                                                //
                } else {                                               //
                    finishClose();                                     // 3235
                }                                                      //
            }                                                          //
                                                                       //
            // now the popup is closed                                 //
            t.isOpen = false;                                          // 3240
                                                                       //
            if (t.type === 'singlePageInline') {                       // 3242
                                                                       //
                if (method === 'open') {                               // 3244
                                                                       //
                    t.wrap.removeClass('cbp-popup-singlePageInline-ready');
                                                                       //
                    $(t.dataArray[t.current].element).closest('.cbp-item').removeClass('cbp-singlePageInline-active');
                                                                       //
                    t.openSinglePageInline(data.blocks, data.currentBlock, data.fromOpen);
                } else {                                               //
                                                                       //
                    t.height = 0;                                      // 3254
                                                                       //
                    t._revertResizeSinglePageInline();                 // 3256
                                                                       //
                    t.wrap.removeClass('cbp-popup-singlePageInline-ready');
                                                                       //
                    t.cubeportfolio.$obj.addClass('cbp-popup-singlePageInline-close');
                                                                       //
                    t.startInline = -1;                                // 3262
                                                                       //
                    t.cubeportfolio.$obj.find('.cbp-item').removeClass('cbp-singlePageInline-active');
                                                                       //
                    if (CubePortfolio.Private.modernBrowser) {         // 3266
                        t.wrap.one(CubePortfolio.Private.transitionend, function () {
                            checkFocusInline();                        // 3268
                        });                                            //
                    } else {                                           //
                        checkFocusInline();                            // 3271
                    }                                                  //
                }                                                      //
            } else if (t.type === 'singlePage') {                      //
                                                                       //
                t.resetWrap();                                         // 3277
                                                                       //
                t.wrap.removeClass('cbp-popup-ready');                 // 3279
                                                                       //
                // scroll bug on android and ios                       //
                if (CubePortfolio.Private.browser === 'android' || CubePortfolio.Private.browser === 'ios') {
                    $('html').css({                                    // 3283
                        position: ''                                   // 3284
                    });                                                //
                                                                       //
                    t.navigationWrap.appendTo(t.wrap);                 // 3287
                    t.navigationMobile.remove();                       // 3288
                }                                                      //
                                                                       //
                $(window).scrollTop(t.scrollTop);                      // 3291
                                                                       //
                // weird bug on mozilla. fixed with setTimeout         //
                setTimeout(function () {                               // 3294
                    t.stopScroll = true;                               // 3295
                                                                       //
                    t.navigationWrap.css({                             // 3297
                        top: t.wrap.scrollTop()                        // 3298
                    });                                                //
                                                                       //
                    t.wrap.removeClass('cbp-popup-singlePage-open cbp-popup-singlePage-sticky');
                                                                       //
                    if (CubePortfolio.Private.browser === 'ie8' || CubePortfolio.Private.browser === 'ie9') {
                        // reset content                               //
                        t.content.html('');                            // 3305
                                                                       //
                        // hide the wrap                               //
                        t.wrap.detach();                               // 3308
                                                                       //
                        $('html').css({                                // 3310
                            overflow: '',                              // 3311
                            paddingRight: '',                          // 3312
                            position: ''                               // 3313
                        });                                            //
                                                                       //
                        t.navigationWrap.removeAttr('style');          // 3316
                    }                                                  //
                }, 0);                                                 //
                                                                       //
                t.wrap.one(CubePortfolio.Private.transitionend, function () {
                                                                       //
                    // reset content                                   //
                    t.content.html('');                                // 3324
                                                                       //
                    // hide the wrap                                   //
                    t.wrap.detach();                                   // 3327
                                                                       //
                    $('html').css({                                    // 3329
                        overflow: '',                                  // 3330
                        paddingRight: '',                              // 3331
                        position: ''                                   // 3332
                    });                                                //
                                                                       //
                    t.navigationWrap.removeAttr('style');              // 3335
                });                                                    //
            } else {                                                   //
                                                                       //
                if (t.originalStyle) {                                 // 3341
                    $('html').attr('style', t.originalStyle);          // 3342
                } else {                                               //
                    $('html').css({                                    // 3344
                        overflow: '',                                  // 3345
                        paddingRight: ''                               // 3346
                    });                                                //
                }                                                      //
                                                                       //
                $(window).scrollTop(t.scrollTop);                      // 3350
                                                                       //
                // reset content                                       //
                t.content.html('');                                    // 3353
                                                                       //
                // hide the wrap                                       //
                t.wrap.detach();                                       // 3356
            }                                                          //
        },                                                             //
                                                                       //
        tooggleLoading: function (state) {                             // 3361
            var t = this;                                              // 3362
                                                                       //
            t.stopEvents = state;                                      // 3364
            t.wrap[state ? 'addClass' : 'removeClass']('cbp-popup-loading');
        },                                                             //
                                                                       //
        resizeImage: function () {                                     // 3368
            // if lightbox is not open go out                          //
            if (!this.isOpen) {                                        // 3370
                return;                                                // 3371
            }                                                          //
                                                                       //
            var height = $(window).height(),                           // 3374
                img = this.content.find('img'),                        //
                padding = parseInt(img.css('margin-top'), 10) + parseInt(img.css('margin-bottom'), 10);
                                                                       //
            img.css('max-height', height - padding + 'px');            // 3378
        },                                                             //
                                                                       //
        preloadNearbyImages: function () {                             // 3381
            var arr = [],                                              // 3382
                img,                                                   //
                t = this,                                              //
                src;                                                   //
                                                                       //
            arr.push(t.getIndex(t.current + 1));                       // 3386
            arr.push(t.getIndex(t.current + 2));                       // 3387
            arr.push(t.getIndex(t.current + 3));                       // 3388
            arr.push(t.getIndex(t.current - 1));                       // 3389
            arr.push(t.getIndex(t.current - 2));                       // 3390
            arr.push(t.getIndex(t.current - 3));                       // 3391
                                                                       //
            for (var i = arr.length - 1; i >= 0; i--) {                // 3393
                if (t.dataArray[arr[i]].type === 'isImage') {          // 3394
                    src = t.dataArray[arr[i]].src;                     // 3395
                    img = new Image();                                 // 3396
                                                                       //
                    if ($('<img src="' + src + '">').is('img:uncached')) {
                        img.src = src;                                 // 3399
                    }                                                  //
                }                                                      //
            }                                                          //
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    function PopUp(parent) {                                           // 3408
        var t = this;                                                  // 3409
                                                                       //
        t.parent = parent;                                             // 3411
                                                                       //
        // if lightboxShowCounter is false, put lightboxCounter to ''  //
        if (parent.options.lightboxShowCounter === false) {            // 3414
            parent.options.lightboxCounter = '';                       // 3415
        }                                                              //
                                                                       //
        // if singlePageShowCounter is false, put singlePageCounter to ''
        if (parent.options.singlePageShowCounter === false) {          // 3419
            parent.options.singlePageCounter = '';                     // 3420
        }                                                              //
                                                                       //
        // @todo - schedule this in  future                            //
        t.run();                                                       // 3424
    }                                                                  //
                                                                       //
    var lightboxInit = false,                                          // 3428
        singlePageInit = false;                                        //
                                                                       //
    PopUp.prototype.run = function () {                                // 3431
        var t = this,                                                  // 3432
            p = t.parent,                                              //
            body = $(document.body);                                   //
                                                                       //
        // default value for lightbox                                  //
        p.lightbox = null;                                             // 3437
                                                                       //
        // LIGHTBOX                                                    //
        if (p.options.lightboxDelegate && !lightboxInit) {             // 3440
                                                                       //
            // init only one time @todo                                //
            lightboxInit = true;                                       // 3443
                                                                       //
            p.lightbox = Object.create(popup);                         // 3445
                                                                       //
            p.lightbox.init(p, 'lightbox');                            // 3447
                                                                       //
            body.on('click.cbp', p.options.lightboxDelegate, function (e) {
                e.preventDefault();                                    // 3450
                                                                       //
                var self = $(this),                                    // 3452
                    gallery = self.attr('data-cbp-lightbox'),          //
                    scope = t.detectScope(self),                       //
                    cbp = scope.data('cubeportfolio'),                 //
                    blocks = [];                                       //
                                                                       //
                // is inside a cbp                                     //
                if (cbp) {                                             // 3459
                                                                       //
                    cbp.blocksOn.each(function (index, el) {           // 3461
                        var item = $(el);                              // 3462
                                                                       //
                        if (item.not('.cbp-item-off')) {               // 3464
                            item.find(p.options.lightboxDelegate).each(function (index2, el2) {
                                if (gallery) {                         // 3466
                                    if ($(el2).attr('data-cbp-lightbox') === gallery) {
                                        blocks.push(el2);              // 3468
                                    }                                  //
                                } else {                               //
                                    blocks.push(el2);                  // 3471
                                }                                      //
                            });                                        //
                        }                                              //
                    });                                                //
                } else {                                               //
                                                                       //
                    if (gallery) {                                     // 3479
                        blocks = scope.find(p.options.lightboxDelegate + '[data-cbp-lightbox=' + gallery + ']');
                    } else {                                           //
                        blocks = scope.find(p.options.lightboxDelegate);
                    }                                                  //
                }                                                      //
                                                                       //
                p.lightbox.openLightbox(blocks, self[0]);              // 3486
            });                                                        //
        }                                                              //
                                                                       //
        // default value for singlePage                                //
        p.singlePage = null;                                           // 3491
                                                                       //
        // SINGLEPAGE                                                  //
        if (p.options.singlePageDelegate && !singlePageInit) {         // 3494
                                                                       //
            // init only one time @todo                                //
            singlePageInit = true;                                     // 3497
                                                                       //
            p.singlePage = Object.create(popup);                       // 3499
                                                                       //
            p.singlePage.init(p, 'singlePage');                        // 3501
                                                                       //
            body.on('click.cbp', p.options.singlePageDelegate, function (e) {
                e.preventDefault();                                    // 3504
                                                                       //
                var self = $(this),                                    // 3506
                    gallery = self.attr('data-cbp-singlePage'),        //
                    scope = t.detectScope(self),                       //
                    cbp = scope.data('cubeportfolio'),                 //
                    blocks = [];                                       //
                                                                       //
                // is inside a cbp                                     //
                if (cbp) {                                             // 3513
                    cbp.blocksOn.each(function (index, el) {           // 3514
                        var item = $(el);                              // 3515
                                                                       //
                        if (item.not('.cbp-item-off')) {               // 3517
                            item.find(p.options.singlePageDelegate).each(function (index2, el2) {
                                if (gallery) {                         // 3519
                                    if ($(el2).attr('data-cbp-singlePage') === gallery) {
                                        blocks.push(el2);              // 3521
                                    }                                  //
                                } else {                               //
                                    blocks.push(el2);                  // 3524
                                }                                      //
                            });                                        //
                        }                                              //
                    });                                                //
                } else {                                               //
                                                                       //
                    if (gallery) {                                     // 3532
                        blocks = scope.find(p.options.singlePageDelegate + '[data-cbp-singlePage=' + gallery + ']');
                    } else {                                           //
                        blocks = scope.find(p.options.singlePageDelegate);
                    }                                                  //
                }                                                      //
                                                                       //
                p.singlePage.openSinglePage(blocks, self[0]);          // 3540
            });                                                        //
        }                                                              //
                                                                       //
        // default value for singlePageInline                          //
        p.singlePageInline = null;                                     // 3545
                                                                       //
        // SINGLEPAGEINLINE                                            //
        if (p.options.singlePageDelegate) {                            // 3548
                                                                       //
            p.singlePageInline = Object.create(popup);                 // 3550
                                                                       //
            p.singlePageInline.init(p, 'singlePageInline');            // 3552
                                                                       //
            p.$obj.on('click.cbp', p.options.singlePageInlineDelegate, function (e) {
                e.preventDefault();                                    // 3555
                p.singlePageInline.openSinglePageInline(p.blocksOn, this);
            });                                                        //
        }                                                              //
    };                                                                 //
                                                                       //
    PopUp.prototype.detectScope = function (item) {                    // 3562
        var singlePageInline, singlePage, cbp;                         // 3563
                                                                       //
        singlePageInline = item.closest('.cbp-popup-singlePageInline');
        if (singlePageInline.length) {                                 // 3568
            cbp = item.closest('.cbp', singlePageInline[0]);           // 3569
            return cbp.length ? cbp : singlePageInline;                // 3570
        }                                                              //
                                                                       //
        singlePage = item.closest('.cbp-popup-singlePage');            // 3573
        if (singlePage.length) {                                       // 3574
            cbp = item.closest('.cbp', singlePage[0]);                 // 3575
            return cbp.length ? cbp : singlePage;                      // 3576
        }                                                              //
                                                                       //
        cbp = item.closest('.cbp');                                    // 3579
        return cbp.length ? cbp : $(document.body);                    // 3580
    };                                                                 //
                                                                       //
    PopUp.prototype.destroy = function () {                            // 3584
        var p = this.parent;                                           // 3585
                                                                       //
        $(document.body).off('click.cbp');                             // 3587
                                                                       //
        // @todo - remove these from here                              //
        lightboxInit = false;                                          // 3590
        singlePageInit = false;                                        // 3591
                                                                       //
        // destroy lightbox if enabled                                 //
        if (p.lightbox) {                                              // 3594
            p.lightbox.destroy();                                      // 3595
        }                                                              //
                                                                       //
        // destroy singlePage if enabled                               //
        if (p.singlePage) {                                            // 3599
            p.singlePage.destroy();                                    // 3600
        }                                                              //
                                                                       //
        // destroy singlePage inline if enabled                        //
        if (p.singlePageInline) {                                      // 3604
            p.singlePageInline.destroy();                              // 3605
        }                                                              //
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.PopUp = function (parent) {                  // 3609
        return new PopUp(parent);                                      // 3610
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 3615
    'use strict';                                                      // 3616
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 3618
                                                                       //
    CubePortfolio.Private = {                                          // 3620
        /**                                                            //
         * Check if cubeportfolio instance exists on current element   //
         */                                                            //
        checkInstance: function (method) {                             // 3624
            var t = $.data(this, 'cubeportfolio');                     // 3625
                                                                       //
            if (!t) {                                                  // 3627
                throw new Error('cubeportfolio is not initialized. Initialize it before calling ' + method + ' method!');
            }                                                          //
                                                                       //
            return t;                                                  // 3631
        },                                                             //
                                                                       //
        /**                                                            //
         * Get info about client browser                               //
         */                                                            //
        browserInfo: function () {                                     // 3637
            var t = CubePortfolio.Private,                             // 3638
                appVersion = navigator.appVersion,                     //
                transition,                                            //
                animation,                                             //
                perspective;                                           //
                                                                       //
            if (appVersion.indexOf('MSIE 8.') !== -1) {                // 3642
                // ie8                                                 //
                t.browser = 'ie8';                                     // 3643
            } else if (appVersion.indexOf('MSIE 9.') !== -1) {         //
                // ie9                                                 //
                t.browser = 'ie9';                                     // 3645
            } else if (appVersion.indexOf('MSIE 10.') !== -1) {        //
                // ie10                                                //
                t.browser = 'ie10';                                    // 3647
            } else if (window.ActiveXObject || 'ActiveXObject' in window) {
                // ie11                                                //
                t.browser = 'ie11';                                    // 3649
            } else if (/android/gi.test(appVersion)) {                 //
                // android                                             //
                t.browser = 'android';                                 // 3651
            } else if (/iphone|ipad|ipod/gi.test(appVersion)) {        //
                // ios                                                 //
                t.browser = 'ios';                                     // 3653
            } else if (/chrome/gi.test(appVersion)) {                  //
                t.browser = 'chrome';                                  // 3655
            } else {                                                   //
                t.browser = '';                                        // 3657
            }                                                          //
                                                                       //
            // check if perspective is available                       //
            perspective = t.styleSupport('perspective');               // 3661
                                                                       //
            // if perspective is not available => no modern browser    //
            if (typeof perspective === undefined) {                    // 3664
                return;                                                // 3665
            }                                                          //
                                                                       //
            transition = t.styleSupport('transition');                 // 3668
                                                                       //
            t.transitionend = ({                                       // 3670
                WebkitTransition: 'webkitTransitionEnd',               // 3671
                transition: 'transitionend'                            // 3672
            })[transition];                                            //
                                                                       //
            animation = t.styleSupport('animation');                   // 3675
                                                                       //
            t.animationend = ({                                        // 3677
                WebkitAnimation: 'webkitAnimationEnd',                 // 3678
                animation: 'animationend'                              // 3679
            })[animation];                                             //
                                                                       //
            t.animationDuration = ({                                   // 3682
                WebkitAnimation: 'webkitAnimationDuration',            // 3683
                animation: 'animationDuration'                         // 3684
            })[animation];                                             //
                                                                       //
            t.animationDelay = ({                                      // 3687
                WebkitAnimation: 'webkitAnimationDelay',               // 3688
                animation: 'animationDelay'                            // 3689
            })[animation];                                             //
                                                                       //
            t.transform = t.styleSupport('transform');                 // 3692
                                                                       //
            if (transition && animation && t.transform) {              // 3694
                t.modernBrowser = true;                                // 3695
            }                                                          //
        },                                                             //
                                                                       //
        /**                                                            //
         * Feature testing for css3                                    //
         */                                                            //
        styleSupport: function (prop) {                                // 3704
            var supportedProp,                                         // 3705
                                                                       //
            // capitalize first character of the prop to test vendor prefix
            webkitProp = 'Webkit' + prop.charAt(0).toUpperCase() + prop.slice(1),
                div = document.createElement('div');                   //
                                                                       //
            // browser supports standard CSS property name             //
            if (prop in div.style) {                                   // 3711
                supportedProp = prop;                                  // 3712
            } else if (webkitProp in div.style) {                      //
                supportedProp = webkitProp;                            // 3714
            }                                                          //
                                                                       //
            // avoid memory leak in IE                                 //
            div = null;                                                // 3718
                                                                       //
            return supportedProp;                                      // 3720
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    CubePortfolio.Private.browserInfo();                               // 3725
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 3729
    'use strict';                                                      // 3730
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 3732
                                                                       //
    CubePortfolio.Public = {                                           // 3734
                                                                       //
        /*                                                             //
         * Init the plugin                                             //
         */                                                            //
        init: function (options, callback) {                           // 3739
            new CubePortfolio(this, options, callback);                // 3740
        },                                                             //
                                                                       //
        /*                                                             //
         * Destroy the plugin                                          //
         */                                                            //
        destroy: function (callback) {                                 // 3746
            var t = CubePortfolio.Private.checkInstance.call(this, 'destroy');
                                                                       //
            t._triggerEvent('beforeDestroy');                          // 3749
                                                                       //
            // remove data                                             //
            $.removeData(this, 'cubeportfolio');                       // 3752
                                                                       //
            // remove data from blocks                                 //
            t.blocks.each(function () {                                // 3755
                $.removeData(this, 'cbp-wxh'); // wp only              // 3756
            });                                                        //
                                                                       //
            // remove loading class and .cbp on container              //
            t.$obj.removeClass('cbp-ready cbp-addItems' + 'cbp-cols-' + t.cols).removeAttr('style');
                                                                       //
            // remove class from ul                                    //
            t.$ul.removeClass('cbp-wrapper');                          // 3763
                                                                       //
            // remove off resize event                                 //
            $(window).off('resize.cbp');                               // 3766
                                                                       //
            t.$obj.off('.cbp');                                        // 3768
            $(document).off('.cbp');                                   // 3769
                                                                       //
            // reset blocks                                            //
            t.blocks.removeClass('cbp-item-off').removeAttr('style');  // 3772
                                                                       //
            t.blocks.find('.cbp-item-wrapper').children().unwrap();    // 3774
                                                                       //
            if (t.options.caption) {                                   // 3776
                t._captionDestroy();                                   // 3777
            }                                                          //
                                                                       //
            t._destroySlider();                                        // 3780
                                                                       //
            // remove .cbp-wrapper-outer                               //
            t.$ul.unwrap();                                            // 3783
                                                                       //
            // remove .cbp-wrapper                                     //
            if (t.addedWrapp) {                                        // 3786
                t.blocks.unwrap();                                     // 3787
            }                                                          //
                                                                       //
            $.each(t._plugins, function (i, item) {                    // 3790
                if (typeof item.destroy === 'function') {              // 3791
                    item.destroy();                                    // 3792
                }                                                      //
            });                                                        //
                                                                       //
            if ($.isFunction(callback)) {                              // 3796
                callback.call(t);                                      // 3797
            }                                                          //
                                                                       //
            t._triggerEvent('afterDestroy');                           // 3800
        },                                                             //
                                                                       //
        /*                                                             //
         * Filter the plugin by filterName                             //
         */                                                            //
        filter: function (filterName, callback) {                      // 3806
            var t = CubePortfolio.Private.checkInstance.call(this, 'filter'),
                off2onBlocks,                                          //
                on2offBlocks,                                          //
                url;                                                   //
                                                                       //
            // register callback function                              //
            if ($.isFunction(callback)) {                              // 3811
                t._registerEvent('filterFinish', callback, true);      // 3812
            }                                                          //
                                                                       //
            if (t.isAnimating || t.defaultFilter === filterName) {     // 3815
                return;                                                // 3816
            }                                                          //
                                                                       //
            t.isAnimating = true;                                      // 3819
            t.defaultFilter = filterName;                              // 3820
                                                                       //
            if (t.singlePageInline && t.singlePageInline.isOpen) {     // 3822
                t.singlePageInline.close('promise', {                  // 3823
                    callback: function () {                            // 3824
                        t._filter(filterName);                         // 3825
                    }                                                  //
                });                                                    //
            } else {                                                   //
                t._filter(filterName);                                 // 3829
            }                                                          //
                                                                       //
            if (t.options.filterDeeplinking) {                         // 3832
                                                                       //
                url = location.href.replace(/#cbpf=(.*?)([#|?&]|$)/gi, '');
                                                                       //
                location.href = url + '#cbpf=' + filterName;           // 3836
                                                                       //
                if (t.singlePage && t.singlePage.url) {                // 3838
                    t.singlePage.url = location.href;                  // 3839
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        /*                                                             //
         * Show counter for filters                                    //
         */                                                            //
        showCounter: function (elems, callback) {                      // 3847
            var t = CubePortfolio.Private.checkInstance.call(this, 'showCounter');
                                                                       //
            t.elems = elems;                                           // 3850
                                                                       //
            $.each(elems, function () {                                // 3852
                var el = $(this),                                      // 3853
                    filterName = el.data('filter'),                    //
                    count;                                             //
                                                                       //
                count = t.blocks.filter(filterName).length;            // 3857
                el.find('.cbp-filter-counter').text(count);            // 3858
            });                                                        //
                                                                       //
            if ($.isFunction(callback)) {                              // 3861
                callback.call(t);                                      // 3862
            }                                                          //
        },                                                             //
                                                                       //
        /*                                                             //
         * ApendItems elements                                         //
         */                                                            //
        appendItems: function (items, callback) {                      // 3869
            var t = CubePortfolio.Private.checkInstance.call(this, 'appendItems');
                                                                       //
            if (t.isAnimating) {                                       // 3872
                return;                                                // 3873
            }                                                          //
                                                                       //
            t.isAnimating = true;                                      // 3876
                                                                       //
            if (t.singlePageInline && t.singlePageInline.isOpen) {     // 3878
                t.singlePageInline.close('promise', {                  // 3879
                    callback: function () {                            // 3880
                        t._addItems(items, callback);                  // 3881
                    }                                                  //
                });                                                    //
            } else {                                                   //
                t._addItems(items, callback);                          // 3885
            }                                                          //
        }                                                              //
                                                                       //
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
// Utility                                                             //
if (typeof Object.create !== 'function') {                             // 3894
    Object.create = function (obj) {                                   // 3895
        function F() {}                                                // 3896
        F.prototype = obj;                                             // 3897
        return new F();                                                // 3898
    };                                                                 //
}                                                                      //
                                                                       //
// jquery new filter for images uncached                               //
jQuery.expr[':'].uncached = function (obj) {                           // 3903
    // Ensure we are dealing with an `img` element with a valid `src` attribute.
    if (!jQuery(obj).is('img[src][src!=""]')) {                        // 3905
        return false;                                                  // 3906
    }                                                                  //
                                                                       //
    // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
    // Doing it this way works in Firefox.                             //
    var img = new Image();                                             // 3911
    img.src = obj.src;                                                 // 3912
                                                                       //
    // http://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-in-javascript
    // During the onload event, IE correctly identifies any images that
    // weren�t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.     //
    if (!img.complete) {                                               // 3918
        return true;                                                   // 3919
    }                                                                  //
                                                                       //
    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.                        //
    if (img.naturalWidth !== undefined && img.naturalWidth === 0) {    // 3925
        return true;                                                   // 3926
    }                                                                  //
                                                                       //
    // No other way of checking: assume it�s ok.                       //
    return false;                                                      // 3930
};                                                                     //
                                                                       //
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
                                                                       //
// requestAnimationFrame polyfill by Erik M�ller. fixes from Paul Irish and Tino Zijdel
                                                                       //
// MIT license                                                         //
                                                                       //
(function () {                                                         // 3940
    var lastTime = 0;                                                  // 3941
    var vendors = ['moz', 'webkit'];                                   // 3942
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }                                                                  //
                                                                       //
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();                           // 3950
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));      // 3951
        var id = window.setTimeout(function () {                       // 3952
            callback(currTime + timeToCall);                           // 3953
        }, timeToCall);                                                //
        lastTime = currTime + timeToCall;                              // 3956
        return id;                                                     // 3957
    };                                                                 //
                                                                       //
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);                                              // 3962
    };                                                                 //
})();                                                                  //
                                                                       //
(function ($, window, document, undefined) {                           // 3966
    'use strict';                                                      // 3967
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 3969
                                                                       //
    function AnimationClassic(parent) {                                // 3971
        var t = this;                                                  // 3972
                                                                       //
        t.parent = parent;                                             // 3974
                                                                       //
        parent.filterLayout = t.filterLayout;                          // 3976
    }                                                                  //
                                                                       //
    // here this value point to parent grid                            //
    AnimationClassic.prototype.filterLayout = function (filterName) {  // 3980
        var t = this;                                                  // 3981
                                                                       //
        t.$obj.addClass('cbp-animation-' + t.options.animationType);   // 3983
                                                                       //
        // [1] - blocks that are only moving with translate            //
        t.blocksOnInitial.filter(filterName).addClass('cbp-item-on2on').each(function (index, el) {
            var data = $(el).data('cbp');                              // 3990
            el.style[CubePortfolio.Private.transform] = 'translate3d(' + (data.leftNew - data.left) + 'px, ' + (data.topNew - data.top) + 'px, 0)';
        });                                                            //
                                                                       //
        // [2] - blocks than intialy are on but after applying the filter are off
        t.blocksOn2Off = t.blocksOnInitial.not(filterName).addClass('cbp-item-on2off');
                                                                       //
        // [3] - blocks that are off and it will be on                 //
        t.blocksOff2On = t.blocksOn.filter('.cbp-item-off').removeClass('cbp-item-off').addClass('cbp-item-off2on').each(function (index, el) {
            var data = $(el).data('cbp');                              // 4005
                                                                       //
            data.left = data.leftNew;                                  // 4007
            data.top = data.topNew;                                    // 4008
                                                                       //
            el.style.left = data.left + 'px';                          // 4010
            el.style.top = data.top + 'px';                            // 4011
        });                                                            //
                                                                       //
        if (t.blocksOn2Off.length) {                                   // 4014
            t.blocksOn2Off.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
        } else if (t.blocksOff2On.length) {                            //
            t.blocksOff2On.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
        } else {                                                       //
            animationend();                                            // 4019
        }                                                              //
                                                                       //
        // resize main container height                                //
        t._resizeMainContainer();                                      // 4023
                                                                       //
        function animationend() {                                      // 4025
            t.blocks.removeClass('cbp-item-on2off cbp-item-off2on cbp-item-on2on').each(function (index, el) {
                var data = $(el).data('cbp');                          // 4029
                                                                       //
                data.left = data.leftNew;                              // 4031
                data.top = data.topNew;                                // 4032
                                                                       //
                el.style.left = data.left + 'px';                      // 4034
                el.style.top = data.top + 'px';                        // 4035
                                                                       //
                el.style[CubePortfolio.Private.transform] = '';        // 4037
            });                                                        //
                                                                       //
            t.blocksOff.addClass('cbp-item-off');                      // 4040
                                                                       //
            t.$obj.removeClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.filterFinish();                                          // 4044
        }                                                              //
    };                                                                 //
                                                                       //
    AnimationClassic.prototype.destroy = function () {                 // 4049
        var parent = this.parent;                                      // 4050
        parent.$obj.removeClass('cbp-animation-' + parent.options.animationType);
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.AnimationClassic = function (parent) {       // 4054
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || $.inArray(parent.options.animationType, ['boxShadow', 'fadeOut', 'flipBottom', 'flipOut', 'quicksand', 'scaleSides', 'skew']) < 0) {
            return null;                                               // 4057
        }                                                              //
                                                                       //
        return new AnimationClassic(parent);                           // 4060
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4065
    'use strict';                                                      // 4066
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4068
                                                                       //
    function AnimationClone(parent) {                                  // 4070
        var t = this;                                                  // 4071
                                                                       //
        t.parent = parent;                                             // 4073
                                                                       //
        parent.filterLayout = t.filterLayout;                          // 4075
    }                                                                  //
                                                                       //
    // here this value point to parent grid                            //
    AnimationClone.prototype.filterLayout = function (filterName) {    // 4079
        var t = this,                                                  // 4080
            ulClone = t.$ul[0].cloneNode(true);                        //
                                                                       //
        ulClone.setAttribute('class', 'cbp-wrapper-helper');           // 4083
        t.wrapper[0].insertBefore(ulClone, t.$ul[0]);                  // 4084
                                                                       //
        requestAnimationFrame(function () {                            // 4086
            t.$obj.addClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.blocksOff.addClass('cbp-item-off');                      // 4089
                                                                       //
            t.blocksOn.removeClass('cbp-item-off').each(function (index, el) {
                var data = $(el).data('cbp');                          // 4093
                                                                       //
                data.left = data.leftNew;                              // 4095
                data.top = data.topNew;                                // 4096
                                                                       //
                el.style.left = data.left + 'px';                      // 4098
                el.style.top = data.top + 'px';                        // 4099
                                                                       //
                if (t.options.animationType === 'sequentially') {      // 4101
                    data.wrapper[0].style[CubePortfolio.Private.animationDelay] = index * 60 + 'ms';
                }                                                      //
            });                                                        //
                                                                       //
            if (t.blocksOn.length) {                                   // 4106
                t.blocksOn.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
            } else if (t.blocksOnInitial.length) {                     //
                t.blocksOnInitial.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
            } else {                                                   //
                animationend();                                        // 4111
            }                                                          //
                                                                       //
            // resize main container height                            //
            t._resizeMainContainer();                                  // 4115
        });                                                            //
                                                                       //
        function animationend() {                                      // 4118
            t.wrapper[0].removeChild(ulClone);                         // 4119
                                                                       //
            if (t.options.animationType === 'sequentially') {          // 4121
                t.blocksOn.each(function (index, el) {                 // 4122
                    $(el).data('cbp').wrapper[0].style[CubePortfolio.Private.animationDelay] = '';
                });                                                    //
            }                                                          //
                                                                       //
            t.$obj.removeClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.filterFinish();                                          // 4129
        }                                                              //
    };                                                                 //
                                                                       //
    AnimationClone.prototype.destroy = function () {                   // 4134
        var parent = this.parent;                                      // 4135
        parent.$obj.removeClass('cbp-animation-' + parent.options.animationType);
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.AnimationClone = function (parent) {         // 4139
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || $.inArray(parent.options.animationType, ['fadeOutTop', 'slideLeft', 'sequentially']) < 0) {
            return null;                                               // 4142
        }                                                              //
                                                                       //
        return new AnimationClone(parent);                             // 4145
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4150
    'use strict';                                                      // 4151
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4153
                                                                       //
    function AnimationCloneDelay(parent) {                             // 4155
        var t = this;                                                  // 4156
                                                                       //
        t.parent = parent;                                             // 4158
                                                                       //
        parent.filterLayout = t.filterLayout;                          // 4160
    }                                                                  //
                                                                       //
    // here this value point to parent grid                            //
    AnimationCloneDelay.prototype.filterLayout = function (filterName) {
        var t = this,                                                  // 4165
            ulClone;                                                   //
                                                                       //
        // t.blocksOnInitial.each(function(index, el) {                //
        //     $(el).data('cbp').wrapper[0].style[CubePortfolio.Private.animationDelay] = (index * 50) + 'ms';
        // });                                                         //
                                                                       //
        ulClone = t.$ul[0].cloneNode(true);                            // 4172
                                                                       //
        ulClone.setAttribute('class', 'cbp-wrapper-helper');           // 4174
        t.wrapper[0].insertBefore(ulClone, t.$ul[0]);                  // 4175
                                                                       //
        // hack for safari osx because it doesn't want to work if I set animationDelay
        // on cbp-item-wrapper before I clone the t.$ul                //
        $(ulClone).find('.cbp-item').not('.cbp-item-off').children('.cbp-item-wrapper').each(function (index, el) {
            el.style[CubePortfolio.Private.animationDelay] = index * 50 + 'ms';
        });                                                            //
                                                                       //
        requestAnimationFrame(function () {                            // 4183
            t.$obj.addClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.blocksOff.addClass('cbp-item-off');                      // 4186
                                                                       //
            t.blocksOn.removeClass('cbp-item-off').each(function (index, el) {
                var data = $(el).data('cbp');                          // 4190
                                                                       //
                data.left = data.leftNew;                              // 4192
                data.top = data.topNew;                                // 4193
                                                                       //
                el.style.left = data.left + 'px';                      // 4195
                el.style.top = data.top + 'px';                        // 4196
                                                                       //
                data.wrapper[0].style[CubePortfolio.Private.animationDelay] = index * 50 + 'ms';
            });                                                        //
                                                                       //
            if (t.blocksOn.length) {                                   // 4202
                t.blocksOn.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
            } else if (t.blocksOnInitial.length) {                     //
                t.blocksOnInitial.last().data('cbp').wrapper.one(CubePortfolio.Private.animationend, animationend);
            } else {                                                   //
                animationend();                                        // 4207
            }                                                          //
                                                                       //
            // resize main container height                            //
            t._resizeMainContainer();                                  // 4211
        });                                                            //
                                                                       //
        function animationend() {                                      // 4214
            t.wrapper[0].removeChild(ulClone);                         // 4215
                                                                       //
            t.$obj.removeClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.blocks.each(function (index, el) {                       // 4219
                $(el).data('cbp').wrapper[0].style[CubePortfolio.Private.animationDelay] = '';
            });                                                        //
                                                                       //
            t.filterFinish();                                          // 4223
        }                                                              //
    };                                                                 //
                                                                       //
    AnimationCloneDelay.prototype.destroy = function () {              // 4228
        var parent = this.parent;                                      // 4229
        parent.$obj.removeClass('cbp-animation-' + parent.options.animationType);
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.AnimationCloneDelay = function (parent) {    // 4233
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || $.inArray(parent.options.animationType, ['3dflip', 'flipOutDelay', 'foldLeft', 'frontRow', 'rotateRoom', 'rotateSides', 'scaleDown', 'slideDelay', 'unfold']) < 0) {
            return null;                                               // 4236
        }                                                              //
                                                                       //
        return new AnimationCloneDelay(parent);                        // 4239
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4244
    'use strict';                                                      // 4245
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4247
                                                                       //
    function AnimationWrapper(parent) {                                // 4249
        var t = this;                                                  // 4250
                                                                       //
        t.parent = parent;                                             // 4252
                                                                       //
        parent.filterLayout = t.filterLayout;                          // 4254
    }                                                                  //
                                                                       //
    // here this value point to parent grid                            //
    AnimationWrapper.prototype.filterLayout = function (filterName) {  // 4258
        var t = this,                                                  // 4259
            ulClone = t.$ul[0].cloneNode(true);                        //
                                                                       //
        ulClone.setAttribute('class', 'cbp-wrapper-helper');           // 4262
        t.wrapper[0].insertBefore(ulClone, t.$ul[0]);                  // 4263
                                                                       //
        requestAnimationFrame(function () {                            // 4265
            t.$obj.addClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.blocksOff.addClass('cbp-item-off');                      // 4268
                                                                       //
            t.blocksOn.removeClass('cbp-item-off').each(function (index, el) {
                var data = $(el).data('cbp');                          // 4272
                                                                       //
                data.left = data.leftNew;                              // 4274
                data.top = data.topNew;                                // 4275
                                                                       //
                el.style.left = data.left + 'px';                      // 4277
                el.style.top = data.top + 'px';                        // 4278
            });                                                        //
                                                                       //
            if (t.blocksOn.length) {                                   // 4281
                t.$ul.one(CubePortfolio.Private.animationend, animationend);
            } else if (t.blocksOnInitial.length) {                     //
                $(ulClone).one(CubePortfolio.Private.animationend, animationend);
            } else {                                                   //
                animationend();                                        // 4286
            }                                                          //
                                                                       //
            // resize main container height                            //
            t._resizeMainContainer();                                  // 4290
        });                                                            //
                                                                       //
        function animationend() {                                      // 4293
            t.wrapper[0].removeChild(ulClone);                         // 4294
                                                                       //
            t.$obj.removeClass('cbp-animation-' + t.options.animationType);
                                                                       //
            t.filterFinish();                                          // 4298
        }                                                              //
    };                                                                 //
                                                                       //
    AnimationWrapper.prototype.destroy = function () {                 // 4303
        var parent = this.parent;                                      // 4304
        parent.$obj.removeClass('cbp-animation-' + parent.options.animationType);
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.AnimationWrapper = function (parent) {       // 4308
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || $.inArray(parent.options.animationType, ['bounceBottom', 'bounceLeft', 'bounceTop', 'moveLeft']) < 0) {
            return null;                                               // 4311
        }                                                              //
                                                                       //
        return new AnimationWrapper(parent);                           // 4314
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4319
    'use strict';                                                      // 4320
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4322
                                                                       //
    function CaptionExpand(parent) {                                   // 4324
        var t = this;                                                  // 4325
                                                                       //
        t.parent = parent;                                             // 4327
                                                                       //
        parent._registerEvent('initFinish', function () {              // 4329
                                                                       //
            parent.$obj.on('click.cbp', '.cbp-caption-defaultWrap', function (e) {
                e.preventDefault();                                    // 4332
                                                                       //
                if (parent.isAnimating) {                              // 4334
                    return;                                            // 4335
                }                                                      //
                                                                       //
                parent.isAnimating = true;                             // 4338
                                                                       //
                var defaultWrap = $(this),                             // 4340
                    activeWrap = defaultWrap.next(),                   //
                    caption = defaultWrap.parent(),                    //
                    endStyle = {                                       //
                    position: 'relative',                              // 4344
                    height: activeWrap.outerHeight(true)               // 4345
                },                                                     //
                    startStyle = {                                     //
                    position: 'relative',                              // 4348
                    height: 0                                          // 4349
                };                                                     //
                                                                       //
                parent.$obj.addClass('cbp-caption-expand-active');     // 4352
                                                                       //
                // swap endStyle & startStyle                          //
                if (caption.hasClass('cbp-caption-expand-open')) {     // 4355
                    var temp = startStyle;                             // 4356
                    startStyle = endStyle;                             // 4357
                    endStyle = temp;                                   // 4358
                    caption.removeClass('cbp-caption-expand-open');    // 4359
                }                                                      //
                                                                       //
                activeWrap.css(endStyle);                              // 4362
                                                                       //
                parent._gridAdjust();                                  // 4364
                                                                       //
                // reposition the blocks                               //
                parent._layout();                                      // 4367
                                                                       //
                // repositionate the blocks with the best transition available
                parent.positionateItems();                             // 4370
                                                                       //
                // resize main container height                        //
                parent._resizeMainContainer();                         // 4373
                                                                       //
                // set activeWrap to 0 so I can start animation in the next frame
                activeWrap.css(startStyle);                            // 4376
                                                                       //
                // delay animation                                     //
                requestAnimationFrame(function () {                    // 4379
                                                                       //
                    caption.addClass('cbp-caption-expand-open');       // 4381
                                                                       //
                    activeWrap.one(CubePortfolio.Private.transitionend, function () {
                        parent.isAnimating = false;                    // 4384
                        parent.$obj.removeClass('cbp-caption-expand-active');
                                                                       //
                        if (endStyle.height === 0) {                   // 4387
                            caption.removeClass('cbp-caption-expand-open');
                            activeWrap.attr('style', '');              // 4389
                        }                                              //
                    });                                                //
                                                                       //
                    activeWrap.css(endStyle);                          // 4394
                                                                       //
                    if (parent.options.layoutMode === 'slider') {      // 4396
                        parent._updateSlider();                        // 4397
                    }                                                  //
                                                                       //
                    parent._triggerEvent('resizeGrid');                // 4400
                });                                                    //
            });                                                        //
        }, true);                                                      //
    }                                                                  //
                                                                       //
    CaptionExpand.prototype.destroy = function () {                    // 4407
        this.parent.$obj.find('.cbp-caption-defaultWrap').off('click.cbp').parent().removeClass('cbp-caption-expand-active');
    };                                                                 //
                                                                       //
    CubePortfolio.Plugins.CaptionExpand = function (parent) {          // 4411
                                                                       //
        if (parent.options.caption !== 'expand') {                     // 4413
            return null;                                               // 4414
        }                                                              //
                                                                       //
        return new CaptionExpand(parent);                              // 4417
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4422
    'use strict';                                                      // 4423
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4425
                                                                       //
    function BottomToTop(parent) {                                     // 4427
                                                                       //
        // skip next event from core                                   //
        parent._skipNextEvent('delayFrame');                           // 4430
                                                                       //
        parent._registerEvent('initEndWrite', function () {            // 4432
                                                                       //
            parent.blocksOn.each(function (index, item) {              // 4434
                item.style[CubePortfolio.Private.animationDelay] = index * parent.options.displayTypeSpeed + 'ms';
            });                                                        //
                                                                       //
            parent.$obj.addClass('cbp-displayType-bottomToTop');       // 4438
                                                                       //
            // get last element                                        //
            parent.blocksOn.last().one(CubePortfolio.Private.animationend, function () {
                parent.$obj.removeClass('cbp-displayType-bottomToTop');
                                                                       //
                parent.blocksOn.each(function (index, item) {          // 4444
                    item.style[CubePortfolio.Private.animationDelay] = '';
                });                                                    //
                                                                       //
                // trigger event after the animation is finished       //
                parent._triggerEvent('delayFrame');                    // 4449
            });                                                        //
        }, true);                                                      //
    }                                                                  //
                                                                       //
    CubePortfolio.Plugins.BottomToTop = function (parent) {            // 4456
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || parent.options.displayType !== 'bottomToTop' || parent.blocks.length === 0) {
            return null;                                               // 4459
        }                                                              //
                                                                       //
        return new BottomToTop(parent);                                // 4462
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4467
    'use strict';                                                      // 4468
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4470
                                                                       //
    function FadeInToTop(parent) {                                     // 4472
                                                                       //
        // skip next event from core                                   //
        parent._skipNextEvent('delayFrame');                           // 4475
                                                                       //
        parent._registerEvent('initEndWrite', function () {            // 4477
            parent.obj.style[CubePortfolio.Private.animationDuration] = parent.options.displayTypeSpeed + 'ms';
                                                                       //
            parent.$obj.addClass('cbp-displayType-fadeInToTop');       // 4480
                                                                       //
            parent.$obj.one(CubePortfolio.Private.animationend, function () {
                parent.$obj.removeClass('cbp-displayType-fadeInToTop');
                                                                       //
                parent.obj.style[CubePortfolio.Private.animationDuration] = '';
                                                                       //
                // trigger event after the animation is finished       //
                parent._triggerEvent('delayFrame');                    // 4488
            });                                                        //
        }, true);                                                      //
    }                                                                  //
                                                                       //
    CubePortfolio.Plugins.FadeInToTop = function (parent) {            // 4495
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || parent.options.displayType !== 'fadeInToTop' || parent.blocks.length === 0) {
            return null;                                               // 4498
        }                                                              //
                                                                       //
        return new FadeInToTop(parent);                                // 4501
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4506
    'use strict';                                                      // 4507
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4509
                                                                       //
    function LazyLoading(parent) {                                     // 4511
                                                                       //
        // skip next event from core                                   //
        parent._skipNextEvent('delayFrame');                           // 4514
                                                                       //
        parent._registerEvent('initEndWrite', function () {            // 4516
            parent.obj.style[CubePortfolio.Private.animationDuration] = parent.options.displayTypeSpeed + 'ms';
                                                                       //
            parent.$obj.addClass('cbp-displayType-lazyLoading');       // 4519
                                                                       //
            parent.$obj.one(CubePortfolio.Private.animationend, function () {
                parent.$obj.removeClass('cbp-displayType-lazyLoading');
                                                                       //
                parent.obj.style[CubePortfolio.Private.animationDuration] = '';
                                                                       //
                // trigger event after the animation is finished       //
                parent._triggerEvent('delayFrame');                    // 4527
            });                                                        //
        }, true);                                                      //
    }                                                                  //
                                                                       //
    CubePortfolio.Plugins.LazyLoading = function (parent) {            // 4534
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || parent.options.displayType !== 'lazyLoading' && parent.options.displayType !== 'fadeIn' || parent.blocks.length === 0) {
            return null;                                               // 4537
        }                                                              //
                                                                       //
        return new LazyLoading(parent);                                // 4540
    };                                                                 //
})(jQuery, window, document);                                          //
                                                                       //
(function ($, window, document, undefined) {                           // 4545
    'use strict';                                                      // 4546
                                                                       //
    var CubePortfolio = $.fn.cubeportfolio.Constructor;                // 4548
                                                                       //
    function DisplaySequentially(parent) {                             // 4550
                                                                       //
        // skip next event from core                                   //
        parent._skipNextEvent('delayFrame');                           // 4553
                                                                       //
        parent._registerEvent('initEndWrite', function () {            // 4555
                                                                       //
            parent.blocksOn.each(function (index, item) {              // 4557
                item.style[CubePortfolio.Private.animationDelay] = index * parent.options.displayTypeSpeed + 'ms';
            });                                                        //
                                                                       //
            parent.$obj.addClass('cbp-displayType-sequentially');      // 4561
                                                                       //
            // get last element                                        //
            parent.blocksOn.last().one(CubePortfolio.Private.animationend, function () {
                parent.$obj.removeClass('cbp-displayType-sequentially');
                                                                       //
                parent.blocksOn.each(function (index, item) {          // 4567
                    item.style[CubePortfolio.Private.animationDelay] = '';
                });                                                    //
                                                                       //
                // trigger event after the animation is finished       //
                parent._triggerEvent('delayFrame');                    // 4572
            });                                                        //
        }, true);                                                      //
    }                                                                  //
                                                                       //
    CubePortfolio.Plugins.DisplaySequentially = function (parent) {    // 4579
                                                                       //
        if (!CubePortfolio.Private.modernBrowser || parent.options.displayType !== 'sequentially' || parent.blocks.length === 0) {
            return null;                                               // 4582
        }                                                              //
                                                                       //
        return new DisplaySequentially(parent);                        // 4585
    };                                                                 //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
