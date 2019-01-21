const create = require('./create')
const mat4 = require('../math/mat4')
const geom2 = require('../geometry/geom2')

/** create a copy/clone of the input shape
 * @typedef  {import('./create').Shape2} Shape2
 * @param {Shape2} sourceShape the shape to clone
 * @returns {Shape2} the new clone
 */
const clone = (sourceShape) => {
  const newShape = create()
  newShape.geometry = sourceShape.geometry // geom2.clone(sourceShape.geometry)
  // not sure newShape.curves = fromCurves(sourceShape.curves)
  newShape.transforms = mat4.clone(sourceShape.transforms)
  newShape.isNegative = sourceShape.isNegative
  return newShape
}

module.exports = clone
