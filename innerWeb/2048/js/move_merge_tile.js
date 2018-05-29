

//移动方格对应一个数组

$(document).keydown(function(e){

    if (e.keyCode == 37) 
    {
    	move_left();
    	create_on_blank();
    	decide_win();
    }
    else if (e.keyCode == 38) 
    {
    	move_up();
    	create_on_blank();
    	decide_win();
    }
	else if (e.keyCode == 39) 
    {
    	move_right();
    	create_on_blank();
    	decide_win();
    }
	else if (e.keyCode == 40) 
    {
    	move_down();
    	create_on_blank();
    	decide_win();
    }

    	
})


touch.on('#wrapper', 'swipeleft', function(ev){
	move_left();
	create_on_blank();
	decide_win();

});


touch.on('#wrapper', 'swiperight', function(ev){
	move_right();
	create_on_blank();
	decide_win();
	
});


touch.on('#wrapper', 'swipedown', function(ev){
	move_down();
	create_on_blank();
	decide_win();
	
});


touch.on('#wrapper', 'swipeup', function(ev){
	move_up();
	create_on_blank();
	decide_win();
});

function get_pos(Array_2){

	$("#block-box .tile").each(function(){
		var class_names=$(this).attr('class');
		var temp_class_array=new Array();
			temp_class_array=class_names.split(" ");
		var class_pos_x=temp_class_array[temp_class_array.length-1].charAt(14);
		var class_pos_y=temp_class_array[temp_class_array.length-1].charAt(16);
			Array_2[class_pos_x-1][class_pos_y-1]=parseInt(class_pos_x+""+class_pos_y);
			//alert(typeof Array_2[class_pos_x-1][class_pos_y-1]);
	});

}

function get_value(Array_2){

	$("#block-box .tile").each(function(){
		var nmb_value=$(this).children(".tile-inner").text();
		//alert(nmb_value);
		var class_names=$(this).attr('class');
		var temp_class_array=new Array();
			temp_class_array=class_names.split(" ");
		var class_pos_x=temp_class_array[temp_class_array.length-1].charAt(14);
		var class_pos_y=temp_class_array[temp_class_array.length-1].charAt(16);
			Array_2[class_pos_x-1][class_pos_y-1]=nmb_value;
	});

	/*for (var i = 0; i < Array_2.length; i++) {
		for (var j = 0; j < Array_2.length; j++) {
			alert(Array_2[i][j]);
		};
	};*/

}


