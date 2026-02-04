var gamePattern =[];

var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var started =false;
var level = 0;

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function checkAnswer(nextLevel){
    if (gamePattern[nextLevel]===userClickedPattern[nextLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();},400);
        }

    }else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}