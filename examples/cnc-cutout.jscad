function main() {
  var r1 = CAG.rectangle({center:[0,0], radius: 4});
  var r2 = CAG.rectangle({center:[2,0], radius: 2});
  var r3 = r1.subtract(r2);
  var cutterradius = 1;
  var r4 = r3.overCutInsideCorners(cutterradius);

  return r4;
}
