var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"]

var level = 0;

var started = false;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("sounds/wrong.mp3");

        $("body").addClass("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColor + ".mp3");
}


$(".btn").click( function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound("sounds/" + userChosenColor + ".mp3");
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        document.querySelector("#"+currentColour).classList.remove("pressed");
    },100);
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}