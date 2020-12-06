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
}

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

function hexGrid(fade, fadeType, fadeDir) {
  const hexChance = 0.7
  const gridHeight = windowHeight / (HEXAGON_HEIGHT) + 1
  const gridWidth = windowWidth / (HEXAGON_SIZE*3) + 1

  if (fadeDir == "reverse") {
    fade = 1.0 - fade
  }

  function drawHex(fade) {
    push()
    noStroke()
    hexColor = color(hexColors[rand(0, hexColors.length)])
    hexColor._array[3] = fade
    fill(hexColor)
    if (Math.random() > hexChance) {
      polygon(0, 0, HEXAGON_SIZE - GUTTER, 6)
    }

    pop()
  }

  function getHexFade(idx) {
    hexFade = 0
    if (fadeType === "out") {
      hexFade = fade + randfloat(-0.35, 0)
    } else if (fadeType == "down") {
      // Logging this significantly lowers FPS
      //console.log((fade / gridHeight) / idx, "fades")
      hexFade = (fade / gridHeight) / idx * 1600
    } else {
      console.error("invalid fade type: ", fadeType)
    }

    return hexFade
  }

  for (let i = 0; i < gridHeight; i++) {
    push()
    // % 2 is used because hexagons alternate where they start from
    translate(-windowWidth/2  + HEXAGON_SIZE*(3/2*(i%2)),
              -windowHeight/2 + HEXAGON_HEIGHT*(i))

    drawHex(getHexFade(i))

    for (let j = 0; j < gridWidth - 1; j++){
      translate(p5.Vector.fromAngle(radians(0), HEXAGON_SIZE * 3))
      drawHex(getHexFade(i))
    }
    pop()
  }
}

let fade = 0
let fadeType = "down"
let fadeDir = "forward"

let hex1Seed = 42
let hex2Seed = 69


function draw() {
  background(255)

  fade += fadeDir == "forward" ? 0.01 : -0.01

  if (fade <= -0.2) {
    fadeDir = fadeDir == "forward" ? "reverse" : "forward"
    hex1Seed += Math.random()
  } else if (fade >= 1.2) {
    fadeDir = fadeDir == "forward" ? "reverse" : "forward"
    hex2Seed += Math.random()
  }

  Math.seedrandom(str(hex1Seed));
  hexGrid(fade, fadeType, "forward")
  Math.seedrandom(str(hex2Seed));
  hexGrid(fade, fadeType, "reverse")

  // bestaplaid(millis())
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

function makePoint(x, y) {
  return {x: x, y: y}
}

function colourOpacity(colour, opacity) {
    hexColor = color(colour)
    hexColor._array[3] = opacity
    return hexColor
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
