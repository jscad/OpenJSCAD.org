// title      : Expand
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: testing expand() function
// file       : expand.jscad

function main () {
  return union(
    expand(0.2, 8, difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))),

    difference(cube(2), translate([0.3, -0.3, 0.3], cube(2))).translate([-4, 0, 0]),

    expand(0.3, 8, cube(2)).translate([0, -3, 0]),

    cube(2).translate([-4, -3, 0]),

    expand(0.3, 4, cylinder({r: 1, h: 2, fn: 16})).translate([0, 4, 0]),

    cylinder({r: 1, h: 2}).translate([-4, 4, 0])
  ).scale(10);
}
