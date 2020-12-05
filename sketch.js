CH = 500;
CW = 500;

function polygon(x, y, r, npoints) {
  push();
  const radius = max(0, r);
  let angle = TWO_PI / npoints;
  angleMode(RADIANS);
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

function scene1() {
  // 6 blob hearts are dancing, 3 in each of the bottom corners
  // One at a time, they launch into the sky, explode, and turn into a sun / moon
  angleMode(DEGREES)
  blobheart(CW/2-40,  CH/2-40, 12)
  blobheart(CW/2-100, CH/2-40, 14)
  blobheart(CW/2-160, CH/2-40, 12)
  blobheart(0, 0, 20)

  push()
  translate(CW/2+40, CH/2+40, 12)
  rotateY(180)
  blobheart(0, 0)
  pop()
  //blobheart(CW/2-200, CH/2-40, 14)
  //blobheart(CW/2-160, CH/2-40, 12)
}

/*
function setup() {
  createCanvas(CH, CW, WEBGL);
}

function draw() {
  background(255);
  ellipse(10, 10, 50);
  scene1()
}
*/


HEXAGON_SIZE = 20 // edge size
HEXAGON_HEIGHT = Math.sqrt(Math.pow(HEXAGON_SIZE, 2) - Math.pow(HEXAGON_SIZE/2, 2))
GUTTER = 0.5

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  redraw()
}

hexColors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']
hexColors = hexColors.map(x => hexToHSL(x))

function hexGrid(fade) {
  const gridHeight = windowHeight / (HEXAGON_HEIGHT) + 1
  const gridWidth = windowWidth / (HEXAGON_SIZE*3) + 1 
  const hexChance = 0.7

  function drawHex() {
    push()
    noStroke()
    hexColor = color(hexColors[rand(0, hexColors.length)])
    hexColor._array[3] = fade + randfloat(-0.2, 0.2)
    fill(hexColor)
    if (Math.random() > hexChance)
      polygon(0, 0, HEXAGON_SIZE - GUTTER, 6)
    pop()
  }

  for (let i = 0; i < gridHeight; i++) {
    push()
    // % 2 is used because hexagons alternate where they start from
    translate(-windowWidth/2  + HEXAGON_SIZE*(3/2*(i%2)),
              -windowHeight/2 + HEXAGON_HEIGHT*(i))
    drawHex()

    for (let j = 0; j < gridWidth - 1; j++){
      translate(p5.Vector.fromAngle(radians(0), HEXAGON_SIZE * 3))
      drawHex()
    }
    pop()
  }
}
function draw() {
  background(255)
  Math.seedrandom('beep');
  hexGrid(Math.abs(Math.sin(millis()/3000)))
  Math.seedrandom('boop');
  hexGrid(1-Math.abs(Math.sin(millis()/3000)))
}

function rand(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) ) + lo;
}

function randfloat(lo, hi) {
  return Math.random() * (hi - lo) + lo;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}