/**
 * Extrude Along a Bezier Path
 * @category Creating Shapes
 * @skillLevel 5
 * @description Using a 3D bezier path to create a solid tube
 * @tags curves, bezier, extrusion, slice
 * @authors Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { colors, geometries, maths, extrusions } = jscad

const { cuboid, circle } = jscad.primitives
const { translate } = jscad.transforms
const { slice } = jscad.extrusions
const { bezier } = jscad.curves

const main = () => [
  box4x4([-8, -4, 2], [1, 0, 0]),
  box4x4([8, 4, 12], [0, 1, 0]),
  tube([
    [6, 4, 12],
    [-3, 4, 12],
    [4, -4, 2],
    [-6, -4, 2]
  ]),
  tube([
    [8, 2, 12],
    [8, -6, 12],
    [8, 0, 0],
    [-8, 4, 2],
    [-8, -2, 2]
  ])
]

const tube = (bezierControlPoints) => {
  // Create the initial slice
  const circ = circle({ radius: 1, segments: 32 })
  const l = bezierControlPoints.length - 1
  const circPoints = geometries.geom2.toPoints(circ)
  let tubeSlice = slice.fromPoints(circPoints)

  // Rotate it close to the direction we are going in.  Rotation gets funky around 180˚
  const bezierDelta = maths.vec3.clone([
    bezierControlPoints[l][0] - bezierControlPoints[0][0],
    bezierControlPoints[l][1] - bezierControlPoints[0][1],
    bezierControlPoints[l][2] - bezierControlPoints[0][2]
  ])
  tubeSlice = slice.transform(rotationMatrixFromVectors(maths.vec3.clone([0, 0, 1]), bezierDelta), tubeSlice)

  // Create the bezier function
  const tubeCurve = bezier.create(bezierControlPoints)

  // ...and extrude.
  return extrusions.extrudeFromSlices({
    numberOfSlices: 60,
    capStart: true,
    capEnd: true,
    callback: function (progress, count, base) {
      const positionArray = bezier.valueAt(progress, tubeCurve)
      const tangentArray = bezier.tangentAt(progress, tubeCurve)
      const rotationMatrix = rotationMatrixFromVectors(bezierDelta, maths.vec3.clone(tangentArray))
      const translationMatrix = maths.mat4.fromTranslation(maths.mat4.create(), positionArray)
      return slice.transform(maths.mat4.multiply(translationMatrix, translationMatrix, rotationMatrix), base)
    }
  }, tubeSlice)
}

const rotationMatrixFromVectors = (srcVector, targetVector) => {
  // From https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
  srcVector = maths.vec3.normalize(maths.vec3.create(), srcVector)
  targetVector = maths.vec3.normalize(maths.vec3.create(), targetVector)

  const axis = maths.vec3.cross(maths.vec3.create(), targetVector, srcVector)
  const cosA = maths.vec3.dot(targetVector, srcVector)
  const k = 1 / (1 + cosA)

  return maths.mat4.fromValues(
    (axis[0] * axis[0] * k) + cosA, (axis[1] * axis[0] * k) - axis[2], (axis[2] * axis[0] * k) + axis[1], 0,
    (axis[0] * axis[1] * k) + axis[2], (axis[1] * axis[1] * k) + cosA, (axis[2] * axis[1] * k) - axis[0], 0,
    (axis[0] * axis[2] * k) - axis[1], (axis[1] * axis[2] * k) + axis[0], (axis[2] * axis[2] * k) + cosA, 0,
    0, 0, 0, 1
  )
}

const box4x4 = (translation, color) => {
  const b = cuboid({ size: [4, 4, 4] })
  return colors.colorize(color, translate(translation, b))
}

module.exports = { main }
