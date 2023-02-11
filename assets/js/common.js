jQuery(function() {
    //custom video controls
    $(".custom-video-area").each(function() {
        // Video
        var $video_container = $(this);
        var $video = $(this).find("#video-element");
      
        // Video Controls
        var $video_controls = $(this).find(".video-controls");
        var $button_controls = $(this).find(".bottom-wrapper");
        var $progress_bar = $(this).find(".progress-bar");
        var $progress = $(this).find(".time-bar");
        var $buffer_bar = $(this).find(".buffer-bar");
        var $play_button = $(this).find(".play-button");
        var $mute_button = $(this).find(".sound-button");
      
        var $volume_wrapper = $(this).find(".volume");
        var $volume_bar = $(this).find(".volume-bar");
      
        var $full_screen_btn = $(this).find(".btnFS");
        var $current = $(this).find(".current");
        var $duration = $(this).find(".duration");
        var $fast_fwd = $(this).find("#fastFwd");
      
        // Toggles play/pause for the video
        function playVideo() {
            if ($video[0].paused) {
                $video[0].play();
                $video_controls.addClass("playing");
        
                if ($video_container.parents(".video-header").length) {
                $video_container.parents(".video-header").addClass("playing");
                }
            } else {
                $video[0].pause();
                $video_controls.removeClass("playing");
                $video_container.parents(".video-header").removeClass("playing");
            }
        }
      
        function updateVolume(x, vol) {
            if (vol) {
                $percentage = vol * 100;
            } else {
                $position = x - $volume_wrapper.offset().left;
                $percentage = 100 * $position / $volume_wrapper.width();
            }
        
            if ($percentage > 100) {
                $percentage = 100;
            }
            if ($percentage < 0) {
                $percentage = 0;
            }
      
            //update volume bar and video volume
            $volume_bar.css("width", $percentage + "%");
            $video[0].volume = $percentage / 100;
        
            if ($video[0].volume == 0) {
                $mute_button.removeClass("sound-med").addClass("sound-muted");
            } else if ($video[0].volume > 0.5) {
                $mute_button.removeClass("sound-muted").addClass("sound-med");
            } else {
                $mute_button.removeClass("sound-muted").removeClass("sound-med");
            }
        }
      
        function changeSpeed() {
            if ($video[0].playbackRate === 1) {
                $video[0].playbackRate = 2;
                $fast_fwd.text("2x Speed");
            } else if ($video[0].playbackRate === 2) {
                $video[0].playbackRate = 1;
                $fast_fwd.text("1x Speed");
            }
        }
      
        function launchFullscreen() {
            if ($video[0].requestFullscreen) {
                $video[0].requestFullscreen();
            } else if ($video[0].mozRequestFullScreen) {
                $video[0].mozRequestFullScreen();
            } else if ($video[0].webkitRequestFullscreen) {
                $video[0].webkitRequestFullscreen();
            } else if ($video[0].msRequestFullscreen) {
                $video[0].msRequestFullscreen();
            }
        }
      
        function time_format(seconds) {
            var m = Math.floor(seconds / 60) < 10
                ? "0" + Math.floor(seconds / 60)
                : Math.floor(seconds / 60);
            var s = Math.floor(seconds - m * 60) < 10
                ? "0" + Math.floor(seconds - m * 60)
                : Math.floor(seconds - m * 60);
            return m + ":" + s;
        }
      
        function startBuffer() {
            $current_buffer = $video[0].buffered.end(0);
            $max_duration = $video[0].duration;
            $perc = 100 * $current_buffer / $max_duration;
            $buffer_bar.css("width", $perc + "%");
        
            if ($current_buffer < $max_duration) {
                setTimeout(startBuffer, 500);
            }
        }
      
        function updatebar(x) {
            $position = x - $progress.offset().left;
            $percentage = 100 * $position / $progress_bar.width();
            if ($percentage > 100) {
                $percentage = 100;
            }
            if ($percentage < 0) {
                $percentage = 0;
            }
            $progress.css("width", $percentage + "%");
            $video[0].currentTime = $video[0].duration * $percentage / 100;
        }
      
        $video.on("loadedmetadata", function() {
            $current.text(time_format(0));
            $duration.text(time_format($video[0].duration));
            updateVolume(0, 0.7);
            setTimeout(startBuffer, 150);
        });
      
        // Play/pause on video click
        $video.click(function() {
            playVideo();
        });
      
        // Video duration timer
        $video.on("timeupdate", function() {
            $current.text(time_format($video[0].currentTime));
            $duration.text(time_format($video[0].duration));
            var currentPos = $video[0].currentTime;
            var maxduration = $video[0].duration;
            var perc = 100 * $video[0].currentTime / $video[0].duration;
            $progress.css("width", perc + "%");
        });
      
        /* VIDEO CONTROLS
              ------------------------------------------------------- */
      
        // Hide button controls when video is playing
        $video_container.on("mouseleave", function() {
            if ($video[0].paused === false) {
                $video_container.addClass("playing");
            }
        });
      
        // Show button controls on hover
        $video_container.on("mouseover", function() {});
      
        // Play/pause on button click
        $play_button.click(function() {
          playVideo();
        });
      
        // Fast Forward Button
        $fast_fwd.click(function() {
          changeSpeed();
        });
      
        // Volume Drag
        var volumeDrag = false;
        $volume_wrapper.on("mousedown", function(e) {
          volumeDrag = true;
          $video[0].muted = false;
          $mute_button.removeClass("muted");
          updateVolume(e.pageX);
        });
      
        $(document).on("mouseup", function(e) {
          if (volumeDrag) {
            volumeDrag = false;
            updateVolume(e.pageX);
          }
        });
      
        $(document).on("mousemove", function(e) {
          if (volumeDrag) {
            updateVolume(e.pageX);
          }
        });
      
        // Mute video on button click
        $mute_button.click(function() {
          $video[0].muted = !$video[0].muted;
          $(this).toggleClass("sound-muted");
          if ($video[0].muted) {
            $volume_bar.css("width", 0);
          } else {
            $volume_bar.css("width", $video[0].volume * 100 + "%");
          }
        });
      
        // Full Screen Button
        $full_screen_btn.click(function() {
          launchFullscreen();
        });
      
        // VIDEO PROGRESS BAR
        //when video timebar clicked
        var timeDrag = false; /* check for drag event */
        $progress_bar.on("mousedown", function(e) {
          timeDrag = true;
          updatebar(e.pageX);
        });
        $(document).on("mouseup", function(e) {
          if (timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
          }
        });
        $(document).on("mousemove", function(e) {
          if (timeDrag) {
            updatebar(e.pageX);
          }
        });
    });

    //copy clipboard
    $(".p-profile-payments__box__action").click(function(){
        var range = document.createRange();
        var node = $(this).parent().children().children()[1];
        range.selectNode(node);
        window.getSelection().removeAllRanges(); 
        window.getSelection().addRange(range); 
        document.execCommand("copy");
        window.getSelection().removeAllRanges();

        $(".p-profile-payments__copied").fadeIn(1000);
        setTimeout(() => {
            $(".p-profile-payments__copied").fadeOut(1000);
        }, 2000);
    })
    $(".p-profile-payments__copied").hide();


    // toggle notification delete
    $(".p-notification__btn-delete").click(function(){
        $(".p-notification").addClass("p-notification--delete")
    });
    $(".p-notification__group-btn button").click(function(){
        $(".p-notification").removeClass("p-notification--delete")
    });
    $(".p-notification__group-btn a").click(function(){
        $(".p-notification").removeClass("p-notification--delete")
    });


    //show hide password
    $(".c-form__toggle-password").click(function() {
        let inputPassword = $(this).parent().find(".c-form__password");
        
        $(this).toggleClass("show")
        if (inputPassword.attr("type") == "password") {
            inputPassword.attr("type", "text");
        } else {
            inputPassword.attr("type", "password");
        }
    });

    //check all checkboxs
    $('#selectall').click(function () {
        $('.selectedId').prop('checked', this.checked);
    });

    $('.selectedId').change(function () {
        var check = ($('.selectedId').filter(":checked").length == $('.selectedId').length);
        $('#selectall').prop("checked", check);
    });

    //show hide faq
    $(".p-top-search__faq__question").click(function(){
        $(this).toggleClass("show");
        $(this).find(".p-top-search__faq__answer").slideToggle();
    })
    $(".p-top-faq__list__question").click(function(){
        $(this).toggleClass("show");
        $(this).find(".p-top-faq__list__answer").slideToggle();
    })
    $(".p-page-faq__list__question").click(function(){
        $(this).toggleClass("show");
        $(this).find(".p-page-faq__list__answer").slideToggle();
    })
    

    // top driver slider
    $('.p-top-driver__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: true,
        arrow: false,
        prevArrow: "",
        nextArrow: "",
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    $('.p-top-driver__jobs__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        dots: false,
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><img src="./assets/img/top-driver/icn_arrow_slider_left_01.svg" class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><img src="./assets/img/top-driver/icn_arrow_slider_left_02.svg" class="slide-arrow prev-arrow"></button>',
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //top details
    $('.p-top-details__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: true,
        arrow: false,
        prevArrow: "",
        nextArrow: "",
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //top search
    $('.p-top-search__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: true,
        arrow: false,
        prevArrow: "",
        nextArrow: "",
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //top faq
    $('.p-top-faq__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: true,
        arrow: false,
        prevArrow: "",
        nextArrow: "",
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //top register
    $('.p-top-register__slider').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: true,
        arrow: false,
        prevArrow: "",
        nextArrow: "",
        responsive: [{
                breakpoint: 959,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //custom date input
    $( ".calendar" ).datepicker({
        dateFormat: 'yy/dd/mm',
		firstDay: 1
	});

    //customs select
    $(".custom-select").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");
        var template =  '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + '08:00-09:00'+ '<span>' + 'AM' + '</span>' + '</span>';
            template += '<div class="custom-options">';
            $(this).find("option").each(function() {
                template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
        template += '</div></div>';
        
        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function(event) {
        $('html').one('click',function() {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });

    //avatar upload
    $("#imageUpload").change(function(data){

        var imageFile = data.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
    
        reader.onload = function(evt){
            $('.p-register-info__avatar-preview img').attr('src', evt.target.result);
            $('.p-register-info__avatar-preview img').hide();
            $('.p-register-info__avatar-preview img').fadeIn(650);
        }
    });

    //img upload
    upload("#imageUpload1")
    upload("#imageUpload2")
    upload("#imageUpload3")
    upload("#imageUpload4")
    upload("#imageUpload5")
});


//upload
function upload(elementId){
    $(elementId).change(function(data){

        var imageFile = data.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
    
        var root = $(this).parent().parent();

        reader.onload = function(evt){
            
            root.find('.p-register-upload-materials__avatar-preview').css('border', '1px solid #ccc');
            root.find('.p-register-upload-materials__avatar-preview img').attr('src', evt.target.result);
            root.find('.p-register-upload-materials__avatar-preview img').hide();
            root.find('.p-register-upload-materials__avatar-preview img').fadeIn(650);
        }
    });
}


// Chat message
$(document).ready(function(){
    "use strict";

    //elements
    var conversation = $('.conversation');
    var lastSentMessages = $('.messages--sent:last-child');
    var textbar = $('.text-bar__input input');
    var textForm = $('#form-message');
    var thumber = $('.text-bar__thumb');

    var scrollTop = $(window).scrollTop();

    var Message = {
        currentText: "test",
        init: function(){
            var base = this;
            base.send();
        },
        send: function(){
            var base = this;
            textForm.submit(function( event ) {
                event.preventDefault();
                base.createGroup();
                base.saveText();
                if(base.currentText != ''){
                    base.createMessage();
                    base.scrollDown();
                }
            });
        },
        saveText: function(){
            var base = this;
            base.currentText = textbar.val();
            textbar.val('');
        },
        createMessage: function(){
            var base = this;
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes();
            lastSentMessages.append($('<div/>')
                            .addClass('message')
                            .text(base.currentText)
                            .append(`
                                <div class="message__bottom">
                                    <div class="message__icon-seen">
                                        <img src="./../assets/img/driver/common/icn_sended.svg" alt="">
                                    </div>
                                    <div class="message__time">${time}</div>
                                </div>
                            `));
        },
        createGroup: function(){
            if($('.messages:last-child').hasClass('messages--received')){
                conversation.append($('<div/>')
                            .addClass('messages messages--sent'));
                lastSentMessages = $('.messages--sent:last-child');
            }
        },
        scrollDown: function(){
            var base = this;
            //conversation.scrollTop(conversation[0].scrollHeight);
            conversation.stop().animate({
                scrollTop: conversation[0].scrollHeight
            }, 500);
        }
    };

    var Thumb = {
        init: function(){
            var base = this;
            base.send();
        },
        send: function(){
            var base = this;
            thumber.on("mousedown", function(){
                Message.createGroup();
                base.create();
                base.expand();
            });
        },
        expand: function(){
            var base = this;
            var thisThumb = lastSentMessages.find('.message:last-child');
            var size = 20;
            
            var expandInterval = setInterval(function(){ expandTimer() }, 30);
            
            function stopExpand(){
                base.stopWiggle();
                clearInterval(expandInterval);
            }
            
            var firstExpand = false;
            function expandTimer() {
                
                if(size >= 130){
                    stopExpand();
                    base.remove();
                }
                else{
                    if(size>50){
                        size += 2;
                        thisThumb.removeClass('anim-wiggle');
                        thisThumb.addClass('anim-wiggle-2');
                    }
                    else{
                        size += 1;
                        thisThumb.addClass()
                    }
                    thisThumb.width(size);
                    thisThumb.height(size);
                    if(firstExpand){
                        conversation.scrollTop(conversation[0].scrollHeight);
                    }
                    else{
                        Message.scrollDown();
                        firstExpand = true;
                    }
                }
            }
            
            thumber.on("mouseup", function(){
                stopExpand();
            });
        },
        create: function(){
            lastSentMessages.append(
                $('<div/>').addClass('message message--thumb thumb anim-wiggle')
            );
        },
        remove: function(){
            lastSentMessages.find('.message:last-child').animate({
                width: 0,
                height: 0
            }, 300);
            setTimeout(function(){
                lastSentMessages.find('.message:last-child').remove();
            }, 300);
        },
        stopWiggle: function(){
            lastSentMessages.find('.message').removeClass('anim-wiggle');
            lastSentMessages.find('.message').removeClass('anim-wiggle-2');
        }
    }

    var newMessage = Object.create(Message);
    newMessage.init();

    var newThumb = Object.create(Thumb);
    newThumb.init();
    
})

