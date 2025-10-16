// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const RECT_WIDTH = 1;
let MAX_HEIGHT;
let FREQ;

function setup() {
  createCanvas(windowWidth, windowHeight);
  MAX_HEIGHT = height / 2;
  FREQ = 10 / width;
}

function draw() {
  background(220);
  fill("black");
  for(let i = 0; i < width; i += RECT_WIDTH) {
    const rect_height = MAX_HEIGHT * noise(i * FREQ);
    rect(i, height - rect_height, RECT_WIDTH, rect_height);
  }
}
