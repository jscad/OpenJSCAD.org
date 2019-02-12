const clone = require('./clone')
const fromPointArray = require('./fromPointArray')
const mat4 = require('../../math/mat4')
const vec3 = require('../../math/vec3')

/**
 * A lazy transform of all of the points in the path.
 * @param {mat4} matrix - the matrix to transform with.
 * @param {path2} path - the path to transform.
 * @returns {path2} - the transformed path.
 * @example
 * transform(fromZRotation(degToRad(90)), path)
 */
const transform = (matrix, path) => {
  let cloned = clone(path)
  cloned.transforms = mat4.multiply(cloned.transforms, matrix)
  cloned.points = undefined
  cloned.isCanonicalized = false
  return cloned
}

module.exports = transform
