function decide_win(){

	$(".useless").remove();  

	var won=false;
	//每次一来都看是否已经存在2048
	for (var i=0;i<merge_array2.length; i++) {
		for (var j = 0; j < merge_array2.length; j++) {
			if(parseInt(merge_array2[i][j])==2048){
				won=true;
			}
		}
	}

	if(won){

		$("#game-message").css("display","block");
		$(".you-win").css("display","inline-block");
		$(".you-lose").css("display","none");

	}else{

		//判定各个方向抖不存在相同相邻的数字则失败

		var not_left=true,not_right=true,not_up=true,not_down=true;
		tiles_count=$("#block-box .tile").size();

		console.info(tiles_count);
		
		if(tiles_count==16){
			for (var i=0;i<merge_array2.length; i++) {
				for (var j = 0; j < merge_array2.length; j++) {
					if(i>0){
						 if((merge_array2[i][j]==merge_array2[i-1][j])&&(merge_array2[i][j]>0)&&(merge_array2[i-1][j]>0)){
							not_left=false;
						}
					}

					if(i<merge_array2.length-1){
						 if((merge_array2[i][j]==merge_array2[i+1][j])&&(merge_array2[i][j]>0)&&(merge_array2[i+1][j]>0)){
							not_right=false;
						}
					}

					if(j>0){
						if((merge_array2[i][j]==merge_array2[i][j-1])&&(merge_array2[i][j]>0)&&(merge_array2[i][j-1]>0)){
							not_up=false;
						}
					}
					if(j<merge_array2.length-1){
						if((merge_array2[i][j]==merge_array2[i][j+1])&&(merge_array2[i][j]>0)&&(merge_array2[i][j+1]>0)){
							not_down=false;
						}
					}


				}
			}
			//console.info(not_left+"---"+not_up+"---"+not_right+"---"+not_down);
			//显示失败的提示
			if(not_left&&not_right&&not_up&&not_down){
				$("#game-message").css("display","block");
				$(".you-win").css("display","none");
				$(".you-lose").css("display","inline-block");
				if(typeof localStorage.best == "undefined"){
					localStorage.best=0;
				}
				var bst=parseInt(localStorage.best);
				if(score_total>bst){
					localStorage.best=score_total;
				}

				$(".best-score span").text(localStorage.best);
				//alert(3);
			}
		}


	}

}