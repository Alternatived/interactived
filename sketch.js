let cols, rows;
let spacing = 30;
let depthScale = 50;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = 60;
  rows = 60;
  frameRate(60);
}

function draw() {
  background(0);
  rotateX(PI / 3);
  rotateZ(map(mouseX, 0, width, -PI, PI) * 0.1);
  translate(-cols * spacing / 2, -rows * spacing / 2, 0);

  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();

  let t = millis() * 0.002;

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      let xPos = x * spacing;
      let yPos = y * spacing;

      let z1 = sin(t + x * 0.2 + y * 0.3) * depthScale;
      let z2 = sin(t + x * 0.2 + (y + 1) * 0.3) * depthScale;

      vertex(xPos, yPos, z1);
      vertex(xPos, yPos + spacing, z2);
    }
    endShape();
  }
}
