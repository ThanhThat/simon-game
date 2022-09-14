/** @format */
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

// press any key to start the game
$(document).keypress(function (e) {
	if (!started) {
		$("h1#level-title").text(`Level ${level}`);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	let userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);

	animatePress(userChosenColour);
	playSound(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];

	userClickedPattern = [];
	level++;
	$("h1#level-title").text(`Level ${level}`);

	gamePattern.push(randomChosenColour);

	$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColour) {
	$(`#${currentColour}`).addClass("pressed");

	setTimeout(function () {
		$(`#${currentColour}`).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");

		$("body").addClass("game-over");

		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);

		$("h1#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}