const applyTransforms = require('./applyTransforms')

/**
 * Produces a new array containing the path's point data.
 * The returned array should not be modified as the data is shared with the geometry.
 * @param {path2} geometry - the path
 * @returns {Array} an array of points, each point contains an array of two numbers
 * @example
 * let sharedpoints = toPoints(path)
 */
const toPoints = (geometry) => {
  return applyTransforms(geometry).points
}

module.exports = toPoints
