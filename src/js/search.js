$('#menu-search-input').keyup(function(event){
	var input = $(this);
	var val = input.val();
	console.log(val);
	var regexp = '\\b(.*)';
	for(var i in val){
		regexp += '('+val[i]+')(.*)';
	}
	regexp += '\\b';
	$.each($('.Tuile'), function(i, v){
		var title = $(v).children('#titre').html();
		if(title.match(new RegExp(regexp, 'i'))){
			console.log(title);
			$(this).parent().fadeIn();
		}
		else{
			$(this).parent().fadeOut();
		}
	});
});
