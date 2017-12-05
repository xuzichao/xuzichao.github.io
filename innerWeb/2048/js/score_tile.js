function add_score () {
	score_total=score_total+score_each;
	$(".now-score span").text(score_total);
	var now_score=$(".now-score");
	var plus_scr="+"+score_each;
	var score_div=$("<div></div>");
		score_div.addClass("score-block");
		score_div.html(plus_scr);
		score_div.appendTo(now_score);
}