const STEP = 50;
let tiles;

class Tile {
  constructor(go_up, x, y) {
    this.x1 = x;
    this.x2 = x+50;
    this.y1 = y+STEP*(!go_up);
    this.y2 = y+STEP*go_up;
  }
  draw() {
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiles = Array(Math.ceil(windowWidth/STEP) * Math.ceil(windowHeight/STEP));
  for(let i = 0; i < Math.ceil(windowWidth/STEP); i++) {
    const tiles_in_collumn = Math.ceil(windowHeight/STEP);
    for(let j = 0; j < tiles_in_collumn; j++) {
      tiles[i*tiles_in_collumn + j] = new Tile(int(random(2)), i * STEP, j * STEP);
    }
  }
}

function draw() {
  background(255);
  strokeWeight(10);
  tiles.forEach((tile) => {
    tile.draw();
  });
}
