const { cube, sphere } = require('@jscad/csg/api').primitives3d
const { union, difference, intersection } = require('@jscad/csg/api').booleanOps

function main () {
  return union(
    difference(
      cube({ size: 3, center: true }),
      sphere({ r: 2, center: true })
    ),
    intersection(
      sphere({ r: 1.3, center: true }),
      cube({ size: 2.1, center: true })
    )
  )
}

module.exports = main
