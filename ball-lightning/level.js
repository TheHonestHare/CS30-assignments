class Level {
  constructor(block_array, w, h, spawnx, spawny) {
    // deep copy array
    this.block_array = [...block_array];
    this.w = w;
    this.h = h;
    this.spawnPos = createVector(spawnx, spawny);
    this.createLevelImage();
  }
  draw() {
    noSmooth();
    image(this.img, 0, 0, this.w, this.h);
  }
  createLevelImage() {
    let img = createGraphics(this.w * 8, this.h * 8);
    for(let i = 0; i < this.w; i++) {
      for(let j = 0; j < this.h; j++) {
        const block_mat = this.block_array[j * this.w + i];
        if(block_mat === 0) continue;   
        blockSprites[block_mat-1].draw_to_dest(img, i * 8, j * 8, 8, 8);
      }
    }
    this.img = img;
  }
  setBlock(x, y, val) {
    if(!between(x, -1, level.w) || !between(y, -1, level.h)) return;
    level.block_array[y * level.w + x] = true;
    level.createLevelImage();
  }
}

const level_0 = (() => {
  let res = [];
  for(let y = 0; y < 30; y++) {
    for(let x = 0; x < 100; x++) {
      res.push((Math.sin(x / 10) * 3 - 10) + y > 0 ? 1 : 0);
    }
  }
  return res;
})();
const level_manager = {
  "level": 0,
  "load": (n) => {
    switch(n) {
      case 0: {
        return new Level(level_0, 100, 30, 1, -1);
      }
    }
  }
};

