const physics = (() => {
  return {
    AABB: class {
      constructor(box_origin, box_dims) {
        this.origin = box_origin;
        this.dims = box.dims;
      }
      // padding only applied to top and left
      intersect(lineStart, lineDir, aabb, paddingX, paddingY) {
        
      }
    }
  }
})();