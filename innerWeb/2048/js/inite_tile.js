var tiles_count;
var move_array2=new Array_2(4,4);
var merge_array2=new Array_2(4,4);
var blank_array2;
var valid_step=false;
var score_total=0,score_each=0,best_score=localStorage.best;

//随机方格所对应一个数组
//var tile_array2=new Array_2(4,4);

$(".best-score span").text(best_score);

function inite_tile(){
	var temp_x=0,temp_y=0;//,flag=0
	for(var i=0;i<2;i++){

		var random_value = Math.random() < 0.9 ? 2 : 4;
		var	value_class="tile-"+random_value;

		var	pos_x,pos_y;

			do{
				pos_x=Math.ceil(Math.random()*4);
			}while(pos_x==temp_x)

			do{
				pos_y=Math.ceil(Math.random()*4);
			}while(pos_y==temp_y)
			
			//if(flag==1){
			//	tile_array2[pos_x-1][pos_y-1]=pos_x+""+pos_y;
			//}

		var	pst_class="tile-position-"+pos_x+"-"+pos_y;
		var block_box=$("#block-box");
		var wrapper=$("<div></div>");
		var inner=$("<div></div>");
			wrapper.addClass("tile tile-new");
			wrapper.addClass(value_class);
			wrapper.addClass(pst_class);
			
			inner.addClass("tile-inner");
			inner.html(random_value);
			inner.appendTo(wrapper);
			wrapper.appendTo(block_box);
			temp_x=pos_x;
			temp_y=pos_y;

			//inite_pos_one=temp_x+""+temp_y;
			//tile_array2[temp_x-1][temp_y-1]=inite_pos_one;
			//flag=1;

	}

}

inite_tile();


//通过标记已经存在的方块，来寻找空白位置的坐标，方块<=====>二维数组
/*
function tile_available(){

	//把每个方块的坐标值赋值给对应的数组位置，数组坐标与实际值相差1

	//通过从class名称里面获取坐标数字
	$("#block-box .tile").each(function(){
		var class_names=$(this).attr('class');
		var temp_class_array=new Array();
			temp_class_array=class_names.split(" ");
		var class_pos_x=temp_class_array[3].charAt(14);
		var class_pos_y=temp_class_array[3].charAt(16);
			tile_array2[class_pos_x-1][class_pos_y-1]=class_pos_x+""+class_pos_y;

	});

	
	var not_exist=true,exist_number=0;//判定生成的随机数是否已经存在
	var random_value,pos_x,pos_y,pos_str,value_class;

	//查找是否已满16个,若满了就不在生成新的
	//由于模块移动会造成重复统计，所以最后无法填满

	for (var i = 0; i < tile_array2.length; i++) {
		for (var j = 0; j < tile_array2.length; j++) {
			if(tile_array2[i][j]!==0){
				exist_number++;
			}
			
		};
	};

	//alert(exist_number);

	//采用统计DIV的size()属性会出现内存泄露问题？？？？？

	//$("#block-tile .tile").size();

	if(exist_number<16){

		do{
			//在过程中生成一对随机数
			random_value = Math.random() < 0.9 ? 2 : 4;
			value_class="tile-"+random_value;
			pos_x=Math.ceil(Math.random()*4);
			pos_y=Math.ceil(Math.random()*4);
			pos_str=pos_x+""+pos_y;	
			
			//查找是否存在匹配一样的数字
			outer:
			for (var i = 0; i < tile_array2.length; i++) {
				//inner:
				for (var j = 0; j < tile_array2.length; j++) {
					if(tile_array2[i][j]==pos_str){
						not_exist=false;
						break outer;
					}else{
						not_exist=true;
						//continue inner;
					}
				};

			};
			
		}while(not_exist==false)

		//如果不存在一样的坐标，则 可以在此位置生成一个方块
		if(not_exist){

			var	pst_class="tile-position-"+pos_x+"-"+pos_y;
			var block_box=$("#block-box");
			var wrapper=$("<div></div>");
			var inner=$("<div></div>");
			wrapper.addClass("tile tile-new");
				wrapper.addClass(value_class);
				wrapper.addClass(pst_class);
				
				inner.addClass("tile-inner");
				inner.html(random_value);
				inner.appendTo(wrapper);
				wrapper.appendTo(block_box);
		}

	}
	//全局变量 每次按一下增加一个，也会造成内存泄露
	//exist_number++;
}

*/

function Array_2(nRow,nColumn){
		var array1=new Array(); 
		for(var i=0;i<nRow;i++){

			array1[i]=new Array();

　　　　　　for(var n=0;n<nColumn;n++){
				array1[i][n] = 0; 
			}
　　　　}
		return array1;
}


