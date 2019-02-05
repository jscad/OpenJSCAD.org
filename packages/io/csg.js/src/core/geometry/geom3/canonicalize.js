const FuzzyFactory3 = require('../fuzzyfactory/FuzzyFactory3')

const fromPolygons = require('./fromPolygons')

/**
 * Returns a canonicalized version of the input geometry : ie every very close
 * points get deduplicated
 * @returns {Geom3}
 * @example
 * let rawGeometry = someGeometryMakingFunction()
 * let canonicalizedGeom = canonicalize(rawGeometry)
 */
const canonicalize = (geometry) => {
  if (geometry.isCanonicalized) {
    return geometry
  }

  const factory = new FuzzyFactory3()

  const newpolygons = []
  geometry.polygons.forEach((polygon) => {
    const newpolygon = factory.getPolygon(polygon)

    // discard incomplete polygons
    if (newpolygon.vertices.length >= 3) {
      newpolygons.push(newpolygon)
    }
  })

  const result = fromPolygons(newpolygons)
  result.isCanonicalized = true
  result.isRetesselated = geometry.isRetesselated
  return result
}

module.exports = canonicalize
