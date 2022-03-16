const {
  cube, sphere,
  union,
  rotate, translate
} = require('../../core/index')

const foo = () => [
  cube(),
  translate([13, 0, 0], cube())
]

const main = () => [
  foo(),
  cube(),
  translate([13, 0, 0], cube()),
  translate([0, 0, 2], sphere()),
  union(cube(), sphere()),
  translate([23, 0, 0], cube()),
  rotate([13, 0, 0], cube())
]

module.exports = main
