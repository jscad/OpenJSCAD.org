// title      : Linear Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing linear_extrude() function
// file       : linear_extrude.jscad

function main () {
  return [
    scale(3, linear_extrude({height: 10}, circle({r: 1, fn: 5, center: true}))),
    scale(3, linear_extrude({height: 10, twist: 90}, square({size: [1, 2], center: true})).translate([0, 5, 0])),
    scale(3, linear_extrude({height: 10, twist: -500, slices: 50}, translate([2, 0, 0], circle({r: 1, fn: 8, center: true}))).translate([0, -6, 0])),
    scale(3, linear_extrude({height: 20, twist: -90, center: true}, polygon([[0, 0], [4, 1], [1, 1], [1, 4]])).translate([0, -13, 0]))
  ];
}
