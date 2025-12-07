import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

/*
 * Apply the transforms of the given geometry.
 *
 * NOTE: This function must be called BEFORE exposing any data. See toVertices.
 *
 * @param {Path3} geometry - the geometry to transform
 * @returns {Path3} the given geometry
 * @function
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
export const applyTransforms = (geometry) => {
  if (mat4.isIdentity(geometry.transforms)) return geometry

  geometry.vertices = geometry.vertices.map((vertex) => vec3.transform(vec3.create(), vertex, geometry.transforms))
  geometry.transforms = mat4.create()
  return geometry
}
