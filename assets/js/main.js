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

    // Carousels.
    $('.carousel').each(function () {

        var $t = $(this),
            $skillsSection = $t.closest('#skillsSection'),
            $arrowHost = $skillsSection.length ? $skillsSection : $t,
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
            if ($skillsSection.length) {
                $skillsSection.toggleClass('is-carousel-inview', !!inView);
            }
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
            .appendTo($arrowHost)
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
            .appendTo($arrowHost)
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
                scrollTop: $("#bioHeading").offset().top
            },
            1500);
    });
    $("#bioBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#bioHeading").offset().top
            },
            3000);
    });

    $("#lifeBtn").click(function () {
        if (window.__cancelLifeRevealWait) {
            window.__cancelLifeRevealWait();
        }
        if (window.__lifeNavScrollComplete) {
            window.__lifeNavScrollComplete(false);
        }
        window.__lifeNavScrollPending = true;
        $('html,body').animate({
                scrollTop: $("#lifeHeading").offset().top
            },
            2800,
            function () {
                window.__lifeNavScrollPending = false;
                if (window.__setLifeSectionVisible) {
                    window.__setLifeSectionVisible(true);
                }
                if (window.__lifeNavScrollComplete) {
                    window.__lifeNavScrollComplete(true);
                }
                if (window.__beginLifeIntroWhenReady) {
                    window.__beginLifeIntroWhenReady();
                }
            });
    });

    $("#skillsBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#skillsHeader").offset().top
            },
            2500);
    });

    $("#portfolioBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#portfolioHeader").offset().top
            },
            2000);
    });
    $("#contactBtn").click(function () {
        $('html,body').animate({
                scrollTop: $("#contactHeader").offset().top
            },
            1900);
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

    // ScrollMagic — section fade-up (same as portfolio)
    $(document).ready(function () {
        var controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({
            triggerElement: '#bioWrapper'
        })
            .setClassToggle('#bioWrapper .fadeTarget', 'fade-in')
            .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: '#lifeSection',
            triggerHook: 0.75
        })
            .setClassToggle('#lifeSection .fadeTarget', 'fade-in')
            .on('enter', function (e) {
                if (e.scrollDirection === 'REVERSE') return;
                if (window.__setLifeSectionVisible) {
                    window.__setLifeSectionVisible(true);
                }
                if (window.__lifeNavScrollPending) return;
                if (window.__beginLifeIntroWhenReady) {
                    window.__beginLifeIntroWhenReady();
                }
            })
            .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: '#skillsSection',
            triggerHook: 0.75
        })
            .setClassToggle('#skillsSection .fadeTarget', 'fade-in')
            .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: '#features'
        })
            .setClassToggle('#features .fadeTarget', 'fade-in')
            .addTo(controller);
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
        var marker = document.querySelector('.routine-strip__marker');
        var markerBadge = document.querySelector('.routine-strip__marker-badge');
        var markerBadgeIcon = markerBadge ? markerBadge.querySelector('i') : null;
        var scroller = document.querySelector('.routine-strip__scroller');
        var track = document.querySelector('.routine-strip__track');
        var firstDot = document.querySelector('.routine-strip__step:first-child .routine-strip__dot');
        var steps = Array.prototype.slice.call(document.querySelectorAll('.routine-strip__step'));
        if (!marker || !scroller || !track || !firstDot) return;

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

        function parkStepsAtStart() {
            if (!steps || !steps.length) return;
            var trackRect = track.getBoundingClientRect();
            var spanPx = trackRect.width;
            if (!spanPx) return;

            var stepWidth = steps[0].getBoundingClientRect().width || 132;
            var edge = stepWidth / 2;
            var startLeftPx = edge; // 04:00 is t=0 => left = edge

            for (var i = 0; i < steps.length; i++) {
                steps[i].classList.remove('routine-strip__step--slide');
                steps[i].style.left = startLeftPx + 'px';
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

        function getTimelineMinsFromUk(ukMins) {
            var startMins = 4 * 60;
            return (ukMins < startMins) ? (ukMins + 1440) : ukMins;
        }

        function getTargetTimelineMins() {
            var startMins = 4 * 60;
            var endMins = 22 * 60;
            var adj = getTimelineMinsFromUk(getUkMinutesSinceMidnight());
            return clamp(adj, startMins, endMins);
        }

        var animating = false;
        var routineActive = false;
        var introHasPlayed = false;
        var lastProgressT = null;
        var introDurationMs = 2800;
        var sectionFadeMs = 1000;
        var lifeRevealWaitTimer = null;
        var lifeWasVisible = false;
        var lifeNavScrollComplete = true;

        window.__lifeNavScrollPending = false;

        function cancelLifeRevealWait() {
            if (lifeRevealWaitTimer) {
                window.clearTimeout(lifeRevealWaitTimer);
                lifeRevealWaitTimer = null;
            }
        }

        function beginLifeIntroWhenReady() {
            if (introHasPlayed || animating) return;
            if (!lifeNavScrollComplete || window.__lifeNavScrollPending) return;

            var lifeContent = document.querySelector('#lifeSection .life-content');

            function startIntro() {
                cancelLifeRevealWait();
                if (!introHasPlayed && lifeWasVisible) {
                    playIntroAnimation();
                }
            }

            if (!lifeContent || reduceMotion) {
                startIntro();
                return;
            }

            function waitForFadeComplete() {
                var finished = false;

                function done() {
                    if (finished) return;
                    finished = true;
                    startIntro();
                }

                lifeContent.addEventListener('transitionend', function (e) {
                    if (e.target !== lifeContent) return;
                    if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                        done();
                    }
                });

                cancelLifeRevealWait();
                lifeRevealWaitTimer = window.setTimeout(done, sectionFadeMs + 80);
            }

            if (lifeContent.classList.contains('fade-in')) {
                if (parseFloat(window.getComputedStyle(lifeContent).opacity) >= 0.99) {
                    startIntro();
                } else {
                    waitForFadeComplete();
                }
                return;
            }

            var fadeObserver = new MutationObserver(function () {
                if (lifeContent.classList.contains('fade-in')) {
                    fadeObserver.disconnect();
                    waitForFadeComplete();
                }
            });
            fadeObserver.observe(lifeContent, { attributes: true, attributeFilter: ['class'] });

            cancelLifeRevealWait();
            lifeRevealWaitTimer = window.setTimeout(function () {
                fadeObserver.disconnect();
                if (lifeContent.classList.contains('fade-in')) {
                    waitForFadeComplete();
                } else {
                    startIntro();
                }
            }, sectionFadeMs + 200);
        }

        window.__beginLifeIntroWhenReady = beginLifeIntroWhenReady;
        window.__cancelLifeRevealWait = cancelLifeRevealWait;
        window.__lifeNavScrollComplete = function (complete) {
            lifeNavScrollComplete = !!complete;
        };
        window.__setLifeSectionVisible = function (visible) {
            lifeWasVisible = !!visible;
        };
        var startMinsBar = 4 * 60;
        var endMinsBar = 22 * 60;
        var totalBarSpan = (endMinsBar - startMinsBar) || 1;

        function updateMarkerPosition(opts) {
            opts = opts || {};

            layoutStepsEvenHours();

            var startMins = 4 * 60;
            var adj;

            var progressT;

            if (opts.progressT != null) {
                progressT = clamp(opts.progressT, 0, 1);
                lastProgressT = progressT;
                adj = startMinsBar + progressT * totalBarSpan;
            } else if (opts.displayMins != null) {
                adj = opts.displayMins;
                adj = clamp(adj, startMinsBar, endMinsBar);
                progressT = (adj - startMinsBar) / totalBarSpan;
                lastProgressT = progressT;
            } else {
                adj = getTimelineMinsFromUk(getUkMinutesSinceMidnight());
                adj = clamp(adj, startMinsBar, endMinsBar);
                progressT = (adj - startMinsBar) / totalBarSpan;
                lastProgressT = null;
            }

            progressT = clamp(progressT, 0, 1);

            var points = [
                { mins: 4 * 60, pos: 0.0 },        // 4:00 AM
                { mins: 6 * 60, pos: 2 / 18 },     // 6:00 AM
                { mins: 9 * 60, pos: 5 / 18 },     // 9:00 AM
                { mins: 14 * 60, pos: 10 / 18 },   // 2:00 PM
                { mins: 17 * 60, pos: 13 / 18 },   // 5:00 PM
                { mins: 22 * 60, pos: 1.0 },  // 10:00 PM
                { mins: 28 * 60, pos: 1.0 }   // 4:00 AM next day (stay at end overnight)
            ];

            // Current step = latest milestone the marker has reached on the bar.
            var currentIdx = 0;
            for (var ci = 0; ci < 6; ci++) {
                var milestoneT = (points[ci].mins - startMinsBar) / totalBarSpan;
                if (progressT >= milestoneT) currentIdx = ci;
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

            track.style.setProperty('--routine-progress', (progressT * 100).toFixed(2) + '%');

            var trackRect = track.getBoundingClientRect();
            var spanPx = trackRect.width || 1;
            var stepWidth2 = (steps && steps[0]) ? (steps[0].getBoundingClientRect().width || 132) : 132;
            var edge2 = stepWidth2 / 2;
            var usable2 = Math.max(1, spanPx - stepWidth2);
            var leftWithinTrack = edge2 + usable2 * progressT;
            var dotPastPx = 3;

            if (steps && steps.length) {
                var allGrey = !!opts.forceAllUpcoming || progressT <= 0;
                for (var pi = 0; pi < steps.length; pi++) {
                    var stepMins = parseStepMinutes(steps[pi]);
                    var stepT = (stepMins != null) ? ((stepMins - startMinsBar) / totalBarSpan) : 1;
                    var stepLeftPx = edge2 + usable2 * stepT;
                    steps[pi].classList.remove('routine-strip__step--passed');
                    steps[pi].classList.remove('routine-strip__step--dot-passed');
                    steps[pi].classList.remove('routine-strip__step--upcoming');
                    if (!allGrey && stepMins != null && progressT >= stepT) {
                        steps[pi].classList.add('routine-strip__step--passed');
                    } else {
                        steps[pi].classList.add('routine-strip__step--upcoming');
                    }
                    // Bar circles colour only after the profile tile centre moves past the dot.
                    if (!allGrey && stepMins != null && leftWithinTrack > stepLeftPx + dotPastPx) {
                        steps[pi].classList.add('routine-strip__step--dot-passed');
                    }
                }
            }

            // Swap the small badge icon on the purple marker to match the current section.
            // Position rules (per your request):
            // - 4:00->6:00 (sun): top-right
            // - gym/work/lunch/social: bottom-right
            // - sleep (moon): top-right
            if (markerBadge && markerBadgeIcon) {
                // Badge uses the *bar segment* (important for the 14:30 -> 17:00 "back to work" blue segment).
                var badgeKey = 'wake';
                if (adj >= 22 * 60 || adj < 4 * 60) {
                    badgeKey = 'sleep';
                } else if (adj >= 17 * 60) {
                    badgeKey = 'social';
                } else if (adj >= (14 * 60 + 30)) {
                    badgeKey = 'work'; // 14:30 -> 17:00 is blue/work
                } else if (adj >= 14 * 60) {
                    badgeKey = 'lunch'; // 14:00 -> 14:30 is green/lunch
                } else if (adj >= 9 * 60) {
                    badgeKey = 'work';
                } else if (adj >= 6 * 60) {
                    badgeKey = 'gym';
                } else {
                    badgeKey = 'wake';
                }

                var badgeIconByKey = {
                    wake: 'fa-sun',
                    gym: 'fa-dumbbell',
                    work: 'fa-laptop-code',
                    lunch: 'fa-utensils',
                    social: 'fa-users',
                    sleep: 'fa-moon'
                };

                var badgeColorByKey = {
                    wake: '#f3d02c',
                    gym: '#f3aa2c',
                    work: '#33c7e7',
                    lunch: '#37cc74',
                    social: '#9b8cff',
                    sleep: '#b15cff'
                };

                var badgePosClass = (badgeKey === 'wake' || badgeKey === 'sleep')
                    ? 'routine-strip__marker-badge--top-right'
                    : 'routine-strip__marker-badge--bottom-right';

                markerBadge.classList.remove('routine-strip__marker-badge--top-right');
                markerBadge.classList.remove('routine-strip__marker-badge--bottom-right');
                markerBadge.classList.add(badgePosClass);

                // Reset icon classes to the desired one.
                markerBadgeIcon.className = 'fa-solid ' + badgeIconByKey[badgeKey];

                // Solid badge color matching the timeline point.
                markerBadge.style.setProperty('--badge-bg', badgeColorByKey[badgeKey]);
                markerBadge.style.setProperty('--badge-border', 'rgba(255, 255, 255, 0.35)');
            }

            // Position marker inside the scroller so it scrolls with the timeline.
            var leftPx = track.offsetLeft + leftWithinTrack;
            marker.style.left = leftPx + 'px';

            // Keep the marker visible by scrolling the scroller (especially on mobile).
            // Scroll target is relative to track inside scroller.
            var xWithinTrack = leftWithinTrack;
            var targetScrollLeft = xWithinTrack - (scroller.clientWidth / 2);
            targetScrollLeft = clamp(targetScrollLeft, 0, (scroller.scrollWidth - scroller.clientWidth));

            // During intro, scroll must stay locked to the marker (no smooth-scroll lag).
            if (animating || opts.scrollIntoView) {
                scroller.scrollLeft = targetScrollLeft;
            } else if (!reduceMotion) {
                try {
                    scroller.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                } catch (e) {
                    scroller.scrollLeft = targetScrollLeft;
                }
            } else {
                scroller.scrollLeft = targetScrollLeft;
            }
        }

        function setIntroMotion(on) {
            track.classList.toggle('routine-strip--intro-active', !!on);
            marker.classList.toggle('routine-strip--intro-active', !!on);
            if (on) {
                if (steps && steps.length) {
                    for (var si = 0; si < steps.length; si++) {
                        steps[si].classList.add('routine-strip__step--slide');
                    }
                }
            } else if (steps && steps.length) {
                for (var sj = 0; sj < steps.length; sj++) {
                    steps[sj].classList.remove('routine-strip__step--slide');
                }
            }
        }

        function resetRoutineToStart(opts) {
            opts = opts || {};
            var startMins = 4 * 60;
            setIntroMotion(false);
            updateMarkerPosition({
                progressT: 0,
                forceAllUpcoming: true,
                scrollIntoView: !!opts.scrollIntoView
            });
        }

        function playIntroAnimation(opts) {
            opts = opts || {};
            if (animating) return;
            if (introHasPlayed && !opts.force) return;

            var startMins = 4 * 60;
            var targetMins = getTargetTimelineMins();

            if (reduceMotion || targetMins <= startMins) {
                introHasPlayed = true;
                routineActive = true;
                setIntroMotion(false);
                updateMarkerPosition({ scrollIntoView: true });
                return;
            }

            animating = true;
            routineActive = false;
            setIntroMotion(true);
            resetRoutineToStart();

            var targetProgressT = (targetMins - startMins) / totalBarSpan;
            // Same pixels-per-second whether we stop at noon or 10pm (not a fixed 2.8s to target).
            var introRunMs = Math.max(introDurationMs * targetProgressT, 400);
            var t0 = performance.now();

            function tick(now) {
                var elapsed = now - t0;
                var t = clamp(elapsed / introRunMs, 0, 1);
                var progressT = targetProgressT * t;

                updateMarkerPosition({
                    progressT: progressT,
                    scrollIntoView: elapsed < 120
                });

                if (t < 1) {
                    requestAnimationFrame(tick);
                } else {
                    animating = false;
                    introHasPlayed = true;
                    routineActive = true;
                    setIntroMotion(false);
                    updateMarkerPosition({ scrollIntoView: false });
                }
            }

            requestAnimationFrame(tick);
        }

        // Expose for DevTools: window.__playRoutineIntro() / window.__updateRoutineMarker()
        window.__updateRoutineMarker = function () {
            updateMarkerPosition({ scrollIntoView: false });
        };

        window.__playRoutineIntro = function (force) {
            if (force) {
                introHasPlayed = false;
                cancelLifeRevealWait();
            }
            if (force && lifeWasVisible) {
                lifeNavScrollComplete = true;
                beginLifeIntroWhenReady();
            } else {
                playIntroAnimation({ force: !!force });
            }
        };

        window.__activateRoutineMarker = function () {
            window.__playRoutineIntro(true);
        };

        window.__parkRoutineMarkerAtStart = function () {
            routineActive = false;
            resetRoutineToStart({ scrollIntoView: true });
        };

        resetRoutineToStart();

        var lifeSection = document.getElementById('lifeSection');
        if (lifeSection && 'IntersectionObserver' in window) {
            var lifeObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;

                    if (visible && !lifeWasVisible) {
                        lifeWasVisible = true;
                        if (introHasPlayed) {
                            routineActive = true;
                            updateMarkerPosition({ scrollIntoView: false });
                        }
                    } else if (!visible && lifeWasVisible) {
                        lifeWasVisible = false;
                        cancelLifeRevealWait();
                        if (!introHasPlayed) {
                            animating = false;
                            routineActive = false;
                            resetRoutineToStart();
                        }
                    }
                });
            }, { threshold: [0, 0.3, 0.5] });

            lifeObserver.observe(lifeSection);
        } else {
            routineActive = true;
            updateMarkerPosition({ scrollIntoView: false });
        }

        var lastMinuteKey = null;
        var lastOverrideKey = null;
        window.setInterval(function () {
            if (!routineActive || animating) return;
            var now = new Date();
            var minuteKey = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes();
            var overrideKey = HARD_CODED_UK_TIME || (window.__routineUkTimeOverride ? String(window.__routineUkTimeOverride) : '');

            if (minuteKey !== lastMinuteKey || overrideKey !== lastOverrideKey) {
                lastMinuteKey = minuteKey;
                lastOverrideKey = overrideKey;
                updateMarkerPosition({ scrollIntoView: false });
            }
        }, 1000);

        window.addEventListener('resize', function () {
            if (animating && lastProgressT != null) {
                updateMarkerPosition({ progressT: lastProgressT, scrollIntoView: false });
            } else if (routineActive || introHasPlayed) {
                updateMarkerPosition({ scrollIntoView: false });
            } else {
                resetRoutineToStart();
            }
        });
    })();


})(jQuery);
