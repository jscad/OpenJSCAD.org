const {EPS} = require('../constants')
const FuzzyCSGFactory = require('../FuzzyFactory3d')
const FuzzyCAGFactory = require('../FuzzyFactory2d')
const {fromPolygons} = require('../CSGFactories')
const {fromSides} = require('../CAGFactories')

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

const canonicalizeCAG = function (cag, options) {
  if (cag.isCanonicalized) {
    return cag
  } else {
    let factory = new FuzzyCAGFactory()
    let result = CAGFromCAGFuzzyFactory(factory, cag)
    result.isCanonicalized = true
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

const CAGFromCAGFuzzyFactory = function (factory, sourcecag) {
  let _this = factory
  let newsides = sourcecag.sides.map(function (side) {
    return _this.getSide(side)
  })
  // remove bad sides (mostly a user input issue)
  .filter(function (side) {
    return side.length() > EPS
  })
  return fromSides(newsides)
}

module.exports = canonicalize
