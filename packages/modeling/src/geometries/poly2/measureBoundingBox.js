import * as vec2 from '../../maths/vec2/index.js'

/**
 * @param {poly2} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (2D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly2.measureBoundingBox
 */
export const measureBoundingBox = (polygon) => {
  const vertices = polygon.vertices
  const numVertices = vertices.length
  const min = numVertices === 0 ? vec2.create() : vec2.clone(vertices[0])
  const max = vec2.clone(min)
  for (let i = 1; i < numVertices; i++) {
    vec2.min(min, min, vertices[i])
    vec2.max(max, max, vertices[i])
  }
  return [min, max]
}

export default measureBoundingBox
