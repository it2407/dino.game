class Cloud {
  constructor(speed) {
    this.x = width + random(50, 200);
    this.y = random(30, 120);
    this.w = random(50, 90);
    this.h = random(20, 35);
    this.speed = speed * 0.4;
  }

  update(speed) {
    this.x -= speed * 0.4;
  }

  show() {
    noStroke();
    fill(255, 200);
    ellipse(this.x, this.y, this.w, this.h);
    ellipse(this.x + 20, this.y - 10, this.w * 0.7, this.h * 0.7);
    ellipse(this.x + 35, this.y, this.w * 0.6, this.h * 0.6);
  }

  offscreen() {
    return this.x < -100;
  }
}
