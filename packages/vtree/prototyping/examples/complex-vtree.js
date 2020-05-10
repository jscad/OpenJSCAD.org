const {
  cube, sphere,
  difference, intersection, union,
  scale, rotate, translate
} = require('../../core/index')

function aCoolPart () {
  return [
    cube({ name: 'c1' }),
    translate([3, 0, 0], cube({ name: 's1' })),
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
    anotherCoolPart()
  ])
}

module.exports = main
