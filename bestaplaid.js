const hexagonEdge = 250
const hexagonHeight = Math.sqrt(Math.pow(hexagonEdge, 2) - Math.pow(hexagonEdge/2, 2))
const extra = 100 // distance for line to extend out of screen

// colours
const purple = '#642CA9'
const darkPurple = '#1E0126'
const lilac = '#985F99'
const brightPink = '#FF36AB'
const pink = "#FF74D4"
const rose = "#FFB8DE"
const white = "#FFF"
const black = "#000"

const leftPoint = makePoint(-hexagonEdge, 0)
const rightPoint = makePoint(hexagonEdge, 0)


// TODO:
// - bezier curved speed changes
// - make a random generator
// - add striped lines

function bestaplaid(time) {
  let msPerLine = 500
  let msOffset = 0

  handMadePurple()

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

  function topLine() {
    lineTranslate.apply(null, arguments)
    line(-windowWidth/2, -hexagonHeight, windowWidth * timeScale(), -hexagonHeight)
    msOffset += msPerLine
    pop()
  }

  function bottomLine() {
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

  function horizontalLines(distanceFromCenter) {
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

  function handMadePurple() {
    background(darkPurple)

    // make hexagon black
    noStroke()
    fill(black)
    polygon(0, 0, hexagonEdge, 6)

    // innermost six lines, drawn one at a time
    strokeWeight(120)
    stroke(colourOpacity(brightPink, 0.35))
    topLine()
    stroke(colourOpacity(pink, 0.3))
    topRightLine()
    stroke(colourOpacity(brightPink, 0.3))
    bottomRightLine()
    stroke(colourOpacity(brightPink, 0.35))
    bottomLine()
    stroke(colourOpacity(pink, 0.3))
    bottomLeftLine()
    stroke(colourOpacity(brightPink, 0.3))
    topLeftLine()

    // fat lilac outer lines
    msPerLine = 200
    stroke(colourOpacity(lilac, 0.3))
    strokeWeight(200)
    horizontalLines(hexagonHeight)
    forwardSlashLines(2.5*hexagonHeight)
    backwardSlashLines(2.5*hexagonHeight)

    // fat pink / purple outer lines (goes around the inner most lines)
    msPerLine = 150
    stroke(colourOpacity(brightPink, 0.3))
    bottomLeftLine(-hexagonHeight)
    topRightLine(hexagonHeight)
    stroke(colourOpacity(rose, 0.1))
    topLeftLine(-hexagonHeight)
    bottomRightLine(hexagonHeight)

    // dark purple paired lines on outermost lines
    msPerLine = 600
    stroke(colourOpacity(darkPurple, .75))
    strokeWeight(10)
    horizontalLines(hexagonHeight - 40)
    horizontalLines(hexagonHeight + 40)
    topRightLine(2*hexagonHeight + 40)
    topRightLine(2*hexagonHeight - 40)
    bottomRightLine(2*hexagonHeight + 40)
    bottomRightLine(2*hexagonHeight - 40)
    topLeftLine(-2*hexagonHeight + 40)
    topLeftLine(-2*hexagonHeight - 40)
    bottomLeftLine(-2*hexagonHeight + 40)
    bottomLeftLine(-2*hexagonHeight - 40)

    // middle layer bright pink lines
    msPerLine = 300
    stroke(colourOpacity(brightPink, .6))
    strokeWeight(10)
    bottomRightLine(hexagonHeight, 50)
    bottomLeftLine(-hexagonHeight, -50)
    topLeftLine(-hexagonHeight, -50)
    topRightLine(hexagonHeight, 50)

    // outermost pink lines
    stroke(colourOpacity(pink, 0.4))
    strokeWeight(15)
    horizontalLines(hexagonHeight + 150)
    forwardSlashLines(2.5*hexagonHeight + 300)
    backwardSlashLines(2.5*hexagonHeight + 300)

    // final layer of white lines
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

}
