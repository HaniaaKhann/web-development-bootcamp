var started = false;
var activeStar = null;
var timeId = null;
var timeLimit = 3000;
var gameOverState = false;



$(document).keydown(function(e){
    if (!started && !gameOverState){
        startGame();
        return;
    }

    if (e.key.toLowerCase() === $(activeStar).data("key")){
        handleSuccess();
    } else {
        gameOver();
    }

    if (gameOverState) {
        if (e.key.toLowerCase() === "r") {
            gameOverState = false;
            startGame();
        }
        return;
    }

    if (e.key.toLowerCase() === "r"){
        startGame();
        return;
    }

});


function startGame(){
    $("h1").text("");
    timeLimit =3000;
    started = true;
    nextStar();
}

function nextStar(){
    $(".star").removeClass("active");
    var randomNumber = Math.floor((Math.random()*4)+1);
    activeStar = "#star-" +randomNumber;
    $(activeStar).addClass("active");
    startTimer();
    console.log(activeStar);
    console.log($(activeStar).hasClass("active"));


}


function startTimer(){
    clearTimeout(timeId); 
    timeId = setTimeout(function(){
        gameOver();
    }, timeLimit);
}

function stopTimer(){
    clearTimeout(timeId);
}

function handleSuccess(){
    stopTimer();
    $(activeStar).removeClass("active");
    nextStar();
}

function gameOver(){
    stopTimer();
    $(activeStar).removeClass("active");
    started = false;
    activeStar = null;
    gameOverState=true;      
    $("h1").text("Game Over, Press R to Restart");
}



