// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let node of nodes) {
    node.move();
    node.draw();
  }
}

function mousePressed() {
  nodes.push(new MovingNode(mouseX, mouseY));
}

class MovingNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.defaultR = 50;
    this.maxRIncrease = 150;
    this.color = color(random(255), random(255), random(255));
    this.minLineDist = 30;
  }
  mouseDist() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
  calcR() {
    return this.defaultR + max(0, 1-this.mouseDist()/750) * this.maxRIncrease;
  }
  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.calcR());
    stroke(0);
    strokeWeight(5);
    for(let node of nodes) {
      const orig_d = dist(node.x, node.y, this.x, this.y);
      const d = orig_d - node.calcR() - this.calcR();
      if(d > this.minLineDist || orig_d === 0) {
        continue;
      }
      line(node.x, node.y, this.x, this.y);
    }
    
  }
  move() {
    const dx = map(noise(this.xTime), 0, 1, -100 * this.deltaTime, 100 * this.deltaTime);
    const dy = map(noise(this.yTime), 0, 1, -100 * this.deltaTime, 100 * this.deltaTime);

    this.x += dx;
    if(this.x > width) {
      this.x -= width;
    }
    if(this.x < 0) {
      this.x += width;
    }
    this.y += dy;
    if(this.y > height) {
      this.y -= height;
    }
    if(this.y < 0) {
      this.y += height;
    }

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
}