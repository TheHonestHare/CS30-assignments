const mouse = (() => {
  return {
    get_mouse_grid_pos() {
      // p5js is dumb and doesn't translate mouseX and mouseY automatically
      const mousePosFloorX = floor((mouseX - cam.pos.x) / (cam.zoom * 8));
      const mousePosFloorY = floor((mouseY - cam.pos.y) / (cam.zoom * 8));
      return [mousePosFloorX, mousePosFloorY];
    },
    highlight_grid_pos() {
      [x, y] = mouse.get_mouse_grid_pos();
      if(!between(x, -1, level.w) || !between(y, -1, level.h)) return;
      fill(0, 0, 0, 0);
      stroke('red');
      strokeWeight((sin(millis()/250)+1.5)*0.1);
      rect(x, y, 1, 1);
    },
    onLeftClick() {
      [x, y] = mouse.get_mouse_grid_pos();
      level.setBlock(x, y, true);
    },
    onRightClick() {
      [x, y] = mouse.get_mouse_grid_pos();
      level.setBlock(x, y, false);
    }
  };
})();