var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var p1, p2;
var p1Animation = [];
var p1SpriteData, p1SpriteSheet;
var p2Animation = [];
var p2SpriteData, p2SpriteSheet;
var pokemons = [];
var pImage;
var track;
var allPlayers;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  pImage = loadImage('./assets/p1.png');
  track = loadImage('./assets/track.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update("play");
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
