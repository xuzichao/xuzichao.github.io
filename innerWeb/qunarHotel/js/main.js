tab_change();
page_slide();
function page_slide() {

    // city-page
    var get_city = document.querySelector("#main-page header span");
    var back_city = document.querySelector("#city-page header a.back-btn");
    var city_page = document.querySelector("#city-page");
    get_city.onclick = function() {
        addClass(city_page, "showin");

    }
    back_city.onclick = function() {
        removeClass(city_page, "showin");

    }

    //sch-page
    var get_sch = document.querySelector("#main-page .search-box input");
    var back_sch = document.querySelector("#sch-page header a.back-btn");
    var sch_page = document.querySelector("#sch-page");
    get_sch.onfocus = function() {
        addClass(sch_page, "showin");

    }
    back_sch.onclick = function() {
        removeClass(sch_page, "showin");

    }

    //hotel-page
    var get_hotel = document.querySelector("li.synthetical");
    var back_hotel = document.querySelector("#hotel-page header a.back-btn");
    var hotel_page = document.querySelector("#hotel-page");
    get_hotel.onclick = function() {
        addClass(hotel_page, "showin");

    }
    back_hotel.onclick = function() {
        removeClass(hotel_page, "showin");

    }

    //price-select
    var back = document.querySelector("#sel-back");
    var get_price = document.querySelector("#main-page .filtrate .price");
    var cancel_price = document.querySelector("#price-sel .selbtn");
    var price_page = document.querySelector("#price-sel");
    get_price.onclick = function() {
        addClass(price_page, "showin");
        back.style.display = "block";
        document.body.parentNode.style.overflowY = "hidden";
        document.body.parentNode.style.overflowX = "hidden";

    }
    cancel_price.onclick = function() {
        removeClass(price_page, "showin");
        back.style.display = "none";
        document.body.parentNode.style.overflowY = "auto";
        document.body.parentNode.style.overflowX = "hidden";

    }

    //order-select
    var get_order = document.querySelector("#main-page .filtrate .recommend");
    var cancel_price = document.querySelector("#order-sel .selbtn");
    var order_page = document.querySelector("#order-sel");
    get_order.onclick = function() {
        addClass(order_page, "showin");
        back.style.display = "block";
        document.body.parentNode.style.overflowY = "hidden";
        document.body.parentNode.style.overflowX = "hidden";

    }
    cancel_price.onclick = function() {
        removeClass(order_page, "showin");
        back.style.display = "none";
        document.body.parentNode.style.overflowY = "auto";
        document.body.parentNode.style.overflowX = "hidden";

    }


}


function tab_change() {

    //city-page
    //tab切换
    var city_in = document.querySelector("#city-in"),
    city_out = document.querySelector("#city-out"),
    city_out_box = document.querySelector(".hot-city"),
    city_in_box = document.querySelector(".inner-city");

    city_in.onclick = function() {
        removeClass(city_out, "active");
        addClass(this, "active");
        city_in_box.style.display = "block";
        city_out_box.style.display = "none";

    }

    city_out.onclick = function() {
        removeClass(city_in, "active");
        addClass(this, "active");
        city_out_box.style.display = "block";
        city_in_box.style.display = "none";

    }

    //下拉内容
    var dd_down = document.querySelectorAll(".for-arrow");
    for (var i = 0; i < dd_down.length; i++) {
        dd_down[i].onclick = function() {
            var arrow = this.lastChild;
            var ul_down = this.nextSibling.nextSibling;
            if (window.getComputedStyle(ul_down, null).display == "none") {
                ul_down.style.display = "block";
                addClass(this, "on");

            } else {
                ul_down.style.display = "none";
                removeClass(this, "on");

            }


        }

    };

    //sch-page
    //tab切换
    var sch_history = document.querySelector("#sch-history"),
    hot_rcmmd = document.querySelector("#hot-rcmmd"),
    rcmm_box = document.querySelector(".recommend-h"),
    history_box = document.querySelector(".history");

    sch_history.onclick = function() {
        removeClass(hot_rcmmd, "active");
        addClass(this, "active");
        rcmm_box.style.display = "none";
        history_box.style.display = "block";

    }

    hot_rcmmd.onclick = function() {
        removeClass(sch_history, "active");
        addClass(this, "active");
        rcmm_box.style.display = "block";
        history_box.style.display = "none";

    }

    //hotel-page
    var hotel_ls = document.querySelectorAll(".index-title li");
    var hotel_blks = document.querySelectorAll(".item");
    for (var i = 0; i < hotel_ls.length; i++) {
        hotel_ls[i].onclick = function() {
            for (var i = 0; i < hotel_ls.length; i++) {
                removeClass(hotel_ls[i], "focus");
                hotel_blks[i].style.display = "none";

            };

            var now_block = document.getElementById(this.getAttribute("name"));
            now_block.style.display = "block";
            addClass(this, "focus");

        }

    };


}



function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));

}


function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');

    }

}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;

}