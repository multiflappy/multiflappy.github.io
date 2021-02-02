var canvas = null;
var board = null;

var boardWidth = window.innerWidth;
var boardHeight = window.innerHeight;

var bird = new Bird(boardWidth, boardHeight);
var pipes = [];

var score = 0;

function getBoard() {
	canvas = $("#canvas")[0];
	canvas.width = boardWidth;
	canvas.height = boardHeight;

	board = canvas.getContext("2d");
	board.font = "20px Verdana";
}

function drawBoard() {
	board.clearRect(0, 0, canvas.width, canvas.height);
	bird.draw();
	pipes.forEach(pipe => pipe.draw());
}

function managePipes() {
	pipes.push(new Pipe(boardWidth, boardHeight));

	pipeLoop = setInterval(() => {
		pipes.push(new Pipe(boardWidth, boardHeight));

		if (!bird.isAlive) {
			clearInterval(pipeLoop);
		}
	}, 1000);
}

function printScore() {
	board.fillStyle = "black";
	board.fillText("Score: " + Math.floor(score), boardWidth * 0.4, boardHeight * 0.1);
}

function run() {
	drawBoard();
	bird.move(pipes);
	managePipes();
	pipes.forEach(pipe => pipe.move());

	gameLoop = setInterval(() => {
		drawBoard();
		bird.move(pipes);
		pipes.forEach(pipe => pipe.move());

		if (pipes.length != 0 && pipes[0].shouldRemove) {
			pipes.splice(0, 1);
		}

		if (!bird.isAlive) {
			clearInterval(gameLoop);
			alert("You Died");
		}

		score += 0.1;
		printScore();
	}, 1000 / 60);
}

var pressed = false;

function setKeyCallbacks() {
	$(document).bind("keydown touchstart", key => {
		if (!pressed && key.keyCode == 32) {
			bird.jump();
			pressed = true;
		}
	});

	$(document).bind("keyup touchend", key => pressed = false);
}

function main() {
	getBoard();
	setKeyCallbacks();
	run();
}

$(main);