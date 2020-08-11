/* title      : Primitives
// authors     : Rene K. Mueller, Moissette Mark
// license    : MIT License
// description: testing primitives function
// tags: primitives, cube, sphere, cylinder, torus
*/

const { cube, sphere, cylinder, torus } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const allPrimitives = [
    cube(),
    cube({ size: [1, 2, 3] }),
    cube({ round: true }),
    cube({ size: [1, 2, 3], round: true }),
    sphere(),
    sphere({ segments: 8 }),
    cylinder({ radius: 1, height: 10 }),
    cylinder({ radius: 1, height: 10, round: true }),
    cylinder({ r1: 3, r2: 0, height: 10 }),
    cylinder({ start: [0, 0, 0], end: [3, 3, 10], radius: 1 }),
    torus({ ri: 0.5, ro: 2 }),
    torus({ ri: 0.1, ro: 2 })
  ]

  return allPrimitives.map((primitive, index) => {
    translate([(index % 4 - 2) * 6, Math.floor(index / 4 - 2) * 6, 0], primitive)
  })
}

module.exports = { main }
