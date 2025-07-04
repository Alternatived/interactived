let cols, rows;
let spacing = 40;
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();

  cols = floor(width / spacing);
  rows = floor(height / spacing);

  for (let i = 0; i <= cols; i++) {
    grid[i] = [];
    for (let j = 0; j <= rows; j++) {
      grid[i][j] = createVector(i * spacing, j * spacing);
    }
  }
}

function draw() {
  background(0);

  let maxDist = 150;
  let maxPull = 30;
  let time = millis() * 0.002;

  // Update grid point positions
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;

      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let dist = sqrt(dx * dx + dy * dy);

      let pullOffset = 0;
      if (dist < maxDist) {
        let effect = (maxDist - dist) / maxDist;
        pullOffset = effect * maxPull;
      }

      let ripple = sin(time * 5 + i * 0.5 + j * 0.5) * 3;
      let noiseVal = noise(i * 0.1, j * 0.1, time) * 6;

      let dir = createVector(dx, dy).normalize();

      let offsetX = dir.x * pullOffset + ripple + noiseVal;
      let offsetY = dir.y * pullOffset * 0.6 + ripple * 0.5 + noiseVal * 0.7;

      let targetX = baseX - offsetX;
      let targetY = baseY - offsetY;

      grid[i][j].x = lerp(grid[i][j].x, targetX, 0.15);
      grid[i][j].y = lerp(grid[i][j].y, targetY, 0.15);
    }
  }

  // 🌟 Draw glowing squares under the mouse
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let p1 = grid[i][j];
      let p2 = grid[i + 1][j];
      let p3 = grid[i + 1][j + 1];
      let p4 = grid[i][j + 1];

      // Get center of the cell
      let cx = (p1.x + p3.x) / 2;
      let cy = (p1.y + p3.y) / 2;

      let d = dist(mouseX, mouseY, cx, cy);
      let alpha = map(d, 0, 200, 200, 0, true); // fade by distance

      if (alpha > 1) {
        fill(0, 255, 0, alpha);
        noStroke();
        beginShape();
        vertex(p1.x, p1.y);
        vertex(p2.x, p2.y);
        vertex(p3.x, p3.y);
        vertex(p4.x, p4.y);
        endShape(CLOSE);
      }
    }
  }

  // 🧱 Grid lines
  stroke(0, 255, 0, 200);
  strokeWeight(1);
  noFill();

  // Horizontal lines
  for (let j = 0; j <= rows; j++) {
    beginShape();
    for (let i = 0; i <= cols; i++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Vertical lines
  for (let i = 0; i <= cols; i++) {
    beginShape();
    for (let j = 0; j <= rows; j++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Dots
  strokeWeight(2);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      point(grid[i][j].x, grid[i][j].y);
    }
  }
}
