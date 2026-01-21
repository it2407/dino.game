class Bird {
  // set to true to make birds face right, false to face left
  constructor(speed) {
    this.x = width;
    // allow birds to appear across a large vertical range
    this.baseY = random(40, height - 100);
    this.y = this.baseY;
    this.scale = random(0.7, 1.2);
    this.w = 40 * this.scale;
    this.h = 20 * this.scale;
    this.speed = speed + random(0.5, 2.0);
    // vertical oscillation for natural flight
    this.osc = random(TWO_PI);
    this.amp = random(6, 28) * this.scale;
    this.wingPhase = random(TWO_PI);
    this.color = color(50 + random(0, 80), 40 + random(0, 40), 30 + random(0, 40));
  }

  update() {
    this.x -= this.speed;
    // gentle sine-wave vertical motion
    this.y = this.baseY + sin((frameCount * 0.08) + this.osc) * this.amp;
    this.wingPhase += 0.35 + this.scale * 0.05;
  }

  show() {
    push();
    translate(this.x, this.y);
    noStroke();

    // body
    fill(this.color);
    ellipse(0, 0, this.w, this.h);

    // compute direction: 1 = right-facing, -1 = left-facing
    const s = Bird.faceRight ? 1 : -1;

    // tail feathers (opposite side of beak)
    push();
    translate(-s * this.w * 0.5, 0);
    rotate(s * PI / 8);
    fill(lerpColor(this.color, color(0), 0.25));
    triangle(0, 0, s * 6 * this.scale, -6 * this.scale, s * 6 * this.scale, 6 * this.scale);
    pop();

    // wing - flapping with rotation
    push();
    const flap = sin(this.wingPhase) * PI * 0.12;
    translate(-s * 4 * this.scale, 0);
    rotate(s * flap);
    fill(lerpColor(this.color, color(0), 0.2));
    ellipse(0, 0, this.w * 0.9, this.h * 0.9);
    pop();

    // beak (face direction)
    push();
    translate(s * this.w * 0.5, 0);
    fill(255, 180, 50);
    triangle(0, 0, s * 8 * this.scale, -4 * this.scale, s * 8 * this.scale, 4 * this.scale);
    pop();

    // eye (shifted toward beak)
    push();
    translate(s * this.w * 0.3, -4 * this.scale);
    fill(255);
    ellipse(0, 0, 6 * this.scale, 6 * this.scale);
    fill(0);
    ellipse(0, 0, 2 * this.scale, 2 * this.scale);
    pop();

    pop();
  }

  offscreen() {
    return this.x < -60;
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

// Backwards-compatible face direction flag
Bird.faceRight = true;

