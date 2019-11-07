/*
 * Return the given geometry as a list of points.
 * The returned array should not be modified as the points are shared with the geometry.
 * @return {Array[point, ...]} list of points, where each point contains an array of 3 numbers
 */
const toPoints = function (geometry) {
  return geometry.vertices
}

module.exports = toPoints
