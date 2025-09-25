class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
  }
  draw() {
    fill("yellow");
    image(player_img, level.spawnPos.x * 8, level.spawnPos.y * 8, 8, 8);
  }
  process_input() {
    if(keyIsDown("W".charCodeAt(0))) {
      this.vel.add(0, 5);
    }
  }
}