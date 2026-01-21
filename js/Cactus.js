// Statická překážka - hezký kaktus
class Cactus {
  // Parametry: rychlost, pozice, rozměry, odsazení od země
	constructor(speed, x = width, w = 25, h = 50, groundPadding = 30) {
		this.x = x;
		this.w = w;
		this.h = h;
		this.y = height - groundPadding - this.h;
		this.speed = speed;
	}

	update() {
		this.x -= this.speed;
	}

	show() {
		push();
		
		// Kreslení hezky vypadajícího kaktusu
		fill(34, 139, 34); // Zelená barva
		stroke(20, 100, 20); // Tmavší obrys
		strokeWeight(1.5);

		// Hlavní tělo kaktusu
		rect(this.x, this.y, this.w, this.h, 3);

		// Trnité výběžky
		const spineSize = this.w * 0.15;
		const spineColor = color(50, 180, 50); // Světlejší výběžky
		fill(spineColor);
		
		// Levé trnité výběžky
		for (let i = 0; i < 4; i++) {
			const py = this.y + this.h * 0.2 + i * this.h * 0.2;
			rect(this.x - spineSize * 1.5, py, spineSize, spineSize * 0.8, 2);
		}
		
		// Pravé trnité výběžky
		for (let i = 0; i < 4; i++) {
			const py = this.y + this.h * 0.2 + i * this.h * 0.2;
			rect(this.x + this.w + spineSize * 0.5, py, spineSize, spineSize * 0.8, 2);
		}

		// Světlejší zvýraznění na těle
		noStroke();
		fill(60, 180, 60, 100);
		rect(this.x + this.w * 0.1, this.y + this.h * 0.1, this.w * 0.3, this.h * 0.7, 2);

		pop();
	}

	offscreen() {
		return this.x + this.w < 0;
	}

	hitbox() {
		return { x: this.x, y: this.y, w: this.w, h: this.h };
	}

	// Detekce kolize s dinosaurem
	hit(dino) {
		const b = (typeof dino.hitbox === 'function') ? dino.hitbox() : null;
		if (!b) return false;
		return collideRectRect(b.x, b.y, b.w, b.h, this.x, this.y, this.w, this.h);
	}

}
