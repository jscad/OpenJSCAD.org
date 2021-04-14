const {
  cube, sphere,
  difference, intersection, union,
  scale, rotate, translate
} = require('../../core/index')

function main () {
  return [
    translate([0, 5, 0], cube({ size: 10 })),
    scale([1, 2, 1], rotate([0, 10, 0], cube({ size: 10 }))),
    cube({ size: 10 })
  ]
}

module.exports = main
