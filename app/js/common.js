$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

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



    $(document).on('scroll', function() {
        var posDoc = $(this).scrollTop();

        $('section').each(function(){
            var id = $(this).attr("id");
            var topHeader = $(this).offset().top - 100;
            var botHeader = topHeader + $(this).height() - 100;

            if (
                posDoc > topHeader &&
                posDoc < botHeader &&
                id
            ) {
                $('.main-mnu li').removeClass("active");
                $( '.main-mnu li a[href="#' + id + '"]' ).parents("li").addClass("active");
            }
        });
    });

    $(".main-mnu a").mPageScroll2id();

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

    $(".timer").click(function() {
        $('html,body').animate({scrollTop: $('#s-sales').offset().top});
    });

    //*** end Timer ***//


    //*** tabs ***//
    $( ".tabs" ).tabs();
    //*** end tabs ***//


    $('.roofs-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 3,
        margin: 30,
        dots: false,
        navText: ["",""],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    //*** equal heights ***//
    function heightses() {
        if ($(window).width()>992) {
            $('.roof-item-title').height('auto').equalHeights();
            $('.roof-item-prices').height('auto').equalHeights();
            $('.faq-title').height('auto').equalHeights();
        }
        $('.choose-li-desc').height('auto').equalHeights();


        $('.kwiz-slide-underdesc').height('auto').equalHeights();
        $('.kwiz-slide-desc').height('auto').equalHeights();
        $('.kwiz-quest').height('auto').equalHeights();

        // $('.project-img img').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();
    //*** end equal heights ***//


    $('.choose-img').photoswipe();
    $('.project-img').photoswipe();

    var $isotope = $('.projects').isotope({
        itemSelector: '.project-img',
        layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
        $(this).parents('.projects-row').siblings('.projects-row').find('button').removeClass('active');
        $(this).siblings('button').removeClass('active');
        $(this).addClass('active');


        var filterValue = $(this).attr('data-filter');
        $isotope.isotope({ filter: filterValue });
    });

    if ($(window).width()>992) {
        var solSlider = $("#sol-slider").waterwheelCarousel({
            separation: 230,
            opacityMultiplier: 1
        });
    }


    if ($(window).width()<=480) {
        var solSlider = $("#sol-slider").waterwheelCarousel({
            separation: 90,
            opacityMultiplier: 1,
            flankingItems: 1
        });
    }

    if (($(window).width()<=992) && ($(window).width()>480)) {
        var solSlider = $("#sol-slider").waterwheelCarousel({
            separation: 100,
            opacityMultiplier: 1,
            flankingItems: 3
        });
    }

    $('.sol-prev').click(function(){
       solSlider.prev();
    });

    $('.sol-next').click(function(){
        solSlider.next();
    });


    solSlider.on("swipeleft",function(){
        solSlider.next();
    });
    solSlider.on("swiperight",function(){
        solSlider.prev();
    });

    /**
     * FAQ custom
     */
    $('.faq-item-quest').on("click", function(){
        var th = $(this);
        var parent = th.parents('.faq-item');


        parent.toggleClass('active');
        th.siblings('.faq-item-ans').slideToggle();

        parent.siblings('.faq-item').each(function(){
            $(this).removeClass('active');
            $(this).find('.faq-item-ans').slideUp();
        });
    });

    $('.first-faq .faq-item').first().addClass('active').find('.faq-item-ans').css('display', 'block');
    /**
     * end FAQ custom
     */


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


    //*** FORMS ***//
    $("a[href='#popup-form']").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
    });

    var uPhone = $('.user-phone');
    uPhone.mask("(999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(1,1);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $("form").submit(function() { //Change
        var th = $(this);
        th.find('.btn').prop('disabled','disabled');

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $.magnificPopup.open({
                items: {
                    src: '#popup-thanks'
                },
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-request'
            }, 0);

            th.find(".btn").removeAttr('disabled');
            th.trigger("reset");
        });
        return false;
    });
    //** END FORMS **//



    /**
     * YA-MAPS
     */
        //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    //var myMapTemp, myPlacemarkTemp;


    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            }),

            myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: marker,
                // Размеры метки.
                iconImageSize: [32.768, 43],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-16, -40]
            });

        map.geoObjects.add(myPlacemark);
        map.behaviors.disable('scrollZoom');


        //Если нужно сместить центр карты на странице:
        //var position = map.getGlobalPixelCenter();
        //map.setGlobalPixelCenter([ position[0] - 350, position[1] ]);

        //if ($(window).width() <= 1500) {
        //map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
        //}

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = map.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }


    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }


    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.map-wrap').on( "mouseenter", function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    };

    ymap();


    $('form .checkbox').styler();

    $('.preloader').fadeOut();


    /**
     * KWIZ FUNCTIONALITY
     */

    $(function() {
        $("a.kwiz-call").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: true,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in",
            callbacks: {open: initSliders }
        })
    });

    function initSliders() {
        var swiper = new Swiper('.kwiz-slider', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 800,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            onSlideChangeStart: function(){
                // on the first slide
                if (swiper.activeIndex==0) {
                    $('.swiper-button-prev').hide();
                    $('.swiper-button-next').show()
                }
                // most right postion
                else if (swiper.activeIndex == swiper.slides.length-1) {
                    $('.swiper-button-prev').show();
                    $('.swiper-button-next').hide()
                }
                // middle positions
                else {
                    $('.swiper-button-prev').show();
                    $('.swiper-button-next').show()
                }
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
            }
        });

        heightses();
    };


    var step = 1;
    var steps = $('.kwiz-step').length;
    var perStep = Math.round(100/steps);
    var totalPersents = perStep;

    function progressForward(){

        if($('#kwiz-step-'+step).hasClass('last-step')){
            $('#totalpersents').text('95%');
            $('.kwiz-progressbar-width').css('width', '95%');
        } else {
            $('#totalpersents').text(totalPersents+'%');
            $('.kwiz-progressbar-width').css('width', totalPersents + '%');

            totalPersents = totalPersents + perStep;
        }
    }


    $('.kwiz-prev').click(function(){
       getPrevStep();

        $(this).siblings('button').removeClass('clicked');

        if(!$(this).hasClass('clicked')) {
            totalPersents = totalPersents - 2 * perStep;
            $(this).addClass('clicked');

        } else {
            totalPersents = totalPersents - perStep;
        }

        $('#totalpersents').text(totalPersents+'%');
        $('.kwiz-progressbar-width').css('width', totalPersents + '%');

    });

    $('.kwiz-next').click(function(){
        getNextStep();

        $(this).siblings('button').removeClass('clicked');

        $(this).addClass('clicked');
        totalPersents = totalPersents + perStep;

        $('#totalpersents').text(totalPersents+'%');
        $('.kwiz-progressbar-width').css('width', totalPersents + '%');

    });

    function checkNextStep (){
        if ($('#kwiz-step-'+step).hasClass('chosen')) {
            $('.kwiz-next').addClass('active').removeAttr('disabled');
        } else {
            $('.kwiz-next').removeClass('active').prop('disabled', 'disabled');
        }


    }


    function getPrevStep(){
        console.log('get prev');
        $('.kwiz-step-' + step).css("display", 'none');
        step = step - 1;
        if (step > 1) {
            $('.kwiz-prev').addClass('active').removeAttr('disabled');
        } else {
            $('.kwiz-prev').removeClass('active').prop('disabled', 'disabled');
        }
        $('.kwiz-step-'+ step).css('display', 'block');

        checkNextStep();
    }



    function getNextStep(){
        console.log('get next');
        $('.kwiz-step-' + step).css("display", 'none');
        step = step + 1;
        if (step < steps) {
            $('.kwiz-next').addClass('active').removeAttr('disabled');
        } else {
            $('.kwiz-next').removeClass('active').prop('disabled', 'disabled');
        }
        $('.kwiz-step-'+ step).css('display', 'block');

        checkNextStep();
    }


    function changeStep(){
        $('.kwiz-step-'+step+' .kwiz-var').on('click', function () {
            $(this).addClass('chosen');
            $(this).siblings('.kwiz-var').css('pointer-events', 'none').removeClass('chosen');
            $(this).parents('.kwiz-step').addClass("chosen").removeClass('fadeInRight').css('animation-name', 'none');


            $('#kwiz-buttons button').removeClass('clicked');

            var value = $(this).data('value');
            $('#kwiz-ans-'+step).val(value);

            setTimeout(function () {
                $('.kwiz-step-'+ step).css('opacity', '0');
                $('.kwiz-step-'+step+' .kwiz-var').css('pointer-events', 'unset');
            }, 500);

            setTimeout(function () {

                $('.kwiz-step-' + step).css("display", 'none');
                step = step + 1;



                //buttons
                if (step > 1) {
                    $('.kwiz-prev').addClass('active').removeAttr('disabled');
                } else {
                    $('.kwiz-prev').removeClass('active').prop('disabled', 'disabled');
                }

                if(step == steps) {
                    $('.kwiz-buttons').hide();
                    if ($(window).width() < 768) {
                        $('#kwiz-progress').css('width', '100%');
                    }
                } else {

                }

                progressForward();

                changeStep();

                $('.kwiz-step-'+ step).css('display', 'block');
                initSliders();
            }, 800);
        });
    }

    changeStep();

    new WOW().init();

});
