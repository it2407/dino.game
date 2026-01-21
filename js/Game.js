class Game {
  constructor() {
    this.dino = new Dino();
    this.ground = new Ground();
    this.obstacles = [];
    this.clouds = [];

    this.score = 0;
    this.best = 0;
    this.speed = 6;
    this.gameOver = false;

    this.night = false;
    this.lastColorChange = 0;
    this.spawnCounter = 0;
  }

  run() {
    this.drawBackground();

    // Clouds (random spawn)
    if (!this.gameOver && random() < 0.008) this.clouds.push(new Cloud(this.speed));

    for (let c of this.clouds) {
      if (!this.gameOver) c.update(this.speed);
      c.show();
    }
    this.clouds = this.clouds.filter(c => !c.offscreen());

    if (!this.gameOver) this.ground.update(this.speed);
    this.ground.show();

    if (!this.gameOver) {
      this.score++;
      this.speed += 0.0006;

      if (this.score - this.lastColorChange > 1000) {
        this.night = !this.night;
        this.lastColorChange = this.score;
      }

      // spawn obstacles using a counter so they don't appear every frame
      this.spawnCounter--;
      if (this.spawnCounter <= 0) {
        // occasionally spawn 2 or 3 cactuses in a row
        const r = random();
        // at most 2 cactuses in a row
        let count = r < 0.35 ? 2 : 1;

        let baseOffset = 0;
        for (let i = 0; i < count; i++) {
          // mostly cactuses, occasionally a bird
          if (random() < 0.85) {
            // smaller cactus sizes to avoid huge obstacles
            const cw = int(random(16, 28));
            const ch = int(random(30, 50));
            const offset = baseOffset + int(random(8, 28));
            this.obstacles.push(new Cactus(this.speed, width + offset, cw, ch));
            baseOffset += cw + int(random(12, 28));
          } else {
            const offset = baseOffset + int(random(10, 40));
            this.obstacles.push(new Bird(this.speed));
            baseOffset += 60;
          }
        }

        // set next spawn interval (faster speed -> shorter interval)
        this.spawnCounter = int(random(80, 160) / (this.speed / 6));
      }

      this.dino.update();
    }

    this.dino.show();

    for (let o of this.obstacles) {
      if (!this.gameOver) o.update();
      o.show();

      if (!this.gameOver && o.hit(this.dino)) {
        this.gameOver = true;
        this.best = max(this.best, this.score);
      }
    }

    this.obstacles = this.obstacles.filter(o => !o.offscreen());
    this.ui();
  }

  drawBackground() {
    if (this.night) {
      background(30);
      fill(255);
      circle(720, 60, 30);
    } else {
      background(245);
      fill(255, 204, 0);
      circle(720, 60, 40);
    }
  }

  jump() {
    if (!this.gameOver) this.dino.jump();
  }

  restart() {
    if (this.gameOver) {
      this.obstacles = [];
      this.clouds = [];
      this.score = 0;
      this.speed = 6;
      this.gameOver = false;
      this.night = false;
      this.lastColorChange = 0;
      this.dino = new Dino();
    }
  }

  ui() {
    fill(this.night ? 255 : 0);
    textSize(16);
    text(`Score: ${this.score}`, 10, 20);
    text(`Best: ${this.best}`, 10, 40);

    if (this.gameOver) {
      textAlign(CENTER);
      textSize(32);
      text("GAME OVER", width / 2, height / 2);
      textSize(16);
      text("W = jump | S = duck | R = restart",
        width / 2, height / 2 + 30);
      textAlign(LEFT);
    }
  }
}
