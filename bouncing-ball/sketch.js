class Ball {
  constructor(in_x, in_y, vel_x, vel_y, size, colour) {
    this.pos = createVector(in_x, in_y);
    this.size = size;
    this.vel = createVector(vel_x, vel_y);
    this.colour = colour;
  }
  is_point_in(x, y) {
    return this.pos.dist(createVector(x, y)) <= this.size;
  }
  step() {
    this.pos.add(this.vel);
    if(this.pos.x < this.size || this.pos.x > width - this.size) {
      this.vel.x = -this.vel.x;
      this.pos.x += this.vel.x;
      this.colour = randomColour();
    }
    if(this.pos.y < this.size || this.pos.y > height - this.size) {
      this.vel.y = -this.vel.y;
      this.pos.y += this.vel.y;
      this.colour = randomColour();
    }
  }
  test_collide_circle(ball) {
    return this.pos.dist(ball.pos) < this.size + ball.size;
  }
  do_collide_circle(ball) {
    if(this.test_collide_circle(ball)) {
      this.colour = randomColour();
      ball.colour = randomColour();
      const coll_normal = p5.Vector.sub(this.pos, ball.pos);
      this.vel.reflect(coll_normal);
      this.step();
      ball.vel.reflect(coll_normal);
      ball.step();
    }
  }
  draw() {
    fill(this.colour);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }
}
let ballArray;

function randomColour() {
  return color(random(255), random(255), random(255));
}

function setup() {
  ballArray = [new Ball(100, 275, 10, 0, 50, 0)];
  createCanvas(800, 600);
}

function draw() {
  background(255, 0, 0);
  for(i = 0; i < ballArray.length; i++) {
    ballArray[i].step();
    for(j = i + 1; j < ballArray.length; j++) {
      ballArray[i].do_collide_circle(ballArray[j]);
    }
    ballArray[i].draw();
  }
}

function mousePressed() {
  const vel = p5.Vector.random2D().setMag(10);
  ballArray.push(new Ball(mouseX, mouseY, vel.x, vel.y, 50, randomColour()));
}