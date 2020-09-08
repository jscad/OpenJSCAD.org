/* title      : Chain Hull
// author     : Rene K. Mueller, Moissette Mark
// license    : MIT License
// date       : 2013/04/18
// description: Whosa whatsis suggested "Chain Hull" as described at
//    https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
*/

const { sin, cos } = Math
const { circle } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { union } = require('@jscad/modeling').booleans
const { hullChain } = require('@jscad/modeling').hulls
const { extrudeLinear } = require('@jscad/modeling').extrusions

const main = () => {
  const shell = []
  const hexagon = []

  for (let i = 0; i < 12; i++) { // -- shell like
    const x = sin(i / 12 * 180) * 10
    const y = cos(i / 12 * 180) * 10
    shell.push(
      translate([x, y, 0], scale(6 - i / 2, circle())) // { center: true }
    )
  }

  const n = 6
  for (let i = 0; i < n; i++) { // -- hexagon chain hulled
    const x = sin(i / n * 360) * 10
    const y = cos(i / n * 360) * 10
    hexagon.push(
      translate([x, y, 0], circle())// { center: true }
    )
  }

  return [
    translate([-20, 0, 0],
      extrudeLinear({ height: 5 }, hullChain(shell))
    ),
    hullChain(shell),
    translate([20, 0, 0],
      union(shell)
    ),

    translate([-25, 40, 0],
      extrudeLinear({ height: 5 }, hullChain({ closed: true }, hexagon))
    ),
    translate([0, 40, 0],
      hullChain({ closed: true }, hexagon)
    ),
    translate([25, 40, 0],
      union(hexagon)
    )
  ]
}

module.exports = { main }
