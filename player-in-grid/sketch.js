// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid = [];
let cols;
let rows;
let CELL_SIZE = 30;

const BLANK = 0;
const WALL = 1;
const PLAYER = 2;

let player = {
  x: 0,
  y: 0,
  colour: 'green',
};

let dirt_img;

function preload() {
  dirt_img = loadImage("dirt 1.png");
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
  generateRandomGrid(cols, rows);
  grid[player.x][player.y] = PLAYER;
}

function generateRandomGrid(cols, rows) {
  for(let x = 0; x < cols; x++) {
    let collumn = [];
    for(let y = 0; y < rows; y++) {
      collumn.push(floor(random(0, 2)) === 1 ? WALL : BLANK);
    }
    grid.push(collumn);
  }
}

function displayGrid() {
  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      const colour = grid[x][y] === BLANK ? 'white' : grid[x][y] === WALL ? 'black' : player.colour;
      fill(colour);
      image(dirt_img, x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function tryMovePlayer(deltaX, deltaY) {
  if(player.x + deltaX < 0 || player.x + deltaX >= cols) return;
  if(player.y + deltaY < 0 || player.y + deltaY >= cols) return;
  if(grid[player.x + deltaX][player.y + deltaY] === WALL) return;
  console.log('got here');

  grid[player.x][player.y] = BLANK;

  player.x += deltaX;
  player.y += deltaY;

  grid[player.x][player.y] = PLAYER;

}

function keyPressed() {
  if(key === 'w') tryMovePlayer(0, -1);
  if(key === 's') tryMovePlayer(0, 1);
  if(key === 'a') tryMovePlayer(-1, 0);
  if(key === 'd') tryMovePlayer(1, 0);
}

function mousePressed() {
  const x = floor(mouseX / CELL_SIZE);
  const y = floor(mouseY / CELL_SIZE);
  if(x < 0 || x >= cols || y < 0 || y >= rows) {
    return;
  }
  grid[x][y] = grid[x][y] === BLANK ? WALL : grid[x][y] === WALL ? BLANK : PLAYER;
}

function draw() {
  background('blue');
  displayGrid();
}
