
(function(){
    var ary=new Array();
    var box_ary=new Array();
    var not_fast=true;
    inite();
    insertion_sort();
    faster_insertion();

    function inite() {
        var boxs,pillars,
        wrapper=document.querySelector("#ctt"),
        inite_btn=document.querySelector(".inite"),
        start_btn=document.querySelector(".start"),
        fast_btn=document.querySelector(".fast"),
        origin_box=document.querySelector(".move_box"),
        ctt_box=document.querySelector("#ctt"),
        btns_box=document.querySelector("#btns");
        for (var i = 0; i < 29; i++) {
            var new_box=origin_box.cloneNode(true);
            wrapper.appendChild(new_box);
        };
        boxs=document.querySelectorAll(".move_box");
        pillars=document.querySelectorAll(".pillar");
        inite_btn.onclick = function() {
            btns_box.className="rise";
            ctt_box.className="drop";
            setTimeout(function(){
                not_fast=true;
                start_btn.style.zIndex=100;
                fast_btn.style.zIndex=100;
                for (var i = 0; i < boxs.length; i++) {
                    var distance=i*40;
                    var rand=Math.floor(Math.random()*99+1);
                    boxs[i].style.left=distance+"px";
                    ary[i]=rand;
                    box_ary[i]=boxs[i];
                    boxs[i].querySelector(".num").innerText=rand;
                };
                setTimeout(function(){
                    for (var j = 0; j < pillars.length; j++) {
                        pillars[j].style.height=ary[j]*4+"px";
                    };
                },500);
            },500);
            
        }
    }

    function insertion_sort(){
        var start_btn=document.querySelector(".start"),
            inite_btn=document.querySelector(".inite"),
            fast_btn=document.querySelector(".fast");
        var j=1;
        start_btn.onclick = function outer_s() {
            
            inite_btn.style.zIndex=10;
            start_btn.style.zIndex=10;
            fast_btn.style.zIndex=10;
            var new_key,temp_num,temp_box;
            if(j<ary.length){
                new_key=ary[j];
                temp_num=j-1;
                inner_s();
                function inner_s(){
                    if(temp_num>=0)
                    {
                        if(ary[temp_num]>new_key){
                            ary[temp_num+1]=ary[temp_num];
                            ary[temp_num]=new_key;
                            var temp_r_left=parseInt((box_ary[temp_num+1].style.left).replace(/px/,""));
                            var temp_l_left=parseInt((box_ary[temp_num].style.left).replace(/px/,""));
                            box_ary[temp_num+1].style.left=(temp_r_left-40)+"px";
                            box_ary[temp_num].style.left=(temp_l_left+40)+"px";
                            if(not_fast){
                                box_ary[temp_num+1].querySelector(".pillar").style.background="#C8B29D";
                                box_ary[temp_num+1].querySelector(".pillar").style.boxShadow="2px 1px 2px #A67664";
                                box_ary[temp_num].querySelector(".pillar").style.background="#C8B29D";
                                box_ary[temp_num].querySelector(".pillar").style.boxShadow="2px 1px 2px #A67664";
                                setTimeout(function(){
                                    for (var i = 0; i < box_ary.length; i++) {
                                        box_ary[i].querySelector(".pillar").style.background="#7EC9B2";
                                        box_ary[i].querySelector(".pillar").style.boxShadow="2px 1px 2px #37866F";

                                    };
                                },1000);
                            }
                            temp_box=box_ary[temp_num+1];
                            box_ary[temp_num+1]=box_ary[temp_num];
                            box_ary[temp_num]=temp_box;
                            temp_num--;
                            setTimeout(inner_s,1000);
                        }else{
                            j++;
                            outer_s();
                        }
                    }else{
                        j++;
                        outer_s();
                    }
                } 
            }else{
                j=1;
                inite_btn.style.zIndex=100;
            }
        }
    }


    function faster_insertion(){
        var start_btn=document.querySelector(".start"),
            fast_btn=document.querySelector(".fast"),
            inite_btn=document.querySelector(".inite");
        fast_btn.onclick=function(){
            not_fast=false;
            start_btn.style.zIndex=10;
            inite_btn.style.zIndex=10;
            fast_btn.style.zIndex=10;
            start_btn.click();
            setTimeout(function(){
                start_btn.click();
            },2000);
            setTimeout(function(){
                start_btn.click();
            },3000);
            setTimeout(function(){
                start_btn.click();
            },4000);
            setTimeout(function(){
                start_btn.click();
            },5000);
            setTimeout(function(){
                start_btn.click();
            },6000);
        }
    }
})()


