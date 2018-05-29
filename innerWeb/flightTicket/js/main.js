var min,max;
var pages_index=0;
var ten_times=1;
function tab_switch(){
    $(".time_type ul.cdt_item li").click(function(){
        $(".time_type ul.cdt_item li").removeClass("on");
        $(this).addClass("on");
    });
    $(".time_mons ul.cdt_item li").click(function(){
        $(".time_mons ul.cdt_item li").removeClass("on");
        $(this).addClass("on");
    });
    $(".leave_city .cdt_item li").click(function(){
        $(".leave_city .cdt_item li").removeClass("on");
        $(this).addClass("on");
    });
    $(".order_ways li a").click(function(){
        $(".order_ways li a").removeClass("now");
        $(".order_ways li a span").removeClass("on");
        $(this).addClass("now");
        $(this).find("span").addClass("on");
        if($(this).attr("data-dirc")=="up"){
            $(this).attr("data-dirc","down");
            $(this).find("span").css("background","url(http://simg1.qunarzz.com/site/images/flight/flight_lowprice/ico_tj.png) no-repeat 3px -90px");
        }else{
            $(this).attr("data-dirc","up");
            $(this).find("span").css("background","url(http://simg1.qunarzz.com/site/images/flight/flight_lowprice/ico_tj.png) no-repeat 3px -70px");
        }
        
    });

    $(".link_city").click(function(){
        $(".qcity").css("display","block");
        $(this).addClass("open");
    });
    $(".closeImg").click(function(){
        $(".qcity").css("display","none");
        $(".link_city").removeClass("open");
    });
    $(".b_hct_nav span").click(function(){
        var title=$(this).attr("data-title");

        $(".b_hct_nav span").removeClass("active");
        $(this).addClass("active");

        $(".city_list").css("display","none");
        $(".city_list").each(function(){
            if($(this).attr("data-title")==title){
                $(this).css("display","block");
            }
        });

        $(".hint .pinyin").css("display","none");
        $(".hint .pinyin").each(function(){
            if($(this).attr("data-title")==title){
                $(this).css("display","block");
            }
        });

    });
    $(".lnk_gray").click(function(){
        if(!$("#hide_cdt").hasClass("active")){
            $("#hide_cdt").addClass("active");
            $(".ico_arr").css("background"," url(img/ico.png) no-repeat scroll 0 -60px");
        }else{
            $("#hide_cdt").removeClass("active");
            $(".ico_arr").css("background"," url(img/ico.png) no-repeat scroll 0 0");
        }      
    });

    $(".depart_time .cdt_item li input").attr("data-checked","false");
    $(".depart_time .cdt_item li input").click(function(){
        if($(this).attr("data-checked")=="false"){
            $(this).attr("data-checked","true");

        }else{
            $(this).attr("data-checked","false");
        }
    });
    

}
tab_switch();

function url_chain(d_city,d_week,d_time,d_step,min_p,max_p,page_index,slide){

    var address;
    var url_day= new Date(),
        tommorow=url_day.getFullYear() + "-" + (url_day.getMonth() + 1) + "-" + (url_day.getDate()+1);

    var url="http://lp.flight.qunar.com/api/qdclowprice?",
        filter= {
            dcity: d_city,
            acity: '',
            ddate: tommorow,
            drange: 7,
            query: 'filter',
            sort: 'S1',
            asc: 'true',
            page: "",
            from: 'tejia_d',
            ex_track: '',
            searchType: 'domestic',
            per: 40,
            perScrollPage: 10,
            dweek: d_week,
            dtime: d_time,  
            dstep: d_step,
            minp: "",
            maxp: ""
        },
        time_stamp="&_="+parseInt(Math.random() * 100000000);
        //address=url+"dcity="+d_city+"&"+$.param(filter) + time_stamp;
        filter.page=page_index;

        if(slide){
            filter.maxp=max_p;
            filter.minp=min_p;
        }
        address=url+$.param(filter) + time_stamp;


        return address;
}

