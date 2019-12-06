/* title      : extrudeFromSlices
// author     : Jeff Gay, Moissette Mark
// license    : MIT License
// description: testing extrudeRotate() function
// tags: extrusion, extrudeFromSlices, slices
*/

const { circle } = require('@jscad/modeling').primitives
const { geom2 } = require('@jscad/modeling').geometry
const { translate } = require('@jscad/modeling').transforms
const { extrudeFromSlices, slice } = require('@jscad/modeling').extrusions
const { mat4 } = require('@jscad/modeling').math

const main = () => {
  const base = circle({ radius: 4, segments: 4 })
  let geometry3 = extrudeFromSlices(
    {
      numberOfSlices: 5,
      callback: (progress, count, base) => {
        let newshape = circle({ radius: 5 + count, segments: 4 + count })
        let newslice = slice.fromSides(geom2.toSides(newshape))
        newslice = slice.transform(mat4.fromTranslation([0, 0, count * 10]), newslice)
        return newslice
      }
    }, base
  )

  let withHoles = geom2.create(
    [
      [[-10.0, 10.0], [-10.0, -10.0]],
      [[-10.0, -10.0], [10.0, -10.0]],
      [[10.0, -10.0], [10.0, 10.0]],
      [[10.0, 10.0], [-10.0, 10.0]],
      [[-5.0, -5.0], [-5.0, 5.0]],
      [[5.0, -5.0], [-5.0, -5.0]],
      [[5.0, 5.0], [5.0, -5.0]],
      [[-5.0, 5.0], [5.0, 5.0]]
    ]
  )

  return [

    extrudeFromSlices({ }, withHoles)
  ]
}

module.exports = { main }
