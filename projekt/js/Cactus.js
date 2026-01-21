
class Cactus {

    /** @param {number} speed - Movement speed
         * @param {number} [x=width] - X position
         * @param {number} [w=25] - Width
         * @param {number} [h=50] - Height
         * @param {number} [groundPadding=30] - Ground offset
         * @param {number|null} [variant=null] - Visual variant
         */
	constructor(speed, x = width, w = 25, h = 50, groundPadding = 30) {
		this.x = x;
		this.w = w;
		this.h = h;
		this.y = height - groundPadding - this.h;
		this.speed = speed;
	}

	// Helper to change default cactus drawing size at runtime
	static setDefaultSize(w, h) {
		Cactus.defaultW = w;
		Cactus.defaultH = h;
	}

	update() {
		this.x -= this.speed;
	}

	show() {
		// Strict image-only cactus: draw the loaded cactus image; otherwise draw nothing
		if (Cactus.img) {
			push();
			// Draw the image stretched to the cactus rectangle size (w x h)
			const imgW = this.w;
			const imgH = this.h;
			const drawX = this.x;
			const drawY = this.y;
			image(Cactus.img, drawX, drawY, imgW, imgH);
			pop();
		} else {
			// placeholder rectangle while image loads (transparent background desired)
			push();
			noStroke();
			fill(34, 139, 34);
			rect(this.x, this.y, this.w, this.h, 6);
			pop();
		}
	}

	offscreen() {
		return this.x + this.w < 0;
	}

	hitbox() {
		return { x: this.x, y: this.y, w: this.w, h: this.h };
	}

	hit(dino) {
		const b = (typeof dino.hitbox === 'function') ? dino.hitbox() : null;
		if (!b) return false;
		return collideRectRect(b.x, b.y, b.w, b.h, this.x, this.y, this.w, this.h);
	}

}
