blobheart = (x, y, radius) => {
  colors = {};
  colors.black = color(0, 0, 0);
  colors.red = color(248, 75, 45);
  colors.yellow = color(252, 194, 28);
  colors.highlight = color(253, 130, 95);

  push();
  // Radius of BlobHeart from center to top is radius
  angleMode(DEGREES)
  scale(radius / 45);
  // Center BlobHeart on (x, y)
  translate(-165 + (x * 45) / radius, -160 + (y * 45) / radius);

  // Head and body
  noStroke();
  fill(colors.yellow);
  beginShape();
  vertex(163, 213);
  bezierVertex(50, 222, 109, 95, 175, 102);
  bezierVertex(209, 102, 237, 135, 224, 171);
  bezierVertex(223, 186, 232, 186, 222, 198);
  bezierVertex(216, 208, 176, 215, 163, 213);
  endShape();

  // Eyes
  fill(colors.black);
  //// push() and pop are used to prevent state changes
  //// such as rotation from applying to later draw calls
  push();
  translate(138, 138);
  rotate(15);
  ellipse(0, 0, 15, 20);
  pop();
  ellipse(176, 138, 15, 20);

  // Heart
  fill(colors.red);
  beginShape();
  vertex(151, 156);
  bezierVertex(203, 116, 223, 188, 139, 222);
  bezierVertex(77, 175, 108, 106, 151, 156);
  endShape();

  // Heart highlight
  fill(colors.highlight);
  beginShape();
  vertex(112, 164);
  bezierVertex(101, 155, 124, 132, 130, 149);
  bezierVertex(133, 157, 123, 151, 120, 156);
  bezierVertex(119, 160, 115, 170, 112, 164);
  endShape();

  // Hands
  fill(colors.yellow);
  beginShape();
  vertex(100, 181);
  bezierVertex(122, 166, 139, 182, 115, 203);
  vertex(100, 181);
  endShape();

  beginShape();
  vertex(166, 213);
  bezierVertex(149, 192, 167, 176, 187, 192);
  vertex(166, 213);
  endShape();
  pop();
}
