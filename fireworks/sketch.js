// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Particle {
  constructor(x, y) {
    this.initial_pos = createVector(x, y);
    this.pos = createVector(x, y);
    this.vel = createVector(random(1, 5), 0).setHeading(random(0, 360));
    this.r = 3;
    this.colour = {r: 255, g: 0, b: 0};
    this.alpha = 255;
    this.time_start = millis();
    this.duration = random(1700, 2300);
    this.period = PI * floor(random(1, 4));
  }
  draw() {
    stroke(color(this.colour.r, this.colour.g, this.colour.b, this.alpha));
    line(this.pos.x, this.pos.y, this.initial_pos.x, this.initial_pos.y);
  }
  update() {
    this.pos.add(this.vel);
    //this.vel.add(0, 0.1);
    this.alpha = 255 * cos((millis() - this.time_start) / this.duration * this.period) ** 2;
    
    return millis() - this.time_start > this.duration * (1 + PI / this.period / 2);
  }
}

let particleArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let removal_indices = [];
  for(let i = 0; i < particleArray.length; i++) {
    if(particleArray[i].update()) {
      removal_indices.push(i);
    }
  }
  for(let i of removal_indices) {
    particleArray.splice(i, 1);
  }
  background(0);
  for(let particle of particleArray) {
    particle.draw();
  }
  
}

function mousePressed() {
  for(let i = 0; i < 100; i++) {
    particleArray.push(new Particle(mouseX, mouseY));
  }
}
