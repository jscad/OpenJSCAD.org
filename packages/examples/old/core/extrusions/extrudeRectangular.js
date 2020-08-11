/* title      : Rectangular Extrude
// authors     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeRectangular() function
// tags: extrusion, rectangular, extrudeRectangular
*/

const { rectangle, circle, polygon } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms
const { extrudeRectangular } = require('@jscad/modeling').extrusions

const main = () => {
  return [
    extrudeRectangular([[0, 0], [10, 0], [5, 10], [0, 10]], { corners: 'chamfer' }),
    translate([0, 15, 0],
      extrudeRectangular([[0, 0], [10, 0], [5, 10], [0, 10]], { segments: 8, corners: 'round' })
    )
  ]
}

module.exports = { main }
