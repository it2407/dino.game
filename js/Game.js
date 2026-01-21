// Hlavní třída hry - spravuje všechny prvky a logiku
class Game {
  constructor() {
    this.dino = new Dino();
    this.ground = new Ground();
    this.obstacles = []; // Kaktusy a ptáci
    this.clouds = []; // Dekorativní prvky

    this.score = 0; // Aktuální skóre
    this.best = 0; // Nejlepší dosažené skóre
    this.speed = 6; // Herní rychlost
    this.gameOver = false;

    this.night = false; // Střídání dne a noci
    this.lastColorChange = 0;
    this.spawnCounter = 0; // Čítač pro spawn překážek
  }

  run() {
    this.drawBackground();

    // Generování mraků (náhodně)
    if (!this.gameOver && random() < 0.008) this.clouds.push(new Cloud(this.speed));

    // Aktualizace a vykresení mraků
    for (let c of this.clouds) {
      if (!this.gameOver) c.update(this.speed);
      c.show();
    }
    this.clouds = this.clouds.filter(c => !c.offscreen());

    // Aktualizace země
    if (!this.gameOver) this.ground.update(this.speed);
    this.ground.show();

    // Herní logika - pokud hra není skončena
    if (!this.gameOver) {
      this.score++; // Zvyšování skóre
      this.speed += 0.0006; // Postupné urychlování

      // Střídání dne a noci každých 1000 bodů
      if (this.score - this.lastColorChange > 1000) {
        this.night = !this.night;
        this.lastColorChange = this.score;
      }

      // Generování překážek - čítač pro nepermanentní spawn
      this.spawnCounter--;
      if (this.spawnCounter <= 0) {
        // Občas se vytvářejí 2-3 kaktusy za sebou
        const r = random();
        let count = r < 0.35 ? 2 : 1;

        let baseOffset = 0;
        for (let i = 0; i < count; i++) {
          // Převážně kaktusy (85%), občas ptáci (15%)
          if (random() < 0.85) {
            // Variabilní velikost kaktusu
            const cw = int(random(16, 28));
            const ch = int(random(30, 50));
            const offset = baseOffset + int(random(8, 28));
            this.obstacles.push(new Cactus(this.speed, width + offset, cw, ch));
            baseOffset += cw + int(random(12, 28));
          } else {
            // Létající pták jako překážka
            const offset = baseOffset + int(random(10, 40));
            this.obstacles.push(new Bird(this.speed));
            baseOffset += 60;
          }
        }

        // Interval spawnu se zkracuje s rostoucí rychlostí
        this.spawnCounter = int(random(80, 160) / (this.speed / 6));
      }

      this.dino.update();
    }

    // Vykresení dinosaura
    this.dino.show();

    // Aktualizace, vykresení a detekce kolizí překážek
    for (let o of this.obstacles) {
      if (!this.gameOver) o.update();
      o.show();

      // Kontrola kolize s dinosaurem
      if (!this.gameOver && o.hit(this.dino)) {
        this.gameOver = true;
        this.best = max(this.best, this.score); // Aktualizace nejlepšího skóre
      }
    }

    // Odebrání překážek mimo obrazovku
    this.obstacles = this.obstacles.filter(o => !o.offscreen());
    this.ui(); // Vykresení UI
  }

  // Vykresení pozadí s denní/noční cyklus
  drawBackground() {
    if (this.night) {
      background(30); // Tmavé pozadí v noci
      fill(255);
      circle(720, 60, 30); // Měsíc
    } else {
      background(245); // Světlé pozadí ve dne
      fill(255, 204, 0);
      circle(720, 60, 40); // Slunce
    }
  }

  // Aktivace skoku dinosaura
  jump() {
    if (!this.gameOver) this.dino.jump();
  }

  // Reset hry pro nový pokus
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

  // Vykresení uživatelského rozhraní - skóre a pokyny
  ui() {
    fill(this.night ? 255 : 0); // Bílá text v noci, černá ve dne
    textSize(16);
    text(`Score: ${this.score}`, 10, 20);
    text(`Best: ${this.best}`, 10, 40);

    // Zobrazení obrazovky konce hry
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
