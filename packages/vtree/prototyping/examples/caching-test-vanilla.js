const { cube, sphere } = require('@jscad/csg/api').primitives3d
const { union } = require('@jscad/csg/api').booleanOps
const { translate } = require('@jscad/csg/api').transformations

const foo = () => [
  cube(),
  translate([13, 0, 0], cube()),
  sphere({ fn: 128 })
]

const main = () => [
  foo(),
  cube(),
  translate([13, 0, 0], cube()),
  translate([0, 0, 2], sphere()),
  union(cube(), sphere()),
  sphere({ fn: 128 })
]

module.exports = main
