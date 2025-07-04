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

  let maxDist = 220;
  let maxPull = 30;
  let time = millis() * 0.002;

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;

      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let dist = sqrt(dx * dx + dy * dy);

      // Basic pull effect (like before)
      let pullOffset = 0;
      if (dist < maxDist) {
        let effect = (maxDist - dist) / maxDist;
        pullOffset = effect * maxPull;
      }

      // Add a ripple oscillation (wave effect) based on position and time
      let ripple = sin(time * 5 + i * 0.5 + j * 0.5) * 5;

      // Add Perlin noise for natural randomness
      let noiseScale = 0.1;
      let noiseVal = noise(i * noiseScale, j * noiseScale, time) * 10;

      // Direction vector away from mouse
      let dir = createVector(dx, dy).normalize();

      // Combine effects for x and y, with vertical squish for 3D illusion
      let offsetX = dir.x * pullOffset + ripple + noiseVal;
      let offsetY = dir.y * pullOffset * 0.6 + ripple * 0.5 + noiseVal * 0.7;

      let targetX = baseX - offsetX;
      let targetY = baseY - offsetY;

      // Smooth lerp for animation
      grid[i][j].x = lerp(grid[i][j].x, targetX, 0.15);
      grid[i][j].y = lerp(grid[i][j].y, targetY, 0.15);
    }
  }

  // Draw horizontal lines
  for (let j = 0; j <= rows; j++) {
    beginShape();
    for (let i = 0; i <= cols; i++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Draw vertical lines
  for (let i = 0; i <= cols; i++) {
    beginShape();
    for (let j = 0; j <= rows; j++) {
      vertex(grid[i][j].x, grid[i][j].y);
    }
    endShape();
  }

  // Draw dots on top for crisp points
  strokeWeight(3);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      point(grid[i][j].x, grid[i][j].y);
    }
  }
}
