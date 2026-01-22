class Dino {
  constructor() {
    // pevná X pozice dinosaura
    this.x = 80;

    // výšky postavy (stoj / dřep)
    this.standH = 60;
    this.duckH = 35;

    // šířka dinosaura
    this.w = 50;

    // aktuální výška (výchozí: stoj)
    this.h = this.standH;

    // výška země vzhledem k postavě
    this.groundY = height - 30 - this.h;
    this.y = this.groundY;

    // vertikální rychlost
    this.vy = 0;

    // gravitace a síla skoku
    this.gravity = 1.1;
    this.jumpForce = -18;

    // proměnná pro animaci nohou
    this.leg = 0;

    // příznak dřepění
    this.ducking = false;
  }

  update() {
    // aplikace vertikální rychlosti
    this.y += this.vy;
    this.vy += this.gravity;

    // kolize se zemí
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
    }

    // animace nohou:
    // na zemi rychlá, ve vzduchu pomalá
    if (this.onGround()) {
      this.leg += 0.45;
    } else {
      this.leg += 0.05;
    }

    // klávesa S = dřep
    if (keyIsDown(83)) this.duck();
  }

  // skok – pouze pokud stojí na zemi a není v dřepu
  jump() {
    if (this.onGround() && !this.ducking) {
      this.vy = this.jumpForce;
    }
  }

  // přechod do dřepu
  duck() {
    if (this.onGround()) {
      this.ducking = true;

      // zmenšení hitboxu i vizuální výšky
      this.h = this.duckH;
      this.groundY = height - 30 - this.h;
      this.y = this.groundY;
    }
  }

  // návrat do stoje
  standUp() {
    this.ducking = false;
    this.h = this.standH;
    this.groundY = height - 30 - this.h;
    this.y = this.groundY;
  }

  // kontrola, zda dinosaurus stojí na zemi
  onGround() {
    return this.y === this.groundY;
  }

  show() {
    // vykreslení těla – zjednodušený styl bez stínu
    push();
    translate(this.x, this.y);

    // jemný obrys
    stroke(40, 110, 40);
    strokeWeight(2);

    // trup
    fill(90, 200, 90);
    const bodyX = 0;
    const bodyY = this.ducking ? 25 : 18;
    const bodyW = 50;
    const bodyH = this.ducking ? 20 : 35;
    rect(bodyX, bodyY, bodyW, bodyH, 8);

    // světlejší pruh na břiše
    noStroke();
    fill(120, 230, 120, 220);
    rect(bodyX + 8, bodyY + bodyH * 0.32, bodyW - 16, bodyH * 0.42, 6);

    // ocas (tmavší odstín)
    fill(70, 180, 70);
    triangle(
      bodyX - 12, bodyY + bodyH * 0.45,
      bodyX - 2,  bodyY + bodyH * 0.25,
      bodyX - 2,  bodyY + bodyH * 0.6
    );

    // hlava s lehkým leskem
    fill(80, 200, 80);
    const headX = 42;
    const headY = this.ducking ? 18 : 13;
    ellipse(headX, headY, 36, 30);

    fill(120, 255, 120, 160);
    ellipse(headX + 6, headY - 6, 12, 8);

    // oko
    fill(255);
    ellipse(headX + 12, headY - 2, 8, 8);
    fill(0);
    ellipse(headX + 12, headY - 2, 4, 4);

    // ruka
    fill(70, 180, 70);
    const armY = this.ducking ? bodyY + 6 : bodyY + 4;
    rect(8, armY, 10, 6, 4);

    // nohy – plynulá animace běhu
    stroke(30, 90, 30);
    strokeWeight(3);
    const legMotion = sin(this.leg) * 5;

    line(
      15,
      bodyY + bodyH,
      15 + (legMotion > 0 ? legMotion : 0),
      bodyY + bodyH + 14
    );

    line(
      35,
      bodyY + bodyH,
      35 - (legMotion < 0 ? -legMotion : 0),
      bodyY + bodyH + 14
    );

    pop();
  }

  // kolizní obdélník dinosaura
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
