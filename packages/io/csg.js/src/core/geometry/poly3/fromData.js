/**
 * @param {Array[]} vertices - list of vertices
 * @param {plane} [plane] - plane of the polygon
 */
const fromData = (vertices, plane) => {
  return { vertices: vertices, plane: plane }
}

module.exports = fromData
