const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')

/**
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPoints.
 * @param {path} geometry - the geometry to transform
 * @returns {path} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.equals(geometry.transforms, mat4.identity())) return geometry

  geometry.points = geometry.points.map((point) => vec2.canonicalize(vec2.transform(geometry.transforms, point)))
  mat4.identity(geometry.transforms)
  return geometry
}

module.exports = applyTransforms
