let cols, rows;
let spacing = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 255, 0);
  noFill();
  cols = floor(width / spacing);
  rows = floor(height / spacing);
}

function draw() {
  background(0);

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let x = i * spacing;
      let y = j * spacing;

      let dx = mouseX - x;
      let dy = mouseY - y;
      let distSq = dx * dx + dy * dy;

      let maxDist = 300 * 300;
      let distortion = map(constrain(distSq, 0, maxDist), 0, maxDist, 15, 0);

      let offsetX = dx / sqrt(distSq + 1) * distortion;
      let offsetY = dy / sqrt(distSq + 1) * distortion;

      ellipse(x + offsetX, y + offsetY, 2);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
}
