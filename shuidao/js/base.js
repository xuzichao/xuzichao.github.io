/**
 * Created by xuzichao on 2015/7/29.
 */

jQuery(document).ready(function ($) {

    //加盟输入框
    var joinBox = {
        closeBtn:$('.close'),
        joinBtn:$('.joinBtn,.carSourcePage .join a'),
        joinBack:$('.joinBack'),
        joinBox:$('.joinBox'),
        successBox:$('.successBox'),
        submitBtn:$('.submit'),
        showBox:function(){
            this.joinBox.fadeIn();
            this.joinBack.fadeIn();
        },
        hideBox:function(){
            this.joinBox.fadeOut();
            this.joinBack.fadeOut();
        },
        showSuccess:function(){
            this.joinBox.css('display','none');
            this.successBox.css('display','block');
            setTimeout(function(){
                joinBox.hideSuccess();
            },1000);
        },
        hideSuccess:function(){
            this.joinBack.fadeOut();
            this.successBox.fadeOut();
        },
        submitInfo:function(){
            //发送数据请求
            joinBox.showSuccess();
        },
        init:function(){
            this.joinBtn.bind('click',function(){
                joinBox.showBox();
            });
            this.closeBtn.bind('click',function(){
                joinBox.hideBox();
            });
            this.submitBtn.bind('click',function(){
                joinBox.submitInfo();
            });
        }
    };
    joinBox.init();


    //提交加盟商联系方式

    //bannar切换
    var pptFuc = function(pptObj){
        var btns = pptObj.find(".leftPart a");
        var ppt = {
            showCurrentPage:function(currentIndex){
                this.clearActive();
                btns.each(function(index,element){
                    if(index == currentIndex){
                        $(this).addClass('active');
                        pptObj.css('background-image',$(this).attr("data-imageUrl"));
                    }
                });

            },
            clearActive:function(){
                btns.each(function(){
                    $(this).removeClass("active");
                });
            },
            init:function(){
                var currentIndex = 0;
                var swap = function(){
                    currentIndex ++;
                    if(currentIndex == btns.length){
                        currentIndex = 0;
                    }
                    ppt.showCurrentPage(currentIndex);

                };
                var timer = setInterval(swap,3000);

                btns.each(function(index,element){
                    $(this).bind('click',function(){
                        clearInterval(timer);
                        currentIndex = index;
                        ppt.showCurrentPage(currentIndex);
                        timer = setInterval(swap,3000);
                    });
                });
            }

        };
        ppt.init();
    }
    var thirdPPT = new pptFuc($(".fourSPage .ppt"));
    var fourPPT =new pptFuc($(".distributorPage .ppt"));

    //地图随机显示和交互显示
    var pointData = [
        {
        carType: "奥迪A4L 35TFSI自动豪华型 2015款",
        carPrice: "一口价：35.xx万  指导价：40.2万",
        carColor: "朱鹭白/米",
        carImgPosition:"-800px 0"
        },
        {
            carType: "奔驰迈巴赫S级 400 4MATIC 2015款",
            carPrice: "一口价：14x.xx万  指导价：143.8万",
            carColor: "曜岩黑/黑",
            carImgPosition:"-1280px 0"
        },
        {
            carType: "英菲尼迪QX50 2.5L尊享版 2015款",
            carPrice: "一口价：39.xx万  指导价：44.98万",
            carColor: "暮色红/黑",
            carImgPosition:"-480px 0"
        },
        {
            carType: "大众速腾2.0TSI GLI 2013款",
            carPrice: "一口价：18.xx万  指导价：22.58万",
            carColor: "深黑/米",
            carImgPosition:"0 0"
        },

        {
            carType: "大众途安 1.4T自动舒适版5座 2013款",
            carPrice: "一口价：15.xx万  指导价：18.18万",
            carColor: "智睿金/白",
            carImgPosition:"-80px 0"
        },
        {
            carType: "宝马3系 320i 超悦版时尚型 2015款",
            carPrice: "一口价：26.xx万 指导价：32.8万",
            carColor: "白/黑",
            carImgPosition:"-880px 0"
        },
        {
            carType: "奔驰 E 200 Coupe 2014款",
            carPrice: "意向价：44.xx万 指导价：52.8万",
            carColor: "北极白/米",
            carImgPosition:"-1360px 0"
        },
        {
            carType: "宝马 520Li典雅型 2014款",
            carPrice: "意向价：37.xx万  指导价：45.7万",
            carColor: "宝石青/黑",
            carImgPosition:"-1440px 0"
        },
        {
            carType: "阿斯顿·马丁 DB9 6.0LCoupe 2013款",
            carPrice: "一口价：29x.xx万 指导价378万",
            carColor: "玉石黑/黑",
            carImgPosition:"-960px 0"
        },
        {
            carType: "JEEP自由光 2.4L 都市版 2014款",
            carPrice: "一口价：29.xx万  指导价37.19万",
            carColor: "珊瑚红/黑",
            carImgPosition:"-1040px 0"
        },
        {
            carType: "路虎 揽胜极光 2.0T五门智耀版 2015款",
            carPrice: "意向价：39.xx万  指导价：49.8万",
            carColor: "中国红/黑",
            carImgPosition:"-560px 0"
        },
        {
            carType: "道奇 酷威 2.4L 两驱尊尚版 2013款",
            carPrice: "意向价：21.xx万  指导价：26.49万",
            carColor: "碳金黑/黑",
            carImgPosition:"-640px 0"
        },
        {
            carType: "大众POLO 1.6L手动舒适版 2014款",
            carPrice: "意向价：8.xx万  指导价：9.19万",
            carColor: "风格红/黑",
            carImgPosition:"-320px 0"
        },
        {
            carType: "路虎 发现神行 2.0T HSE LUXURY 2015款",
            carPrice: "一口价：54.xx万 指导价61.8万",
            carColor: "圣托里尼黑/黑",
            carImgPosition:"-720px 0"
        },
        {
            carType: "北汽新能源 C90EV 基本型 2015款",
            carPrice: "意向价：32.xx万  指导价：33万",
            carColor: "黑/黑",
            carImgPosition:"-1520px 0"
        },
        {
            carType: "英菲尼迪Q50L 2.0T豪华版 2015款",
            carPrice: "意向价：34.xx万  指导价：38.98万",
            carColor: "冰锐蓝/蓝",
            carImgPosition:"-400px 0"
        },
        {
            carType: "奔驰威霆 2.1T 柴油商务版 2010款",
            carPrice: "意向价：32.xx万  指导价：33万",
            carColor: "太空银/黑",
            carImgPosition:"-240px 0"
        },
        {
            carType: "大众凌渡 280TSI DSG舒适版 2015款",
            carPrice: "意向价：16.xx万  指导价：18.39万",
            carColor: "凌冽白/米",
            carImgPosition:"-160px 0"
        },
        {
            carType: "JEEP自由客 2.4L 豪华导航版 2014款",
            carPrice: "意向价：22.xx万  指导价：27.69万",
            carColor: "晶黑/黑",
            carImgPosition:"-1120px 0"
        },
        {
            carType: "奔驰 E320L 2015款",
            carPrice: "一口价52.xx万  指导价62.5万",
            carColor: "北极白/米",
            carImgPosition:"-1200px 0"
        }
    ];
    var randomShow = {
        carPoints: $('.sell,.buy'),
        switchPoint:function(randomIndex){
            this.carPoints.each(function(index,element){
                //清理亮点
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                }

                if(randomIndex == index){
                    //填充数据
                    var carType;
                    if($(this).hasClass('sell')){
                        carType = "<span class='carSell'>[售]</span> " + pointData[index].carType;
                    }
                    else if ($(this).hasClass('buy')){
                        carType = "<span class='carBuy'>[寻]</span> " + pointData[index].carType;
                    }
                    $('.carType').html(carType);
                    $('.carPrice').html(pointData[index].carPrice);
                    $('.carColor').html(pointData[index].carColor);
                    $('.carImg').css('background-position',pointData[index].carImgPosition);

                    //展示位置
                    $('#carInfoBox').animate({
                        'top':(parseInt($(this).css('top')) - 100) + "px",
                        'left':(parseInt($(this).css('left')) - 190) + "px"
                    });

                    //增加亮点
                    $(this).addClass('active');
                }
            });
        },
        init:function(){

            //随机数不连续重复
            var currentIndex;
            var randomIndex;
            var swap = function(){
                while (randomIndex == currentIndex)
                {
                    randomIndex = parseInt(19*Math.random());
                }
                currentIndex = randomIndex;

                randomShow.switchPoint(currentIndex);
            };
            var timer = setInterval(swap,3000);

            //手势交互
            this.carPoints.each(function(index,element){
                $(this).bind('mouseover',function(){
                    clearInterval(timer);
                    currentIndex = $(this).index() - 1;
                    randomShow.switchPoint(currentIndex);
                    timer = setInterval(swap,3000);
                });
            });
        }
    };
    randomShow.init();

    //兼容IE6、7
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    if ($.browser.msie && 8 > $.browser.version) {

        var fixCenter = function(obj){
            obj.css({
                'margin':'0'
            });
            obj.css({
                'position':'absolute',
                'left':($(window).width()/2 - obj.width()/2) + 'px',
                'top':($(window).height()/2 - obj.height()/2 + $(window).scrollTop()) + 'px'
            });

        };
        var throttle = function(fn, delay) {
            var timer = null;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        };

        fixCenter($('.joinBox'));
        fixCenter($('.successBox'));
        $('.joinback').css('opacity','0.5');

        $(window).bind('scroll',throttle(function(){
            fixCenter($('.joinBack'));
            fixCenter($('.joinBox'));
            fixCenter($('.successBox'));
        },10));

    }
});