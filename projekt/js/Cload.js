class Cloud {
  constructor(speed) {
    // počáteční X pozice – mrak přilétá zprava mimo obrazovku
    this.x = width + random(50, 200);

    // náhodná výška mraku na obloze
    this.y = random(30, 120);

    // náhodná šířka a výška mraku
    this.w = random(50, 90);
    this.h = random(20, 35);

    // rychlost mraku – pomalejší než hlavní objekty (parallax efekt)
    this.speed = speed * 0.4;
  }

  update(speed) {
    // posun mraku doleva (pomalejší pohyb)
    this.x -= speed * 0.4;
  }

  show() {
    // vykreslení jednoduchého mraku z elips
    noStroke();
    fill(255, 200); // bílá s lehkou průhledností

    ellipse(this.x, this.y, this.w, this.h);
    ellipse(this.x + 20, this.y - 10, this.w * 0.7, this.h * 0.7);
    ellipse(this.x + 35, this.y, this.w * 0.6, this.h * 0.6);
  }

  // kontrola, zda je mrak mimo obrazovku
  offscreen() {
    return this.x < -100;
  }
}
