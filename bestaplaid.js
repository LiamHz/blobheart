// TODO:
// - bezier curved speed changes
// - add striped lines

let seed = Math.random()

function bestaplaid(time) {
  let hexagonEdge = Math.min(windowWidth, windowHeight)/5
  let hexagonHeight = Math.sqrt(Math.pow(hexagonEdge, 2) - Math.pow(hexagonEdge/2, 2))
  let extra = 100 // distance for line to extend out of screen
  const leftPoint = makePoint(-hexagonEdge, 0)
  const rightPoint = makePoint(hexagonEdge, 0)
  const maxDistance = Math.max(windowWidth, windowHeight) / 2 + extra
  const numLinesScale = Math.max(windowWidth, windowHeight) / 900
  let msPerLine = 500
  let msOffset = 0
  let speed = 0.7
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
    if (scale > 0) {
      scale = 1/2*sin(scale*PI - PI/2) + 1/2
    }
    return Math.max(scale, -1)
  }

  function sleep(ms) {
    msOffset += ms
  }

  function drawLine(x1, y1, x2, y2, translations) {
    lineTranslate.apply(null, translations)
    if (binRand() || true) {
      line(x1, y1, x2, y2)
    } else {
      drawDashedLine.apply(null, arguments)
    }
    msOffset += msPerLine
    pop()
  }

  function drawDashedLine(x1, y1, x2, y2, translations) {
    noStroke()
    strokeCol = this._renderer.curStrokeColor
    fillCol = `rgba(${strokeCol[0]*255}, ${strokeCol[1]*255}, ${strokeCol[2]*255}, ${strokeCol[3]})`
    fill(color(fillCol))
    height = this._renderer.curStrokeWeight

    width = rand(5, height/10)
    base = makePoint(x1 - width, y1)
    i = 0

    while (i < 100) {
      quad(
        base.x + height, base.y,
        base.x + width, base.y-height,
        base.x + 2*width, base.y-height,
        base.x + width + height, base.y
      )
      msOffset += msPerLine
      base.x += width * 2 * Math.max(-(x2 < x1), 1)
      i += 1
    }
    pop()
  }

  function topLine() {
    flip = chooseRand([1, -1])
    arguments[0] = 0 // cannot translate horizontal lines horizontally
    drawLine(-windowWidth/2*flip, -hexagonHeight, windowWidth * timeScale()*flip, -hexagonHeight, arguments)
  }

  function bottomLine() {
    flip = chooseRand([1, -1])
    arguments[0] = 0 // cannot translate horizontal lines horizontally
    drawLine(+windowWidth/2*flip, hexagonHeight, -windowWidth * timeScale()*flip, hexagonHeight, arguments)
  }

  function topLeftLine() {
    flip = chooseRand([1, -1])
    drawLine(
      leftPoint.x - windowHeight/sqrt(3)*flip,
      (windowHeight + extra)*flip,
      leftPoint.x + (windowHeight/sqrt(3)) * timeScale() * flip,
      (-windowHeight - extra) * timeScale() * flip,
      arguments
    )
  }

  function bottomLeftLine() {
    flip = chooseRand([1, -1])
    drawLine(
      leftPoint.x - windowHeight/sqrt(3)*flip,
      (-windowHeight - extra)*flip,
      leftPoint.x + (windowHeight/sqrt(3)) * timeScale() * flip,
      (+windowHeight + extra) * timeScale() * flip,
      arguments
    )
  }

  function topRightLine() {
    flip = chooseRand([1, -1])
    drawLine(
      rightPoint.x + windowHeight/sqrt(3)*flip,
      (windowHeight + extra)*flip,
      rightPoint.x - windowHeight/sqrt(3) * timeScale() * flip,
      (-windowHeight - extra) * timeScale() * flip,
      arguments
    )
  }

  function bottomRightLine() {
    flip = chooseRand([1, -1])
    drawLine(
      rightPoint.x + (windowHeight/sqrt(3))*flip,
      (-windowHeight - extra) * flip,
      rightPoint.x - windowHeight/sqrt(3) * timeScale()*flip,
      (windowHeight + extra) * timeScale()*flip,
      arguments
    )
  }

  function drawTwoLines(x, y, x1, x2, y1, y2) {
    // randomizes order and togetherness
    if (binRand()){
      x(x1, x2)
      msOffset -= msPerLine * binRand()
      y(y1, y2)
    } else {
      y(y1, y2)
      msOffset -= msPerLine * binRand()
      x(x1, x2)
    }
  }

  function horizontalLines(distanceFromCenter, _) {
    drawTwoLines(topLine, bottomLine, 0, -distanceFromCenter, 0, distanceFromCenter)
  }

  function forwardSlashLines(distanceFromCenter, offset) {
    drawTwoLines(topLeftLine, bottomRightLine, -distanceFromCenter, offset, distanceFromCenter, offset)
  }

  function backwardSlashLines(distanceFromCenter, offset) {
    drawTwoLines(topRightLine, bottomLeftLine, distanceFromCenter, offset, -distanceFromCenter, offset)
  }

  function diagonalLines(distanceFromCenter, offset) {
    drawTwoLines(backwardSlashLines, forwardSlashLines, distanceFromCenter, offset, distanceFromCenter, offset)
  }

  function allLines(distanceFromCenter, offset) {
    drawTwoLines(horizontalLines, diagonalLines, distanceFromCenter, offset, distanceFromCenter, offset)
  }

  function randomCenterHexagon() {
    let style = rand(0, 1)
    strokeWeight(rand(20, 100)*numLinesScale)
    let col1 = chooseRand(theme)
    let col2 = chooseRand(theme)
    let col3 = chooseRand(theme)
    let opac1 = randfloat(0.5, 1.0)
    let opac2 = randfloat(0.5, 1.0)
    let opac3 = randfloat(0.5, 1.0)
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

    msPerLine = rand(50/speed, 500/speed)

    randomCenterHexagon()
    // stroke(black)
    // strokeWeight(100)
    // horizontalLines(50)
    highlightColour = chooseRand(theme)
    for (let i = 0; i < rand(3,6)*numLinesScale; i++) {
      numLines = rand(1, 3)

      colours = []
      if (chooseRand([true, false])) { // multicolour
        for (let j = 0; j < numLines; j++)
          colours.push(chooseRand(theme))
      } else {
        col = chooseRand(theme)
        for (let j = 0; j < numLines; j++)
          colours.push(col)
      }

      lineStyle = chooseRand(lineStyles)

      for (let j = 0; j < numLines; j++) {
        msPerLine = rand(50/speed, 500/speed)
        colour = colourOpacity(colours[j], randfloat(0.1, 0.8))
        weight = rand(2, 40) * numLinesScale

        distance = randfloat(1, maxDistance)
        offset = rand(-70, 70) * chooseRand([0, 0, 1])

        stroke(colour)
        strokeWeight(weight)
        lineStyle(distance, offset)
      }
    }


    // highlight final layer
    for (let i = 0; i < rand(1, 2)*numLinesScale; i++) {

      lineStyle = chooseRand(lineStyles)

      for (let j = 0; j < numLines; j++) {
        msPerLine = rand(50/speed, 500/speed)
        colour = colourOpacity(highlightColour, randfloat(0.7, 1))
        weight = rand(3, 4) * numLinesScale

        distance = randfloat(1, maxDistance)
        offset = rand(-70, 70) * chooseRand([0, 0, 1])

        stroke(colour)
        strokeWeight(weight)
        lineStyle(distance, offset)
      }
    }
  }
}
