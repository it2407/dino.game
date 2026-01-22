class Cactus {

    /**
     * @param {number} speed - rychlost pohybu kaktusu
     * @param {number} [x=width] - počáteční X pozice (výchozí: pravý okraj)
     * @param {number} [w=25] - šířka kaktusu
     * @param {number} [h=50] - výška kaktusu
     * @param {number} [groundPadding=30] - odsazení od země
     * @param {number|null} [variant=null] - vizuální varianta (zatím nepoužito)
     */
	constructor(speed, x = width, w = 25, h = 50, groundPadding = 30) {
		// horizontální pozice
		this.x = x;

		// rozměry kaktusu
		this.w = w;
		this.h = h;

		// vertikální pozice – zarovnání na zem
		this.y = height - groundPadding - this.h;

		// rychlost pohybu doleva
		this.speed = speed;
	}

	// Pomocná metoda pro změnu výchozí velikosti kaktusu za běhu programu
	static setDefaultSize(w, h) {
		Cactus.defaultW = w;
		Cactus.defaultH = h;
	}

	update() {
		// posun kaktusu doleva
		this.x -= this.speed;
	}

	show() {
		// Pokud je načtený obrázek kaktusu, vykreslí se obrázek
		if (Cactus.img) {
			push();

			// vykreslení obrázku nataženého na rozměry kaktusu
			const imgW = this.w;
			const imgH = this.h;
			const drawX = this.x;
			const drawY = this.y;

			image(Cactus.img, drawX, drawY, imgW, imgH);
			pop();
		} else {
			// náhradní obdélník, pokud se obrázek ještě nenačetl
			push();
			noStroke();
			fill(34, 139, 34); // zelená barva
			rect(this.x, this.y, this.w, this.h, 6);
			pop();
		}
	}

	// kontrola, zda je kaktus mimo obrazovku
	offscreen() {
		return this.x + this.w < 0;
	}

	// vrací kolizní obdélník kaktusu
	hitbox() {
		return { x: this.x, y: this.y, w: this.w, h: this.h };
	}

	// kontrola kolize s dinosaurem
	hit(dino) {
		// získání hitboxu dinosaura (pokud existuje)
		const b = (typeof dino.hitbox === 'function') ? dino.hitbox() : null;
		if (!b) return false;

		// obdélníková kolize dinosaurus × kaktus
		return collideRectRect(
			b.x, b.y, b.w, b.h,
			this.x, this.y, this.w, this.h
		);
	}

}
