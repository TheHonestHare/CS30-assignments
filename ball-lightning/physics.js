function between(x, a, b) {
  return x > a && x < b;
}

const physics = (() => {
  return {
    AABB: class {
      // padding is applied to top and left sides
      constructor(box_origin, box_dims, padding) {
        this.origin = box_origin.sub(padding);
        this.dims = box_dims.mult(2);
      }
      isPointIn(point) {
        return between(point.x, this.origin.x, this.origin.x + this.dims.x) &&
               between(point.y, this.origin.y, this.origin.y + this.dims.y);
      }
      


      
    }
  }
})();