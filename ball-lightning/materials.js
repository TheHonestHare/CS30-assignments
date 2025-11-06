const material = (() => {
  return {
    SpriteSheet: class {
      constructor(file_name) {
        this.image = loadImage("assets/" + file_name);
      }
    },
    Sprite: class {
      constructor(sprite_sheet, sprite_sheet_x, sprite_sheet_y, width, height) {
        this.sprite_sheet = sprite_sheet;
        this.sprite_pos_x = sprite_sheet_x;
        this.sprite_pos_y = sprite_sheet_y;
        this.w = width;
        this.h = height;
      }
      draw(dest, x, y) {
        dest.image(this.sprite_sheet.image, x, y, this.w, this.h, this.sprite_sheet_x, this.sprite_sheet_y);
      }
    },
  };
})();