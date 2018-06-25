const FuzzyCSGFactory = require('../FuzzyFactory3d')
const fromPolygons = require('./fromPolygons')

/**
   * Returns a cannoicalized version of the input csg : ie every very close
   * points get deduplicated
   * @returns {CSG}
   * @example
   * let rawCSG = someCSGMakingFunction()
   * let canonicalizedCSG = canonicalize(rawCSG)
   */
const canonicalizeCSG = function (csg, options) {
  if (csg.isCanonicalized) {
    return csg
  } else {
    const factory = new FuzzyCSGFactory()
    let result = CSGFromCSGFuzzyFactory(factory, csg)
    result.isCanonicalized = true
    result.isRetesselated = csg.isRetesselated
    result.properties = csg.properties // keep original properties
    return result
  }
}

const CSGFromCSGFuzzyFactory = function (factory, sourcecsg) {
  let _this = factory
  let newpolygons = []
  sourcecsg.polygons.forEach(function (polygon) {
    let newpolygon = _this.getPolygon(polygon)
          // see getPolygon above: we may get a polygon with no vertices, discard it:
    if (newpolygon.vertices.length >= 3) {
      newpolygons.push(newpolygon)
    }
  })
  return fromPolygons(newpolygons)
}

module.exports = canonicalizeCSG
