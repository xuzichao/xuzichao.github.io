/**
 * Created by xuzichao on 2015/8/11.
 */

jQuery(document).ready(function ($) {
    //初始化授权
    var accredit = {
        accreditBtn:$('.accreditBtn'),
        linkJump:function(){
            var jumpUrl = "https://qy.weixin.qq.com/cgi-bin/loginpage?corp_id=",
                corpId = encodeURI("wx662d2a6013ba0a57"),
                redirect_uri = "http://127.0.0.1:8000/",
                state = "init";
            jumpUrl = jumpUrl + corpId +"&" + redirect_uri +"&" +state;

            this.accreditBtn.bind('click',function(){
                window.location = jumpUrl;
            });

        },
        init :function(){
            this.linkJump();
        }
    };
    accredit.init();

    //输入框的校验
    var inputBox={
        allBoxs:$('input[type="text"]'),
        makePlaceHolder:function(){
            this.allBoxs.each(function(){
                var originText = $(this).attr('data-value');

                $(this).val(originText);
                $(this).bind('focus',function(){
                    var currentText = $(this).val();
                    if(currentText == originText){
                        $(this).val('');
                    }
                });

                $(this).bind('blur',function(){
                    var currentText = $(this).val();
                    if(currentText.length < 1){
                        $(this).val(originText);
                    }
                });
            });
        },
        checkPhoneNum:function(phoneNum){
            var mobile = $.trim(phoneNum);
            var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
            var isTel = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;

            //如果为1开头则验证手机号码
            if (mobile.substring(0, 1) == 1) {
                if ((!isMobile.exec(mobile)) || (mobile.length != 11)) {
                    joinBox.showPhoneNumError();
                    return false;
                }
            }
            //如果为0开头则验证固定电话号码
            else if (mobile.substring(0, 1) == 0) {
                if (!isTel.test(mobile)) {
                    joinBox.showPhoneNumError();
                    return false;
                }
            }
            //否则全部不通过
            else {
                joinBox.showPhoneNumError();
                return false;
            }
            return true;
        },
        init:function(){
            this.makePlaceHolder();
        }
    };
    inputBox.init();

    //页面切换滑动
    var currentPage = 0;
    var slider = {
        in:function(pageObj){
            pageObj.css('display','block');
            pageObj.animate({
                'left':0
            },500,function(){

            });
        },
        out:function(pageObj){
            pageObj.animate({
                'left':'100%'
            },500,function(){
                pageObj.css('display','none');
            });
        }
    };
    var goBackBtns={
        btns:$('.goBack'),
        init:function(){
            this.btns.each(function(){
                $(this).bind('click',function(){
                    var page=$(this).parent().parent();
                    if(page.attr('id') == 'companyInfo'){
                        slider.out($('#wrapper'));
                    }
                    else{
                        slider.out(page);
                    }

                    //同步下面
                    $('.next').html("下一步");
                    currentPage--;
                    if(currentPage < 0){
                        currentPage = 0;
                    }

                });
            });
        }
    };
    goBackBtns.init();
    var nextAndCancel = {
        cancelBtn:$('.cancel'),
        nextBtn:$('.next'),
        totalPage:$('#wrapper .page'),
        cancel:function(){
            this.nextBtn.html("下一步");
            if(currentPage == 0)
            {
                slider.out($('#wrapper'))
            }
            else{
                this.totalPage.each(function(index,element){
                    if(index == currentPage){
                        slider.out($(this)) ;
                    }
                });
            }
            currentPage--;
            if(currentPage < 0){
                currentPage = 0;
            }

            console.log(currentPage);
        },
        next:function(){
            if(currentPage == this.totalPage.length - 1 )
            {
                //最后的处理
            }
            else{
                this.totalPage.each(function(index,element){
                    if(index == currentPage+1){
                        slider.in($(this)) ;
                    }
                });
            }

            currentPage++;
            if(currentPage >=  this.totalPage.length - 1){
                currentPage =  this.totalPage.length - 1;
                this.nextBtn.html("完成提交");
            }
            console.log(currentPage);
        },
        init:function(){
            this.cancelBtn.bind('click',function(){
                nextAndCancel.cancel()
            });
            this.nextBtn.bind('click',function(){
                nextAndCancel.next();
            });
        }
    };
    nextAndCancel.init();

    //bindPhone
    var bindPhone={
        btn:$('.bindBtn'),
        submit:function(){
            this.btn.bind('click',function(){
                slider.in($('#wrapper'));
            });
        },
        init:function(){
            this.submit();
        }
    };
    bindPhone.init();

});
