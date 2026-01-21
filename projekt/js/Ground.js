class Ground {
  constructor() {
    this.y = height - 30;
    this.segments = [];

    for (let i = 0; i < 40; i++) {
      this.segments.push({
        x: i * 40,
        w: random(15, 30)
      });
    }
  }

  update(speed) {
    for (let s of this.segments) {
      s.x -= speed;
      if (s.x < -40) {
        s.x += width + random(20, 80);
        s.w = random(15, 30);
      }
    }
  }

  show() {
    stroke(120);
    strokeWeight(2);
    line(0, this.y, width, this.y);

    stroke(150);
    for (let s of this.segments) {
      line(s.x, this.y + 5, s.x + s.w, this.y + 5);
    }
  }
}
