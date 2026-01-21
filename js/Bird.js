// Létající překážka - jednoduchý pták
class Bird {
  constructor(speed) {
    this.x = width;
    this.baseY = random(50, height - 80);
    this.y = this.baseY;
    this.w = 30;
    this.h = 15;
    this.speed = speed + random(0.5, 1.5);
    this.wingPhase = 0;
  }

  update() {
    this.x -= this.speed;
    // Jemný vertikální pohyb
    this.y = this.baseY + sin(frameCount * 0.05) * 8;
    this.wingPhase += 0.3;
  }

  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(100, 100, 100);

    // Tělo
    ellipse(0, 0, this.w, this.h);

    // Hlava
    fill(80, 80, 80);
    ellipse(this.w * 0.3, -this.h * 0.2, this.w * 0.5, this.h * 0.7);

    // Oko
    fill(255);
    ellipse(this.w * 0.45, -this.h * 0.3, 3, 3);

    // Mávající křídla
    const waveY = sin(this.wingPhase) * 4;
    fill(120, 120, 120);
    ellipse(-this.w * 0.1, waveY, this.w * 0.6, this.h * 0.5);

    pop();
  }

  offscreen() {
    return this.x < -40;
  }

  hit(dino) {
    let b = dino.hitbox();
    return collideRectRect(
      b.x, b.y, b.w, b.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w, this.h
    );
  }
}

