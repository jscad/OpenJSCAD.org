const mat4 = require('../../math//mat4')
const geom2 = require('../geometry/geom2')

// FIXME: how about properties ?
/** check if two Shape2s are equal
 * @typedef  {import('./create').Shape2} Shape2
 * @param {Shape2} shape the first shape
 * @param {Shape2} otherShape the second shape
 * @returns {Boolean} are they equal
 */
const equals = (shape, otherShape) =>
  mat4.equals(shape.transforms, otherShape.transforms) &&
  geom2.equals(shape.geometry, otherShape.geometry)

module.exports = equals
