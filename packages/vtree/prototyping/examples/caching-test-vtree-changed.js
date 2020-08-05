const {
  cube, sphere,
  difference, intersection, union,
  scale, rotate, translate
} = require('../../core/index')

function foo () {
  return [
    cube(),
    translate([13, 0, 0], cube()),
    sphere({ fn: 128 })
  ]
}
function main () {
  return [
    foo(),
    cube(),
    translate([13, 0, 0], cube()),
    translate([0, 0, 2], sphere()),
    union(cube(), sphere()),
    translate([23, 0, 0], cube()),
    rotate([13, 0, 0], cube()),
    sphere({ fn: 128 })
  ]
}

module.exports = main
