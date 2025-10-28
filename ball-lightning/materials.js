const material = (() => {
  return {
    SpriteSheet: class {
      constructor(file_name, width, height) {
        this.image = loadImage("./assets/" + file_name);
        this.w = width;
        this.h = height;
      }
    },
    Sprite: class {
      constructor(sprite_sheet, sprite_sheet_x, sprite_sheet_y, width, height) {
        this.sprite_sheet = sprite_sheet;
        this.sprite_pos = createVector(sprite_sheet_x, sprite_sheet_y);
        this.w = width;
        this.h = height;
      }
    },
  };
})();