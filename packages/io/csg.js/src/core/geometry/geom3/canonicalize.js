const FuzzyFactory3d = require('../FuzzyFactory3d')
const fromPolygons = require('./fromPolygons')

/**
   * Returns a canonicalized version of the input geometry : ie every very close
   * points get deduplicated
   * @returns {Geom3}
   * @example
   * let rawGeometry = someGeometryMakingFunction()
   * let canonicalizedCSG = canonicalize(rawGeometry)
   */
const canonicalize = (geometry, options) => {
  if (geometry.isCanonicalized) {
    return geometry
  } else {
    const factory = new FuzzyFactory3d()
    let result = Geom3FromFuzzyFactory(factory, geometry)
    result.isCanonicalized = true
    result.isRetesselated = geometry.isRetesselated
    result.properties = geometry.properties // keep original properties
    return result
  }
}

const Geom3FromFuzzyFactory = (factory, sourcecsg) => {
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

module.exports = canonicalize
