"use strict";

class Bird {
	constructor(boardWidth, boardHeight) {
		this.posx = boardWidth * 0.1;
		this.posy = boardHeight * 0.3;
		this.radius = 15;

		this.speed = 0;

		this.color = "red";
	}

	move() {
		if (this.speed > -5) {
			this.speed -= 1;
		}

		this.posy -= this.speed;
	}

	jump() {
		if (this.speed < 0) {
			this.speed = 10;
		} else {
			this.speed += 10;
		}

		if (this.speed > 30) {
			this.speed = 30;
		}
	}
}