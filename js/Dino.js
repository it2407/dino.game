// Hlavní hráčova postava - dinosaurus
class Dino {
  constructor() {
    this.x = 80; // Pozice vlevo uprostřed obrazovky

    this.standH = 60; // Výška ve stoje
    this.duckH = 35; // Výška v přikrčení
    this.w = 50;

    this.h = this.standH;
    this.groundY = height - 30 - this.h; // Pozice na zemi
    this.y = this.groundY;

    this.vy = 0; // Vertikální rychlost
    this.gravity = 1.1; // Gravitace
    this.jumpForce = -18; // Síla skoku

    this.leg = 0; // Animace noh
    this.ducking = false;
  }

  update() {
    this.y += this.vy;
    this.vy += this.gravity; // Aplikování gravitace

    // Kontrola, zda se dinosaurus dotknul země
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
    }

    // Animace noh: rychlejší na zemi, pomalejší ve vzduchu
    if (this.onGround()) {
      this.leg += 0.45;
    } else {
      this.leg += 0.05;
    }

    if (keyIsDown(83)) this.duck(); // S = přikrčení
  }

  // Skok - možný pouze na zemi
  jump() {
    if (this.onGround() && !this.ducking) {
      this.vy = this.jumpForce;
    }
  }

  // Přikrčení - zmenšuje výšku a hitbox
  duck() {
    if (this.onGround()) {
      this.ducking = true;
      this.h = this.duckH;
      this.groundY = height - 30 - this.h;
      this.y = this.groundY;
    }
  }

  // Vrácení se do stoje
  standUp() {
    this.ducking = false;
    this.h = this.standH;
    this.groundY = height - 30 - this.h;
    this.y = this.groundY;
  }

  onGround() {
    return this.y === this.groundY;
  }

  show() {
    // Kreslení těla dinosaura - jednoduchý design
    push();
    translate(this.x, this.y);
    stroke(40, 110, 40);
    strokeWeight(2);

    // Trup
    fill(90, 200, 90);
    const bodyX = 0;
    const bodyY = this.ducking ? 25 : 18;
    const bodyW = 50;
    const bodyH = this.ducking ? 20 : 35;
    rect(bodyX, bodyY, bodyW, bodyH, 8);

    // Zvýraznění břicha (světlejší pás)
    noStroke();
    fill(120, 230, 120, 220);
    rect(bodyX + 8, bodyY + bodyH * 0.32, bodyW - 16, bodyH * 0.42, 6);

    // Ocas (tmavší tón)
    noStroke();
    fill(70, 180, 70);
    triangle(bodyX - 12, bodyY + bodyH * 0.45, bodyX - 2, bodyY + bodyH * 0.25, bodyX - 2, bodyY + bodyH * 0.6);

    // Hlava s leskem
    noStroke();
    fill(80, 200, 80);
    const headX = 42;
    const headY = this.ducking ? 18 : 13;
    ellipse(headX, headY, 36, 30);
    fill(120, 255, 120, 160);
    ellipse(headX + 6, headY - 6, 12, 8);

    // Oko
    fill(255);
    ellipse(headX + 12, headY - 2, 8, 8);
    fill(0);
    ellipse(headX + 12, headY - 2, 4, 4);

    // Paže
    noStroke();
    fill(70, 180, 70);
    const armY = this.ducking ? bodyY + 6 : bodyY + 4;
    rect(8, armY, 10, 6, 4);

    // Nohy s animací
    stroke(30, 90, 30);
    strokeWeight(3);
    const legMotion = sin(this.leg) * 5;
    line(15, bodyY + bodyH, 15 + (legMotion > 0 ? legMotion : 0), bodyY + bodyH + 14);
    line(35, bodyY + bodyH, 35 - (legMotion < 0 ? -legMotion : 0), bodyY + bodyH + 14);

    pop();
  }

  hitbox() {
    const bodyY = this.y + (this.ducking ? 25 : 20);
    const bodyH = this.ducking ? 20 : 35;
    return {
      x: this.x,
      y: bodyY,
      w: 50,
      h: bodyH
    };
  }
}