function create_url(page_arg,slide_arg){

    var step_count=0,url;
    var dcity,dweek,dtime,dstep,minp,maxp;

     //获取出发城市
        $(".leave_city .cdt_item li").each(function(){
            if($(this).hasClass("on")){
                //dcity=encodeURI($(this).html());
                dcity=$(this).html();
                if(dcity=="不限"){
                    dcity="";
                }
            }
        });

        //获取是否工作日
        $(".time_type .cdt_item li").each(function(){
            if($(this).hasClass("on")){
                var text=$(this).html();
                if(text=="周末"){
                    dweek="W1";
                }else if(text=="工作日"){
                    dweek="W2";
                }else{
                    dweek="W0";
                }
            }
        });

        //获取起飞的月份
        $(".time_mons .cdt_item li").each(function(){
            if($(this).hasClass("on")){
                var text=$(this).html();
                if(text=="八月"){
                    dtime="T8";
                }else{
                    dtime="T0";
                }
            }
        });

        //获取早中晚起飞时间
        $(".depart_time .cdt_item li input").each(function(){
            if($(this).attr("data-checked")=="true"){
                step_count++;
                if(step_count==1){
                    dstep=$(this).attr("data-key");
                }else{
                    dstep=dstep+","+$(this).attr("data-key");
                }
            }
        });

        //获取最大价格最小价格
        minp=parseInt($("#js_min_price").html());
        maxp=parseInt($("#js_max_price").html());


        url=url_chain(dcity,dweek,dtime,dstep,minp,maxp,page_arg,slide_arg);
        console.log(url);
        return url;
}

function filter_it(){

    var url_address,weekday_str;

    $(".time_type .cdt_item li,.time_mons .cdt_item li,.leave_city .cdt_item li,.depart_time .cdt_item li input").click(function(){
        $("a[data-pager-link='first']").css("display","none");
        $("a[data-pager-link='prev']").css("display","none");
        $("a[data-pager-link='next']").css("display","inline");
        $("a[data-pager-link='last']").css("display","inline");
        $("#no_data").css("display","none");
        $(".tj_list_wrapper").css("display","block");
        $(".pager").css("display","block");

        pages_index=2;
        ten_times=1;


        url_address=create_url(1,false);
        $.ajax({
            url: url_address,
            dataType : "jsonp",
            success:function(json){

                $("#tj_list").html("");
                $("#js_price_range em").css("left","100%");
                
                var info=json.data.info;
                    $("#total_num").html(info.total);
                    $("#js_min_price").html(info.minp);
                    $("#js_max_price").html(info.maxp);
                    $("#js_max_price").html(info.maxp);
                    $(".pager .ps em").html(Math.ceil(info.total/400));
                    max=info.maxp;
                    min=info.minp;
                var array=json.data.list;
                    if(json.data.info.total!=0){
                        $.each(array,function(i,value){

                            var the_day=new Date(value.dd);
                            if(the_day.getDay()==5){
                                weekday_str="<p class='ptop'>周五</p>";
                            }else if(the_day.getDay()==6){
                                weekday_str="<p class='ptop'>周六</p>";
                            }else if(the_day.getDay()==0){
                                weekday_str="<p class='ptop'>周七</p>";
                            }else{
                                weekday_str="";
                            }
                            var day=value.dd.charAt(8)+value.dd.charAt(9);
                            var mon=value.dd.charAt(5)+value.dd.charAt(6);

                            var item="<li><a href='#' data-fromcity="+value.dc+ "data-tocity="+value.ac+"data-fromdate="+value.dd+">"+weekday_str+"<p class='p1'><span class='prc'><i class='rmb'>¥</i>"+value.pr+"</span>&nbsp;<span class='dsc'>"+value.dis+"折</span></p><p class='p2'><span>"+value.dc+"</span>&nbsp;-&nbsp;<span>"+value.ac+"</span></p><p class='p3'><span class='hl'>立即抢票</span>"+mon+"月"+day+"日&nbsp;"+value.dt+"</p></a></li>"
                            $(item).appendTo($("#tj_list"));
                            inite_pager();
                        });
                    }else{
                        $("#no_data").css("display","block");
                        $(".tj_list_wrapper").css("display","none");
                        $(".pager").css("display","none");
                    }

            },
            error:function(json){
                alert("error");

            }
        })

    });
}

filter_it();

