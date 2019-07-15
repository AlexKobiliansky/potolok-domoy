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
            $('.faq-title').height('auto').equalHeights();
        }
        $('.choose-li-desc').height('auto').equalHeights();
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
        $("#sol-slider").waterwheelCarousel({
            separation: 230,
            opacityMultiplier: 1
        });
    }


    if ($(window).width()<480) {
        $("#sol-slider").waterwheelCarousel({
            separation: 90,
            opacityMultiplier: 1,
            flankingItems: 1
        });
    }

    if ($(window).width()<=768) {
        $("#sol-slider").waterwheelCarousel({
            separation: 100,
            opacityMultiplier: 1,
            flankingItems: 3
        });
    }

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

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

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


});
