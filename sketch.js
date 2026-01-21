let game;

function setup() {
  createCanvas(800, 300);
  game = new Game();
}

function preload() {
  // load the provided cactus image from URL and remove its background
  // threshold can be adjusted if parts are removed incorrectly
  try {
    Cactus.loadImage('https://play-lh.googleusercontent.com/xr2DAHCcVwj2ziSV3coC68E-1N0EpIG1wRjYDmaEwdHLMkPJBBqReYoKsB3hyqmqIWQj', 90);
    Cactus.imgScale = 0.5;
  } catch (e) {
    // ignore if loadImage not available yet
  }
}

function draw() {
  game.run();
}

function keyPressed() {
  if (key === 'W' || key === 'w' || keyCode === UP_ARROW || key === ' ') game.jump();
  if (key === 'S' || key === 's') game.dino.duck();
  if (key === 'R' || key === 'r') game.restart();
}

function keyReleased() {
  if (key === 'S' || key === 's') game.dino.standUp();
}
