$(document).ready(function() {
    //close menu canvas
    $(".js-close-canvas").click(function() {
        $("body").removeClass("open-canvas")
    })

    //open menu canvas
    $(".js-open-canvas").click(function() {
        $("body").addClass("open-canvas")
    })

    if ($('#about .block-progress').length) {
        $('#about .block-progress').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            loop: false,
            prevArrow: '<button class="slick-prev slick-arrow" type="button"><img src="./assets/img/common/icn_arrow_slider_left_01.svg" class="slide-arrow prev-arrow"></button>',
            nextArrow: '<button class="slick-next slick-arrow" type="button"><img src="./assets/img/common/icn_arrow_slider_left_02.svg" class="slide-arrow prev-arrow"></button>',
            responsive: [{
                    breakpoint: 1800,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
    }
});

$(window).resize(function() {

});


// slider page top
$('.top-customer__slider-content').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button class="slick-prev slick-arrow" type="button"><img src="./images/top/icn_next-left.png" class="slide-arrow prev-arrow"></button>',
    nextArrow: '<button class="slick-next slick-arrow" type="button"><img src="./images/top/icn_next-right.png" class="slide-arrow prev-arrow"></button>',
    responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

//slider top-mv
$('.c-top-mv__slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    fade: true,
    cssEase: 'linear',
});

//back-to-top
$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('.c-back-to-top').addClass('show');
    } else {
        $('.c-back-to-top').removeClass('show');
    }
});

$('.c-back-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0, behavior: 'smooth' }, '500');

});