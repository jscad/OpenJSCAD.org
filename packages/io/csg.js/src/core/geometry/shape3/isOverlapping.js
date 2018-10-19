const measureBounds = require('./measureBounds')
/** returns true if there is a possibility that the two solids overlap
   * returns false if we can be sure that they do not overlap
   * NOTE: this is critical as it is used in UNIONs
   * @param  {Shape3} shape
   */
const isOverlapping = (otherShape, shape) => {
  if ((otherShape.polygons.length === 0) || (shape.polygons.length === 0)) {
    return false
  } else {
    let mybounds = measureBounds(otherShape)
    let otherbounds = measureBounds(shape)
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
