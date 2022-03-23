$(document).ready(function () {
  
    //¸¶¿ì½ºÈÙ
    $('.page').on('mousewheel', function (event, delta) {
        if (delta > 0) {
            var prev = $(this).prev().offset().top;
            $('html, body').stop().animate({ 'scrollTop': prev - 170 }, 1000, 'easeOutExpo');
        } else if (delta < 0) {
            var next = $(this).next().offset().top;
            $('html, body').stop().animate({ 'scrollTop': next - 170 }, 1000, 'easeOutExpo');
        }
    });

});//³¡

