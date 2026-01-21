// Hlavní inicializace hry
let game;

function setup() {
  createCanvas(800, 300);
  game = new Game();
}

function preload() {
  // Vše je teď kresleno procedurálně
}

function draw() {
  game.run();
}

// Ovládání: W/Mezerník = skok, S = přikrčení, R = nový pokus
function keyPressed() {
  if (key === 'W' || key === 'w' || keyCode === UP_ARROW || key === ' ') game.jump();
  if (key === 'S' || key === 's') game.dino.duck();
  if (key === 'R' || key === 'r') game.restart();
}

function keyReleased() {
  if (key === 'S' || key === 's') game.dino.standUp();
}
