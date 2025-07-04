let cols, rows;
let spacing = 40;
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 255, 0, 200);
  noFill();
  cols = floor(width / spacing);
  rows = floor(height / spacing);

  for (let i = 0; i <= cols; i++) {
    grid[i] = [];
    for (let j = 0; j <= rows; j++) {
      let x = i * spacing;
      let y = j * spacing;
      grid[i][j] = createVector(x, y);
    }
  }
}

function draw() {
  background(0, 40); // Slight trail effect

  let t = millis() * 0.001;

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;

      // Add wave oscillation
      let waveX = sin(t + j * 0.3) * 5;
      let waveY = cos(t + i * 0.3) * 5;

      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let distSq = dx * dx + dy * dy;

      let maxDist = 250 * 250;
      let strength = map(constrain(distSq, 0, maxDist), 0, maxDist, 30, 0);

      let angle = atan2(dy, dx);
      let pushX = cos(angle) * strength;
      let pushY = sin(angle) * strength;

      let targetX = baseX + waveX + pushX;
      let targetY = baseY + waveY + pushY;

      grid[i][j].x = lerp(grid[i][j].x, targetX, 0.15);
      grid[i][j].y = lerp(grid[i][j].y, targetY, 0.15);
    }
  }

  // Draw grid lines
  stroke(0, 255, 0, 200);
  strokeWeight(1);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let p1 = grid[i][j];
      let p2 = grid[i + 1][j];
      let p3 = grid[i][j + 1];
      line(p1.x, p1.y, p2.x, p2.y);
      line(p1.x, p1.y, p3.x, p3.y);
    }
  }

  // Draw dots over grid points
  strokeWeight(2);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      point(grid[i][j].x, grid[i][j].y);
    }
  }
}
