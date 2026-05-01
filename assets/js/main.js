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

        // Items.
        if (settings.carousels.fadeIn) {

            $items.addClass('loading');

            $t.scrollex({
                mode: 'middle',
                top: '-20vh',
                bottom: '-20vh',
                enter: function () {

                    var timerId,
                        limit = $items.length - Math.ceil($window.width() / itemWidth);

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

            reelWidth = $reel[0].scrollWidth;

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
                reelWidth = $reel[0].scrollWidth;
                $t._update();
            }).trigger('resize');

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

        function apply() {
            ticking = false;

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

        $window.on('mousemove', function (e) {
            latestX = e.clientX;
            latestY = e.clientY;

            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(apply);
            }
        });
    })();


})(jQuery);
