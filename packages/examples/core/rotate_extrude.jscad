// title      : Rotate Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeRotate() function
// file       : extrudeRotate.jscad

function main () {
  return [
    // openscad-like
    extrudeRotate(translate([4, 0, 0], circle({r: 1, fn: 30, center: true}))),
    extrudeRotate({fn: 5},
      translate([4, 0, 0], circle({r: 1, fn: 30, center: true}))).translate([0, 10, 0]),
    extrudeRotate({fn: 30},
      translate([4, 0, 0], circle({r: 1, fn: 5, center: true}))).translate([0, 20, 0]),

    // openjscad-openscad mixed
    extrudeRotate({fn: 4}, square({size: [1, 1], center: true}).translate([4, 0, 0])).translate([-10, 0, 0]),
    extrudeRotate({fn: 4}, square({size: [1, 3], center: true}).translate([4, 0, 0])).translate([-20, 0, 0]),
    extrudeRotate({fn: 3}, square({size: [2, 0.5], center: true}).translate([4, 0, 0])).translate([-20, 10, 0]),
    extrudeRotate({fn: 5}, square({size: [1, 1], center: true}).translate([4, 0, 0])).translate([-20, 20, 0]),

    extrudeRotate(polygon({points: [[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]]})).translate([10, 0, 0]),
    extrudeRotate({fn: 4}, polygon({points: [[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]]})).translate([18, 0, 0])
  ];
}
