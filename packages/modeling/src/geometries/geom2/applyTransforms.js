import * as mat4 from '../../maths/mat4/index.js'
import * as vec2 from '../../maths/vec2/index.js'

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toOutlines().
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} the given geometry
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
export const applyTransforms = (geometry) => {
  if (mat4.isIdentity(geometry.transforms)) return geometry

  // apply transforms to each side
  geometry.outlines = geometry.outlines.map((outline) => outline.map((point) => vec2.transform(vec2.create(), point, geometry.transforms)))
  geometry.transforms = mat4.create()
  return geometry
}
