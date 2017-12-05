
$(".restart,.retry").click(function(){
	$("#block-box .tile").remove();
	inite_tile();
	score_total=0;
	$("#game-message").css("display","none");

	for (var i=0;i<merge_array2.length; i++) {
		for (var j = 0; j < merge_array2.length; j++) {
			move_array2[i][j]=0;
			}
		}
	for (var i=0;i<merge_array2.length; i++) {
		for (var j = 0; j < merge_array2.length; j++) {
			merge_array2[i][j]=0;
		}
	}

});