const  buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickPattern= [];

var started = false;
var level  = 0 ;


$(document).keypress(function(){
    while (!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {  $("#" + currentColour).removeClass("pressed");}, 100);
    
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

//game algorithm
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        //console.log("success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {nextSequence();} , 1000);
        }
    } else {
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout( () => { $("body").removeClass("game-over");} , 200);
        
        startOver();

    }

}

function startOver() {
    level = 0 ;
    started = false;
    gamePattern = [] ;
}
