function between(x, a, b) {
  return x > a && x < b;
}
// Custom clamp function
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
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
      draw() {
        rect(this.origin.x, this.origin.y, this.dims.x, this.dims.y);
      }
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
        if (nearTime >= 1 || farTime <= 0 || isNaN(nearTime) || isNaN(farTime)) {
          return null;
        }
        const time = clamp(nearTime, 0, 1);
        const normal = createVector();
        if (nearTimeX > nearTimeY) {
          normal.x = isNegX ? 1 : -1;
          normal.y = 0;
        } else {
          normal.x = 0;
          normal.y = isNegY ? 1 : -1;
        }
        const coll_pos = createVector();
        coll_pos.x = pos.x + delta.x * time;
        coll_pos.y = pos.y + delta.y * time;
        fill("green");
        ellipse(coll_pos.x, coll_pos.y, 0.1, 0.1);
        return new physics.Hit(coll_pos, normal, time);
      }

      // adapted from https://noonat.github.io/intersect
      sweepAABB(other_box, delta) {
        const new_box = new physics.AABB(this.origin, this.dims, other_box.dims);

        const res = new_box.intersectSegment(other_box.origin, delta, other_box.dims);
        return res;
      }
    },
    update_physics(thing) {
      // precondition
      if(thing.aabb === undefined || thing.vel === undefined) return;

      let res;
      console.log()
      for(let i = 0; i < level.w; i++) {
        for(let j = 0; j < level.h; j++) {
          // there's no block so just air, move on
          if(!level.block_array[j * level.w + i]) continue;
          const box = new physics.AABB(createVector(i, j), createVector(1, 1));
          const temp_res = box.sweepAABB(thing.aabb, p5.Vector.mult(thing.vel, deltaTime / 1000));   
          if(temp_res === null) continue;
          if(res === undefined || temp_res.time < res.time) res = temp_res;
        }
      }
      // didn't collide with any blocks
      if(res === undefined) {
        thing.aabb.origin.add(p5.Vector.mult(thing.vel, deltaTime / 1000));
        thing.vel.add(createVector(0, 9.8).mult(deltaTime / 1000));
        if(thing.onGround) {
          console.log("changed");
          console.log(thing.vel);
        }
        thing.onGround = false;
      } else {
        console.log(`x: ${res.normal.x}, y: ${res.normal.y}`);
        // collided with at least one thing
        thing.aabb.origin = res.pos;
        if(Math.sign(res.normal.x) === Math.sign(thing.vel.x))
        if(res.normal.x !== 0) thing.vel.x = 0;
        if(res.normal.y !== 0) {
          thing.vel.y = 0;
          // if player hits block from top they are grounded and friction is applied
          thing.onGround = true;
        }
        // TODO: we need to do a second collision check to make sure they didn't hit another wall
        thing.aabb.origin.add(p5.Vector.mult(thing.vel, deltaTime / 1000 * res.time));
      }
      // apply friction
      if(thing.onGround) {
        thing.vel.x -= thing.vel.x * 0.5;
      }
      
    }
  };
})();