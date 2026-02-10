/**
 * Simple Bezier Extrude
 * @category Creating Shapes
 * @skillLevel 5
 * @description Using a 1D bezier function to create a non-uniform extrusion
 * @tags curves, bezier, extrusion, slice
 * @authors Simon Clark
 * @licence MIT License
 */

import { mat4, extrudeFromSlices, slice, bezier } from '@jscad/modeling'

export const main = () => [
  extrudeWobble(30)
]

const extrudeWobble = (height) => {
  const squareSlice = slice.fromVertices([[10, 10], [-10, 10], [-10, -10], [10, -10]])

  const xCurve = bezier.create([1, 2, 0.4, 1])
  const yCurve = bezier.create([1, 2, 0.5])

  return extrudeFromSlices({
    numberOfSlices: 20,
    capStart: true,
    capEnd: true,
    callback: function (progress, count, base) {
      let newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, height * progress]), base)
      newslice = slice.transform(mat4.fromScaling(mat4.create(), [
        bezier.valueAt(progress, xCurve),
        bezier.valueAt(progress, yCurve),
        1
      ]), newslice)
      return newslice
    }
  }, squareSlice)
}
