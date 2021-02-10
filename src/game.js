"use strict";

// To disable sounds on safari until finding a solution to slow down problem
var isSafari;
try {
	var e;
	var f = e.width;
} catch(e) {
	isSafari = e.toString().indexOf("not an object") != -1 ? true : false;
}

const jumpAudioFilename = "audio/minecraft.mp3";
const deathAudioFilename = "audio/akasya_duragi.mp3";

function playAudio(filename) {
	new Audio(filename).play();
}

var playing = false;
var pressed = false;

function setKeyCallbacks(boardData) {
	$(document).bind("keydown", key => {
		if (playing && !pressed && key.keyCode == 32) {
			if (!isSafari) {
				playAudio(jumpAudioFilename);
			}

			boardData.bird.jump();
			pressed = true;
		}
	});

	$(document).bind("touchstart", () => {
		if (playing && !pressed) {
			if (!isSafari) {
				playAudio(jumpAudioFilename);
			}

			boardData.bird.jump();
			pressed = true;
		}
	});

	$(document).bind("keyup", key => pressed = false);
	$(document).bind("touchend", () => pressed = false);
}

function draw(boardData, score) {
	const board = boardData.board;

	// Clear board
	board.clearRect(0, 0, boardData.width, boardData.height);

	// Draw pipes
	board.fillStyle = boardData.pipes[0].color;
	boardData.pipes.forEach(pipe => {
		board.fillRect(pipe.posx, pipe.topPosy, pipe.width, pipe.topHeight);
		board.fillRect(pipe.posx, pipe.bottomPosy, pipe.width, pipe.bottomHeight);
	});

	// Draw bird
	const bird = boardData.bird;

	board.beginPath();
	board.arc(bird.posx, bird.posy, bird.radius, 0, 2 * Math.PI);
	board.closePath();
	board.fillStyle = bird.color;
	board.fill();

	// Print score
	boardData.board.fillStyle = "black";
	boardData.board.fillText("Score: " + score, boardData.width * 0.4, boardData.height * 0.1);
}

function pipeLoop(boardData) {
	boardData.pipes.push(new Pipe(boardData.width, boardData.height));

	return setInterval(() => {
		boardData.pipes.push(new Pipe(boardData.width, boardData.height));
	}, 1000);
}

function run(boardData) {
	playing = true;

	let score = 0;
	let loops = [];

	loops.push(pipeLoop(boardData));
	loops.push(setInterval(() => score += 1, 1000));

	loops.push(setInterval(() => {
		draw(boardData, score);

		if (!boardData.step()) {
			loops.forEach(loop => clearInterval(loop));
			playing = false;

			if (!isSafari) {
				playAudio(deathAudioFilename);
			}

			setTimeout(() => {
				boardData.destroyCanvas();
				$(document).off();

				const singlePlayerButton = $("#singlePlayerButton");
				singlePlayerButton.html("Play Again");
				singlePlayerButton.show();
			}, 1500);			
		}

		if (boardData.pipes.length != 0 && boardData.pipes[0].shouldRemove) {
			boardData.pipes.splice(0, 1);
		}
	}, 1000 / 60));
}

/*
function main() {
	const boardData = new BoardData(window.innerWidth, window.innerHeight);
	setKeyCallbacks(boardData);
	run(boardData);
}

$(main);
*/

function startSinglePlayer() {
	$("#singlePlayerButton").hide();

	let boardData = new BoardData(window.innerWidth, window.innerHeight);
	setKeyCallbacks(boardData);
	run(boardData);
}