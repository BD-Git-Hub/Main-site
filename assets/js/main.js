/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        settings = {

            // Carousels
            carousels: {
                speed: 4,
                fadeIn: true,
                fadeDelay: 250
            },

        };

    // Breakpoints.
    breakpoints({
        wide: ['1281px', '1680px'],
        normal: ['961px', '1280px'],
        narrow: ['841px', '960px'],
        narrower: ['737px', '840px'],
        mobile: [null, '736px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Dropdowns.
    $('#nav > ul').dropotron({
        mode: 'fade',
        speed: 350,
        noOpenerFade: true,
        alignment: 'center'
    });

    // Scrolly.
    $('.scrolly').scrolly();

    // Nav.

    // Button.


    // Panel.


    // Carousels.
    $('.carousel').each(function () {

        var $t = $(this),
            $forward = $('<span class="forward"></span>'),
            $backward = $('<span class="backward"></span>'),
            $reel = $t.children('.reel'),
            $items = $reel.children('article');

        var pos = 0,
            leftLimit,
            rightLimit,
            itemWidth,
            reelWidth,
            timerId;

        // Measure carousel geometry safely.
        // (Needed for fade-in timing and scroll limits.)
        $t._recalc = function () {
            // outerWidth(true) includes margins, matching the actual spacing in the reel.
            itemWidth = $items.first().outerWidth(true) || $items.first().outerWidth() || 1;
            reelWidth = $reel[0] ? $reel[0].scrollWidth : 0;
        };

        // Keep arrows pinned to the window edges while this carousel is in view.
        // This prevents arrows "scrolling away" if the page can be scrolled horizontally.
        $t._setArrowsInView = function (inView) {
            $t.toggleClass('is-inview', !!inView);
            $t._updateArrowPos();
        };

        $t._updateArrowPos = function () {
            if (!$t.hasClass('is-inview'))
                return;

            var top = ($t.offset().top - $window.scrollTop()) + ($t.outerHeight() / 2);
            $forward.css('top', top + 'px');
            $backward.css('top', top + 'px');
        };

        // Items.
        if (settings.carousels.fadeIn) {

            $items.addClass('loading');

            $t.scrollex({
                mode: 'middle',
                top: '-20vh',
                bottom: '-20vh',
                enter: function () {
                    $t._setArrowsInView(true);

                    var timerId,
                        iw = itemWidth || $items.first().outerWidth(true) || $items.first().outerWidth() || 1,
                        limit = $items.length - Math.ceil($window.width() / iw);

                    timerId = window.setInterval(function () {
                        var x = $items.filter('.loading'),
                            xf = x.first();

                        if (x.length <= limit) {

                            window.clearInterval(timerId);
                            $items.removeClass('loading');
                            return;

                        }

                        xf.removeClass('loading');

                    }, settings.carousels.fadeDelay);

                }
                ,
                leave: function () {
                    $t._setArrowsInView(false);
                }
            });

        }

        // Main.
        $t._update = function () {
            pos = 0;
            rightLimit = (-1 * reelWidth) + $window.width();
            leftLimit = 0;
            $t._updatePos();
        };

        $t._updatePos = function () {
            $reel.css('transform', 'translate(' + pos + 'px, 0)');
        };

        // Forward.
        $forward
            .appendTo($t)
            .hide()
            .mouseenter(function (e) {
                timerId = window.setInterval(function () {
                    pos -= settings.carousels.speed;

                    if (pos <= rightLimit) {
                        window.clearInterval(timerId);
                        pos = rightLimit;
                    }

                    $t._updatePos();
                }, 10);
            })
            .mouseleave(function (e) {
                window.clearInterval(timerId);
            });

        // Backward.
        $backward
            .appendTo($t)
            .hide()
            .mouseenter(function (e) {
                timerId = window.setInterval(function () {
                    pos += settings.carousels.speed;

                    if (pos >= leftLimit) {

                        window.clearInterval(timerId);
                        pos = leftLimit;

                    }

                    $t._updatePos();
                }, 10);
            })
            .mouseleave(function (e) {
                window.clearInterval(timerId);
            });

        // Init.
        $window.on('load', function () {

            $t._recalc();

            if (browser.mobile) {

                $reel
                    .css('overflow-y', 'hidden')
                    .css('overflow-x', 'scroll')
                    .scrollLeft(0);
                $forward.hide();
                $backward.hide();

            } else {

                $reel
                    .css('overflow', 'visible')
                    .scrollLeft(0);
                $forward.show();
                $backward.show();

            }

            $t._update();

            $window.on('resize', function () {
                $t._recalc();
                $t._update();
                $t._updateArrowPos();
            }).trigger('resize');

            $window.on('scroll', function () {
                $t._updateArrowPos();
            });

        });

    });

    //navigation button to specific areas on scroll using Jquery 

    $("#startBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#bioTitleHeader").offset().top
            },
            1500);
    });
    $("#bioBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#main").offset().top
            },
            3000);
    });

    $("#skillsBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#skillsHeader").offset().top
            },
            2500);
    });

    $("#projectBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#projectsHeader").offset().top
            },
            2000);
    });
    $("#contactBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#contactHeader").offset().top
            },
            1900);
    });

    //hide hiddenDiv 
    /* $('#hiddenDiv').hide();
     $('#hiddenDiv img').fadeTo(0, 0, function () {});

     //show Div buttons 
     $("#showDivBtn").click(function () {
         $('#hiddenDiv').show(1000);
         $('#hiddenDiv img').delay(1000).fadeTo(1000, 1, function () {});

     });*/

    $('#hiddenDiv').hide(1000);
    $('#hiddenDiv img').fadeTo(0, 0, function () {});
    var x = true;
    $("#showDivBtn").click(function () {
        if (x) {
            $('#hiddenDiv').show(1000);
            $('#hiddenDiv img').delay(1000).fadeTo(1000, 1, function () {});
        } else {

            $('#hiddenDiv img').fadeTo(1000, 0, function () {});
            $('#hiddenDiv').delay(1000).hide(1000);


        }
        x = !x;
    });



    //skills section buttons 
    var state = true;
    $("#webSkillsBtn").on("click", function () {
        if (state) {
            $("#webSkillsBtn").css({
                backgroundColor: "#e8e8e8"
            }, 1000);
            /*$(".webskills").toggle("slow", function () {});*/
            $(".webskills").toggle("slow", function () {});

        } else {
            $("#webSkillsBtn").css({
                backgroundColor: "#df7366"
            }, 1000);
            $(".webskills").toggle("slow", function () {});
        }
        state = !state;
    });

    var state1 = true;
    $("#iSkillsBtn").on("click", function () {
        if (state1) {
            $("#iSkillsBtn").css({
                backgroundColor: "#e8e8e8"
            }, 1000);
            $(".iSkills").toggle("slow", function () {});
        } else {
            $("#iSkillsBtn").css({
                backgroundColor: "#df7366"
            }, 1000);
            $(".iSkills").toggle("slow", function () {});
        }
        state1 = !state1;
    });

    var state2 = true;
    $("#3dSkillsBtn").on("click", function () {
        if (state2) {
            $("#3dSkillsBtn").css({
                backgroundColor: "#e8e8e8"
            }, 1000);
            $(".3dSkills").toggle("slow", function () {});
        } else {
            $("#3dSkillsBtn").css({
                backgroundColor: "#df7366"
            }, 1000);
            $(".3dSkills").toggle("slow", function () {});
        }
        state2 = !state2;
    });

    //scroll magic 

    //init Scrollmagic 
    $(document).ready(function () {
        var controller = new ScrollMagic.Controller();

        //build a scene
        var ourScene = new ScrollMagic.Scene({
                triggerElement: '.fadeTarget'

            })
            .setClassToggle('.fadeTarget', 'fade-in') //adds class fade-in to fadeTarget
            //.addIndicators() - requires plugin
            .addTo(controller);

        var ourScene = new ScrollMagic.Scene({
            triggerElement: '.fadeTargetTwo'
        })

        var ourScene = new ScrollMagic.Scene({
            triggerElement: '.fadeTargetThree'
        })

        var ourScene = new ScrollMagic.Scene({
            triggerElement: '.fadeTargetFour'
        })
        var ourScene = new ScrollMagic.Scene({
            triggerElement: '.fadeTargetFive'
        })
    });



    //-------------------PARALLAX BACKGROUND-----------------//
    (function () {
        var $parallax = $('#parallax_background');
        if ($parallax.length === 0) return;
        var headerEl = document.getElementById('header');
        if (!headerEl) return;

        // Disable on touch/coarse pointers + respect reduced motion.
        var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!finePointer || reduceMotion) return;

        // Only update 2 CSS variables per frame for smoothness.
        // CSS handles per-layer multipliers via calc().
        $parallax.css({ '--px': '0px', '--py': '0px' });

        var latestX = 0;
        var latestY = 0;
        var ticking = false;
        var scrolling = false;
        var scrollEndTimer;
        var active = true;

        function markScrolling() {
            scrolling = true;
            window.clearTimeout(scrollEndTimer);
            scrollEndTimer = window.setTimeout(function () {
                scrolling = false;
            }, 150);
        }

        window.addEventListener('scroll', markScrolling, { passive: true });
        window.addEventListener('wheel', markScrolling, { passive: true });
        window.addEventListener('touchmove', markScrolling, { passive: true });

        function apply() {
            ticking = false;

            // Avoid updating many layered transforms while the page is scrolling (main-thread contention).
            if (scrolling) {
                return;
            }

            var w = window.innerWidth || 1;
            var h = window.innerHeight || 1;
            var dx = (latestX / w - 0.5) * 2; // -1..1
            var dy = (latestY / h - 0.5) * 2; // -1..1

            // Clamp so it never goes crazy if the browser reports weird values.
            if (dx > 1) dx = 1;
            if (dx < -1) dx = -1;
            if (dy > 1) dy = 1;
            if (dy < -1) dy = -1;

            // Base movement in px (CSS multiplies this per layer).
            var px = (dx * 1).toFixed(3) + 'px';
            var py = (dy * 1).toFixed(3) + 'px';
            $parallax.css({ '--px': px, '--py': py });
        }

        function onMouseMove(e) {
            if (!active) return;
            latestX = e.clientX;
            latestY = e.clientY;

            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(apply);
            }
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Pause the heavy layered scene when the hero is off-screen.
        // This keeps scrolling smooth in the rest of the page.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                var entry = entries && entries[0];
                var inView = !!(entry && entry.isIntersecting);

                active = inView;
                $body.toggleClass('parallax-off', !inView);

                if (!inView) {
                    // Reset movement so it doesn't "jump" when you return.
                    $parallax.css({ '--px': '0px', '--py': '0px' });
                }
            }, { root: null, threshold: 0.01 });

            io.observe(headerEl);
        }
    })();

    //-------------------UK TIME ROUTINE MARKER-----------------//
    (function () {
        var card = document.querySelector('.routine-strip__card');
        var marker = document.querySelector('.routine-strip__marker');
        var scroller = document.querySelector('.routine-strip__scroller');
        var track = document.querySelector('.routine-strip__track');
        var firstDot = document.querySelector('.routine-strip__step:first-child .routine-strip__dot');
        var steps = Array.prototype.slice.call(document.querySelectorAll('.routine-strip__step'));
        if (!card || !marker || !scroller || !track || !firstDot) return;

        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Hardcode a time for testing (set to e.g. "12:04", or null to disable).
        var HARD_CODED_UK_TIME = null;

        function parseStepMinutes(stepEl) {
            if (!stepEl) return null;
            var timeEl = stepEl.querySelector('.routine-strip__time');
            if (!timeEl) return null;
            var txt = (timeEl.textContent || '').trim(); // e.g. "6:00 AM"
            var m = txt.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
            if (!m) return null;
            var h = parseInt(m[1], 10);
            var min = parseInt(m[2], 10);
            var ap = String(m[3]).toUpperCase();
            if (isNaN(h) || isNaN(min)) return null;
            if (h === 12) h = 0;
            if (ap === 'PM') h += 12;
            return (h * 60) + min;
        }

        function layoutStepsEvenHours() {
            if (!steps || !steps.length) return;
            var trackRect = track.getBoundingClientRect();
            var spanPx = trackRect.width;
            if (!spanPx) return;

            // Even-hour ruler from 04:00 -> 22:00 (18 hours).
            var start = 4 * 60;
            var end = 22 * 60;
            var total = (end - start) || 1;

            // Respect responsive step width.
            var stepWidth = steps[0].getBoundingClientRect().width || 132;
            var edge = stepWidth / 2;
            var usable = Math.max(1, spanPx - stepWidth);

            for (var i = 0; i < steps.length; i++) {
                var mins = parseStepMinutes(steps[i]);
                if (mins == null) continue;
                var t = (mins - start) / total; // 0..1
                t = clamp(t, 0, 1);
                var leftPx = edge + usable * t;
                steps[i].style.left = leftPx + 'px';
            }
        }

        function getUkMinutesSinceMidnight() {
            // 0) Hard-coded test mode (strongest override).
            if (HARD_CODED_UK_TIME) {
                var hard = String(HARD_CODED_UK_TIME).trim();
                var hm0 = hard.match(/^(\d{1,2}):(\d{2})$/);
                if (hm0) {
                    var hh0 = parseInt(hm0[1], 10);
                    var mm0 = parseInt(hm0[2], 10);
                    if (!isNaN(hh0) && !isNaN(mm0) && hh0 >= 0 && hh0 <= 23 && mm0 >= 0 && mm0 <= 59) {
                        return (hh0 * 60) + mm0;
                    }
                }
            }

            // Optional manual override for testing in DevTools:
            // window.__routineUkTimeOverride = "23:50" (HH:MM, 24-hour)
            if (typeof window !== 'undefined' && window.__routineUkTimeOverride) {
                var raw = String(window.__routineUkTimeOverride).trim();
                var m = raw.match(/^(\d{1,2}):(\d{2})$/);
                if (m) {
                    var oh = parseInt(m[1], 10);
                    var om = parseInt(m[2], 10);
                    if (!isNaN(oh) && !isNaN(om) && oh >= 0 && oh <= 23 && om >= 0 && om <= 59) {
                        return (oh * 60) + om;
                    }
                }
            }

            // Use the visitor's clock, but read it in the UK time zone (Europe/London).
            var parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/London',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).formatToParts(new Date());

            var hh = 0, mm = 0;
            for (var i = 0; i < parts.length; i++) {
                if (parts[i].type === 'hour') hh = parseInt(parts[i].value, 10) || 0;
                if (parts[i].type === 'minute') mm = parseInt(parts[i].value, 10) || 0;
            }
            return (hh * 60) + mm;
        }

        function clamp(n, a, b) {
            return Math.max(a, Math.min(b, n));
        }

        function updateMarkerPosition(opts) {
            opts = opts || {};

            // Lay out the steps as an even-hour ruler before measuring dots.
            layoutStepsEvenHours();

            var ukMins = getUkMinutesSinceMidnight();

            // Map time to the bar using your timeline "stops" (4:00, 6:00, 9:00, 14:00, 17:00, 22:00).
            // Metaphor: it's a ruler with special tick marks; we slide between the nearest ticks.
            var startMins = 4 * 60; // 4:00 AM
            var adj = (ukMins < startMins) ? (ukMins + 1440) : ukMins; // after midnight -> continue past 22:00

            var points = [
                { mins: 4 * 60, pos: 0.0 },        // 4:00 AM
                { mins: 6 * 60, pos: 2 / 18 },     // 6:00 AM
                { mins: 9 * 60, pos: 5 / 18 },     // 9:00 AM
                { mins: 14 * 60, pos: 10 / 18 },   // 2:00 PM
                { mins: 17 * 60, pos: 13 / 18 },   // 5:00 PM
                { mins: 22 * 60, pos: 1.0 },  // 10:00 PM
                { mins: 28 * 60, pos: 1.0 }   // 4:00 AM next day (stay at end overnight)
            ];

            // Move the "current step" highlight (dot + tile) to match the time.
            // We pick the latest tick that is <= the current time (e.g. 06:00 -> Gym).
            var currentIdx = 0;
            for (var ci = 0; ci < 6; ci++) {
                if (adj >= points[ci].mins) currentIdx = ci;
            }
            if (steps && steps.length) {
                for (var s = 0; s < steps.length; s++) {
                    steps[s].classList.remove('routine-strip__step--current');
                    steps[s].classList.remove('routine-strip__step--focus');
                    steps[s].removeAttribute('aria-current');
                }
                if (steps[currentIdx]) {
                    steps[currentIdx].classList.add('routine-strip__step--current');
                    steps[currentIdx].setAttribute('aria-current', 'true');
                }
            }

            // Position the marker using the *real dot centers* (not a % of the track),
            // so at 6:00 AM it sits exactly above the 6:00 dot (and the Gym tile under it).
            var trackRect = track.getBoundingClientRect();
            var dots = track.querySelectorAll('.routine-strip__dot');
            if (!dots || dots.length < 2) return;

            var dotCenters = [];
            for (var di = 0; di < dots.length; di++) {
                var r = dots[di].getBoundingClientRect();
                dotCenters.push(r.left + (r.width / 2));
            }

            // Times for the visible dots (the 6 steps).
            var dotTimes = [
                4 * 60,   // Wake
                6 * 60,   // Gym
                9 * 60,   // Work
                14 * 60,  // Lunch
                17 * 60,  // Social
                22 * 60   // Sleep
            ];

            var x = dotCenters[0];
            if (adj <= dotTimes[0]) {
                x = dotCenters[0];
            } else if (adj >= 28 * 60) {
                x = dotCenters[dotCenters.length - 1];
            } else if (adj >= dotTimes[dotTimes.length - 1]) {
                // After 10pm, keep it pinned to the last dot.
                x = dotCenters[dotCenters.length - 1];
            } else {
                for (var ti = 0; ti < dotTimes.length - 1; ti++) {
                    var ta = dotTimes[ti];
                    var tb = dotTimes[ti + 1];
                    if (adj >= ta && adj <= tb) {
                        var span2 = (tb - ta) || 1;
                        var u2 = (adj - ta) / span2;
                        x = dotCenters[ti] + (dotCenters[ti + 1] - dotCenters[ti]) * u2;
                        break;
                    }
                }
            }

            // Position marker relative to the card, because marker is absolutely positioned inside the card.
            var cardRect = card.getBoundingClientRect();
            var leftPx = x - cardRect.left;
            marker.style.left = leftPx + 'px';

            // Keep the marker visible by scrolling the scroller (especially on mobile).
            // Scroll target is relative to track inside scroller.
            var xWithinTrack = x - trackRect.left;
            var targetScrollLeft = xWithinTrack - (scroller.clientWidth / 2);
            targetScrollLeft = clamp(targetScrollLeft, 0, (scroller.scrollWidth - scroller.clientWidth));

            if (opts.scrollIntoView) {
                scroller.scrollLeft = targetScrollLeft;
            } else if (!reduceMotion) {
                // Smooth scroll when allowed.
                try {
                    scroller.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                } catch (e) {
                    scroller.scrollLeft = targetScrollLeft;
                }
            } else {
                scroller.scrollLeft = targetScrollLeft;
            }
        }

        // Initial placement.
        updateMarkerPosition({ scrollIntoView: true });

        // Expose a manual trigger for testing in DevTools:
        // window.__updateRoutineMarker()
        window.__updateRoutineMarker = function () {
            updateMarkerPosition({ scrollIntoView: false });
        };

        // Update frequently, but only do work when needed.
        // (This makes DevTools overrides feel instant, without heavy layout churn.)
        var lastMinuteKey = null;
        var lastOverrideKey = null;
        window.setInterval(function () {
            var now = new Date();
            var minuteKey = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes();
            var overrideKey = HARD_CODED_UK_TIME || (window.__routineUkTimeOverride ? String(window.__routineUkTimeOverride) : '');

            if (minuteKey !== lastMinuteKey || overrideKey !== lastOverrideKey) {
                lastMinuteKey = minuteKey;
                lastOverrideKey = overrideKey;
                updateMarkerPosition({ scrollIntoView: false });
            }
        }, 1000);

        // Recalculate on resize because widths change.
        window.addEventListener('resize', function () {
            updateMarkerPosition({ scrollIntoView: false });
        });
    })();


})(jQuery);
