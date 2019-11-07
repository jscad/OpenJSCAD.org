/**
 * @param {Array[]} vertices - list of vertices
 * @param {plane} [plane] - plane of the polygon
 */
const fromPointsAndPlane = (vertices, plane) => {
  return { vertices: vertices, plane: plane }
}

module.exports = fromPointsAndPlane
