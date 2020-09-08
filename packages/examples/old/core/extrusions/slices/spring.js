/*
// title: Spring
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()
// tags: extrusion, slices, spring
*/

const { geom2, geom3, line2, path2, poly3 } = require('@jscad/modeling').geometry

const main = (params) => {
  const sqrt3 = Math.sqrt(3) / 2
  const radius = 2
  const angle = 10
  // generate slice every 10 deg
  const springRadius = 10
  const loops = 5

  const hex = poly3.createFromPoints([
    [radius, 0, 0],
    [radius / 2, radius * sqrt3, 0],
    [-radius / 2, radius * sqrt3, 0],
    [-radius, 0, 0],
    [-radius / 2, -radius * sqrt3, 0],
    [radius / 2, -radius * sqrt3, 0]
  ])

  var loopGap = radius * 2 * sqrt3 + 2// spring thick and gap
  return hex.solidFromSlices({
    numslices: 360 * loops / angle,
    callback: function (t, slice) {
      return this.translate([loopGap * loops * t, 0, 0]).rotate(
        [0, springRadius, 0],
        [-1, 0, 0],
        angle * slice
      )
    }
  })
}

module.exports = { main }
