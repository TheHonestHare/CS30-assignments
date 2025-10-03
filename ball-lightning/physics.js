function between(x, a, b) {
  return x > a && x < b;
}

const physics = (() => {
  return {
    Hit: class {
      constructor(pos, normal, time) {
        this.pos = pos;
        this.normal = normal;
        this.time = time;
      }
    },
    AABB: class {
      // padding is applied to top and left sides
      constructor(box_origin, box_dims, padding) {
        if(!padding) {
          this.origin = box_origin;
          this.dims = box_dims;
        } else {
          this.origin = p5.Vector.sub(box_origin, padding);
          this.dims = p5.Vector.add(box_dims, padding);
        }
      }
      isPointIn(point) {
        return between(point.x, this.origin.x, this.origin.x + this.dims.x) &&
               between(point.y, this.origin.y, this.origin.y + this.dims.y);
      }
      // adapted from https://noonat.github.io/intersect
      intersectSegment(pos, delta) {
        const scaleX = 1.0 / delta.x;
        const scaleY = 1.0 / delta.y;
        const isNegX = scaleX < 0;
        const isNegY = scaleY < 0;
        const nearTimeX = (this.origin.x + isNegX * this.dims.x - pos.x) * scaleX;
        const nearTimeY = (this.origin.y + isNegY * this.dims.y - pos.y) * scaleY;
        const farTimeX = (this.origin.x + !isNegX * this.dims.x - pos.x) * scaleX;
        const farTimeY = (this.origin.y + !isNegY * this.dims.y - pos.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
          return null;
        }
        const nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        const farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
          return null;
        }
        const time = clamp(nearTime, 0, 1);
        const normal = createVector();
        if (nearTimeX > nearTimeY) {
          normal.x = -signX;
          normal.y = 0;
        } else {
          normal.x = 0;
          normal.y = -signY;
        }
        const coll_pos = createVector();
        coll_pos.x = pos.x + delta.x * time;
        coll_pos.y = pos.y + delta.y * time;
        return new physics.Hit(coll_pos, normal, time);
      }

      // adapted from https://noonat.github.io/intersect
      sweepAABB(other_box, delta) {
        const new_box = new physics.AABB(this.origin, this.dims, other_box.dims);

        const res = this.intersectSegment(other_box.origin, delta, other_box.dims);
        if (res) {
          // sweep.pos.x = box.pos.x + delta.x * sweep.time;
          // sweep.pos.y = box.pos.y + delta.y * sweep.time;
          // const direction = delta.clone();
          // direction.normalize();
          // sweep.hit.pos.x = clamp(
          //   sweep.hit.pos.x + direction.x * box.half.x,
          //   this.pos.x - this.half.x,
          //   this.pos.x + this.half.x
          // );
          // sweep.hit.pos.y = clamp(
          //   sweep.hit.pos.y + direction.y * box.half.y,
          //   this.pos.y - this.half.y,
          //   this.pos.y + this.half.y
          // );
        }
        return res;
      }
    },
    update_physics(thing) {
      if(thing.aabb === undefined || thing.vel === undefined) return;
      const box = new physics.AABB(createVector(0, 0), createVector(30, 1));
      const res = box.sweepAABB(thing.aabb, p5.Vector.mult(thing.vel, deltaTime));
      if(res !== null) {
        thing.aabb.origin.add(p5.Vector.mult(thing.vel, deltaTime));
        //thing.vel.add(p5.Vector.mult(createVector(0, 0.01, deltaTime)));
      }
      else {
        //console.log("OH NO");
      }
      
    }
  };
})();