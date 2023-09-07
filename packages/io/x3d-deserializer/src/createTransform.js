import { mat4, vec3 } from '@jscad/modeling'

export const createTransform = (center, rotation, scale, scaleOrientation, translation) => {
  const matrix = mat4.create()
  const temp = mat4.create()
  mat4.multiply(matrix, matrix, mat4.fromTranslation(temp, translation))
  mat4.multiply(matrix, matrix, mat4.fromTranslation(temp, center))
  mat4.multiply(matrix, matrix, mat4.fromRotation(temp, rotation[3], rotation))
  mat4.multiply(matrix, matrix, mat4.fromRotation(temp, scaleOrientation[3], scaleOrientation))
  mat4.multiply(matrix, matrix, mat4.fromScaling(temp, scale))
  mat4.multiply(matrix, matrix, mat4.fromRotation(temp, scaleOrientation[3], vec3.negate(vec3.create(), scaleOrientation)))
  mat4.multiply(matrix, matrix, mat4.fromTranslation(temp, vec3.negate(vec3.create(), center)))

  return matrix
}