//$.param（）自己会编码一次。无需使用专门的encodeURI
//decodeUPI或者decodeURIComponent可以编码识别各种字符串
//jq获取的对象数组是第一次获取得到的结果，如果后面动态增加以后，在之前的对象数组里面是查不到的，对象数组不会跟着动态更新。
//object.prototype.toString.call(某个对象)
function sort_it(){
     var url_address,weekday_str;
     var order_name,dirc;
    $(".order_ways li a").click(function(){

        $("a[data-pager-link='first']").css("display","none");
        $("a[data-pager-link='prev']").css("display","none");
        $("a[data-pager-link='next']").css("display","inline");
        $("a[data-pager-link='last']").css("display","inline");
        $("#no_data").css("display","none");
        $(".tj_list_wrapper").css("display","block");
        $(".pager").css("display","block");
        pages_index=2;
        ten_times=1;
        order_name=$(this).attr("data-type"); 
        dirc=$(this).attr("data-dirc");        
        url_address=create_url(1,false);
        $.ajax({
       
            url: url_address,
            dataType : "jsonp",
            success:function(json){
                $("#tj_list").html("");
                $("#js_price_range em").css("left","100%");

                var info=json.data.info;
                    $("#total_num").html(info.total);
                    $("#js_min_price").html(info.minp);
                    $("#js_max_price").html(info.maxp);
                    $(".pager .ps em").html(Math.ceil(info.total/400));
                    max=info.maxp;
                    min=info.minp;

                var array=json.data.list;

                    //按照价格排序
                  
                    if(order_name=="price"){

                        if(dirc=="down"){
                            array.sort(function(a,b){return b.pr- a.pr;});
                        }else{
                            array.sort(function(a,b){return a.pr- b.pr;});
                        }
                    }
                    if(order_name=="discount"){
                        
                        if(dirc=="down"){
                            array.sort(function(a,b){return b.dis- a.dis;});
                        }else{
                           array.sort(function(a,b){return a.dis- b.dis;}); 
                        }
                    }
                    if(order_name=="depart_date"){
                        

                        if(dirc=="down"){
                            array.sort(function(a,b){

                            var time1=parseInt(a.dd.charAt(5)+a.dd.charAt(6)+a.dd.charAt(8)+a.dd.charAt(9));
                            var time2=parseInt(b.dd.charAt(5)+b.dd.charAt(6)+b.dd.charAt(8)+b.dd.charAt(9));
                                return time2- time1;
                            });
                        }else{
                            array.sort(function(a,b){

                            var time1=parseInt(a.dd.charAt(5)+a.dd.charAt(6)+a.dd.charAt(8)+a.dd.charAt(9));
                            var time2=parseInt(b.dd.charAt(5)+b.dd.charAt(6)+b.dd.charAt(8)+b.dd.charAt(9));
                                return time1- time2;
                            });
                        }
                    }

                    if(json.data.info.total!=0){
                        $.each(array,function(i,value){

                            var the_day=new Date(value.dd);
                            if(the_day.getDay()==5){
                                weekday_str="<p class='ptop'>周五</p>";
                            }else if(the_day.getDay()==6){
                                weekday_str="<p class='ptop'>周六</p>";
                            }else if(the_day.getDay()==0){
                                weekday_str="<p class='ptop'>周七</p>";
                            }else{
                                weekday_str="";
                            }
                            var day=value.dd.charAt(8)+value.dd.charAt(9);
                            var mon=value.dd.charAt(5)+value.dd.charAt(6);

                            var item="<li><a href='#' data-fromcity="+value.dc+ "data-tocity="+value.ac+"data-fromdate="+value.dd+">"+weekday_str+"<p class='p1'><span class='prc'><i class='rmb'>¥</i>"+value.pr+"</span>&nbsp;<span class='dsc'>"+value.dis+"折</span></p><p class='p2'><span>"+value.dc+"</span>&nbsp;-&nbsp;<span>"+value.ac+"</span></p><p class='p3'><span class='hl'>立即抢票</span>"+mon+"月"+day+"日&nbsp;"+value.dt+"</p></a></li>"
                            $(item).appendTo($("#tj_list"));
                            inite_pager();
                        });
                    }else{
                        $("#no_data").css("display","block");
                        $(".tj_list_wrapper").css("display","none");
                        $(".pager").css("display","none");
                    }
            },
            error:function(json){
                alert("error");

            }
        })

    });
}
sort_it();

function more_city(){
    $(".city_list ul li a").click(function(){
        pages_index=2;
        ten_times=1;
        var city=$(this).attr("data-key");
            $(".leave_city .cdt_item li").removeClass("on");
            $("#temp_city").addClass("on").html(city);
            $("#temp_city").click();
            $(".qcity").css("display","none");
            $(".link_city").removeClass("open");
    });
}
more_city();

