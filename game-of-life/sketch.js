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


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
  generateRandomGrid(cols, rows);
}

function generateRandomGrid(cols, rows) {
  for(let x = 0; x < cols; x++) {
    let collumn = [];
    for(let y = 0; y < rows; y++) {
      collumn.push(floor(random(0, 2)) === 1);
    }
    grid.push(collumn);
  }
}

function displayGrid() {
  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      fill(grid[x][y] ? 255 : 0);
      rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function lifeStep() {
  let nextGrid = Array(cols);
  for(let x = 0; x < cols; x++) {
    const collumn = Array(rows);
    for(let y = 0; y < rows; y++) {
      const three_x_three_grid = [gridAt(x-1, y-1), gridAt(x, y-1), gridAt(x+1, y-1), gridAt(x-1, y), gridAt(x, y), gridAt(x+1, y), gridAt(x-1, y+1), gridAt(x, y+1), gridAt(x+1, y+1)];
      collumn[y] = applyRule(three_x_three_grid);
    }
    nextGrid[x] = collumn;
  }
  grid = nextGrid;
}

function gridAt(x, y) {
  return grid[mod(x, cols)][mod(y, rows)];
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function applyRule(three_x_three_grid) {
  const count = three_x_three_grid.reduce((acc, is_on) => acc += is_on, 0) - three_x_three_grid[1 * 3 + 1];
  switch (count) {
    case 2: return three_x_three_grid[1 * 3 + 1];
    case 3: return true;
    default: return false;
  }
}

function mousePressed() {
  const x = floor(mouseX / CELL_SIZE);
  const y = floor(mouseY / CELL_SIZE);
  if(x < 0 || x >= cols || y < 0 || y >= rows) {
    return;
  }
  grid[x][y] = !grid[x][y];
  if(x < cols - 1) {
    grid[x+1][y] = !grid[x+1][y];
  }
  if(x > 0) {
    grid[x-1][y] = !grid[x-1][y];
  }
  if(y < rows - 1) {
    grid[x][y+1] = !grid[x][y+1];
  }
  if(y > 0) {
    grid[x][y-1] = !grid[x][y-1];
  }
}
let autoplay = false;

function keyPressed() {
  if(key === 'a') {
    autoplay = !autoplay;
  }
  if(key === ' ') {
    lifeStep();
  }
}

function draw() {
  background(220);
  displayGrid();
  if(autoplay) {
    lifeStep();
  }
}
