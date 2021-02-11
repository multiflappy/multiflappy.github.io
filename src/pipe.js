"use strict";

class Pipe {
	constructor(boardWidth, boardHeight, topHeight) {
		this.posx = boardWidth;
		this.topPosy = 0;

		this.width = 50;
		this.topHeight = topHeight;

		this.gap = boardHeight * 0.2;

		this.bottomPosy = this.topHeight + this.gap;
		this.bottomHeight = boardHeight - this.bottomPosy;

		this.color = "green";

		this.shouldRemove = false;
	}

	move() {
		this.posx -= 5;

		if (this.posx + this.width < 0) {
			this.shouldRemove = true;
		}
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