/*
// title: Four to three (sides)
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()
*/

// TODO the code this demonstrates does not seem to exist any more.

const { geom2, geom3, line2, path2, poly3 } = require('@jscad/modeling').geometry
const { extrudeFromSlices } = require('@jscad/modeling').operations

const getParameterDefinitions = () => {
  return [
    { name: 'radius', caption: 'Radius:', type: 'float', default: 10 },
    { name: 'height', caption: 'Height:', type: 'float', default: 35 },
    { name: 'twist', caption: 'Twist:', type: 'int', default: 90 }
  ]
}

const main = (params) => {
  var thing = thingTwisted(params.radius, params.height, params.twist)
  return thing
}

function thingTwisted (radius, height, twistangle) {
  const resolution = 16
  twistangle = twistangle || 0

  var cag = geom2.fromPoints([
    [-radius, -radius, 0],
    [radius, -radius, 0],
    [radius, radius, 0]
  ]).expand(2, resolution)

  var flatBottom = poly3.fromPoints(
    cag.getOutlinePaths()[0].points
  )

  var thing = flatBottom.solidFromSlices({
    numslices: height,
	 callback: function (t) {
      var coef = 1 - t
      if (coef < 0.01) coef = 0.01// must not collapse polygon
      var h = height * t
      var cag = geom2.fromPoints([
        [-radius, -radius, h],
        [radius, -radius, h],
	 		[radius * coef, radius, h],
        [-radius * coef, radius, h]
      ]).expand(2, resolution)
        .rotate([0, 0, 0], [0, 0, 1], twistangle * t)

      return poly3.fromPoints(
        cag.getOutlinePaths()[0].points
      ).translate([0, 0, h])
    }
  })
  return thing
}

module.exports = { main, getParameterDefinitions }
