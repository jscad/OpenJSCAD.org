// title      : Balloons
// author     : Z3 Dev
// license    : MIT License
// description: multiple balloons, testing new parameters
// file       : balloons.jscad

/*
// title       : 3D Primitives Demonstration
// author      : Rene K. Mueller, Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the basics of a variety of 3D primitives
// file        : primitives3D.js
// tags        : cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
*/

const jscad = require('@jscad/modeling')
const { line, polygon, star } = jscad.primitives
const { extrudeRectangular, extrudeLinear, extrudeRotate } = jscad.extrusions
const { translate } = jscad.transforms

function main () {
  const shapes = []
  const aLine = line([[0, 0], [0, 5], [2, 8], [5, 9]])
  shapes.push(translate([-20, 0, 0], aLine))

  const aRectangularExtrude = extrudeRectangular({ size: 1, height: 1 }, aLine)
  shapes.push(translate([-10, 0, 0], aRectangularExtrude))

  const poly = polygon({ points: [[-1, -1], [3, -1], [3.5, 2], [2, 1], [1, 2], [0, 1], [-1, 2]] })
  const extrudedPoly = extrudeLinear({ height: 5, twistAngle: Math.PI / 4, twistSteps: 10 }, poly)
  shapes.push(extrudedPoly)

  const starPoly = star()
  const extrudedStar = extrudeRotate({segments: 12, startAngle: 0, angle: (Math.PI * 0.75), overflow: 'cap'}, starPoly)
  shapes.push(extrudedStar)

  return shapes
}

module.exports = { main }
