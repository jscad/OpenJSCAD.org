// title      : Example 002
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example002.scad ported to OpenJSCAD.org
// file       : example002.jscad

function example002 () {
  return intersection(
    difference(
      union(
        cube({size: [30, 30, 30], center: true}),
        translate([0, 0, -25], cube({size: [15, 15, 50], center: true}))
      ),
      union(
        cube({size: [50, 10, 10], center: true}),
        cube({size: [10, 50, 10], center: true}),
        cube({size: [10, 10, 50], center: true})
      )
    ),
    translate([0, 0, 5], cylinder({h: 50, r1: 20, r2: 5, center: true})));
}

function main () {
  return example002();
}
