const buttonColours = ["red", "blue", "yellow", "green"];
let
 gamePattern = [];
let userClickedPattern = [];

let level = 0;

let started = false;

//when a Keyboard key is pressed.
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$("button").click(function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    makeSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $(".level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//function for generating random no. b/w 0-3
function nextSequence() {
  userClickedPattern = [];

  level++;

  $(".level-title").text("level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makeSound(randomChosenColour);
}

function makeSound(key) {
  let audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function animatePress(currenColor) {
  $("#" + currenColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currenColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}