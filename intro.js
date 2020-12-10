let hexSize = 50;

function introScene() {
  background(255);
  const t = millis() / 1000;

  // Hexagon params
  let dHex = "static";
  const minHexSize = 50;
  const maxHexSize = 100;

  // Stage timings
  const intro = {
    t0: 1.0, // Up thump starts
    t1: 1.1, // Up thump completes
    t2: 1.3, // Down thump starts
    t3: 1.4 // Down thump completes
  };

  // Set whether hexagon will shrink or grow via intro stage timings
  if (t < intro.t0) dHex = "static";
  else if (t < intro.t1) dHex = "grow";
  else if (t < intro.t2) dHex = "static";
  else if (t < intro.t3) dHex = "shrink";
  else if (t > intro.t3) dHex = "static";

  // Get the start and end time of the current stage
  const stageStartT = Math.max(...Object.values(intro).filter(v => t > v));
  const stageEndT = Math.min(
    ...Object.values(intro).filter(v => v > stageStartT)
  );

  // Time since the start of the current stage
  const stageT = t - stageStartT;

  // Percent completion of current stage time
  const stagePctT = stageT / (stageEndT - stageStartT);

  if (dHex == "grow") hexSize = lerp(minHexSize, maxHexSize, stagePctT);
  else if (dHex == "shrink") hexSize = lerp(maxHexSize, minHexSize, stagePctT);
  else if (dHex == "static");
  else console.error(`Invalid dHex type: ${dHex}`);

  fill(color(black));
  polygon(0, 0, hexSize, 6);
}
