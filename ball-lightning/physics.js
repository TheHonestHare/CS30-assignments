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
      pointIn(point) {
        return this.origin.x < point.x && point.x < this.origin.x + this.dims.x && this.origin.y < point.y && point.y < this.origin.y + this.dims.y;
      }
      // other_box is the moving box
      // TODO: impl is broken
      push_aabb_out(other_box) {
        let diff = createVector();
        diff.x = this.origin.x + 1/2 * this.dims.x - (other_box.origin.x + 1/2 * other_box.dims.x);
        diff.y = this.origin.y + 1/2 * this.dims.y - (other_box.origin.y + 1/2 * other_box.dims.y);
        const p = p5.Vector.add(this.dims, other_box.dims).mult(1/2).sub(createVector(Math.abs(diff.x), Math.abs(diff.y)));

        if (p.x <= 0 || p.y <= 0) return null;
        const hit = new physics.Hit();
        if(p.x < p.y) {
          hit.pos = createVector(other_box.origin.x - p.x, other_box.origin.y);
          hit.normal = createVector(Math.sign(diff.x), 0);
          hit.time = 0;
        } else {
          hit.pos = createVector(other_box.origin.x, other_box.origin.y - p.y);
          hit.normal = createVector(0, Math.sign(diff.y));
          hit.time = 0;
        }
        console.log(`gemme out with x: ${other_box.origin.x}, y: ${other_box.origin.y}; pushed to x: ${hit.pos.x}, y: ${hit.pos.y}`);
        return hit;

      }
      isPointIn(point) {
        return between(point.x, this.origin.x, this.origin.x + this.dims.x) &&
               between(point.y, this.origin.y, this.origin.y + this.dims.y);
      }
      // adapted from https://noonat.github.io/intersect
      intersectSegment(pos, delta) {
        const scaleX = 1.0 / delta.x;
        const scaleY = 1.0 / delta.y;
        const isNegX = scaleX <= 0;
        const isNegY = scaleY <= 0;
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
          console.log("bruh");
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
      // other_box is the moving box
      sweepAABB(other_box, delta) {
        const new_box = new physics.AABB(this.origin, this.dims, other_box.dims);
        if(new_box.isPointIn(other_box.origin)) return this.push_aabb_out(other_box);

        const res = new_box.intersectSegment(other_box.origin, delta, other_box.dims);
        return res;
      }
    },
    update_physics(thing) {
      // precondition
      if(thing.aabb === undefined || thing.vel === undefined) return;

      let res;
      outer: for(let i = 0; i < level.w; i++) {
        for(let j = 0; j < level.h; j++) {
          // there's no block so just air, move on
          if(!level.block_array[j * level.w + i]) continue;
          const box = new physics.AABB(createVector(i, j), createVector(1, 1));
          const temp_res = box.sweepAABB(thing.aabb, p5.Vector.mult(thing.vel, deltaTime / 1000));   
          if(temp_res === null) continue;
          // if(res !== undefined && temp_res.time === 0 && res.time === 0) {
          //   thing.vel = createVector(0, 0);
          //   break outer;
          // }
          if(res === undefined || temp_res.time < res.time) res = temp_res;
        }
      }
      // didn't collide with any blocks
      if(res === undefined) {
        thing.aabb.origin.add(p5.Vector.mult(thing.vel, deltaTime / 1000));
        console.log("not colliding");
        // if(thing.onGround) {
        //   console.log("changed");
        //   console.log(thing.vel);
        // }
        thing.onGround = false;
      } else {
        // collided with at least one thing
        thing.aabb.origin = res.pos;
        if(Math.sign(res.normal.x) === Math.sign(thing.vel.x) && thing.vel.x !== 0) console.log("very wrong");
        if(res.normal.x !== 0) thing.vel.x = 0;
        if(res.normal.y !== 0) {
          //console.log("here");
          thing.vel.y = 0;
          // if player hits block from top they are grounded and friction is applied
          thing.onGround = true;
        }
        // TODO: we need to do a second collision check to make sure they didn't hit another wall
        thing.aabb.origin.add(p5.Vector.mult(thing.vel, deltaTime / 1000 * (1-res.time)));
      }
      // apply friction
      if(thing.onGround) {
        thing.vel.x -= thing.vel.x * 0.5;
      }
      
      thing.vel.add(createVector(0, 9.8).mult(deltaTime / 1000));
    }
  };
})();