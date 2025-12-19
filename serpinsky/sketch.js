// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const colours = ["red", "orange", "yellow", "green", "blue", "purple"];
function setup() {
  createCanvas(windowWidth, windowHeight);
}
const ITER = 10;

function draw() {
  const starting_points_0 = {x:0, y:height};
  const starting_points_1 = {x:width/2, y:0};
  const starting_points_2 = {x:width, y:height};

  background(220);

  serpinsky(ITER, [starting_points_0, starting_points_1, starting_points_2]);
}

function midPoint(point1, point2) {
  return {x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2};
}

function serpinsky(n, points) {
  fill(ITER-n <  colours.length ? colours[ITER-n] : "white");
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if(n <= 0) {
    return;
  }
  for(let i = 0; i < 3; i++) {
    const new_points = [points[i], midPoint(points[i], points[(i+1)%3]), midPoint(points[i], points[(i+2)%3])];
    triangle(new_points[0].x, new_points[0].y, new_points[1].x, new_points[1].y, new_points[2].x, new_points[2].y);
    serpinsky(n-1, new_points);
  }
}
