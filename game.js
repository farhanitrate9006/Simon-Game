var buttonColours = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

level = 0;


$(document).on("keypress",function(){
  if(level === 0) nextSequence();
});



$(".btn").on("click",function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length)
      {

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else
    {
      console.log("wrong");
      new Audio("sounds/wrong.mp3").play();

      setTimeout(function(){
        $("body").addClass("game-over");
      },200);
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over.Press Any Key to Restart");
      startOver();
    }
}



function nextSequence()
{
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);

  $("#level-title").text("Level " + (++level));
}


function startOver()
{
  level = 0;
  gamePattern = [];
}


function playSound(key) { new Audio("sounds/" + key + ".mp3").play(); }

function animatePress(currentColour)
{
  activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
  },100);
}
