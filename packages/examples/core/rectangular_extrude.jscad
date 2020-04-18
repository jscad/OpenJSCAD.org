// title      : Rectangular Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeRectangular() function
// file       : extrudeRectangular.jscad

function main () {
  return [
    extrudeRectangular([[0, 0], [10, 0], [5, 10], [0, 10]], {closed: true}),
    extrudeRectangular([[0, 0], [10, 0], [5, 10], [0, 10]], {w: 1, h: 3, fn: 1, closed: false}).translate([0, 15, 0]),
  ]
}
