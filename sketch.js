let cols, rows;
let spacing = 40;
let wave = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 255, 0);
  noFill();
  cols = floor(width / spacing);
  rows = floor(height / spacing);

  for (let i = 0; i <= cols; i++) {
    wave[i] = [];
    for (let j = 0; j <= rows; j++) {
      wave[i][j] = createVector(i * spacing, j * spacing);
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let baseX = i * spacing;
      let baseY = j * spacing;

      let dx = mouseX - baseX;
      let dy = mouseY - baseY;
      let distSq = dx * dx + dy * dy;

      let maxDist = 300 * 300;
      let angle = atan2(dy, dx);
      let strength = map(constrain(distSq, 0, maxDist), 0, maxDist, 20, 0);

      let offsetX = cos(angle) * strength;
      let offsetY = sin(angle) * strength;

      let x = baseX + offsetX;
      let y = baseY + offsetY;

      wave[i][j].x = lerp(wave[i][j].x, x, 0.1);
      wave[i][j].y = lerp(wave[i][j].y, y, 0.1);

      ellipse(wave[i][j].x, wave[i][j].y, 2);
    }
  }
}
