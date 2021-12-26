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
  if (mat4.isIdentity(geometry.transforms)) return geometry

  const transforms = geometry.transforms
  geometry = Object.assign({}, geometry, { transforms: mat4.create() })

  // apply transforms to each side
  geometry.sides = geometry.sides.map((side) => {
    const p0 = vec2.transform(vec2.create(), side[0], transforms)
    const p1 = vec2.transform(vec2.create(), side[1], transforms)
    return [p0, p1]
  })
  Object.freeze(geometry)
  Object.freeze(geometry.sides)
  return geometry
}

module.exports = applyTransforms
