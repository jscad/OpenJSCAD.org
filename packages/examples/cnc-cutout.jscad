// title      : CNC Corner Cutout
// author     : Jeff Gay
// license    : MIT License
// revision   : 0.0.1
// tags       : 2d,cnc
// file       : cnc-cutout.jscad

function main () {
  var r1 = CAG.rectangle({center: [0, 0], radius: 4});
  var r2 = CAG.rectangle({center: [2, 0], radius: 2});
  var r3 = r1.subtract(r2);
  var cutterradius = 0.5;
  var r4 = r3.overCutInsideCorners(cutterradius);

  return [r3.translate([0, 10]), r4];
}
