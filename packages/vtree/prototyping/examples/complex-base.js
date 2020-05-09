const { cube, sphere } = require('@jscad/csg/api').primitives3d
const { union, difference, intersection } = require('@jscad/csg/api').booleanOps
const { translate, rotate, scale } = require('@jscad/csg/api').transformations

function aCoolPart () {
  return [
    cube({ name: 'c1' }),
    translate([13, 0, 0], cube({ name: 's1' })),
    translate([0, 0, 2], sphere({ name: 's2' }))
  ]
}

function anotherCoolPart () {
  return difference(
    cube({ name: 'c2', size: 1, center: true }),
    sphere({ name: 's3', r: 0.6, fn: 128 })
  )
}

function wowPart () {
  return { type: 'part', children: [cube(), sphere()] }
}

const flatten = arr =>
  arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  )

function main () {
  return flatten([
    translate([0, 5, 0], aCoolPart()),
    anotherCoolPart(),
    anotherCoolPart()
  ])
}

module.exports = main