function slider(){
    var move;

    $("#js_price_range").mousedown(function(){
        move=true;
    });
    $("#js_price_range").mousemove(function(e){ 
        if(move){

            var left=((e.pageX-571)/225)*100;
                if(left<0){
                    left=0;
                }else if(left>100){
                    left=100;
                }

            var temp_num=parseInt((max-min)*(left/100));
                $("#js_max_price").html(min+temp_num);

                left=left+"%";
                $("#js_price_range em").css("left",left);

        }

    });

    $("#js_price_range").mouseup(function(){
        $("a[data-pager-link='first']").css("display","none");
        $("a[data-pager-link='prev']").css("display","none");
        $("a[data-pager-link='next']").css("display","inline");
        $("a[data-pager-link='last']").css("display","inline");
        $("#no_data").css("display","none");
        $(".tj_list_wrapper").css("display","block");
        $(".pager").css("display","block");
        pages_index=2;
        ten_times=1;
        move=false;
        url_address=create_url(1,true);
        $.ajax({
 
            url: url_address,
            dataType : "jsonp",
            success:function(json){
                $("#tj_list").html("");
                
                var info=json.data.info;
                    $("#total_num").html(info.total);
                    $("#js_min_price").html(info.minp);
                    $("#js_max_price").html(info.maxp);
                    $(".pager .ps em").html(Math.ceil(info.total/400));

                var array=json.data.list;
                    if(json.data.info.total!=0){
                        $.each(array,function(i,value){

                            var the_day=new Date(value.dd);
                            if(the_day.getDay()==5){
                                weekday_str="<p class='ptop'>周五</p>";
                            }else if(the_day.getDay()==6){
                                weekday_str="<p class='ptop'>周六</p>";
                            }else if(the_day.getDay()==0){
                                weekday_str="<p class='ptop'>周七</p>";
                            }else{
                                weekday_str="";
                            }
                            var day=value.dd.charAt(8)+value.dd.charAt(9);
                            var mon=value.dd.charAt(5)+value.dd.charAt(6);

                            var item="<li><a href='#' data-fromcity="+value.dc+ "data-tocity="+value.ac+"data-fromdate="+value.dd+">"+weekday_str+"<p class='p1'><span class='prc'><i class='rmb'>¥</i>"+value.pr+"</span>&nbsp;<span class='dsc'>"+value.dis+"折</span></p><p class='p2'><span>"+value.dc+"</span>&nbsp;-&nbsp;<span>"+value.ac+"</span></p><p class='p3'><span class='hl'>立即抢票</span>"+mon+"月"+day+"日&nbsp;"+value.dt+"</p></a></li>"
                            $(item).appendTo($("#tj_list"));
                            inite_pager();
                        });
                    }else{
                        $("#no_data").css("display","block");
                        $(".tj_list_wrapper").css("display","none");
                        $(".pager").css("display","none");
                    }       
            },
            error:function(json){
                alert("error");

            }
        })

    });
       


}

slider();



// function scroll_page(){
        

// }
// scroll_page();
function load_page(){
        var doc_height=$(document).height(),
            scr_top=$(document).scrollTop(),
            win_height=$(window).height();
            if((win_height>(doc_height-scr_top-200))&&ten_times<=10){
                url_address=create_url(pages_index,true);
                $.ajax({
       
                    url: url_address,
                    dataType : "jsonp",
                    success:function(json){
                        
                        
                        var info=json.data.info,
                            exist_pages=info.tp;

                                var array=json.data.list;
                                
                                    $.each(array,function(i,value){

                                        var the_day=new Date(value.dd);
                                        if(the_day.getDay()==5){
                                            weekday_str="<p class='ptop'>周五</p>";
                                        }else if(the_day.getDay()==6){
                                            weekday_str="<p class='ptop'>周六</p>";
                                        }else if(the_day.getDay()==0){
                                            weekday_str="<p class='ptop'>周七</p>";
                                        }else{
                                            weekday_str="";
                                        }
                                        var day=value.dd.charAt(8)+value.dd.charAt(9);
                                        var mon=value.dd.charAt(5)+value.dd.charAt(6);

                                        var item="<li><a href='#' data-fromcity="+value.dc+ "data-tocity="+value.ac+"data-fromdate="+value.dd+">"+weekday_str+"<p class='p1'><span class='prc'><i class='rmb'>¥</i>"+value.pr+"</span>&nbsp;<span class='dsc'>"+value.dis+"折</span></p><p class='p2'><span>"+value.dc+"</span>&nbsp;-&nbsp;<span>"+value.ac+"</span></p><p class='p3'><span class='hl'>立即抢票</span>"+mon+"月"+day+"日&nbsp;"+value.dt+"</p></a></li>"
                                        $(item).appendTo($("#tj_list"));
                                    });
                                
                        
                    },
                    error:function(json){
                        alert("error");

                    }
                })
            }
        pages_index++;
        ten_times++;
}

function throttle(fn, delay) {  
    var timer = null;  
    return function () {  
        var context = this, args = arguments;  
        clearTimeout(timer);  
        timer = setTimeout(function () {  
        fn.apply(context, args);  
    }, delay);  
  };  
}

