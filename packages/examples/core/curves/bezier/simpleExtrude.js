/**
 * Simple Bezier Extrude
 * @category Creating Shapes
 * @skillLevel 5
 * @description Using a 1D bezier function to create a non-uniform extrusion
 * @tags curves, bezier, extrusion, slice
 * @authors Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { maths, extrusions } = jscad
const { bezier } = jscad.curves
const { slice } = extrusions

const main = () => [
  extrudeWobble(30)
]

const extrudeWobble = (height) => {
  const squareSlice = slice.fromPoints([[10, 10], [-10, 10], [-10, -10], [10, -10]])

  const xCurve = bezier.create([1, 2, 0.4, 1])
  const yCurve = bezier.create([1, 2, 0.5])

  return extrusions.extrudeFromSlices({
    numberOfSlices: 20,
    capStart: true,
    capEnd: true,
    callback: function (progress, count, base) {
      let newslice = slice.transform(maths.mat4.fromTranslation(maths.mat4.create(), [0, 0, height * progress]), base)
      newslice = slice.transform(maths.mat4.fromScaling(maths.mat4.create(), [
        bezier.valueAt(progress, xCurve),
        bezier.valueAt(progress, yCurve),
        1
      ]), newslice)
      return newslice
    }
  }, squareSlice)
}

module.exports = { main }