function move_right(){

		$("#block-box .tile").removeClass("tile-new"); 
		$("#block-box .tile").removeClass("tile-merged");   
		$(".score-block").remove(); 

		score_each=0;
		valid_step=false;

		get_pos(move_array2);//获取坐标地图

		/*for (var i = 0; i < move_array2.length; i++) {
		for (var j = 0; j < move_array2.length; j++) {
			alert(move_array2[i][j]+"----"+(i+1)+""+(j+1));
			//operator_b_array(move_array2[i][j]);
		};
	};*/


		for (var i = move_array2.length-1; i >=1 ; i--) {
			for (var j = 0; j < move_array2.length; j++) {

			//移动3格
			if(i<2&&move_array2[i-1][j]>move_array2[i][j]&&move_array2[i-1][j]>move_array2[i+1][j]&&move_array2[i-1][j]>move_array2[i+2][j]){

			var pos_str=(move_array2[i-1][j]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+(pos_x+3)+"-"+pos_y;


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i+2][j]=move_array2[i-1][j]+30;
				move_array2[i-1][j]=0;
				valid_step=true;
				
			}



			//移动2格
			if(i<3&&move_array2[i-1][j]>move_array2[i][j]&&move_array2[i-1][j]>move_array2[i+1][j]){

				var pos_str=(move_array2[i-1][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x+2)+"-"+pos_y;


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i+1][j]=move_array2[i-1][j]+20;
					move_array2[i-1][j]=0;
					valid_step=true;
			}



			//移动1格
			if(move_array2[i-1][j]>move_array2[i][j]){

				var pos_str=(move_array2[i-1][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				//var temp_class_str="."+temp_class;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				//var now_class_str=".tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x+1)+"-"+pos_y;
				
				//var next_class_str=".tile-position-"+(pos_x+1)+"-"+pos_y;

				//为何直接用本身就是支字符串的变量时$的选择器不起作用？？

				//alert($(now_class_str).tagName);
				//$(now_class_str).addClass(temp_class);
				//$(temp_class_str).removeClass(now_class);
				//$(temp_class_str).addClass(next_class);
				//$(next_class_str).removeClass(temp_class);


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i-1][j]+10;
					move_array2[i-1][j]=0;
					valid_step=true;
				
			}

		}

	} 

		get_value(merge_array2);//获取数值地图

		for (var i = merge_array2.length-1; i>=1 ; i--) {
			for (var j = 0; j < merge_array2.length; j++) {

				if((merge_array2[i-1][j]==merge_array2[i][j])&&(merge_array2[i-1][j]>0)&&(merge_array2[i][j]>0)){

					//获得后面一方块坐标 
					var pos_str=(move_array2[i-1][j]).toString();
					var pos_x=parseInt(pos_str.charAt(0));
					var pos_y=parseInt(pos_str.charAt(1));
					var now_class_back="tile-position-"+pos_x+"-"+pos_y;
					var now_class_front="tile-position-"+(pos_x+1)+"-"+pos_y;
					var old_value_class="tile-"+merge_array2[i-1][j];
					//alert(old_value_class);
					

					//move赋值保持后续连续
					move_array2[i][j]=move_array2[i-1][j]+10;
					move_array2[i-1][j]=0;

					//value赋值保持后续连续
					merge_array2[i][j]=2*merge_array2[i-1][j];
					merge_array2[i-1][j]=0;

					var new_value_class="tile-"+merge_array2[i][j];

					//统计每一步移动得多少分
					score_each=score_each+merge_array2[i][j];

					//后面的往前滑动

					$("#block-box .tile").each(function(){
						if($(this).hasClass(now_class_back)){
							$(this).removeClass(now_class_back);
							$(this).addClass(now_class_front);
							$(this).addClass("useless");
						}
					});


					$("#block-box .tile").each(function(){
						if($(this).hasClass(now_class_front)){	
							$(this).addClass("tile-merged");
							$(this).removeClass(old_value_class);
							$(this).addClass(new_value_class);
							$(this).children(".tile-inner").text(merge_array2[i][j]);
							$(this).removeClass(now_class_front);
							$(this).addClass(now_class_front);	
						}
					});

					valid_step=true;
					tiles_count--;
				}

			};
			
		}

		get_pos(move_array2);//获取坐标地图
 
		for (var i = move_array2.length-1; i >=1 ; i--) {
			for (var j = 0; j < move_array2.length; j++) {

			//移动3格
			if(i<2&&move_array2[i-1][j]>move_array2[i][j]&&move_array2[i-1][j]>move_array2[i+1][j]&&move_array2[i-1][j]>move_array2[i+2][j]){

			var pos_str=(move_array2[i-1][j]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+(pos_x+3)+"-"+pos_y;


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i+2][j]=move_array2[i-1][j]+30;
				move_array2[i-1][j]=0;
				valid_step=true;
				
			}



			//移动2格
			if(i<3&&move_array2[i-1][j]>move_array2[i][j]&&move_array2[i-1][j]>move_array2[i+1][j]){

				var pos_str=(move_array2[i-1][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x+2)+"-"+pos_y;


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i+1][j]=move_array2[i-1][j]+20;
					move_array2[i-1][j]=0;
					valid_step=true;
			}



			//移动1格
			if(move_array2[i-1][j]>move_array2[i][j]){

				var pos_str=(move_array2[i-1][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				//var temp_class_str="."+temp_class;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				//var now_class_str=".tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x+1)+"-"+pos_y;
				
				//var next_class_str=".tile-position-"+(pos_x+1)+"-"+pos_y;

				//为何直接用本身就是支字符串的变量时$的选择器不起作用？？

				//alert($(now_class_str).tagName);
				//$(now_class_str).addClass(temp_class);
				//$(temp_class_str).removeClass(now_class);
				//$(temp_class_str).addClass(next_class);
				//$(next_class_str).removeClass(temp_class);


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i-1][j]+10;
					move_array2[i-1][j]=0;
					valid_step=true;
				
			}

		}

	} 
	if(score_each>0){
		add_score();
	}
}



function move_left(){

	$("#block-box .tile").removeClass("tile-new"); 
	$("#block-box .tile").removeClass("tile-merged");   
	$(".score-block").remove();

	score_each=0;
	valid_step=false;

	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i<move_array2.length-1; i++) {
		for (var j = 0; j < move_array2.length; j++) {

			//移动3格
			if(i<1){
				var more_than_10_3grid=move_array2[i+3][j]-move_array2[i+2][j];
				var more_than_20_3grid=move_array2[i+3][j]-move_array2[i+1][j];
				var more_than_30_3grid=move_array2[i+3][j]-move_array2[i][j];
				if(more_than_20_3grid>20&&more_than_10_3grid>10&&more_than_30_3grid>30){

				var pos_str=(move_array2[i+3][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x-3)+"-"+pos_y;

				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i+3][j]-30;
					move_array2[i+3][j]=0;
					valid_step=true;
				}
			}
			
			
			
			//移动2格
			if(i<2){

				var more_than_10_2grid=move_array2[i+2][j]-move_array2[i+1][j];
				var more_than_20_2grid=move_array2[i+2][j]-move_array2[i][j];

				if(more_than_20_2grid>20&&more_than_10_2grid>10){

				var pos_str=(move_array2[i+2][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x-2)+"-"+pos_y;
				


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i+2][j]-20;
					move_array2[i+2][j]=0;
					valid_step=true;
				}
			}

			//移动1格

			var more_than_10_1grid=move_array2[i+1][j]-move_array2[i][j];

			if(more_than_10_1grid>10){

			var pos_str=(move_array2[i+1][j]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+(pos_x-1)+"-"+pos_y;


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i+1][j]-10;
				move_array2[i+1][j]=0;
				valid_step=true;
			}

		};
		
	}

	get_value(merge_array2);//获取数值地图

	for (var i=0; i< merge_array2.length-1; i++) {
		for (var j = 0; j < merge_array2.length; j++) {

			if((merge_array2[i+1][j]==merge_array2[i][j])&&(merge_array2[i+1][j]>0)&&(merge_array2[i][j]>0)){

				//获得后面一方块坐标 
				var pos_str=(move_array2[i+1][j]).toString();
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				var now_class_back="tile-position-"+pos_x+"-"+pos_y;
				var now_class_front="tile-position-"+(pos_x-1)+"-"+pos_y;
				var old_value_class="tile-"+merge_array2[i+1][j];
				//alert(old_value_class);
				

				//move赋值保持后续连续
				move_array2[i][j]=move_array2[i+1][j]-10;
				move_array2[i+1][j]=0;

				//value赋值保持后续连续
				merge_array2[i][j]=2*merge_array2[i+1][j];
				merge_array2[i+1][j]=0;

				var new_value_class="tile-"+merge_array2[i][j];

				//统计每一步移动得多少分
				score_each=score_each+merge_array2[i][j];

				//后面的往前滑动

				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_back)){
						$(this).removeClass(now_class_back);
						$(this).addClass(now_class_front);
						$(this).addClass("useless");
					}
				});


				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_front)){
						$(this).addClass("tile-merged");
						$(this).removeClass(old_value_class);
						$(this).addClass(new_value_class);
						$(this).children(".tile-inner").text(merge_array2[i][j]);
						$(this).removeClass(now_class_front);
						$(this).addClass(now_class_front);	
					}
				});
				valid_step=true;
				tiles_count--;
			}

		};
	}


	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i<move_array2.length-1; i++) {
		for (var j = 0; j < move_array2.length; j++) {

			//移动3格
			if(i<1){
				var more_than_10_3grid=move_array2[i+3][j]-move_array2[i+2][j];
				var more_than_20_3grid=move_array2[i+3][j]-move_array2[i+1][j];
				var more_than_30_3grid=move_array2[i+3][j]-move_array2[i][j];
				if(more_than_20_3grid>20&&more_than_10_3grid>10&&more_than_30_3grid>30){

				var pos_str=(move_array2[i+3][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x-3)+"-"+pos_y;

				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i+3][j]-30;
					move_array2[i+3][j]=0;
					valid_step=true;
				}
			}
			
			
			
			//移动2格
			if(i<2){

				var more_than_10_2grid=move_array2[i+2][j]-move_array2[i+1][j];
				var more_than_20_2grid=move_array2[i+2][j]-move_array2[i][j];

				if(more_than_20_2grid>20&&more_than_10_2grid>10){

				var pos_str=(move_array2[i+2][j]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+(pos_x-2)+"-"+pos_y;
				


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i+2][j]-20;
					move_array2[i+2][j]=0;
					valid_step=true;
				}
			}

			//移动1格

			var more_than_10_1grid=move_array2[i+1][j]-move_array2[i][j];

			if(more_than_10_1grid>10){

			var pos_str=(move_array2[i+1][j]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+(pos_x-1)+"-"+pos_y;


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i+1][j]-10;
				move_array2[i+1][j]=0;
				valid_step=true;
			}

		};
		
	}
	if(score_each>0){
		add_score();
	}
}

