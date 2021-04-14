const { cube, sphere } = require('@jscad/csg/api').primitives3d
const { union, difference, intersection } = require('@jscad/csg/api').booleanOps
const { translate, rotate, scale } = require('@jscad/csg/api').transformations

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
    sphere({ fn: 128 })
  ]
}

module.exports = main
