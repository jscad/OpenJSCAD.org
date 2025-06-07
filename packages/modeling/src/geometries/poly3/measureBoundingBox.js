import * as vec3 from '../../maths/vec3/index.js'

/**
 * Measure the bounding box of the given polygon.
 *
 * @param {Poly3} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (3D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly3.measureBoundingBox
 */
export const measureBoundingBox = (polygon) => {
  const vertices = polygon.vertices
  const numVertices = vertices.length
  const min = numVertices === 0 ? vec3.create() : vec3.clone(vertices[0])
  const max = vec3.clone(min)
  for (let i = 1; i < numVertices; i++) {
    vec3.min(min, min, vertices[i])
    vec3.max(max, max, vertices[i])
  }
  return [min, max]
}
