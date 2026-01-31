/**
 * Basic Extrude Functions
 * @category Creating Shapes
 * @skillLevel 5
 * @description Demonstrating the basic types of extrusions, and the variety of objects they can create.
 * @tags extrude, linear, extrudelinear, extruderectangular, extruderotate
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark
 * @licence MIT License
 */

import { line, polygon, star, extrudeLinear, extrudeRotate, translate, offset, TAU } from '@jscad/modeling'

export const main = () => {
  const shapes = []
  const aLine = line([[0, 0], [0, 5], [2, 8], [5, 9]])
  shapes.push(translate([-17, 0, 0], aLine))

  const anExpandedExtrude = extrudeLinear({ height: 1 }, offset({ delta: 1, corners: 'round', segments: 32 }, aLine))
  shapes.push(translate([-7, 0, 0], anExpandedExtrude))

  const poly = polygon({ points: [[-1, -1], [3, -1], [3.5, 2], [2, 1], [1, 2], [0, 1], [-1, 2]] })
  const extrudedPoly = extrudeLinear({ height: 5, twistAngle: TAU / 8, twistSteps: 10 }, poly)
  shapes.push(translate([-1, 0, 0], extrudedPoly))

  const starPoly = translate([3, 0, 0], star())
  const extrudedStar = extrudeRotate({ segments: 32, startAngle: 0, angle: (TAU / 2 * 0.75), overflow: 'cap' }, starPoly)
  shapes.push(translate([9, 0, 0], extrudedStar))

  return shapes
}
