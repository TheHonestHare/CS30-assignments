class Player {
  constructor(x, y) {
    this.aabb = new physics.AABB(createVector(x, y), createVector(1, 1));
    this.vel = createVector(0, 1);
  }
  draw() {
    fill("yellow");
    image(player_img, this.aabb.origin.x, this.aabb.origin.y, this.aabb.dims.x, this.aabb.dims.y);
  }
  process_input() {
    if(keyIsDown("W".charCodeAt(0))) {
      this.vel.add(0, -2 * deltaTime / 1000);
    }
  }
}