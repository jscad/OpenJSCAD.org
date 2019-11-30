const {EPS} = require('../constants')
const FuzzyCSGFactory = require('../FuzzyFactory3d')
// const {fromPolygons} = require('../CSGFactories')
// const {fromSides} = require('../CAGFactories')
const CSG = require('../CSG')

/**
   * Returns a cannoicalized version of the input csg/cag : ie every very close
   * points get deduplicated
   * @returns {CSG|CAG}
   * @example
   * let rawInput = someCSGORCAGMakingFunction()
   * let canonicalized= canonicalize(rawInput)
   */
const canonicalize = function (csgOrCAG, options) {
  if (csgOrCAG.isCanonicalized) {
    return csgOrCAG
  } else {
    if ('sides' in csgOrCAG) {
      return canonicalizeCAG(csgOrCAG, options)
    } else {
      return canonicalizeCSG(csgOrCAG, options)
    }
  }
}