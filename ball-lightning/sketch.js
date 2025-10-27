/*
Dracen Lim
Computer Science 30
Arrays and Objects Notation Assignment

2d platformer controls with placeholder assets
A 2d world is "generated" in level.js under level_0 using arrays
The Player class (player.js) keeps track of the keys using an object and initializes them using object notation
My extra for experts is managing to implement working 2d sliding physics so that it is impossible for 2 objects to phase through each other even at high speeds (physics.js)
This is a continuation of the first assignment
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
  player.physics_tick(deltaTime / 1000);
  cam.transform();
  bg.draw();
  level.draw();
  player.draw();
}

function mouseWheel(event) {
  cam.zoom += event.delta / 100;
  cam.calculateCameraStartPos(level.spawnPos, level.w, level.h);
}