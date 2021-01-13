const {maths} = require('@jscad/modeling')

const createTransform = (center, rotation, scale, scaleOrientation, translation) => {
  // console.log('createTransform',center,rotation,scale,scaleOrientation,translation)
  const matrix = maths.mat4.create()
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(translation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(center))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(rotation[3], rotation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(scaleOrientation[3], scaleOrientation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromScaling(scale))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(-scaleOrientation[3], maths.vec3.negate(scaleOrientation)))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(maths.vec3.negate(center)))

  return matrix
}

module.exports = createTransform
