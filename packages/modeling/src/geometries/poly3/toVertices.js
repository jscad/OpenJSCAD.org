/**
 * Return the given polygon as a list of vertices.
 * NOTE: The returned array should not be modified as the vertices are shared with the geometry.
 * @param {Poly3} polygon - the polygon
 * @return {Array} list of vertices (3D)
 * @alias module:modeling/geometries/poly3.toVertices
 */
export const toVertices = (polygon) => polygon.vertices
