// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let curr_colour = "red";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeState();
}

function changeState() {
  if (Math.floor(millis()/1000) % 10 < 5) {
    curr_colour = "green";
  } else if (Math.floor(millis()/1000) % 10 < 6) {
    curr_colour = "yellow";
  } else curr_colour = "red";
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(curr_colour === "red" ? "red" : "white");
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(curr_colour === "yellow" ? "yellow" : "white");
  ellipse(width/2, height/2, 50, 50); //middle
  fill(curr_colour === "green" ? "green" : "white");
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}