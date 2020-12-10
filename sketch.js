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
  angleMode(DEGREES);
  blobheart(CW / 2 - 40, CH / 2 - 40, 12);
  blobheart(CW / 2 - 100, CH / 2 - 40, 14);
  blobheart(CW / 2 - 160, CH / 2 - 40, 12);
  blobheart(0, 0, 20);

  push();
  translate(CW / 2 + 40, CH / 2 + 40, 12);
  rotateY(180);
  blobheart(0, 0);
  pop();
}

HEXAGON_SIZE = 20; // edge size
HEXAGON_HEIGHT = Math.sqrt(
  Math.pow(HEXAGON_SIZE, 2) - Math.pow(HEXAGON_SIZE / 2, 2)
);

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

hexColors = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];
hexColors = hexColors.map(x => hexToHSL(x));

/*
1. Make "roling wave" fade down (nrows away from target row sets fade value)
2. Make hexagons pulse by changing gutter size
3. Make hexagons pulse by changing gutter size
4. Play around with stroke everywhere, but only some are filled in
*/

const clamp = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

function hexGrid(fade, fadeType, fadeDir, gutter = 0.5) {
  const hexChance = 0.7;
  const gridHeight = windowHeight / HEXAGON_HEIGHT + 1;
  const gridWidth = windowWidth / (HEXAGON_SIZE * 3) + 1;

  if (fadeDir == "reverse") {
    fade = 1.0 - fade;
  }

  function drawHex(fade) {
    push();
    noStroke();
    hexColor = colorOpacity(hexColors[rand(0, hexColors.length)], fade);
    fill(hexColor);
    if (Math.random() > hexChance) {
      polygon(0, 0, HEXAGON_SIZE - HEXAGON_SIZE * clamp(gutter, 0, 0.3), 6);
    }

    pop();
  }

  function getHexFade(rowN, targetRow) {
    hexFade = 0;
    if (fadeType === "out") {
      hexFade = fade + randfloat(-0.35, 0);
    } else if (fadeType == "down") {
      hexFade = 1.0 - Math.abs(rowN - targetRow) / gridHeight;
      hexFade = Math.min(fade, hexFade);
    } else {
      console.error("invalid fade type: ", fadeType);
    }

    return hexFade;
  }
  // Row which is full opacity
  // Opacity of hexagons is their distance from that row
  targetRow = Math.floor(clamp(fade, 0, 1) * gridHeight);
  console.log(targetRow);
  for (let i = 0; i < gridHeight; i++) {
    push();
    // % 2 is used because hexagons alternate where they start from
    translate(
      -windowWidth / 2 + HEXAGON_SIZE * ((3 / 2) * (i % 2)),
      -windowHeight / 2 + HEXAGON_HEIGHT * i
    );

    drawHex(getHexFade(i, targetRow));

    for (let j = 0; j < gridWidth - 1; j++) {
      translate(p5.Vector.fromAngle(radians(0), HEXAGON_SIZE * 3));
      drawHex(getHexFade(i, targetRow));
    }
    pop();
  }
}

let fade = 0;
let fadeType = "down";
let fadeDir = "forward";

let hex1Seed = 42;
let hex2Seed = 69;
let chill = 0.0;

function draw() {
  introScene();
  // fade += fadeDir == "forward" ? 0.005 : -0.005
  // if (fade <= 0-chill) {
  //   fadeDir = fadeDir == "forward" ? "reverse" : "forward"
  //   hex1Seed += Math.random()
  // } else if (fade >= 1+chill) {
  //   fadeDir = fadeDir == "forward" ? "reverse" : "forward"
  //   hex2Seed += Math.random()
  // }
  // Math.seedrandom(str(hex1Seed));
  // hexGrid(fade, fadeType, "forward", fade)
  // Math.seedrandom(str(hex2Seed));
  // hexGrid(fade, fadeType, "reverse", fade)
  // blobheart(Math.sin(millis()/512)*64, (fade-0.5)*2*windowHeight/2, clamp(fade, 0.5, 1.0)*30)
  // noLoop()
  // bestaplaid(millis())
}

function rand(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

function randfloat(lo, hi) {
  return Math.random() * (hi - lo) + lo;
}

function chooseRand(options) {
  return options[rand(0, options.length)];
}

function binRand() {
  return chooseRand([true, false]);
}

function makePoint(x, y) {
  return { x: x, y: y };
}

function colourOpacity(colour, opacity) {
  hexColor = color(colour);
  hexColor._array[3] = opacity;
  return hexColor;
}
