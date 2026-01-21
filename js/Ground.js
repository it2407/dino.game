// Země - pohyblivý terén s náhodně umístěnými segmenty
class Ground {
  constructor() {
    this.y = height - 30; // Výška země
    this.segments = []; // Jednotlivé segmenty terénu

    // Inicializace 40 náhodných segmentů
    for (let i = 0; i < 40; i++) {
      this.segments.push({
        x: i * 40,
        w: random(15, 30) // Náhodná šířka segmentu
      });
    }
  }

  update(speed) {
    // Pohyb segmentů a jejich recyklace
    for (let s of this.segments) {
      s.x -= speed; // Pohyb vlevo
      // Když segment vyjde mimo obrazovku, přemístí se na konec
      if (s.x < -40) {
        s.x += width + random(20, 80);
        s.w = random(15, 30); // Nová náhodná šířka
      }
    }
  }

  show() {
    // Vykresení hlavní linie země
    stroke(120);
    strokeWeight(2);
    line(0, this.y, width, this.y);

    // Vykresení jednotlivých segmentů (detail terénu)
    stroke(150);
    for (let s of this.segments) {
      line(s.x, this.y + 5, s.x + s.w, this.y + 5);
    }
  }
}
