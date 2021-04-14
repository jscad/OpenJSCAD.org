const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toSides().
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} the given geometry
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.equals(geometry.transforms, mat4.identity())) return geometry

  // apply transforms to each side
  geometry.sides = geometry.sides.map((side) => {
    const p0 = vec2.transform(geometry.transforms, side[0])
    const p1 = vec2.transform(geometry.transforms, side[1])
    return [p0, p1]
  })
  mat4.identity(geometry.transforms)
  return geometry
}

module.exports = applyTransforms
