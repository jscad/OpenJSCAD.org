/* title      : Linear Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeLinear() function
// tags: extrusion, linear, extrudeLinear
*/

const { rectangle, circle, polygon } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { extrudeLinear } = require('@jscad/modeling').extrusions

const main = () => {
  return [
    scale(3, extrudeLinear({ height: 10 }, circle({ r: 1, fn: 5, center: true }))),
    scale(3, extrudeLinear({ height: 10, twist: 90 }, rectangle({ size: [1, 2], center: true }))
      .translate([0, 5, 0])),
    scale(3, extrudeLinear({ height: 10, twist: -500, slices: 50 }, translate([2, 0, 0], circle({ r: 1, fn: 8, center: true })))
      .translate([0, -6, 0])),
    scale(3, extrudeLinear({ height: 20, twist: -90, center: true }, polygon([[0, 0], [4, 1], [1, 1], [1, 4]]))
      .translate([0, -13, 0]))
  ]
}

module.exports = { main }
