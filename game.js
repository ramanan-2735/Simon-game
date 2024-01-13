var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);


    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}


//button detection
$(".btn").click(function () {
    var userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})



//Sound Effects
function playSound(name) {

    switch (name) {
        case "red":
            var red = new Audio('./sounds/red.mp3');
            red.play();
            break;

        case "green":
            var green = new Audio('./sounds/green.mp3');
            green.play();
            break;

        case "blue":
            var blue = new Audio('./sounds/blue.mp3');
            blue.play();
            break;

        case "yellow":
            var yellow = new Audio('./sounds/yellow.mp3');
            yellow.play();
            break;

        default:
            break;
    }
}

//Click Animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");

    }, 100);
}


//7 - Game Start
$(document).on("keypress", function () {

    if (!started) {

        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }

});

$(".start").click(function () {

    if (!started) {

        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }

});

//8 - User's answer
function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }

    }//9 - Game Over
    else {
        console.log("wrong");
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


//10 - Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
