function create_on_blank(){

	if(valid_step){

		blank_array2=new Array("11","12","13","14","21","22","23","24","31","32","33","34","41","42","43","44");

		//get_pos(tile_array2);
		
		for (var i = 0; i < move_array2.length; i++) {
			for (var j = 0; j < move_array2.length; j++) {
				//alert(move_array2[i][j]);
				operator_b_array(move_array2[i][j]);
			};
		};

		/*for (var i = 0; i < move_array2.length; i++) {
			for (var j = 0; j < move_array2.length; j++) {
				alert(move_array2[i][j]+"----"+(i+1)+""+(j+1));
				//operator_b_array(move_array2[i][j]);
			};
		};


		for (var i = 0; i < blank_array2.length; i++) {
			alert(blank_array2[i]);
		};*/
		
		var blank_length=blank_array2.length;
		//alert(blank_array2.length);
			if(blank_length>0){

			var random_value = Math.random() < 0.9 ? 2 : 4,
			value_class="tile-"+random_value;
			var choosed_nmb=parseInt(Math.random()*blank_length-1),
			pos_x=blank_array2[choosed_nmb].charAt(0),
			pos_y=blank_array2[choosed_nmb].charAt(1),
			pos_str=pos_x+""+pos_y;	
			
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

}



function operator_b_array(str_value){

	for (var i = 0; i < blank_array2.length; i++) {
		if(blank_array2[i]==str_value){
			if(i==0){
				blank_array2.shift();
			}else if(i==blank_array2.length-1){
				blank_array2.pop();
			}else{
				var front_arr=blank_array2.slice(0,i);
				var back_arr=blank_array2.slice(i+1);
				blank_array2=front_arr.concat(back_arr);
			}
		}

	};

}
