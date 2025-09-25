let level;
let wood_img;
let player_img;
let player;

function preload() {
  wood_img = loadImage('./wood.png');
  player_img = loadImage('./blah.png');
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/2, height/2);
  level = level_manager.load(0);
  cam.calculateCameraStartPos(level.spawnPos, level.w, level.h);
}

function draw() {
  //player.handle_keys();
  cam.transform();
  bg.draw();
  level.draw();
  player.draw();
}

function mouseWheel(event) {
  cam.zoom += event.delta / 100;
  cam.calculateCameraStartPos(level.spawnPos, level.w, level.h);
}