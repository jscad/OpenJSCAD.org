
/**
 * create a line (segment) from 2 points
 * @param {Array} controlPoints the control points as an array ie [[0, 1], [10, -27.2]]
 * @returns {Line2} the resulting line
 */
const fromPoints = (controlPoints) => {
  return {
    type: 'line2',
    controlPoints
  }
}
module.exports = fromPoints
