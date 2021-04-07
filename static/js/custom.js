'use strict'

$(document).ready(function() {
    $('select').niceSelect();

    AOS.init();
    window.addEventListener('load', AOS.refresh);

    if (jQuery(".testimonial-slider").length > 0) {
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }
    if (jQuery(".testimonial-slider-l5").length > 0) {
        $('.testimonial-slider-l5').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            responsive: [{
                breakpoint: 575,
                settings: {
                    arrows: false,
                }
            }]
        });
    }
    if (jQuery(".product-details-v-slider").length > 0) {
        $('.product-details-v-slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            focusOnSelect: true,
            vertical: true,
            asNavFor: '.product-details-slider',
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        vertical: false
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        vertical: false
                    }
                }
            ]
        });
    }
    if (jQuery(".job-site-page .job-feature-slider").length > 0) {
        $('.job-site-page .job-feature-slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.job-site-page .job-feature-slider-arrows',
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    if (jQuery(".product-details-slider").length > 0) {
        $('.product-details-slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.product-details-v-slider'
        });
    }
    if (jQuery(".testimonial-slider-l6").length > 0) {
        $('.testimonial-slider-l6').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            responsive: [{
                breakpoint: 575,
                settings: {
                    arrows: false,
                }
            }]
        });
    }
    $('#l5-pricing-btn .toggle-btn').on("click", function(e) {
        console.log($(e.target).parent().parent().hasClass("monthly-active"))
        $(e.target).toggleClass("clicked");
        if ($(e.target).parent().parent().hasClass("monthly-active")) {
            $(e.target).parent().parent().removeClass("monthly-active").addClass("yearly-active");
        } else {
            $(e.target).parent().parent().removeClass("yearly-active").addClass("monthly-active");
        }
    })

    $("#pricing-deck-trigger").on("click", function(e) {
        var getActive = $(e.target).attr("data-active");
        $(e.target).addClass("active");
        $(e.target).siblings().removeClass("active");
        if (getActive == "yearly-active" && !$("#pricing-card-deck").hasClass(getActive)) {
            $("#pricing-card-deck").addClass(getActive);
            $("#pricing-card-deck").removeClass("monthly-active");
        }
        if (getActive == "monthly-active" && !$("#pricing-card-deck").hasClass(getActive)) {
            $("#pricing-card-deck").addClass(getActive);
            $("#pricing-card-deck").removeClass("yearly-active");
        }
    })



    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });


    $('.count-btn').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parent('.count-input-btns').parent().find('input').val();
        if ($button.hasClass('inc-ammount')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent('.count-input-btns').parent().find('input').val(newVal);
    });


    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".sticky-header").addClass("scrolling");
        } else {
            $(".sticky-header").removeClass("scrolling");
        }
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            $(".sticky-header.scrolling").addClass("reveal-header");
        } else {
            $(".sticky-header.scrolling").removeClass("reveal-header");
        }
    }
})




$(window).load(function() {
    setTimeout(function() {
        $('#loading').fadeOut(500);
    }, 1000);
    setTimeout(function() {
        $('#loading').remove();
    }, 2000);
})




$(document).ready(function() {
    // Add smooth scrolling to all links
    $(".goto").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 2000, function() {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    $("[data-pricing-trigger]").on("click", function(e) {
        $(e.target).toggleClass("active");
        var target = $(e.target).attr("data-target");
        console.log($(target).attr("data-value-active") == "monthly");
        if ($(target).attr("data-value-active") == "monthly") {
            $(target).attr("data-value-active", "yearly");
        } else {
            $(target).attr("data-value-active", "monthly");
        }
    })
});



function increseNumber() {
    $('.input--amount-control').on('click', function(e) {
        var $button = $(e.target);
        var oldValue = $button.parent('.input--amount-control').find('input').val();
        if ($button.hasClass('amount-inc-btn')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent('.input--amount-control').find('input').val(newVal);
    });
}

// function cartFunctionality(){

// }
increseNumber();

$('#datepicker').datepicker({
    icons: {
        rightIcon: '<i class="far fa-calendar date-picker-icon"></i>'
    }
});
/* Counter-up plugin activation */
if ($.fn.counterUp) {
    $('.counter').counterUp({
        // delay: 10,
        time: 1000
    });
}

$('#viewCart').on('click', function(e){

    $.ajax({
        url: '/api/payment/orders',
        type: "POST",
        success: (response) => {
            $('#cartModal').modal('show')
            window.paymentDetails = response
        },
        error: (error) => {
            console.log(error);
        }
    })

})

const clearToast = (id) => {
    setTimeout(() => {
        document.getElementById(id).innerHTML = ''
    }, 10000)
}

const toast = {
    success: (msg) => {
        var toastBar = document.getElementById('toast-bar')
        var id = 'toast-' + Date.now()
        toastBar.innerHTML += 
        `<div id='${id}'>
            <div data-aos="fade-down" data-aos-once="true" class="toast show p-4 rounded-10 text-white bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-body p-5">
                ${msg}
                </div>
            </div>
        </div>`
       clearToast(id)
    },
    error: (msg) => {
        var toastBar = document.getElementById('toast-bar')
        var id = 'toast-' + Date.now()
        toastBar.innerHTML += 
        `<div id='${id}'>
            <div data-aos="fade-down" data-aos-once="true" class="toast show p-4 rounded-10 text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-body p-5">
                ${msg}
                </div>
            </div>
        </div>`
        clearToast(id)
    },
    
}


function clearCart(){
    fetch('/api/cart/clear').then(res => {
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <div class="container">
            <strong>Cart Cleared Successfully</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      </div>`
    }).catch(err => {
        alert("Some error occured.")
    })
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
  }

function checkDemo(link){

    if(getCookie('customer')){
        $('#videoModal').modal('show')
    }
    else{

        $('#demoModal').modal('show')

        $('#watchDemoBtn').click(() => {

            document.getElementById('watchDemoBtn').innerHTML = '<img src="/static/image/animations/loading-circle.gif" style="filter: invert(1);" height="24px">'

            const name = document.getElementById('name').value
            const mobile = document.getElementById('mobile').value
            const course = document.getElementById('course-name').innerText
            const city = document.getElementById('city').value

            $.ajax({
                url :'/payment/sendotp',
                type: "POST", 
                data: {mobile}, 
                success: (response) => {
                    $('#demoModal').modal('hide')
                    document.getElementById('showMobile').innerText = mobile
                    $('#codeModal').modal({
                        show: true, 
                        backdrop: false
                    })

                    $('#verifyOTP').click(() => {

                        const code = document.getElementById('code').value

                        document.getElementById('verifyOTP').innerHTML = '<img src="/static/image/animations/loading-circle.gif" style="filter: invert(1);" height="24px">'

                        $.ajax({
                            url :'/api/course/watchdemo',
                            type: "POST", 
                            data: {name, mobile, city, course, hashed: response.hashed, code}, 
                            success: (response) => {
                                $('#codeModal').modal('hide')
                                document.getElementById('videoFrame').src = link
                                setCookie('customer', response.customer._id)
                                $('#videoModal').modal('show')
                            },
                            error: function(error){
            
                                $('#codeModal').modal('hide')
                                toast.error('Invalid OTP')
                            }
                        })

                    })


                },
                error: function(error){
                    $('#demoModal').modal('hide')
                    document.getElementById('watchDemoBtn').innerHTML = 'Proceed'
                    toast.error(error.responseText)
                }
            })
        })
    }

}