function move_up(){

	$("#block-box .tile").removeClass("tile-new"); 
	$("#block-box .tile").removeClass("tile-merged");   
	$(".score-block").remove();

	score_each=0;
	valid_step=false;

	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i<move_array2.length; i++) {
		for (var j = 0; j < move_array2.length-1; j++) {

			//移动3格

			if(j<1){
				var more_than_1_3grid=move_array2[i][j+3]-move_array2[i][j+2];
				var more_than_2_3grid=move_array2[i][j+3]-move_array2[i][j+1];
				var more_than_3_3grid=move_array2[i][j+3]-move_array2[i][j];
				if(more_than_2_3grid>2&&more_than_1_3grid>1&&more_than_3_3grid>3){

				var pos_str=(move_array2[i][j+3]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+pos_x+"-"+(pos_y-3);

				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i][j+3]-3;
					move_array2[i][j+3]=0;
					valid_step=true;
				}
				
			}
			
			//移动2格
			if(j<2){
				var more_than_1_2grid=move_array2[i][j+2]-move_array2[i][j+1];
				var more_than_2_2grid=move_array2[i][j+2]-move_array2[i][j];

				if(j<2&&more_than_2_2grid>2&&more_than_1_2grid>1){

				var pos_str=(move_array2[i][j+2]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+pos_x+"-"+(pos_y-2);
				


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i][j+2]-2;
					move_array2[i][j+2]=0;
					valid_step=true;
				}
			}

			//移动1格
			var more_than_1_1grid=move_array2[i][j+1]-move_array2[i][j];

			if(more_than_1_1grid>1){

			var pos_str=(move_array2[i][j+1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y-1);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i][j+1]-1;
				move_array2[i][j+1]=0;
				valid_step=true;
			}

		};
		
	}

	get_value(merge_array2);//获取数值地图

	for (var j=0; j< merge_array2.length-1; j++) {
		for (var i = 0; i < merge_array2.length; i++) {

			if((merge_array2[i][j+1]==merge_array2[i][j])&&(merge_array2[i][j+1]>0)&&(merge_array2[i][j]>0)){

				//获得后面一方块坐标 
				var pos_str=(move_array2[i][j+1]).toString();
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				var now_class_back="tile-position-"+pos_x+"-"+pos_y;
				var now_class_front="tile-position-"+pos_x+"-"+(pos_y-1);
				var old_value_class="tile-"+merge_array2[i][j+1];
				//alert(old_value_class);
				

				//move赋值保持后续连续
				move_array2[i][j]=move_array2[i][j+1]-1;
				move_array2[i][j+1]=0;

				//value赋值保持后续连续
				merge_array2[i][j]=2*merge_array2[i][j+1];
				merge_array2[i][j+1]=0;

				var new_value_class="tile-"+merge_array2[i][j];

				//统计每一步移动得多少分
				score_each=score_each+merge_array2[i][j];

				//后面的往前滑动

				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_back)){
						$(this).removeClass(now_class_back);
						$(this).addClass(now_class_front);
						$(this).addClass("useless");
					}
				});


				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_front)){	
						$(this).addClass("tile-merged");
						$(this).removeClass(old_value_class);
						$(this).addClass(new_value_class);
						$(this).children(".tile-inner").text(merge_array2[i][j]);
						$(this).removeClass(now_class_front);
						$(this).addClass(now_class_front);	
					}
				});
				valid_step=true;
				tiles_count--;
			}

		};
	}

	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i<move_array2.length; i++) {
		for (var j = 0; j < move_array2.length-1; j++) {

			//移动3格

			if(j<1){
				var more_than_1_3grid=move_array2[i][j+3]-move_array2[i][j+2];
				var more_than_2_3grid=move_array2[i][j+3]-move_array2[i][j+1];
				var more_than_3_3grid=move_array2[i][j+3]-move_array2[i][j];
				if(more_than_2_3grid>2&&more_than_1_3grid>1&&more_than_3_3grid>3){

				var pos_str=(move_array2[i][j+3]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+pos_x+"-"+(pos_y-3);

				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i][j+3]-3;
					move_array2[i][j+3]=0;
					valid_step=true;
				}
				
			}
			
			//移动2格
			if(j<2){
				var more_than_1_2grid=move_array2[i][j+2]-move_array2[i][j+1];
				var more_than_2_2grid=move_array2[i][j+2]-move_array2[i][j];

				if(j<2&&more_than_2_2grid>2&&more_than_1_2grid>1){

				var pos_str=(move_array2[i][j+2]).toString();

				//获得已存在方块坐标 
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				//var temp_class=pos_x+"-"+pos_y;
				var now_class="tile-position-"+pos_x+"-"+pos_y;
				var	next_class="tile-position-"+pos_x+"-"+(pos_y-2);
				


				$("#block-box .tile").each(function(){
					
					if($(this).hasClass(now_class)){
						$(this).removeClass(now_class);
						$(this).addClass(next_class);
					}
				});
					
					//赋值保持后续连续
					move_array2[i][j]=move_array2[i][j+2]-2;
					move_array2[i][j+2]=0;
					valid_step=true;
				}
			}

			//移动1格
			var more_than_1_1grid=move_array2[i][j+1]-move_array2[i][j];

			if(more_than_1_1grid>1){

			var pos_str=(move_array2[i][j+1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y-1);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i][j+1]-1;
				move_array2[i][j+1]=0;
				valid_step=true;
			}

		};
		
	}
	if(score_each>0){
		add_score();
	}
}


