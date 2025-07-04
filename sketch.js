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

  let maxDist = 200;
  let maxOffset = 20;

  // Update grid points based on mouse distortion
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;

      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let dist = sqrt(dx * dx + dy * dy);

      let offset = 0;
      if (dist < maxDist) {
        let effect = (maxDist - dist) / maxDist;
        offset = effect * maxOffset;
      }

      // Direction vector pointing away from mouse
      let dir = createVector(dx, dy).normalize().mult(offset);

      // Apply vertical squish for 3D illusion
      let targetX = baseX - dir.x;
      let targetY = baseY - dir.y * 0.6;

      // Smooth lerp for animation
      grid[i][j].x = lerp(grid[i][j].x, targetX, 0.15);
      grid[i][j].y = lerp(grid[i][j].y, targetY, 0.15);
    }
  }

  // Draw lines horizontally
  for (let j = 0; j <= rows; j++) {
    beginShape();
    for (let i = 0; i <= cols; i++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Draw lines vertically
  for (let i = 0; i <= cols; i++) {
    beginShape();
    for (let j = 0; j <= rows; j++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Draw points on top for crisp dots
  strokeWeight(3);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      point(grid[i][j].x, grid[i][j].y);
    }
  }
}
