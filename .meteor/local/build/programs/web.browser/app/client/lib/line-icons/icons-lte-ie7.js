(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/line-icons/icons-lte-ie7.js                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */
                                                                       //
window.onload = function () {                                          // 3
	function addIcon(el, entity) {                                        // 4
		var html = el.innerHTML;                                             // 5
		el.innerHTML = '<span style="font-family: \'Simple-Line-Icons\'">' + entity + '</span>' + html;
	}                                                                     //
	var icons = {                                                         // 8
		'icon-user-unfollow': '&#xe000;',                                    // 9
		'icon-user-friends': '&#xe001;',                                     // 10
		'icon-user-following': '&#xe002;',                                   // 11
		'icon-user-follow': '&#xe003;',                                      // 12
		'icon-trophy': '&#xe004;',                                           // 13
		'icon-speedometer': '&#xe005;',                                      // 14
		'icon-social-youtube': '&#xe006;',                                   // 15
		'icon-social-twitter': '&#xe007;',                                   // 16
		'icon-social-tumblr': '&#xe008;',                                    // 17
		'icon-social-facebook': '&#xe009;',                                  // 18
		'icon-social-dropbox': '&#xe00a;',                                   // 19
		'icon-social-dribbble': '&#xe00b;',                                  // 20
		'icon-shield': '&#xe00c;',                                           // 21
		'icon-screen-tablet': '&#xe00d;',                                    // 22
		'icon-screen-smartphone': '&#xe00e;',                                // 23
		'icon-screen-desktop': '&#xe00f;',                                   // 24
		'icon-plane': '&#xe010;',                                            // 25
		'icon-notebook': '&#xe011;',                                         // 26
		'icon-moustache': '&#xe012;',                                        // 27
		'icon-mouse': '&#xe013;',                                            // 28
		'icon-magnet': '&#xe014;',                                           // 29
		'icon-magic-wand': '&#xe015;',                                       // 30
		'icon-hourglass': '&#xe016;',                                        // 31
		'icon-graduation': '&#xe017;',                                       // 32
		'icon-ghost': '&#xe018;',                                            // 33
		'icon-game-controller': '&#xe019;',                                  // 34
		'icon-fire': '&#xe01a;',                                             // 35
		'icon-eyeglasses': '&#xe01b;',                                       // 36
		'icon-envelope-open': '&#xe01c;',                                    // 37
		'icon-envelope-letter': '&#xe01d;',                                  // 38
		'icon-energy': '&#xe01e;',                                           // 39
		'icon-emoticon-smile': '&#xe01f;',                                   // 40
		'icon-disc': '&#xe020;',                                             // 41
		'icon-cursor-move': '&#xe021;',                                      // 42
		'icon-crop': '&#xe022;',                                             // 43
		'icon-credit-card': '&#xe023;',                                      // 44
		'icon-chemistry': '&#xe024;',                                        // 45
		'icon-bell': '&#xe025;',                                             // 46
		'icon-badge': '&#xe026;',                                            // 47
		'icon-anchor': '&#xe027;',                                           // 48
		'icon-action-redo': '&#xe028;',                                      // 49
		'icon-action-undo': '&#xe029;',                                      // 50
		'icon-bag': '&#xe02a;',                                              // 51
		'icon-basket': '&#xe02b;',                                           // 52
		'icon-basket-loaded': '&#xe02c;',                                    // 53
		'icon-book-open': '&#xe02d;',                                        // 54
		'icon-briefcase': '&#xe02e;',                                        // 55
		'icon-bubbles': '&#xe02f;',                                          // 56
		'icon-calculator': '&#xe030;',                                       // 57
		'icon-call-end': '&#xe031;',                                         // 58
		'icon-call-in': '&#xe032;',                                          // 59
		'icon-call-out': '&#xe033;',                                         // 60
		'icon-compass': '&#xe034;',                                          // 61
		'icon-cup': '&#xe035;',                                              // 62
		'icon-diamond': '&#xe036;',                                          // 63
		'icon-direction': '&#xe037;',                                        // 64
		'icon-directions': '&#xe038;',                                       // 65
		'icon-docs': '&#xe039;',                                             // 66
		'icon-drawer': '&#xe03a;',                                           // 67
		'icon-drop': '&#xe03b;',                                             // 68
		'icon-earphones': '&#xe03c;',                                        // 69
		'icon-earphones-alt': '&#xe03d;',                                    // 70
		'icon-feed': '&#xe03e;',                                             // 71
		'icon-film': '&#xe03f;',                                             // 72
		'icon-folder-alt': '&#xe040;',                                       // 73
		'icon-frame': '&#xe041;',                                            // 74
		'icon-globe': '&#xe042;',                                            // 75
		'icon-globe-alt': '&#xe043;',                                        // 76
		'icon-handbag': '&#xe044;',                                          // 77
		'icon-layers': '&#xe045;',                                           // 78
		'icon-map': '&#xe046;',                                              // 79
		'icon-picture': '&#xe047;',                                          // 80
		'icon-pin': '&#xe048;',                                              // 81
		'icon-playlist': '&#xe049;',                                         // 82
		'icon-present': '&#xe04a;',                                          // 83
		'icon-printer': '&#xe04b;',                                          // 84
		'icon-puzzle': '&#xe04c;',                                           // 85
		'icon-speech': '&#xe04d;',                                           // 86
		'icon-vector': '&#xe04e;',                                           // 87
		'icon-wallet': '&#xe04f;',                                           // 88
		'icon-arrow-down': '&#xe050;',                                       // 89
		'icon-arrow-left': '&#xe051;',                                       // 90
		'icon-arrow-right': '&#xe052;',                                      // 91
		'icon-arrow-up': '&#xe053;',                                         // 92
		'icon-bar-chart': '&#xe054;',                                        // 93
		'icon-bulb': '&#xe055;',                                             // 94
		'icon-calendar': '&#xe056;',                                         // 95
		'icon-control-end': '&#xe057;',                                      // 96
		'icon-control-forward': '&#xe058;',                                  // 97
		'icon-control-pause': '&#xe059;',                                    // 98
		'icon-control-play': '&#xe05a;',                                     // 99
		'icon-control-rewind': '&#xe05b;',                                   // 100
		'icon-control-start': '&#xe05c;',                                    // 101
		'icon-cursor': '&#xe05d;',                                           // 102
		'icon-dislike': '&#xe05e;',                                          // 103
		'icon-equalizer': '&#xe05f;',                                        // 104
		'icon-graph': '&#xe060;',                                            // 105
		'icon-grid': '&#xe061;',                                             // 106
		'icon-home': '&#xe062;',                                             // 107
		'icon-like': '&#xe063;',                                             // 108
		'icon-list': '&#xe064;',                                             // 109
		'icon-login': '&#xe065;',                                            // 110
		'icon-logout': '&#xe066;',                                           // 111
		'icon-loop': '&#xe067;',                                             // 112
		'icon-microphone': '&#xe068;',                                       // 113
		'icon-music-tone': '&#xe069;',                                       // 114
		'icon-music-tone-alt': '&#xe06a;',                                   // 115
		'icon-note': '&#xe06b;',                                             // 116
		'icon-pencil': '&#xe06c;',                                           // 117
		'icon-pie-chart': '&#xe06d;',                                        // 118
		'icon-question': '&#xe06e;',                                         // 119
		'icon-rocket': '&#xe06f;',                                           // 120
		'icon-share': '&#xe070;',                                            // 121
		'icon-share-alt': '&#xe071;',                                        // 122
		'icon-shuffle': '&#xe072;',                                          // 123
		'icon-size-actual': '&#xe073;',                                      // 124
		'icon-size-fullscreen': '&#xe074;',                                  // 125
		'icon-support': '&#xe075;',                                          // 126
		'icon-tag': '&#xe076;',                                              // 127
		'icon-trash': '&#xe077;',                                            // 128
		'icon-umbrella': '&#xe078;',                                         // 129
		'icon-wrench': '&#xe079;',                                           // 130
		'icon-ban': '&#xe07a;',                                              // 131
		'icon-bubble': '&#xe07b;',                                           // 132
		'icon-camcorder': '&#xe07c;',                                        // 133
		'icon-camera': '&#xe07d;',                                           // 134
		'icon-check': '&#xe07e;',                                            // 135
		'icon-clock': '&#xe07f;',                                            // 136
		'icon-close': '&#xe080;',                                            // 137
		'icon-cloud-download': '&#xe081;',                                   // 138
		'icon-cloud-upload': '&#xe082;',                                     // 139
		'icon-doc': '&#xe083;',                                              // 140
		'icon-envelope': '&#xe084;',                                         // 141
		'icon-eye': '&#xe085;',                                              // 142
		'icon-flag': '&#xe086;',                                             // 143
		'icon-folder': '&#xe087;',                                           // 144
		'icon-heart': '&#xe088;',                                            // 145
		'icon-info': '&#xe089;',                                             // 146
		'icon-key': '&#xe08a;',                                              // 147
		'icon-link': '&#xe08b;',                                             // 148
		'icon-lock': '&#xe08c;',                                             // 149
		'icon-lock-open': '&#xe08d;',                                        // 150
		'icon-magnifier': '&#xe08e;',                                        // 151
		'icon-magnifier-add': '&#xe08f;',                                    // 152
		'icon-magnifier-remove': '&#xe090;',                                 // 153
		'icon-paper-clip': '&#xe091;',                                       // 154
		'icon-paper-plane': '&#xe092;',                                      // 155
		'icon-plus': '&#xe093;',                                             // 156
		'icon-pointer': '&#xe094;',                                          // 157
		'icon-power': '&#xe095;',                                            // 158
		'icon-refresh': '&#xe096;',                                          // 159
		'icon-reload': '&#xe097;',                                           // 160
		'icon-settings': '&#xe098;',                                         // 161
		'icon-star': '&#xe099;',                                             // 162
		'icon-symbol-female': '&#xe09a;',                                    // 163
		'icon-symbol-male': '&#xe09b;',                                      // 164
		'icon-target': '&#xe09c;',                                           // 165
		'icon-user-female': '&#xe09d;',                                      // 166
		'icon-user-male': '&#xe09e;',                                        // 167
		'icon-volume-1': '&#xe09f;',                                         // 168
		'icon-volume-2': '&#xe0a0;',                                         // 169
		'icon-volume-off': '&#xe0a1;'                                        // 170
	},                                                                    //
	    els = document.getElementsByTagName('*'),                         //
	    i,                                                                //
	    attr,                                                             //
	    c,                                                                //
	    el;                                                               //
	for (i = 0;; i += 1) {                                                // 174
		el = els[i];                                                         // 175
		if (!el) {                                                           // 176
			break;                                                              // 177
		}                                                                    //
		attr = el.getAttribute('data-icon');                                 // 179
		if (attr) {                                                          // 180
			addIcon(el, attr);                                                  // 181
		}                                                                    //
		c = el.className;                                                    // 183
		c = c.match(/icon-[^\s'"]+/);                                        // 184
		if (c && icons[c[0]]) {                                              // 185
			addIcon(el, icons[c[0]]);                                           // 186
		}                                                                    //
	}                                                                     //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
