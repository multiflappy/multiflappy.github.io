"use strict";

class BoardData {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.canvas = this.createCanvas();
		this.board = this.canvas.getContext("2d");
		this.board.font = "20px Verdana";

		this.bird = new Bird(width, height);
		this.pipes = [];
	}

	createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		$("body").append(canvas);

		return canvas;
	}

	shouldStop() {
		// If out of bounds
		if (this.bird.posy < this.bird.radius || this.bird.posy > this.height - this.bird.radius) {
			return true;
		}

		for (let i = 0; i < this.pipes.length; i++) {
			const pipe = this.pipes[i];
			if (this.bird.posx + this.bird.radius < pipe.posx) {
				break;
			}

			return pipe.topCollides(this.bird) || pipe.bottomCollides(this.bird);
		}
	}

	step() {
		if (this.shouldStop()) {
			return false;
		}

		this.bird.move(this.pipes);
		this.pipes.forEach(pipe => pipe.move());

		return true;
	}
}