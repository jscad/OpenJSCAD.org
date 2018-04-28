// title      : Rectangular Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing rectangular_extrude() function
// file       : rectangular_extrude.jscad

function main () {
  return [
    // openscade like
    rectangular_extrude([[0, 0], [10, 0], [5, 10], [0, 10]], {closed: true}),
    rectangular_extrude([[0, 0], [10, 0], [5, 10], [0, 10]], {w: 1, h: 3, fn: 1, closed: false}).translate([0, 15, 0]),

    // object-oriented
    new CSG.Path2D([[10, 10], [-10, 10], [-20, 0], [-10, -10], [10, -10]], true).rectangularExtrude(1, 3, 10, true).translate([0, -15, 0])
  ];
}
