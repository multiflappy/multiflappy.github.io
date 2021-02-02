class Bird {
	constructor(boardWidth, boardHeight) {
		this.posx = boardWidth * 0.1;
		this.posy = boardHeight * 0.3;
		this.radius = 15;
		this.speed = 0;
		this.color = "red";
		this.isAlive = true;
	}

	move(pipes) {
		if (this.collides(pipes)) {
			this.isAlive = false;
			return;
		}

		if (this.speed > -5) {
			this.speed -= 1;
		}

		this.posy -= this.speed;
		if (this.posy > canvas.height - this.radius) {
			this.posy = canvas.height - this.radius;
			this.isAlive = false;
		}

		if (this.posy < this.radius) {
			this.posy = this.radius;
			this.isAlive = false;
		}
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

	draw() {
		board.beginPath();
		board.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
		board.closePath();
		board.fillStyle = this.color;
		board.fill();
	}

	collides(pipes) {
		for (let i = 0; i < pipes.length; i++) {
			let pipe = pipes[i];
			if (this.posx + this.radius < pipe.posx) {
				break;
			}

			return pipe.topCollides(this) || pipe.bottomCollides(this);
		}
	}
}