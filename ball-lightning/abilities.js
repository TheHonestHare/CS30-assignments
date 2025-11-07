class PlacedAbility {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  draw() {
    this.sprite.draw(x, y);
  }
}