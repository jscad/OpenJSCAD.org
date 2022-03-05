const { cube, sphere, union } = require('../../core/index')

const aCoolPart = () => [
  cube({ name: 'c1' }),
  cube({ name: 's1' }),
  sphere({ name: 's2' })
]

const anotherCoolPart = () => union(cube({ name: 'c2' }), sphere({ name: 's3' }))

const wowPart = () => ({ type: 'part', children: [cube(), sphere()] })

const main = () => [
  cube({ name: 'c3' }),
  sphere({ name: 's4' }),
  aCoolPart(),
  anotherCoolPart(),
  wowPart()
]

module.exports = main
