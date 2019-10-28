const mat4 = require('../../math/mat4')
const clone = require('./clone')

/**
 * this only updates the transformation matrix, not the geometry/points !
 * that part is applied at a later stage to the points ie perhaps let webgl do its work ...
 * @param  {Mat4} matrix
 * @param  {Shape2} shape
 * @returns {Shape2} a new shape, with updated transformation matrix
 */
const transform = (matrix, shape) => {
  const newTransforms = mat4.multiply(shape.transforms, matrix)
  const newShape = clone(shape)
  newShape.transforms = newTransforms
  return newShape
}
module.exports = transform
