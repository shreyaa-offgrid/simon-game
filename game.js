let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

function nextSequence() {
    userClickedPattern=[];
    let rn = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[rn];
    gamePattern.push(randomChosenColour);
    let thisButton = $("#" + randomChosenColour);
    thisButton.fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);  
}

$(".btn").on("click",function(event){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    let thisAudio = new Audio("./sounds/" + name + ".mp3");
    thisAudio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

$(document).keydown(function(event){
    if(started===false){
        started = true;
        nextSequence();
    }
    
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("GAME OVER, Press any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}