var buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-heading").text(" Level " + level);
        nextSequence();
        started = true;
    }
});

//detect button click, and create a function that stores the Id of what triggered this event
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-heading").text(" Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    //to select a random button ID with the same ID to animate(flash)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}


//to play sound from the randomly selected button 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//check the answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence()},1000)
        }
    }
    else { playSound("wrong");
    $("body").addClass("game-over");
    $("#level-heading").text("Game over, press any key to restart");

    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    startOver();
}
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


// to play sound on each button when clicked
// $("#green").click(function playSound() {
//     var green = new Audio('sounds/green.mp3');
//     green.play();
// })
// $("#red").click(function playSound() {
//     var red = new Audio('sounds/red.mp3');
//     red.play();
// })
// $("#yellow").click(function playSound() {
//     var yellow = new Audio('sounds/yellow.mp3');
//     yellow.play();
// })
// $("#blue").click(function playSound() {
//     var blue = new Audio('sounds/blue.mp3');
//     blue.play();
// })