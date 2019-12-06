/* title      : Rotate Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeRotate() function
// tags: extrusion, rotate, extrudeRotate
*/

const { rectangle, circle, polygon } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms
const { extrudeRotate } = require('@jscad/modeling').extrusions

const main = () => {
  return [
    extrudeRotate(translate([4, 0, 0], circle({ r: 1, segments: 30, center: true }))),
    extrudeRotate({ segments: 5 },
      translate([4, 0, 0], circle({ r: 1, segments: 30, center: true }))).translate([0, 10, 0]),
    extrudeRotate({ segments: 30 },
      translate([4, 0, 0], circle({ r: 1, segments: 5, center: true }))).translate([0, 20, 0]),

    extrudeRotate({ segments: 4 }, translate([4, 0, 0], rectangle({ size: [1, 1], center: true })))
      .translate([-10, 0, 0]),
    extrudeRotate({ segments: 4 }, rectangle({ size: [1, 3], center: true }).translate([4, 0, 0]))
      .translate([-20, 0, 0]),
    extrudeRotate({ segments: 3 }, rectangle({ size: [2, 0.5], center: true }).translate([4, 0, 0]))
      .translate([-20, 10, 0]),
    extrudeRotate({ segments: 5 }, rectangle({ size: [1, 1], center: true }).translate([4, 0, 0]))
      .translate([-20, 20, 0]),

    extrudeRotate(polygon({ points: [[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]] }))
      .translate([10, 0, 0]),
    extrudeRotate({ segments: 4 }, polygon({ points: [[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]] }))
      .translate([18, 0, 0])
  ]
}

module.exports = { main }
