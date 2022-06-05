const { maths } = require('@jscad/modeling')

const createTransform = (center, rotation, scale, scaleOrientation, translation) => {
  const matrix = maths.mat4.create()
  const temp = maths.mat4.create()
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(temp, translation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(temp, center))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(temp, rotation[3], rotation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(temp, scaleOrientation[3], scaleOrientation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromScaling(temp, scale))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(temp, scaleOrientation[3], maths.vec3.negate(maths.vec3.create(), scaleOrientation)))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(temp, maths.vec3.negate(maths.vec3.create(), center)))

  return matrix
}

module.exports = createTransform
