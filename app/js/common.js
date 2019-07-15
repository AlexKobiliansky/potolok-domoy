$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    /**
     * STICKY NAV
     */
    $(window).scroll(function(){
        sticky_nav();
    });
    sticky_nav();

    function sticky_nav() {
        if($(this).scrollTop() > 30) {
            $('.top-line').addClass('sticky');
        } else {
            $('.top-line').removeClass('sticky');
        }
    }
    /**
     * end STICKY NAV
     */

    //*** Timer ***//
    var timer = $('.timer').FlipClock({
        clockFace: "DailyCounter",
        countdown: true,
        language: 'ru'
    });

    var dt = "August 1 2019 20:20:00";
    var first = new Date(dt);
    var last = Date.now();
    var remain = (first - last)/1000;

    timer.setTime(remain);
    timer.start();
    //*** end Timer ***//


    //*** tabs ***//
    $( ".tabs" ).tabs();
    //*** end tabs ***//


    //*** equal heights ***//
    function heightses() {
        if ($(window).width()>992) {
            $('.roof-item-title').height('auto').equalHeights();
            $('.roof-item-prices').height('auto').equalHeights();
        }
        $('.choose-li-desc').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();
    //*** end equal heights ***//


    $('.choose-img').photoswipe();


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });



    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
