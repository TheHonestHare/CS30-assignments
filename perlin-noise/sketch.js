// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x;
let y;
time = 0;
const TIME_OFFSET = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  x = lerp(0, width, noise(time+TIME_OFFSET));
  y = lerp(0, height, noise(time));
  fill("black");
  circle(x, y, 50);
  time += deltaTime/1000;
}
