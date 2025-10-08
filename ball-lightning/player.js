class Player {
  constructor(x, y) {
    this.aabb = new physics.AABB(createVector(x, y), createVector(1, 1));
    this.vel = createVector(0, 1);
    this.onGround = false;
  }
  draw() {
    fill("yellow");
    player.aabb.draw();
    image(player_img, this.aabb.origin.x, this.aabb.origin.y, this.aabb.dims.x, this.aabb.dims.y);
  }
  process_input() {
    if(keyIsDown("W".charCodeAt(0))) {
      this.vel.y = -4;
    } else if(this.vel.y < 0 && !this.isGrounded) {
      // different acceleration value when player still going up or else controls feel bad
      this.vel.y += 10 * deltaTime / 1000;
    }
    if(keyIsDown("A".charCodeAt(0))) {
      this.vel.x = -3;
    }
    if(keyIsDown("D".charCodeAt(0))) {
      this.vel.x = 3;
    }
    if(keyIsDown(" ".charCodeAt(0))) {
      console.log(`x: ${this.aabb.origin.x}, y: ${this.aabb.origin.y}, vel.x: ${this.vel.x}, vel.y: ${this.vel.y}`);
    }

  }
}