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
                closeBtnInside: false,
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


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if ($("div").is("#s-map-cemetery")) {
            $(".page-body").css({'background-image': 'none'});
            graveyard({
                containerSelector: '#s-map-cemetery',
                resetButtonSelector: ".s-cemetery__btn--reset",
                mapUrl: 'img/map-cemetery.jpg',
                jsonUrl: '../libs/graveyard/graveyard.json',
                minZoom: 2 / 8,// minZoom: 1/8,
                maxZoom: 1,//maxZoom: 8,
                initialZoom: 16 / 20,//initialZoom: 1,
                mapWidth: 4000,//mapWidth: 1600,
                mapHeight: 2512,//mapHeight: 1200,
                //centerOffsetX: 0,
                centerOffsetY: -350,
                onGraveClick: function (d) {
                    window.alert(d.CODE)
                },//onGraveClick: console.log,
            });
        }
    } else {
        if ($("div").is("#s-map-cemetery")) {
            $(".page-body").css({'background-image': 'none'});
            graveyard({
                containerSelector: '#s-map-cemetery',
                //resetButtonSelector: 'button',
                mapUrl: 'img/map-cemetery.jpg',
                zoomInButtonSelector: '#map-cemetery__zoom-in',
                zoomOutButtonSelector: '#map-cemetery__zoom-out',
                jsonUrl: '../libs/graveyard/graveyard.json',
                minZoom: 2 / 8,// minZoom: 1/8,
                maxZoom: 1,//maxZoom: 8,
                initialZoom: 7 / 20,//initialZoom: 1,
                mapWidth: 4000,//mapWidth: 1600,
                mapHeight: 2512,//mapHeight: 1200,
                //centerOffsetX: 0,
                centerOffsetY: -1050,
                onGraveClick: function (d) {
                    window.alert(d.CODE)
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
            if (activeInputId === 'neutral'){
                inputNeutral.checked = false;
                inputYes.checked = true;
                inputYes.dispatchEvent(new Event('change'));
            } else if (activeInputId === 'no') {
                inputNo.checked = false;
                inputNeutral.checked = true;
                inputNeutral.dispatchEvent(new Event('change'));
            }
        } else if (direction === 'right') {
            if (activeInputId === 'neutral'){
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


    function onSwipeTextInPopupHero(direction) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            let btnClose = document.querySelector(".mfp-close");
            if((direction === 'right') || (direction === 'left')){
                btnClose.click()
            }
        }
    }

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
});