function inite_pager(){
    var total_page=parseInt($(".ps em").html()),
        page_next=$("a[data-pager='next']");
        $(".page_index").remove();
        for (var i = 1; i <= total_page; i++) {
            var page_a="<a href='javascript:;' class='page_index' data-pager="+i+">"+i+"</a> ";
                if(i==1){
                    page_a="<a href='javascript:;' class='on page_index' data-pager="+i+">"+i+"</a>";
                }
                $(page_a).insertBefore(page_next);
            
        };
        click_pager();
} 

function click_pager(){
    var page_num=1;
    $(".pager a").click(function(){
        ten_times=1;
        $("a[data-pager='first']").css("display","inline");
        $("a[data-pager='prev']").css("display","inline");
        $("a[data-pager='next']").css("display","inline");
        $("a[data-pager='last']").css("display","inline");
        if($(this).attr("data-pager")=="first"){
           page_num=1;
           $("a[data-pager='first']").css("display","none");
            $("a[data-pager='prev']").css("display","none");
        }else if($(this).attr("data-pager")=="prev"){
            page_num--;
            if(page_num==1){
               $("a[data-pager='first']").css("display","none");
                $("a[data-pager='prev']").css("display","none"); 
            }
        }else if($(this).attr("data-pager")=="next"){
            page_num++;
            if(page_num==parseInt($(".ps em").html())){
                $("a[data-pager='next']").css("display","none");
                $("a[data-pager='last']").css("display","none");
            }
        }else if($(this).attr("data-pager")=="last"){
            page_num=parseInt($(".ps em").html());
        }else{

            page_num=parseInt($(this).html());
            $("a[data-pager]").removeClass("on");
            $(this).addClass("on");

            if($(this).index()==2){
                $("a[data-pager='first']").css("display","none");
                $("a[data-pager='prev']").css("display","none");
            }else if($(this).index()==($("a[data-pager]").length-3)){
                $("a[data-pager='next']").css("display","none");
                $("a[data-pager='last']").css("display","none");

            }

        }
        $("a[data-pager]").each(function(){
            $(this).removeClass("on");
            if(parseInt($(this).html())==page_num){
                $(this).addClass("on");
            }
        });

        pages_index=1+10*(page_num-1);

        url_address=create_url(pages_index,false);
        $.ajax({

            url: url_address,
            dataType : "jsonp",
            success:function(json){

                $("#tj_list").html("");
                $("#js_price_range em").css("left","100%");
                
                var array=json.data.list;
                    $.each(array,function(i,value){

                        var the_day=new Date(value.dd);
                        if(the_day.getDay()==5){
                            weekday_str="<p class='ptop'>周五</p>";
                        }else if(the_day.getDay()==6){
                            weekday_str="<p class='ptop'>周六</p>";
                        }else if(the_day.getDay()==0){
                            weekday_str="<p class='ptop'>周七</p>";
                        }else{
                            weekday_str="";
                        }
                        var day=value.dd.charAt(8)+value.dd.charAt(9);
                        var mon=value.dd.charAt(5)+value.dd.charAt(6);

                        var item="<li><a href='#' data-fromcity="+value.dc+ "data-tocity="+value.ac+"data-fromdate="+value.dd+">"+weekday_str+"<p class='p1'><span class='prc'><i class='rmb'>¥</i>"+value.pr+"</span>&nbsp;<span class='dsc'>"+value.dis+"折</span></p><p class='p2'><span>"+value.dc+"</span>&nbsp;-&nbsp;<span>"+value.ac+"</span></p><p class='p3'><span class='hl'>立即抢票</span>"+mon+"月"+day+"日&nbsp;"+value.dt+"</p></a></li>"
                        $(item).appendTo($("#tj_list"));
                    });
            },
            error:function(json){
                alert("error");

            }
        })

    });
}
function back_top(){
    var top=$(document).scrollTop();
    if(top>$(window).height()){
        $(".pageup").css("display","block");
    }else{
        $(".pageup").css("display","none");
    }
    $(".pageup").click(function(evt){
        var sct = $(document.body).scrollTop() ;
        for(var i = 0 ; i < 50 ; i++){
            (function(){
                var index = i,
                    tar = (50 - i) * sct/50 ;
                window.setTimeout(function(){
                    $(document.body).scrollTop(tar) ; 
                } , index * 5) ;

            })() ;
        }
    });
}

$(".time_type .cdt_item .on").click();
$(document).scroll(
    throttle(back_top, 500)
);
$(document).scroll(
    throttle(load_page, 500)
);
