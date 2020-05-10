const { cube, sphere, difference, intersection, union } = require('../../core/index')

function aCoolPart () {
  return [cube({ name: 'c1' }), cube({ name: 's1' }), sphere({ name: 's2' })]
}

function anotherCoolPart () {
  return union(cube({ name: 'c2' }), sphere({ name: 's3' }))
}

function wowPart () {
  return { type: 'part', children: [cube(), sphere()] }
}

function main () {
  return [cube({ name: 'c3' }), sphere({ name: 's4' }), aCoolPart(), anotherCoolPart(), wowPart()]
}

module.exports = main
