// Для лэзи загрузки


var JSCCommon = {

    LazyFunction: function () {


        // Для лэзи загрузки


        document.addEventListener("DOMContentLoaded", function () {
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let active = false;

            const lazyLoad = function () {
                if (active === false) {
                    active = true;

                    setTimeout(function () {
                        lazyImages.forEach(function (lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                lazyImage.src = lazyImage.dataset.src;
                                // lazyImage.srcset = lazyImage.dataset.srcset;
                                lazyImage.classList.remove("lazy");

                                lazyImages = lazyImages.filter(function (image) {
                                    return image !== lazyImage;
                                });

                                if (lazyImages.length === 0) {
                                    document.removeEventListener("scroll", lazyLoad);
                                    window.removeEventListener("resize", lazyLoad);
                                    window.removeEventListener("orientationchange", lazyLoad);
                                    window.addEventListener("DOMContentLoaded", lazyLoad);
                                }
                            }
                        });

                        active = false;
                    }, 200);
                }
            };

            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
            window.addEventListener("DOMContentLoaded", lazyLoad);
        });


        // лэзи
        document.addEventListener("DOMContentLoaded", function () {
            let lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
            let active = false;

            const lazyLoad = function () {
                if (active === false) {
                    active = true;

                    setTimeout(function () {
                        lazyImages.forEach(function (lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
                                lazyImage.src = lazyImage.dataset.src;
                                // lazyImage.srcset = lazyImage.dataset.srcset;
                                lazyImage.classList.remove("lazy");

                                lazyImages = lazyImages.filter(function (image) {
                                    return image !== lazyImage;
                                });

                                if (lazyImages.length === 0) {
                                    document.removeEventListener("scroll", lazyLoad);
                                    window.removeEventListener("resize", lazyLoad);
                                    window.removeEventListener("orientationchange", lazyLoad);
                                    window.addEventListener("DOMContentLoaded", lazyLoad);
                                }
                            }
                        });

                        active = false;
                    }, 200);
                }
            };

            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
            window.addEventListener("DOMContentLoaded", lazyLoad);
        });


        document.addEventListener("DOMContentLoaded", function () {
            var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

            if ("IntersectionObserver" in window) {
                let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            lazyBackgroundObserver.unobserve(entry.target);
                        }
                    });
                });

                lazyBackgrounds.forEach(function (lazyBackground) {
                    lazyBackgroundObserver.observe(lazyBackground);
                });
            }
        });
    },


    magnificPopupCall: function () {
        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',

            fixedContentPos: true,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in',
            tClose: 'Закрыть (Esc)',
        });

        // / modal window

        // modal галерея
        $(".gal").each(function () {

            $(this).find("a").magnificPopup({
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: true,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                tClose: 'Закрыть (Esc)',
                image: {
                    verticalFit: true,
                    // titleSrc: function(item) {
                    //   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                    // }
                },
                gallery: {
                    enabled: true
                }
            });
        })
        // /modal галерея
    },

    inputMask: function () {
        // mask for input
        $('input[type="tel"]').attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+7(999)999-99-99");
    },


    inputMask: function () {
        // mask for input
        $('input[type="tel"]').attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+7(999)999-99-99");
    },

    customScrollBar: function () {
        $(window).on("load", function () {
            $(".customscrollbar-js").mCustomScrollbar();
        });
    }
};

