let cols = 80;
let rows = 80;
let spacing = 20;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();
  frameRate(60);
}

function draw() {
  background(0);
  
  rotateX(PI / 3.5);
  rotateZ(map(mouseX, 0, width, -PI / 4, PI / 4));

  translate(-cols * spacing / 2, -rows * spacing / 2, 0);

  let t = millis() * 0.001;

  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      let x0 = x * spacing;
      let y0 = y * spacing;
      let x1 = (x + 1) * spacing;
      let y1 = (y + 1) * spacing;

      let z0 = sin(t + x * 0.3 + y * 0.3) * 40;
      let z1 = sin(t + (x + 1) * 0.3 + y * 0.3) * 40;
      let z2 = sin(t + x * 0.3 + (y + 1) * 0.3) * 40;

      // Draw lines to right and down neighbors
      line(x0, y0, z0, x1, y0, z1); // horizontal
      line(x0, y0, z0, x0, y1, z2); // vertical
    }
  }
}
