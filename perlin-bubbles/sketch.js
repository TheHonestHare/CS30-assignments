// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let bubbles = [];

function spawnBubble() {
  const t = random(0, 1000);
  const y_noise_offset = random(0, 1000);
  bubbles.push({
    t: t,
    y_noise_offset: y_noise_offset,
    x: noise(t) * width,
    y: noise(t + y_noise_offset) * height,
    d: random(20, 50),
    draw() {
      circle(this.x, this.y, this.d);
    },
    update(dt) {
      this.t += dt;
      this.x = noise(this.t) * width;
      this.y = noise(this.t + this.y_noise_offset) * height;
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 30; i++) {
    spawnBubble();
  }
  noStroke();
}

function draw() {
  background(255);
  fill("black");
  bubbles.forEach((thing) => {
    thing.update(deltaTime / 1000);
    thing.draw();
  });
}
