//show popup 
function togglePopup() {
    const openPopup = document.getElementById("popup");
    openPopup.style.display === 'none' ? openPopup.style.display = "block" : openPopup.style.display = "none";
}
//show popup confirm delete
function handlePopup() {
    const showPopup = document.getElementById("popupDelete");
    showPopup.style.display === 'none' ? showPopup.style.display = "block" : showPopup.style.display = "none";
}

//custom date input
$(".calendar").datepicker({
    dateFormat: 'yy/dd/mm',
    language: 'ja',
    firstDay: 1
});

$(document).on('click', '.date-picker .input', function (e) {
    let $me = $(this),
        $parent = $me.parents('.date-picker');
    $parent.toggleClass('open');
});


$(".calendar").on("change", function () {
    let $me = $(this),
        $selected = $me.val(),
        $parent = $me.parents('.date-picker');
    $parent.find('.result').children('span').html($selected);
});


//custom dropdown
$(function () {
    const list = $('.js-dropdown-list');
    const link = $('.js-link');
    link.click(function (e) {
        e.preventDefault();
        list.slideToggle(200);
    });
    list.find('li').click(function () {
        let text = $(this).find("label").html();
        // let icon = '<i class="fa fa-chevron-down"></i>';
        link.html(text);
        list.slideToggle(200);
        if (text === '* Reset') {
            link.html('会社/自宅/その他');
        }
    });

});

$(function showDrop() {
    let count = 0;
    const item = $('.js-dropdown-lists');
    const links = $('#js-links');
    const buttonSubmit = $('#button-submit');
    const handleClass = 'p-u-create-booking__content__group-handle';
    const handleClassClicked = 'p-u-create-booking__content__group-handle-clicked';
    links.click(function (e) {
        e.preventDefault();
        item.slideToggle(200);
        if (count % 2 == 0) {
            buttonSubmit.removeClass(handleClass).addClass(handleClassClicked);
        }
        else {
            buttonSubmit.removeClass(handleClassClicked).addClass(handleClass);
        }
        count++;
    });
    item.find('li').click(function () {
        let text = $(this).find(".text-label").html();
        // let icon = '<i class="fa fa-chevron-down"></i>';
        links.html(text);
        item.slideToggle(200);
        if (text === '* Reset') {
            links.html('会社/自宅/その他');
        }
    });
});



//cusstom tabs calendar
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})


//cusstom tabs list-payment
const tabsPay = document.querySelectorAll('data-tab-target')
const tabContentsPay = document.querySelectorAll('[data-tab-content]')

tabsPay.forEach(tabPay => {
    tabPay.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContentsPay.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabsPay.forEach(tab => {
            tabPay.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})



//custom select
$('.customSelect').each(function () {
    var $this = $(this),
        selectOptions = $(this).children('option').length;

    $this.addClass('hide-select');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="custom-select"></div>');

    var $customSelect = $this.next('div.custom-select');
    $customSelect.text($this.children('option').eq(0).text());

    var $optionlist = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($customSelect);

    for (var i = 0; i < selectOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($optionlist);
    }

    var $optionlistItems = $optionlist.children('li');

    $customSelect.click(function (e) {
        e.stopPropagation();
        $('div.custom-select.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').slideToggle();
    });

    $optionlistItems.click(function (e) {
        e.stopPropagation();
        $customSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $optionlist.hide();
    });

    $(document).click(function () {
        $customSelect.removeClass('active');
        $optionlist.hide();
    });

});


//custom checkbox automatic
function cbChange(obj) {
    const cbs = document.getElementsByClassName("cb");
    cbs = true ? cbs = false : '';
}


// //checkall list-payment
$("#checkAll").click(function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});



// show and hiden faq
$(".p-u-faq__list__question").click(function () {
    $(this).toggleClass("show");
    $(this).find(".p-u-faq__list__answer").slideToggle();
})