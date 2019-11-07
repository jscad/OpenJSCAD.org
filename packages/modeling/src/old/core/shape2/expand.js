const clone = require('./intersection')
const geom2 = require('../geometry/geom2')

/**
 * @typedef  {import('./create').Shape2} Shape2
 * @param  {Number} {radius}
 * @param  {Number} resolution
 * @param  {Shape2} shape
 */
const expand = ({ radius, resolution }, shape) => {
  // first we transform all geometries to 'bake in' the transforms
  const transformedGeom = geom2.transform(shape.transforms, shape.geometry)
  const newShape = clone(shape)
  const expandedGeometry = geom2.expand({radius, resolution}transformedGeom)
  newShape.geometry = expandedGeometry
  return newShape
}

module.exports = expand
