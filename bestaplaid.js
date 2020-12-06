const hexagonEdge = 250
const hexagonHeight = Math.sqrt(Math.pow(hexagonEdge, 2) - Math.pow(hexagonEdge/2, 2))
const extra = 100 // distance for line to extend out of screen

// TODO:
// - bezier curved speed changes
// - add striped lines

const leftPoint = makePoint(-hexagonEdge, 0)
const rightPoint = makePoint(hexagonEdge, 0)
let seed = Math.random()

function bestaplaid(time) {
  let msPerLine = 500
  let msOffset = 0

  const lineStyles = [horizontalLines, forwardSlashLines, backwardSlashLines, diagonalLines, allLines]

  // handMadePurple()

  Math.seedrandom(seed);
  randomPlaid()

  function lineTranslate(x, y){
    push()
    if (x) {
      translate(x, 0)
    }
    if (y) {
      translate(0, y)
    }
  }

  function timeScale() {
    scale = Math.min((time - msOffset) / msPerLine - 1, 1)
    return scale
  }

  function sleep(ms) {
    msOffset += ms
  }

  function topLine() {
    arguments[0] = 0 // cannot translate horizontal lines horizontally
    lineTranslate.apply(null, arguments)
    line(-windowWidth/2, -hexagonHeight, windowWidth * timeScale(), -hexagonHeight)
    msOffset += msPerLine
    pop()
  }

  function bottomLine() {
    arguments[0] = 0 // cannot translate horizontal lines horizontally
    lineTranslate.apply(null, arguments)
    line(+windowWidth/2, hexagonHeight, -windowWidth * timeScale(), hexagonHeight)
    msOffset += msPerLine
    pop()
  }

  function topLeftLine() {
    lineTranslate.apply(null, arguments)
    line(
      leftPoint.x - windowHeight/sqrt(3),
      windowHeight + extra,
      leftPoint.x + (windowHeight/sqrt(3)) * timeScale(),
      (-windowHeight - extra) * timeScale()
    )
    msOffset += msPerLine
    pop()
  }

  function bottomLeftLine() {
    lineTranslate.apply(null, arguments)
    line(
      leftPoint.x - windowHeight/sqrt(3),
      -windowHeight - extra,
      leftPoint.x + (windowHeight/sqrt(3)) * timeScale(),
      (+windowHeight + extra) * timeScale()
    )
    msOffset += msPerLine
    pop()
  }

  function topRightLine() {
    lineTranslate.apply(null, arguments)
    line(
      rightPoint.x + windowHeight/sqrt(3),
      +windowHeight + extra,
      rightPoint.x - windowHeight/sqrt(3) * timeScale(),
      (-windowHeight - extra) * timeScale()
    )
    msOffset += msPerLine
    pop()
  }

  function bottomRightLine() {
    lineTranslate.apply(null, arguments)
    line(
      rightPoint.x + (windowHeight/sqrt(3)),
      -windowHeight - extra,
      rightPoint.x - windowHeight/sqrt(3) * timeScale(),
      (windowHeight + extra) * timeScale()
    )
    msOffset += msPerLine
    pop()
  }

  function horizontalLines(distanceFromCenter, _) {
    topLine(0, -distanceFromCenter)
    msOffset -= msPerLine
    bottomLine(0, distanceFromCenter)
  }

  function forwardSlashLines(distanceFromCenter, offset) {
    topLeftLine(-distanceFromCenter, offset)
    msOffset -= msPerLine
    bottomRightLine(distanceFromCenter, offset)
  }

  function backwardSlashLines(distanceFromCenter, offset) {
    topRightLine(distanceFromCenter, offset)
    msOffset -= msPerLine
    bottomLeftLine(-distanceFromCenter, offset)
  }

  function diagonalLines(distanceFromCenter, offset) {
    backwardSlashLines(distanceFromCenter, offset)
    msOffset -= msPerLine
    forwardSlashLines(distanceFromCenter, offset)
  }

  function allLines(distanceFromCenter, offset) {
    horizontalLines(distanceFromCenter, offset)
    msOffset -= msPerLine
    diagonalLines(distanceFromCenter, offset)
  }

  function handMadePurple() {
    const theme = themes[1]
    background(theme[1])

    // make hexagon black
    noStroke()
    fill(black)
    polygon(0, 0, hexagonEdge, 6)

    sleep(1000)

    // innermost six lines, drawn one at a time
    msPerLine = 600
    strokeWeight(120)
    stroke(colourOpacity(theme[3], 0.35))
    topLine()
    stroke(colourOpacity(theme[4], 0.3))
    topRightLine()
    stroke(colourOpacity(theme[3], 0.3))
    bottomRightLine()
    stroke(colourOpacity(theme[3], 0.35))
    bottomLine()
    stroke(colourOpacity(theme[4], 0.3))
    bottomLeftLine()
    stroke(colourOpacity(theme[3], 0.3))
    topLeftLine()

    // fat theme[2] outer lines
    msPerLine = 500
    stroke(colourOpacity(theme[2], 0.3))
    strokeWeight(200)
    horizontalLines(hexagonHeight)
    forwardSlashLines(2.5*hexagonHeight)
    backwardSlashLines(2.5*hexagonHeight)

    // fat theme[4] / purple outer lines (goes around the inner most lines)
    msPerLine = 600
    stroke(colourOpacity(theme[3], 0.3))
    bottomLeftLine(-hexagonHeight)
    topRightLine(hexagonHeight)
    stroke(colourOpacity(theme[4], 0.1))
    topLeftLine(-hexagonHeight)
    bottomRightLine(hexagonHeight)

    // dark purple paired lines on outermost lines
    msPerLine = 600
    stroke(colourOpacity(theme[1], .75))
    strokeWeight(10)
    horizontalLines(hexagonHeight - 40)
    horizontalLines(hexagonHeight + 40)
    msPerLine = 300
    topRightLine(2*hexagonHeight + 40)
    topRightLine(2*hexagonHeight - 40)
    bottomRightLine(2*hexagonHeight + 40)
    bottomRightLine(2*hexagonHeight - 40)
    topLeftLine(-2*hexagonHeight + 40)
    topLeftLine(-2*hexagonHeight - 40)
    bottomLeftLine(-2*hexagonHeight + 40)
    bottomLeftLine(-2*hexagonHeight - 40)

    // middle layer bright theme[4] lines
    msPerLine = 300
    stroke(colourOpacity(theme[3], .6))
    strokeWeight(10)
    bottomRightLine(hexagonHeight, 50)
    bottomLeftLine(-hexagonHeight, -50)
    topLeftLine(-hexagonHeight, -50)
    topRightLine(hexagonHeight, 50)

    // outermost theme[4] lines
    msPerLine = 200
    stroke(colourOpacity(theme[4], 0.4))
    strokeWeight(15)
    horizontalLines(hexagonHeight + 150)
    forwardSlashLines(2.5*hexagonHeight + 300)
    backwardSlashLines(2.5*hexagonHeight + 300)

    // final layer of white lines
    msPerLine = 600
    strokeWeight(5)
    stroke(colourOpacity(white, 0.6))
    forwardSlashLines()
    backwardSlashLines()
    strokeWeight(10)
    bottomRightLine(hexagonHeight, 0)
    bottomLeftLine(-hexagonHeight, 0)
    topLeftLine(-hexagonHeight, 0)
    topRightLine(hexagonHeight, 0)
  }

  function randomCenterHexagon() {
    let style = rand(0, 1)
    strokeWeight(rand(10, 200))
    let col1 = chooseRand(theme)
    let col2 = chooseRand(theme)
    let col3 = chooseRand(theme)
    let opac1 = randfloat(0.1, 1.0)
    let opac2 = randfloat(0.1, 1.0)
    let opac3 = randfloat(0.1, 1.0)
    if (style == 0) { // lines one at a time
      stroke(colourOpacity(col1, opac1))
      topLine()
      stroke(colourOpacity(col2, opac2))
      topRightLine()
      stroke(colourOpacity(col3, opac3))
      bottomRightLine()
      stroke(colourOpacity(col1, opac1))
      bottomLine()
      stroke(colourOpacity(col2, opac2))
      bottomLeftLine()
      stroke(colourOpacity(col3, opac3))
      topLeftLine()
    } else if (style == 1) { // one pair of lines at a time
      stroke(colourOpacity(col1, opac1))
      horizontalLines()
      stroke(colourOpacity(col2, opac2))
      forwardSlashLines()
      stroke(colourOpacity(col3, opac3))
      backwardSlashLines()
    } else if (style == 2) { // all at once
      stroke(colourOpacity(col1, opac1))
      horizontalLines()
      msOffset -= msPerLine
      stroke(colourOpacity(col2, opac2))
      forwardSlashLines()
      msOffset -= msPerLine
      stroke(colourOpacity(col3, opac3))
      backwardSlashLines()
      msOffset -= msPerLine
    }
  }

  function randomPlaid() {
    theme = chooseRand(themes)
    background(chooseRand(theme))

    msPerLine = 100

    randomCenterHexagon()

    for (let i = 0; i < rand(7, 29); i++) {
      numLines = rand(1, 4)

      colours = []
      if (i > 0 && i % 7) { // every six, do a set of black or white
        col = chooseRand([black, white])
        for (let j = 0; j < numLines; j++)
          colours.push(col)
      } else {
        if (chooseRand([true, false])) { // multicolour
          for (let j = 0; j < numLines; j++)
            colours.push(chooseRand(theme))
        } else {
          col = chooseRand(theme)
          for (let j = 0; j < numLines; j++)
            colours.push(col)
        }
      }

      lineStyle = chooseRand(lineStyles)

      for (let j = 0; j < numLines; j++) {
        msPerLine = rand(100, 700)
        colour = colourOpacity(colours[j], randfloat(0.1, 0.8))
        weight = rand(5, 150)
        if (colours[j] == black || colours[j] == white) { // give black and white a higher opacity and lower weight
          colour = colourOpacity(colours[j], randfloat(0.6, 0.9))
          weight = rand(3, 15)
        }

        distance = rand(1, 4 * hexagonHeight)
        offset = rand(-70, 70) * chooseRand([0, 0, 1])

        stroke(colour)
        strokeWeight(weight)
        lineStyle(distance, offset)
      }
    }
  }
}
