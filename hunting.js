var score = 0;
var speedDiff = 1500;
var speedBase = 3000;
var newBirdPause = 3000;
var paused = false;

// settings
// level 4: insane - speedDiff = 500, speedBase = 1000, newBirdPause = 1000
// level 3: hard - speedDiff = 700, speedBase = 1500, newBirdPause = 2000
// level 2: medium - speedDiff = 1000, speedBase = 2000, newBirdPause = 3000
// level 1: easy - speedDiff = 1500, speedBase = 3000, newBirdPause = 3000

$(document).ready(function() {
	// --------------------------------------- //
	// This section positions elements on the  //
	//  screen, sets the level and the score.  //
	// --------------------------------------- //
	
	//position the menu
	$("#menu").css("top", parseInt($(document).height()));
	$("#menu").css("left", parseInt($(document).width() / 2) - 75);
	
	//populate the menu
	$("#menu").append("<li id='resume'>Resume</li>");
	$("#menu").append("<li id='restart'>Restart</li>");
	$("#menu").append("<li id='main'>Main Menu</li>");

	//position the information bar
	$("#infoBar").css("top", $(document).height());
	$("#infoBar").css("left", ($(document).width()/2) - parseInt(($(document).width() * .6)/2));
	$("#infoBar").css("width", parseInt($(document).width() * .6));
	
	//set the score
	$("#score").html("Current Score:  " + score);
	
	//set the level
	var level = parseInt(window.location.search.split("=")[1]);
	if (level == 1) {
		speedDiff = 1500;
		speedBase = 3000;
		newBirdPause = 3000;
	} else if (level == 2) {
		speedDiff = 1000;
		speedBase = 2000;
		newBirdPause = 3000;
	} else if (level == 3) {
		speedDiff = 700;
		speedBase = 1500;
		newBirdPause = 2000;
	} else if (level == 4) {
		speedDiff = 500;
		speedBase = 1000;
		newBirdPause = 1000;
	} else {
		speedDiff = 1000;
		speedBase = 2000;
		newBirdPause = 3000;
	}
	
	//animate the information bar in
	$("#infoBar").animate({top:($(document).height() - 60)}, "slow", "linear");
	
	//listener for menu button
	$("#button").click(function() {
		paused = true;
		$("#menu").animate({top:(parseInt($(document).height()/2) - 100)}, "fast", "linear");
		$("#infoBar").animate({top:$(document).height()}, "slow", "linear");
		$("#overlay").css("visibility", "visible");
		
		//pause the birds
	
		$(".birdContainer").livequery(function() {
			$(this).stop();
			$(this).attr("prevSpeed", $(this).attr("speed"));
		});
	});
	
	//listeners for buttons on menu screen
	$("#resume").click(function() {
		paused = false;
		$("#menu").animate({top:$(document).height()}, "fast", "linear");
		$("#infoBar").animate({top:($(document).height() - 60)}, "fast", "linear");
		$("#overlay").css("visibility", "hidden");
		
		//start birds moving again
		$(".birdContainer").livequery(function() {
			prevSpeed = parseInt($(this).attr("prevSpeed"));
			newSpeed = prevSpeed * .75;
			$(this).animate({left:"-180px"}, newSpeed, "linear", function() {
				$(this).remove();
			});
		});
	});
	
	$("#restart").click(function() {
		$("#menu").animate({top:$(document).height()}, "fast", "linear", function() {
			location.href = "Hunting_game.html?" + level;
		});
		$("#overlay").css("visibility", "hidden");
	});
	
	$("#main").click(function() {
		$("#menu").animate({top:$(document).height()}, "fast", "linear", function() {
			location.href = "Hunting_main.html";
		});
	});
	
	
	
	
	
	// ------------------------------------------- //
	// This section deals with creating the birds  //
	// and making them move across the screen.     //
	// ------------------------------------------- //
	
	var newSpeed;
	
	//make bird
	makeBird();
	
	$(".birdContainer").livequery(function() {
		$(this).click(function() {
			$(this).css("z-index", "0");
			updateScore(parseInt($(this).attr("points")));
			$(this).stop();
			$(this).animate({top:$(document).height()}, "fast", "linear", function() {
				$(this).remove();
			});
		});
	});
});

function updateScore(points) {
	score += points;
	$("#score").html("Current Score:  " + score);
}

function makeBird() {
	if (!paused) {
		var birdId = parseInt(Math.random() * 5000);
		var height = 0;
		var idString = "#" + birdId;
		var baseSpeed = 10000;
		
		
		//pick a random bird size
		var size = parseInt(Math.random()*4);
		var birdUrlString = "";
		var birdMaxTop = 0;
		var birdMinTop = 0;
		var birdZIndex = 0;
		var birdSpeed = 0;
		var points = 0;
		
		
		if (size == 0) {
			birdUrlString = "birdS.png";
			birdZIndex = 22;
			height = parseInt(Math.random() * (($(document).height()-250) * .25));
			birdSpeed = parseInt(Math.random() * speedDiff) + parseInt(speedBase*2.5);
			points = 4;
		} else if (size == 1) {
			birdUrlString = "birdM.png";
			birdZIndex = 23;
			height = parseInt((Math.random() * (($(document).height() - 250) * .25)) + (($(document).height() - 250) * .25));
			birdSpeed = parseInt(Math.random() * speedDiff) + parseInt(speedBase*2);
			points = 3;
		} else if (size == 2) {
			birdUrlString = "birdL.png";
			birdZIndex = 24;
			height = parseInt((Math.random() * (($(document).height() - 250) * .25)) + (($(document).height() - 250) * .5));
			birdSpeed = parseInt(Math.random() * speedDiff) + parseInt(speedBase*1.5);
			
			points = 2;
		} else {
			birdUrlString = "birdXL.png";
			birdZIndex = 25;
			height = parseInt((Math.random() * (($(document).height() - 250) * .25)) + (($(document).height() - 250) * .75));
			birdSpeed = parseInt(Math.random() * speedDiff) + speedBase;
			points = 1;
		}
		
		//create the html
		$("#container").append("<div id='"+birdId+"' class='birdContainer' speed='" + birdSpeed + "' points='" + points + "'><div class='bouncer'><img src='Birds/" + birdUrlString + "'></div></div>");
		
		//set style element
		$(idString).css("position", "absolute");
		$(idString).css("left", $(document).width());
		$(idString).css("top", height + "px");
		$(idString).css("z-index", birdZIndex);
		
		bounce(idString);
		move(idString, birdSpeed);
	}
	
	setTimeout("makeBird()", newBirdPause);
}

function bounce(id) {
	$(id + " .bouncer").animate({top:"-=4px"}, "fast").animate({top:"+=4px"}, "fast");
	setTimeout("bounce('"+id+"')", parseInt(Math.random()*1100));
}

function move(id, speed) {
	$(id).animate({left:"-180px"},  speed, "linear", function() {
		$(this).remove();
	});
}