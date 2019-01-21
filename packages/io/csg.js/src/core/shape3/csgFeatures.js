const { toTriangles } = require('./CSGToOther')

/**
   * Returns an array of values for the requested features of this solid.
   * Supported Features: 'volume', 'area'
   * @param {String[]} features - list of features to calculate
   * @returns {Float[]} values
   * @example
   * let volume = A.getFeatures('volume')
   * let values = A.getFeatures('area','volume')
   */
const getFeatures = function (csg, features) {
  if (!(features instanceof Array)) {
    features = [features]
  }
  let result = toTriangles(csg).map(function (triPoly) {
    return triPoly.getTetraFeatures(features)
  })
    .reduce(function (pv, v) {
      return v.map(function (feat, i) {
        return feat + (pv === 0 ? 0 : pv[i])
      })
    }, 0)
  return (result.length === 1) ? result[0] : result
}

module.exports = getFeatures
