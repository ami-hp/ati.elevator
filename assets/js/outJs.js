
$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('#localSearchSimple').jsLocalSearch({
        "mark_text": "si"
    });
    $('#gsearchsimple').keyup(function () {
        var query = $('#gsearchsimple').val();
        $('#detail').html('');
        $('.list-group').css('visibility', 'visible');
        if (query.length == 2){
            $.ajax({
                url: urls + 'lib/ajax.php',
                method: 'POST',
                data: {query: query},
                success: function (data) {
                    $('.list-content').html(data);
                }
            });
        }
        if (query.length == 0) {
            $('.list-group').css('visibility','hidden');
        }
    });
});

var windowWidth = $(window).width();
var swiper;
var swiperProd;

swiperProd = new Swiper('.swiper-prod', {
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
});

swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    loop: true,
    centeredSlides: true,
    spaceBetween: 10,
});
