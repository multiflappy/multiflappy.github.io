class Pipe {
	constructor(boardWidth, boardHeight) {
		this.posx = boardWidth;
		this.topPosy = 0;

		this.width = 50;
		this.topHeight = null;
		this.setHeight(boardHeight);

		this.gap = boardHeight * 0.3;

		this.bottomPosy = this.topHeight + this.gap;
		this.bottomHeight = boardHeight - this.bottomPosy;

		this.color = "green";

		this.shouldRemove = false;
	}

	setHeight(boardHeight) {
		let height = Math.floor(boardHeight * Math.random());
		let minHeight = boardHeight * 0.3;
		let maxHeight = boardHeight * 0.5;

		if (height < minHeight) {
			height = minHeight;
		} else if (height > maxHeight) {
			height = maxHeight;
		}

		this.topHeight = height;
	}

	move() {
		this.posx -= 5;

		if (this.posx + this.width < 0) {
			this.shouldRemove = true;
		}
	}

	draw() {
		board.fillStyle = this.color;
		board.fillRect(this.posx, this.topPosy, this.width, this.topHeight);
		board.fillRect(this.posx, this.bottomPosy, this.width, this.bottomHeight);
	}

	topCollides(bird) {
		const halfWidth = this.width / 2;
		const halfHeight = this.topHeight / 2;

		const centerx = this.posx + halfWidth;
		const centery = this.topPosy + halfHeight;

		const distancex = Math.abs(bird.posx - centerx);
		const distancey = Math.abs(bird.posy - centery);

		if (distancex > bird.radius + halfWidth || distancey > bird.radius + halfHeight) {
			return false;
		}

		if (distancex <= halfWidth || distancey <= halfHeight) {
			return true;
		}

		return (distancex - halfWidth) * (distancex - halfWidth) + (distancey - halfHeight) * (distancey - halfHeight) <= bird.radius * bird.radius;
	}

	bottomCollides(bird) {
		const halfWidth = this.width / 2;
		const halfHeight = this.bottomHeight / 2;

		const centerx = this.posx + halfWidth;
		const centery = this.bottomPosy + halfHeight;

		const distancex = Math.abs(bird.posx - centerx);
		const distancey = Math.abs(bird.posy - centery);

		if (distancex > bird.radius + halfWidth || distancey > bird.radius + halfHeight) {
			return false;
		}

		if (distancex <= halfWidth || distancey <= halfHeight) {
			return true;
		}

		return (distancex - halfWidth) * (distancex - halfWidth) + (distancey - halfHeight) * (distancey - halfHeight) <= bird.radius * bird.radius;
	}
}