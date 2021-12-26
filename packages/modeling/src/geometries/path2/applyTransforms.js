const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPoints.
 * @param {path} geometry - the geometry to transform
 * @returns {path} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.isIdentity(geometry.transforms)) return geometry

  const transforms = geometry.transforms
  geometry = Object.assign({}, geometry, { transforms: mat4.create() })

  geometry.points = geometry.points.map((point) => vec2.transform(vec2.create(), point, transforms))

  return geometry
}

module.exports = applyTransforms
