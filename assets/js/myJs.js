var urls = location.origin + "/";
$("#mainContent").toggleClass("scroll-y-hide");
$(document).ready(function () {
    $("#loader-start").toggleClass("invisible");
    var ajax;
    var pageHeight = $(window).height();
    var pageWidth = $(window).width();
    var child;

    function getMaxHeight(selector, height) {
        $(selector).css({"max-height": pageHeight - height + "px"});
    }

    function getMinHeight(selector, height) {
        $(selector).css({"min-height": pageHeight - height + "px"});
    }
    function getMaxWidth(selector, width) {
        $(selector).css({"max-width": pageWidth - width + "px"});
    }
    function getMinWidth(selector, width) {
        $(selector).css({"min-width": pageWidth - width + "px"});
    }
    function replaceClass(selector , currentClass , newClass) {
        $(selector).toggleClass(currentClass).toggleClass(newClass);
    }
    function trimWords(selector){//change number of words depending on width in the category blog page
        var maxLength;
        if(pageWidth > 1000 || pageWidth >= 400 && pageWidth < 768){
            maxLength = 90 // maximum number of characters to extract
        }
        else if (pageWidth >= 768 && pageWidth < 1000){
            maxLength = 50
        }
        else if (pageWidth < 400){
            maxLength = 30
        }
        /*else if (pageWidth >= 1279){
            maxLength = 400
        }*/
        $(selector).each(function () {
            var trimmedStringOriginal = $(this).html().trim();

            //trim the string to the maximum length
            var trimmedString = trimmedStringOriginal.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            $(this).html(trimmedString + "...");
        });
    }
    function trimWordsLBox(selector){//change number of words depending on width in the category blog page
        var maxLength;
        if(pageWidth > 1000 || pageWidth >= 350 && pageWidth < 768){
            maxLength = 150 // maximum number of characters to extract
        }
        else if (pageWidth >= 768 && pageWidth < 1000){
            maxLength = 60
        }
        else if (pageWidth < 350){
            maxLength = 50
        }
        $(selector).each(function () {
            var trimmedStringOriginal = $(this).html().trim();

            //trim the string to the maximum length
            var trimmedString = trimmedStringOriginal.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            $(this).html(trimmedString + "...");
        });
    }
    trimWords(".trimmed-words");
    trimWordsLBox(".news-trim");

    $(".window").height($(window).height());
    getMaxHeight(".inbox-items" , 185);

    $(window).resize(function (){
        pageHeight = $(window).height();
        pageWidth = $(window).width();

        $(".window").height($(window).height());
        getMaxHeight(".inbox-items" , 185);
    });
//calsses

    //slider starts (created by AMI)
    var step = 4;
    var to = 0;
    var zero = 0;
    function elevateDown() {
        step--;
        var pageHeight = $(window).height();
        $('img[alt="door-left"]').toggleClass("left0");
        $('img[alt="door-right"]').toggleClass("right0");
        $(".active-mainbox").next().toggleClass("active-mainbox");
        $(".active-mainbox").first().toggleClass("active-mainbox");
        var child = $(".active-mainbox").attr("data-child");
        if(zero===1){
            //$("#mainContent").addClass("scroll-y-hide");
            setTimeout(function () {
                $("#mainContent").scrollTop(pageHeight * child);
                //stop = pageHeight * child;
            },1000);
        }
        setTimeout(function () {
            $('img[alt="door-left"]').toggleClass("left0");
            $('img[alt="door-right"]').toggleClass("right0");
            $('.mythis').next().toggleClass("hide").toggleClass("active-floor");
            $('.mythis').toggleClass("hide").toggleClass("active-floor");
            $(".active-floor").toggleClass("mythis",true);
            $(".active-floor").prev().toggleClass("mythis",false);
            setTimeout(function () {
                //$("#mainContent").removeClass("scroll-y-hide");
                to--;
                zero--;

            } , 500);
        },2000);
    }
    function elevateUp() {
        step++;
        var pageHeight = $(window).height();
        $('img[alt="door-left"]').toggleClass("left0");
        $('img[alt="door-right"]').toggleClass("right0");
        var child = $(".active-mainbox").attr("data-child");
        $(".active-mainbox").prev().toggleClass("active-mainbox");
        $(".active-mainbox").last().toggleClass("active-mainbox");

        if(zero===1){
            //$("#mainContent").addClass("scroll-y-hide");
            setTimeout(function () {
                $("#mainContent").scrollTop(pageHeight * (child-1));
                //stop = pageHeight * (child-1);
            },1000);
        }
        setTimeout(function () {
            $('img[alt="door-left"]').toggleClass("left0");
            $('img[alt="door-right"]').toggleClass("right0");
            $('.mythis').prev().toggleClass("hide").toggleClass("active-floor");
            $('.mythis').toggleClass("hide").toggleClass("active-floor");
            $(".active-floor").toggleClass("mythis",true);
            $(".active-floor").next().toggleClass("mythis",false);
            setTimeout(function () {
                //$("#mainContent").removeClass("scroll-y-hide");
                to--;
                zero--;
            } , 500);
        },2000);
    }
    //Firefox
    $('#mainContent').bind('DOMMouseScroll', function(e){
        if(to === 0){
            //var startScrollTop = $(this).scrollTop();

            if(e.originalEvent.detail > 0  && to===1) {
                //scroll down
                console.log('Down');
                if(step > 1){
                    to++;
                    zero++;
                    elevateDown();
                }
            }
            else {
                //scroll up
                console.log('Up');
                if(step < 4) {
                    to++;
                    zero++;
                    elevateUp();
                }
            }
        }
        //prevent page fom scrolling
        return false;
    });

    //IE, Opera, Safari
    $('#mainContent').bind('mousewheel', function(e){
        if(to === 0){
            //var startScrollTop = $(this).scrollTop();
            if(e.originalEvent.wheelDelta < 0) {
                //scroll down
                console.log('Down');
                if(step > 1){
                    to++;
                    zero++;
                    elevateDown();
                }
            }
            else {
                //scroll up
                console.log('Up');
                if(step < 4) {
                    to++;
                    zero++;
                    elevateUp();
                }
            }
        }

        //prevent page fom scrolling
        return false;
    });

    //TouchScreen
    var ts;
    $(document).bind('touchstart', function (e){
        ts = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', function (e){

            if(to === 0){
                //var startScrollTop = $(this).scrollTop();
            var te = e.originalEvent.changedTouches[0].clientY;
            if(ts > te+5){
                if(step > 1) {
                    to++;
                    zero++;
                    elevateDown();
                }
            }else if(ts < te-5){
                if(step < 4) {
                    to++;
                    zero++;
                    elevateUp();
                }
            }
        }
    });


    //slider ends


    //inbox


    //actives starts
    $("span[data-abort='spinner']").click(function () {
        ajax.abort();
        $("#loader").toggleClass("invisible");
    });
    $("[data-target='menu']").click(function () {
        replaceClass("[data-toggle='menu']" , "menu-toggle" , "menu-toggle-in");
        replaceClass("[data-toggle='menu-back']" , "menu-mid" , "menu-mid-in");
        replaceClass("img[alt='arrows']" , "rotate-90" , "rotate90");
    });
    $("[data-target='login']").click(function () {
        replaceClass("[data-toggle='login']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="login"]').click(function () {
        replaceClass("[data-toggle='login']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="login"] [data-prevent="login"]').click(function (event) {
        event.stopPropagation();//close-prevent
    });
    $("[data-target='addAddress']").click(function () {
        replaceClass("[data-toggle='addAddress']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="addAddress"]').click(function () {
        replaceClass("[data-toggle='addAddress']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="addAddress"] [data-prevent="addAddress"]').click(function (event) {
        event.stopPropagation();//close-prevent
    });
    $("[data-target='upAddress']").click(function () {
        replaceClass("[data-toggle='upAddress']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="upAddress"]').click(function () {
        replaceClass("[data-toggle='upAddress']" , "login-toggle" , "login-toggle-in");
    });
    $('[data-toggle="upAddress"] [data-prevent="upAddress"]').click(function (event) {
        event.stopPropagation();//close-prevent
    });
    $("[data-target='profile']").click(function () {
        replaceClass("[data-toggle='profile']" , "elevate" , "elevate-in2x");
    });
    $("[data-target='category']").click(function () {
        replaceClass("[data-toggle='profile']" , "elevate" , "elevate-in");
    });
    $("[data-target='catlist']").click(function () {
        replaceClass($(this).closest("ul") , "mainCat" , "main-out");
        replaceClass($(this).next() , "subCat" , "sub-in");
        replaceClass( "[data-toggle='toMainCat']" , "backCat" , "backCat-in");
    });
    $("[data-target='toMainCat']").click(function () {
        replaceClass(".main-out" , "mainCat" , "main-out");
        replaceClass(".sub-in" , "subCat" , "sub-in");
        replaceClass( "[data-toggle='toMainCat']" , "backCat" , "backCat-in");
    });

    $("[data-target='msg']").click(function () {
        replaceClass("[data-toggle='msg-edit']" , "hide" , "");
        replaceClass("[data-toggle='msg']" , "hide" , "");
    });

    $("[data-target='edit-profile']").click(function () {
        replaceClass("[data-toggle='msg-edit']" , "hide" , "");
        replaceClass("[data-toggle='edit-profile']" , "hide" , "");
    });
    //actives ends




//login
    var interval;
    function countdown() {
        clearInterval(interval);
        interval = setInterval( function() {
            var timer = $('.js-timeout').html();
            timer = timer.split(':');
            var minutes = timer[0];
            var seconds = timer[1];
            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

            $('.js-timeout').html(minutes + ':' + seconds);

            if (minutes == 0 && seconds == 0){
                clearInterval(interval);
                // alert("2 min over");
                $('#try').css('display' , 'none');
                $('#try_verify').css('display' , 'unset');
                // $('.kh_btn').attr('id' , 'try_verify');
            }
        }, 1000);
    }



    $("[data-target='mobile']").click(function () {
        replaceClass("[data-toggle='mobile']" , "login-toggle" , "login-toggle-in");
        replaceClass("[data-toggle='rand']" , "hide" , "");
    });
    $('#backto-mobile').click(function () {
        replaceClass("[data-toggle='rand']" , "hide" , "");
        replaceClass("[data-toggle='mobile']" , "hide" , "");
    });
    //$("input[name='mobile']").inputmask({"mask": "(999) 999-9999"});

    $('[data-target="rand"]').click(function () {
        var mobile = $("input[name='mobile']").val();
        for(var i=0;i<=mobile.length;i++){
            mobile = mobile.replace("-","");
            mobile = mobile.replace("_","");
        }
        if(mobile.length === 10){
            $("#loader").toggleClass("invisible");
            ajax = $.ajax({
                url: urls + 'lib/ajax.php',
                type: 'POST',
                data: {"mobile": mobile},
                success: function (data) {
                    //data = mobile/rand code
                    $('#editmobile').html(data);
                    $("#loader").toggleClass("invisible");
                    replaceClass("[data-toggle='rand']" , "hide" , "");
                    replaceClass("[data-toggle='mobile']" , "hide" , "");
                    $('.js-timeout').text("2:00");
                    countdown();
                }
            });
        }else{
            alert("شماره ی وارد شده باید 10 رقمی باشد.");
        }
    });
    $("input[name='mobile']").keyup(function (event) {
        if (event.keyCode === 13) {

            var mobile = $("input[name='mobile']").val();

            for(var i=0;i<=mobile.length;i++){
                mobile = mobile.replace("-","");
                mobile = mobile.replace("_","");
            }

            if(mobile.length === 10){
                $("#loader").toggleClass("invisible");
                ajax = $.ajax({
                    url: urls + 'lib/ajax.php',
                    type: 'POST',
                    data: {"mobile": mobile},
                    success: function (data) {
                        //data = mobile/rand code
                        $('#editmobile').html(data);
                        $("#loader").toggleClass("invisible");
                        replaceClass("[data-toggle='rand']" , "hide" , "");
                        replaceClass("[data-toggle='mobile']" , "hide" , "");
                        $('.js-timeout').text("2:00");

                        countdown();
                    }
                });
            }else{
                alert("شماره ی وارد شده باید 10 رقمی باشد.");
            }
        }
    });
    $('#try_verify').on('click', function () {
        var mobile = $("input[name='mobile']").val();
        $("#loader").toggleClass("invisible");
        ajax = $.ajax({
            url: urls + 'lib/ajax.php',
            type: 'POST',
            data: {"mobile": mobile},
            success: function (data) {
                $("#loader").toggleClass("invisible");
                $('#editmobile').html(data);
                //counter
                $('#try_verify').css('display' , 'none');
                $('#try').css('display' , 'unset');
                $('.js-timeout').text("2:00");
                clearInterval(interval);
                countdown();
            }
        });
    });

    $('button[data-login]').click(function () {
        var input = $("input[name='rand']");
        var rand = input.val();
        input.val("");
        $("#loader").toggleClass("invisible");
        ajax = $.ajax({
            url: urls + 'lib/ajax.php',
            type: 'POST',
            data: {"rand": rand},
            success: function (data) {
                var result = $.trim(data);
                if(result === '2'){
                    alert('خوش آمدید.');
                    location.reload();
                }else if(result === '1'){
                    $("#loader").toggleClass("invisible");
                    $("div.timer").html('<div class="alert alert-warning text-center" role="alert" dir=\'rtl\'>امکان ورود به شما داده نشده است.</div>');
                }
                else{
                    alert('کد وارد شده اشتباه است.');
                    $("#loader").toggleClass("invisible");
                    var counter = 0;
                    var interval = setInterval(function() {
                        counter++;
                        // Display 'counter' wherever you want to display it.
                        if (counter == 120) {
                            // Display a login box
                            $("div.timer").html('<span class="text-danger">وقت شما به پایان رسیده است.</span>');
                            clearInterval(interval);
                        }
                    }, 1000);
                }
            }
        });
    });
    $("input[name='rand']").keyup(function (event) {
        if (event.keyCode === 13) {
            var rand = $("input[name='rand']").val();
            $("#loader").toggleClass("invisible");
            ajax = $.ajax({
                url: urls + 'lib/ajax.php',
                type: 'POST',
                data: {"rand": rand},
                success: function (data) {
                    var result = $.trim(data);
                    if(result === '2'){
                        alert('خوش آمدید.');
                        location.reload();
                    }else if(result === '1'){
                        $("#loader").toggleClass("invisible");
                        $("div.timer").html('<div class="alert alert-warning text-center" role="alert" dir=\'rtl\'>امکان ورود به شما داده نشده است.</div>');
                    }
                    else{
                        alert('کد وارد شده اشتباه است.');
                        $("#loader").toggleClass("invisible");
                        var counter = 0;
                        var interval = setInterval(function() {
                            counter++;
                            // Display 'counter' wherever you want to display it.
                            if (counter == 120) {
                                // Display a login box
                                $("div.timer").html('<span class="text-danger">وقت شما به پایان رسیده است.</span>');
                                clearInterval(interval);
                            }
                        }, 1000);
                    }
                }
            });
        }
    });
    //login
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    //profile
    $("#userForm").submit(function(s) {

        var  valName=$('#nameuser').val();
        var  valPhone=$('#phoneuser').val();
        var  valMeli=$('#meliuser').val();
        for(var m=0;m<=valMeli.length;m++){
            valMeli = valMeli.replace("_","");
        }
        //var  valEmail=$('#emailuser').val();
        s.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = form.attr('action');
        /*var url = form.attr('action');*/
        //if (valEmail!=="" && isEmail(valEmail)===true){
            if (valName!=="" && valPhone!=="" && valMeli!==""){
                if(valMeli.length === 10){
                    $("#loader").toggleClass("invisible");
                    ajax = $.ajax({
                        type: "POST",
                        url: url,
                        data: form.serialize(), // serializes the form's elements.
                        success: function(data)
                        {
                            alert(data);
                            $("#loader").toggleClass("invisible");
                        }
                    });
                }else{
                    alert('کد ملی باید 10 رقمی باشد.')

                }
            }else{
                alert('لطفا تمام فیلد ها را پر کنید')

            }
        //}
    });
    ////profile

    //address
    $('#stateuser').change(function () {
        var state = $('#stateuser').find(":selected").val();

        ajax = $.ajax({
            url: urls + 'lib/ajax.php',
            type: 'GET',
            data: {"state": state},
            success: function (data) {
                $('select[id="cityuser"]').html(data);
            }
        });
    });
    $(document).on("change","#stateup",function () {
        var state = $('#stateup').find(":selected").val();

        $.ajax({
            url: urls + 'lib/ajax.php',
            type: 'GET',
            data: {"state": state},
            success: function (data) {
                $('select[id="cityup"]').html(data);
            }
        });
    });

    $(document).on("click","span.deladd",function (event) {
        var ret = confirm("آیا از حذف این آدرس اطمینان دارید؟");
        if(ret){
            $("#loader").toggleClass("invisible");
            var id = event.target.id;
            alert(id);
            ajax = $.ajax({
                type: "POST",
                url: urls + "lib/ajax.php",
                data: {"addId" : id}, // serializes the form's elements.
                success: function(data)
                {
                    var sel = "#row" + id;
                    /*alert(data);*/
                    $(sel).remove();
                    $("#loader").toggleClass("invisible");
                }
            });
        }
    });

    $(document).on("click","span.editadd",function (event) {
        $("#loader").toggleClass("invisible");
        var id = event.target.id;
        ajax = $.ajax({
            type: "POST",
            url: urls + "lib/ajax.php",
            data: {"editaddressId" : id}, // serializes the form's elements.
            success: function(data)
            {
                replaceClass("[data-toggle='upAddress']" , "login-toggle" , "login-toggle-in");
                $("#loader").toggleClass("invisible");
                $("#editAddAjx").html(data);
            }
        });
    });

    $(document).on("submit","#upaddForm",function(e) {
        var  valStateuser=$('#stateup').val();
        var  valCityuser=$('#cityup').val();
        var  valZipuser=$('#zipup').val();
        var  addressDetailuser=$('#addressDetailup').val();

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = form.attr('action');
        if (valStateuser!=null && valCityuser!=null && valZipuser!="" && addressDetailuser!="" ){
            ajax = $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form's elements.
                success: function(data)
                {
                    alert(data);
                    loadAddress();
                    replaceClass("[data-toggle='upAddress']" , "login-toggle" , "login-toggle-in");
                }
            });
        }else{
            alert('لطفا تمام فیلد ها را پر کنید')
        }

    });

    $("#addForm").submit(function(e) {
        var  valStateuser=$('#stateuser').val();
        var  valCityuser=$('#cityuser').val();
        var  valZipuser=$('#zipuser').val();
        var  addressDetailuser=$('#addressDetailuser').val();
        for(var m=0;m<=valZipuser.length;m++){
            valZipuser = valZipuser.replace("_","");
        }

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = form.attr('action');
        if (valStateuser!=null && valCityuser!=null && valZipuser!="" && addressDetailuser!=""){
            if(valZipuser.length === 10){
                $("#loader").toggleClass("invisible");
                ajax = $.ajax({
                    type: "POST",
                    url: url,
                    data: form.serialize(), // serializes the form's elements.
                    success: function(data)
                    {
                        $("#loader").toggleClass("invisible");
                        replaceClass("[data-toggle='addAddress']" , "login-toggle" , "login-toggle-in");
                        loadAddress();
                    }
                });
            }else{
                alert('کد پستی باید 10 رقمی باشد.')

            }
        }else{
            alert('لطفا تمام فیلد ها را پر کنید')
        }

    });

    loadAddress();

    function loadAddress(){
        $.ajax({
            url: urls + 'lib/ajax.php',
            type: 'GET',
            data: {"loadAdrress": "temp"},
            success: function (data) {
                $('#loadaddress').html(data);
            }
        });
    }
});