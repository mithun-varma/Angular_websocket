
$('#btnAdd').click(function (e) {
 	var nextGame = $('#tabs li').size()+1;
	var gamenum = nextGame-1;
	if(gamenum>2){
		alert("You have enough games to play...pl close atleast one game to join another!");
		return false;
		}

 	// create the tab
 	$('<li><a href="#game'+gamenum+'" data-toggle="tab">Game Table '+gamenum+'</a></li>').appendTo('#tabs');
 	
 	// create the tab content
 	//$('<div class="tab-pane xxx game1" id="tab'+nextTab+'">Game table 1</div>').appendTo('.acetab');
	 	
 	// make the new tab active
 	$('#tabs a:last').tab('show');
});