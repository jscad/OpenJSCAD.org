const measureBounds = require('./measureBounds')

/** returns true if there is a possibility that the two solids overlap
 * returns false if we can be sure that they do not overlap
 * NOTE: this is critical as it is used in UNIONs
 * @param {Geom3} otherGeometry
 * @param {Geom3} geometry
 * @returns {Boolean} are the given geometries overlapping
 */
const isOverlapping = (otherGeometry, geometry) => {
  if ((otherGeometry.polygons.length === 0) || (geometry.polygons.length === 0)) {
    return false
  } else {
    const mybounds = measureBounds(otherGeometry)
    const otherbounds = measureBounds(geometry)
    if (mybounds[1][0] < otherbounds[0][0]) return false
    if (mybounds[0][0] > otherbounds[1][0]) return false
    if (mybounds[1][1] < otherbounds[0][1]) return false
    if (mybounds[0][1] > otherbounds[1][1]) return false
    if (mybounds[1][2] < otherbounds[0][2]) return false
    if (mybounds[0][2] > otherbounds[1][2]) return false
    return true
  }
}

module.exports = isOverlapping
