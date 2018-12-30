// title      : transformations
// author     : Mark Moissette
// license    : MIT License
// description: all the different transforms operations

function main () {
  const testCube = cube()

  return [
    translate([0, 10, 0], testCube), // simple translation
    translate([10, 0, 0], rotate([10, 5, 0], testCube)), // translate + rotate
    translate([-10, 0, 0], scale([0.5, 0.5, 5], testCube)), // translate + scale
    transform([ // matrix transform
      cos(15), -sin(15), 0, 0,
      sin(15), cos(15), 0, 0,
      0, 0, 1, 1,
      0, 0, 0, 1
    ], testCube)
  ]
}
