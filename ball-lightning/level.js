class Level {
  constructor(block_array, w, h, spawnx, spawny) {
    // deep copy array
    this.block_array = [...block_array];
    this.w = w;
    this.h = h;
    let img = createGraphics(w * 8, h * 8);
    for(let i = 0; i < w; i++) {
      for(let j = 0; j < h; j++) {
        if(block_array[j * w + i]) {
        
          img.image(wood_img, i * 8, j * 8, 8, 8);
        }
      }
    }
    this.image = img;
    this.spawnPos = createVector(spawnx, spawny);
  }
  draw() {
    noSmooth();
    image(this.image, 0, 0, this.w, this.h);
    smooth();
  }
}

const level_0 = (() => {
  let res = [];
  for(let y = 0; y < 30; y++) {
    for(let x = 0; x < 100; x++) {
      res.push((Math.sin(x / 10) * 3 - 10) + y > 0);
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