function move_down(){

	$("#block-box .tile").removeClass("tile-new"); 
	$("#block-box .tile").removeClass("tile-merged"); 
	$(".score-block").remove();

	score_each=0;
	valid_step=false;

	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i < move_array2.length; i++) {
		for (var j = move_array2.length-1; j>=1 ; j--) {

			//移动3格
			if(j<2&&move_array2[i][j-1]>move_array2[i][j]&&move_array2[i][j-1]>move_array2[i][j+1]&&move_array2[i][j-1]>move_array2[i][j+2]){
			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+3);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j+2]=move_array2[i][j-1]+3;
				move_array2[i][j-1]=0;
				valid_step=true;
			}



			//移动2格
			if(j<3&&move_array2[i][j-1]>move_array2[i][j]&&move_array2[i][j-1]>move_array2[i][j+1]){

			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+2);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j+1]=move_array2[i][j-1]+2;
				move_array2[i][j-1]=0;
				valid_step=true;
			}

			

			//移动1格
			if(move_array2[i][j-1]>move_array2[i][j]){

			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+1);



			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i][j-1]+1;
				move_array2[i][j-1]=0;
				valid_step=true;
			}

		};
		
	}

	get_value(merge_array2);//获取数值地图

	for (var j = merge_array2.length-1; j>=1 ; j--) {
		for (var i = 0; i < merge_array2.length; i++) {

			if((merge_array2[i][j-1]==merge_array2[i][j])&&(merge_array2[i][j-1]>0)&&(merge_array2[i][j]>0)){

				//获得后面一方块坐标 
				var pos_str=(move_array2[i][j-1]).toString();
				var pos_x=parseInt(pos_str.charAt(0));
				var pos_y=parseInt(pos_str.charAt(1));
				var now_class_back="tile-position-"+pos_x+"-"+pos_y;
				var now_class_front="tile-position-"+pos_x+"-"+(pos_y+1);
				var old_value_class="tile-"+merge_array2[i][j-1];
				//alert(old_value_class);
				

				//move赋值保持后续连续
				move_array2[i][j]=move_array2[i][j-1]+1;
				move_array2[i][j-1]=0;

				//value赋值保持后续连续
				merge_array2[i][j]=2*merge_array2[i][j-1];
				merge_array2[i][j-1]=0;

				var new_value_class="tile-"+merge_array2[i][j];

				//统计每一步移动得多少分
					score_each=score_each+merge_array2[i][j];

				//后面的往前滑动

				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_back)){
						$(this).removeClass(now_class_back);
						$(this).addClass(now_class_front);
						$(this).addClass("useless");
					}
				});


				$("#block-box .tile").each(function(){
					if($(this).hasClass(now_class_front)){
						$(this).addClass("tile-merged");
						$(this).removeClass(old_value_class);
						$(this).addClass(new_value_class);
						$(this).children(".tile-inner").text(merge_array2[i][j]);
						$(this).removeClass(now_class_front);
						$(this).addClass(now_class_front);	
					}
				});
				valid_step=true;
				tiles_count--;
			}

		};
		
	}


	get_pos(move_array2);//获取坐标地图

	for (var i = 0; i < move_array2.length; i++) {
		for (var j = move_array2.length-1; j>=1 ; j--) {

			//移动3格
			if(j<2&&move_array2[i][j-1]>move_array2[i][j]&&move_array2[i][j-1]>move_array2[i][j+1]&&move_array2[i][j-1]>move_array2[i][j+2]){
			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+3);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j+2]=move_array2[i][j-1]+3;
				move_array2[i][j-1]=0;
				valid_step=true;
			}



			//移动2格
			if(j<3&&move_array2[i][j-1]>move_array2[i][j]&&move_array2[i][j-1]>move_array2[i][j+1]){

			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+2);


			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j+1]=move_array2[i][j-1]+2;
				move_array2[i][j-1]=0;
				valid_step=true;
			}

			

			//移动1格
			if(move_array2[i][j-1]>move_array2[i][j]){

			var pos_str=(move_array2[i][j-1]).toString();

			//获得已存在方块坐标 
			var pos_x=parseInt(pos_str.charAt(0));
			var pos_y=parseInt(pos_str.charAt(1));
			//var temp_class=pos_x+"-"+pos_y;
			var now_class="tile-position-"+pos_x+"-"+pos_y;
			var	next_class="tile-position-"+pos_x+"-"+(pos_y+1);



			$("#block-box .tile").each(function(){
				
				if($(this).hasClass(now_class)){
					$(this).removeClass(now_class);
					$(this).addClass(next_class);
				}
			});
				
				//赋值保持后续连续
				move_array2[i][j]=move_array2[i][j-1]+1;
				move_array2[i][j-1]=0;
				valid_step=true;
			}

		};
		
	}

	if(score_each>0){
		add_score();
	}
	
}





