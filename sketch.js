let cols, rows;
let spacing = 40;
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  let time = millis() * 0.002;

  let maxDist = 200;
  let maxPull = 30;

  // Update positions
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;
      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let dist = sqrt(dx * dx + dy * dy);

      let pull = 0;
      if (dist < maxDist) {
        pull = map(dist, 0, maxDist, maxPull, 0);
      }

      let dir = createVector(dx, dy).normalize();
      let ripple = sin(time * 4 + i * 0.3 + j * 0.3) * 3;
      let noiseVal = noise(i * 0.1, j * 0.1, time) * 5;

      let offsetX = dir.x * pull + ripple + noiseVal;
      let offsetY = dir.y * pull * 0.6 + ripple * 0.4 + noiseVal * 0.6;

      let targetX = baseX - offsetX;
      let targetY = baseY - offsetY;

      grid[i][j].x = lerp(grid[i][j].x, targetX, 0.15);
      grid[i][j].y = lerp(grid[i][j].y, targetY, 0.15);
    }
  }

  // 🔥 Glow cells near mouse
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let p1 = grid[i][j];
      let p2 = grid[i + 1][j];
      let p3 = grid[i + 1][j + 1];
      let p4 = grid[i][j + 1];

      let cx = (p1.x + p3.x) / 2;
      let cy = (p1.y + p3.y) / 2;
      let d = dist(mouseX, mouseY, cx, cy);

      if (d < maxDist) {
        let alpha = map(d, 0, maxDist, 180, 0);
        fill(0, 255, 0, alpha);
        beginShape();
        vertex(p1.x, p1.y);
        vertex(p2.x, p2.y);
        vertex(p3.x, p3.y);
        vertex(p4.x, p4.y);
        endShape(CLOSE);
      }
    }
  }

  // 🟢 Grid lines
  stroke(0, 255, 0, 180);
  noFill();
  for (let j = 0; j <= rows; j++) {
    beginShape();
    for (let i = 0; i <= cols; i++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

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
