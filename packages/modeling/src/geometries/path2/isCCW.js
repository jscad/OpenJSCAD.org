/**
 * Determin if the given path is CCW
 * @param {path2} path - the geometry to check
 * @returns {Boolean} true if the path is CCW
 * @alias module:modeling/geometries/path2.isCCW
 */
const isCCW = (geometry) => {
  let area = 0; let j
  const points = geometry.points
  const length = points.length
  points.forEach((v, i) => {
    j = (i + 1) % length
    area += v[0] * points[j][1]
    area -= points[j][0] * v[1]
  })

  return area >= 0
}

module.exports = isCCW
