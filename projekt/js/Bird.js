class Bird {
  // když true, ptáci koukají doprava; když false, doleva
  constructor(speed) {
    // počáteční X pozice – pták přiletí z pravé strany obrazovky
    this.x = width;

    // základní Y pozice – náhodně v širokém rozsahu výšky
    this.baseY = random(40, height - 100);
    this.y = this.baseY;

    // náhodné měřítko ptáka
    this.scale = random(0.7, 1.2);

    // rozměry těla podle měřítka
    this.w = 40 * this.scale;
    this.h = 20 * this.scale;

    // rychlost letu + malé náhodné zpomalení/zrychlení
    this.speed = speed + random(0.5, 2.0);

    // parametry pro vertikální vlnění letu
    this.osc = random(TWO_PI);        // posun fáze sinusovky
    this.amp = random(6, 28) * this.scale; // amplituda pohybu

    // fáze mávání křídel
    this.wingPhase = random(TWO_PI);

    // náhodná barva ptáka (hnědé/šedé odstíny)
    this.color = color(
      50 + random(0, 80),
      40 + random(0, 40),
      30 + random(0, 40)
    );
  }

  update() {
    // horizontální pohyb doleva
    this.x -= this.speed;

    // jemný sinusový pohyb nahoru/dolů
    this.y = this.baseY + sin((frameCount * 0.08) + this.osc) * this.amp;

    // posun fáze mávání křídel
    this.wingPhase += 0.35 + this.scale * 0.05;
  }

  show() {
    push();
    translate(this.x, this.y);
    noStroke();

    // tělo ptáka
    fill(this.color);
    ellipse(0, 0, this.w, this.h);

    // směr pohledu:
    //  1 = doprava
    // -1 = doleva
    const s = Bird.faceRight ? 1 : -1;

    // ocasní pera (na opačné straně než zobák)
    push();
    translate(-s * this.w * 0.5, 0);
    rotate(s * PI / 8);
    fill(lerpColor(this.color, color(0), 0.25));
    triangle(
      0, 0,
      s * 6 * this.scale, -6 * this.scale,
      s * 6 * this.scale,  6 * this.scale
    );
    pop();

    // křídlo – mávání pomocí rotace
    push();
    const flap = sin(this.wingPhase) * PI * 0.12;
    translate(-s * 4 * this.scale, 0);
    rotate(s * flap);
    fill(lerpColor(this.color, color(0), 0.2));
    ellipse(0, 0, this.w * 0.9, this.h * 0.9);
    pop();

    // zobák (ve směru letu)
    push();
    translate(s * this.w * 0.5, 0);
    fill(255, 180, 50);
    triangle(
      0, 0,
      s * 8 * this.scale, -4 * this.scale,
      s * 8 * this.scale,  4 * this.scale
    );
    pop();

    // oko – posunuté směrem k zobáku
    push();
    translate(s * this.w * 0.3, -4 * this.scale);
    fill(255);
    ellipse(0, 0, 6 * this.scale, 6 * this.scale);
    fill(0);
    ellipse(0, 0, 2 * this.scale, 2 * this.scale);
    pop();

    pop();
  }

  // kontrola, zda je pták mimo obrazovku
  offscreen() {
    return this.x < -60;
  }

  // kolize ptáka s dinosaurem
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

// výchozí směr pohledu ptáků (zpětná kompatibilita)
Bird.faceRight = true;