JSCCommon.LazyFunction();
jQuery(document).ready(function ($) {


    // вызов magnificPopupCall
    JSCCommon.magnificPopupCall();

    JSCCommon.inputMask();
    JSCCommon.customScrollBar();

    // для свг
    svg4everybody({});
    // Custom JS





    if ($("div").is(".s-map-cemetery")) {
        var mapCemeteryContainer = document.createElement('div');
        mapCemeteryContainer.setAttribute("id", "s-map-cemetery");
        document.body.appendChild(mapCemeteryContainer);
        $(".page-body").css({'background-image': 'none'});
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            graveyard({
                containerSelector: '#s-map-cemetery',
                resetButtonSelector: ".s-cemetery__btn--reset",
                mapUrl: 'img/map-cemetery.jpg',
                jsonUrl: '../libs/graveyard/graveyard.json',
                minZoom: 2 / 8,// minZoom: 1/8,
                maxZoom: 2,//maxZoom: 8,
                initialZoom: 10 / 20,//initialZoom: 1,
                mapWidth: 4000,//mapWidth: 1600,
                mapHeight: 2512,//mapHeight: 1200,
                //centerOffsetX: 0,
                centerOffsetY: 300,
                onGraveClick: function (d) {

                    CJSPopup.openHero(d.CODE);

                },//onGraveClick: console.log,
            });
        } else {
            graveyard({
                containerSelector: '#s-map-cemetery',
                //resetButtonSelector: 'button',
                zoomInButtonSelector: '#map-cemetery__zoom-in',
                zoomOutButtonSelector: '#map-cemetery__zoom-out',
                mapUrl: 'img/map-cemetery.jpg',
                jsonUrl: '../libs/graveyard/graveyard.json',
                minZoom: 2 / 8,// minZoom: 1/8,
                maxZoom: 1,//maxZoom: 8,
                initialZoom: 11 / 40,//initialZoom: 1,
                mapWidth: 4000,//mapWidth: 1600,
                mapHeight: 2512,//mapHeight: 1200,
                //centerOffsetX: 0,
                centerOffsetY: 500,
                onGraveClick: function (d) {

                    CJSPopup.openHero(d.CODE);

                },//onGraveClick: console.log,
            });
        }
    }

    // переключение в попапе героя по свайпу
    function onSwipe(direction) {
        let activeInputId = document.querySelector("input:checked").id;
        let inputYes = document.querySelector(".choice-block__input--yes");
        let inputNeutral = document.querySelector(".choice-block__input--neutral");
        let inputNo = document.querySelector(".choice-block__input--no");

        if (direction === 'left') {
            if (activeInputId === 'neutral') {
                inputNeutral.checked = false;
                inputYes.checked = true;
                inputYes.dispatchEvent(new Event('change'));
            } else if (activeInputId === 'no') {
                inputNo.checked = false;
                inputNeutral.checked = true;
                inputNeutral.dispatchEvent(new Event('change'));
            }
        } else if (direction === 'right') {
            if (activeInputId === 'neutral') {
                inputNeutral.checked = false;
                inputNo.checked = true;
                inputNo.dispatchEvent(new Event('change'));
            } else if (activeInputId === 'yes') {
                inputYes.checked = false;
                inputNeutral.checked = true;
                inputNeutral.dispatchEvent(new Event('change'));
            }
        }
    }


    // function onSwipeTextInPopupHero(direction) {
    //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //         let btnClose = document.querySelector(".mfp-close");
    //         if ((direction === 'right') || (direction === 'left')) {
    //             btnClose.click()
    //         }
    //     }
    // }

    $(".choice-block").swipe({
        swipe: function (event, direction) {
            onSwipe(direction);
        },
        threshold: 10
    });

    // $(".form-wrap__body--text-block").swipe({
    //     swipe: function (event, direction) {
    //         onSwipeTextInPopupHero(direction);
    //     },
    //     threshold: 200
    // });


    if ($("div").is("#modal-order2")) {

        $(".js-select-date").select2({
            minimumResultsForSearch: -1
        });
        $(".js-select-time").select2({
            minimumResultsForSearch: -1
        });
    }

    $(document).on("select2:open", "select", function() {
        $('.customscrollbar-js').mCustomScrollbar();
    });



    //QR

    if ($("div").is(".s-qr")) {
        $(".main-wrapper").css('padding-bottom', '0');

        var video = document.createElement("video");
        var canvasElement = document.getElementById("canvas");
        var canvas = canvasElement.getContext("2d");
        var loadingMessage = document.getElementById("loadingMessage");
        var outputContainer = document.getElementById("output");
        var outputMessage = document.getElementById("outputMessage");
        var outputData = document.getElementById("outputData");

        function drawLine(begin, end, color) {
            canvas.beginPath();
            canvas.moveTo(begin.x, begin.y);
            canvas.lineTo(end.x, end.y);
            canvas.lineWidth = 4;
            canvas.strokeStyle = color;
            canvas.stroke();
        }


// Use facingMode: environment to attemt to get the front camera on phones
        navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}}).then(function (stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        });

        function tick() {
            loadingMessage.innerText = "⌛ Loading video..."
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                loadingMessage.hidden = true;
                canvasElement.hidden = false;
                outputContainer.hidden = false;
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                    outputMessage.hidden = true;
                    outputData.parentElement.hidden = false;
                    outputData.innerText = code.data;
                } else {
                    outputMessage.hidden = false;
                    outputData.parentElement.hidden = true;
                }
            }
            requestAnimationFrame(tick);
        }
    }

    //QR close


    // анимация дыма
    var smokeContainer = document.createElement('canvas');
    smokeContainer.setAttribute("id", "smoke");
    smokeContainer.style = 'pointer-events: none; overflow: hidden; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%;';
    document.body.appendChild(smokeContainer);
    var canvasEl = document.getElementById("smoke");
    canvasEl.width = canvasEl.offsetWidth;
    canvasEl.height = canvasEl.offsetHeight;

    var smoke = initSmoke({
        canvasElement: canvasEl,
        emitter: {
            x: canvasEl.width / 2,    // [пиксель] координата x источника частиц
            y: canvasEl.height + 100, // [пиксель] координата y источника частиц
            maxCount: 200,             // максимальное число частиц (влияет на густоту облака)
        },
        particle: {
            imageUrl: './libs/smoke/smoke.png',    // URL картинки для частицы
            startSize: 120,           // [пиксель] начальный размер частицы
            endSize: 800,             // [пиксель] конечный размер частицы
            maxAge: 15,               // [с] сколько времени живёт одна частица (влияет на размер облака)
            maxAlpha: 0.1,            // начальная прозрачность частицы
            xVelocityMean: -0,       // [пиксель/с] горизонтальная скорость разлёта частиц (куда и как быстро летит облако)
            xVelocityAmp: 40,         // [пиксель/с] амплитуда отклонений этой скорости (насколько сильно рассеивается облако)
            yVelocityMean: -10,       // [пиксель/с] вертикальная скорость разлёта частиц (куда и как быстро летит облако)
            yVelocityAmp: 20,         // [пиксель/с] амплитуда отклонений этой скорости (насколько сильно рассеивается облако)
            angularVelocityAmp: 0.5,  // [рад/с] амплитуда угловой скорости частиц
        },
    });

    window.onresize = function () {
        canvasEl.width = canvasEl.offsetWidth;
        canvasEl.height = canvasEl.offsetHeight;
        smoke.moveEmitterTo(canvasEl.width / 2, canvasEl.height + 100)
    };


    $('body').on('click', '.modal-map-mobile-tutorial', function(){
        $('.form-wrap__list-slider').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            adaptiveHeight: true,
            arrows: false
        });
    });




    // туториал карты на десктопе
    // if ($("div").is("#s-map-cemetery")) {
    //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //         return
    //     } else {
    //         $("body").append("<div class=\"map-tutorial\"><a class=\"map-tutorial__close text-primary\">x</a>\n" +
    //             "      <button class=\"form-wrap__btn\">понятно</button>\n" +
    //             "    </div>");
    //         $('body').on('click', '.form-wrap__btn', function(){
    //             $('.map-tutorial').remove()
    //         });
    //         $('body').on('click', '.map-tutorial__close', function(){
    //             $('.map-tutorial').remove()
    //         });
    //     }
    // }



    function shareFB(){
        var fireOnThis = document.getElementsByClassName('fb-share-button').contentWindow.document.querySelector('button');
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent( 'click', true, true );
        fireOnThis.dispatchEvent(evObj);
    }
});


