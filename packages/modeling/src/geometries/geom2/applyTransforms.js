const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

/*
 * Apply the transforms of the given geometry and return the sides.
 * @param {geom2} geometry - the geometry to transform
 * @returns {array} sides of the given geometry after transforms are applied
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.isIdentity(geometry.transforms)) return geometry

  const newGeometry = Object.assign({}, geometry)
  const transforms = geometry.transforms
  // apply transforms to each side
  newGeometry.sides = geometry.sides.map((side) => {
    const p0 = vec2.transform(vec2.create(), side[0], transforms)
    const p1 = vec2.transform(vec2.create(), side[1], transforms)
    return [p0, p1]
  })
  newGeometry.transforms = mat4.identity(mat4.create())
  return newGeometry
}

module.exports = applyTransforms
