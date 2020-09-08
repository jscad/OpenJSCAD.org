// title: Slices (single screw evolution)
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()
const { poly3 } = require('@jscad/modeling').geometry
const { extrudeFromSlices } = require('@jscad/modeling').operations

const main = (params) => {
  const radius = 20
  const angle = 5

  const hex = poly3.fromPoints([
    [radius, 0, 0],
    [radius + 3, 0, 3],
    [radius, 0, 6]
  ])

  /* return hex.solidFromSlices({
    numslices: 420 / angle,
    callback: function (t, slice) {
      return this.translate([0, 0, t * 8]).rotate(
        [0, 0, 0], // center
        [0, 0, 10], // direction
        angle * slice
      )
    }
  }) */

  return extrudeFromSlices(
    {
      numberOfSlices: 420 / angle,
      callback: (progress, count, slice) => {
		return translate([0, 0, t * 8], rotate(
			[0, 0, 10 * angle * slice]
		  ))
        // let newshape = circle({ radius: 5 + count, segments: 4 + count })
        let newslice = slice.fromSides(geom2.toSides(newshape))
        return newslice
      }
    }, hex
  )
}
module.exports = { main }
