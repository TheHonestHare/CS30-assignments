/*
Dracen Lim
Computer Science 30
Interactive Scene

Hold w to prevent mario from hitting the ground
Most of this project is just me setting up stuff for a real 2d engine
A nested loop is used in level.js to create the level. Right now this is just a long floor but this could be 
easily configured to be any 2d grid and this would create an image to draw it
The mouse wheel can be used to zoom in and out of the scene, showcasing the fact that I have implemented a camera system for this
I have also split this project into multiple files and used (what I think is) idiomatic js patterns to have namespaces
*/

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
  player = new Player(4, -4);
  level = level_manager.load(0);
  cam.calculateCameraStartPos(level.spawnPos, level.w, level.h);
}

function draw() {
  noStroke();
  player.process_input();
  cam.transform();
  bg.draw();
  level.draw();
  player.draw();
  physics.update_physics(player);
}

function mouseWheel(event) {
  cam.zoom += event.delta / 100;
  cam.calculateCameraStartPos(level.spawnPos, level.w, level.h);
}