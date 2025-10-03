class Player {
  constructor(x, y) {
    this.aabb = new physics.AABB(createVector(x, y), createVector(1, 1));
    this.vel = createVector(0, 0);
  }
  draw() {
    fill("yellow");
    image(player_img, this.aabb.origin.x * 8, this.aabb.origin.y * 8, this.aabb.dims.x * 8, this.aabb.dims.y * 8);
  }
  process_input() {
    if(keyIsDown("W".charCodeAt(0))) {
      this.vel.add(0, 5);
    }
  }
}