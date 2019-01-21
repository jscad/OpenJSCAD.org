const fromPolygons = require('./fromPolygons')
const retesselate = require('./retesellate')
const canonicalize = require('./canonicalize')
const Tree = require('../trees')

/**
   * Return a new geom3 representing space in this solid but
   * not in the given solids. Neither this solid nor the given solids are modified.
   * @param {geom3[]} csg - list of geom3 objects
   * @returns {geom3} new geom3 object
   * @example
   * let C = A.subtract(B)
   * @example
   * +-------+            +-------+
   * |       |            |       |
   * |   A   |            |       |
   * |    +--+----+   =   |    +--+
   * +----+--+    |       +----+
   *      |   B   |
   *      |       |
   *      +-------+
   */
const subtract = (otherGeom3, geometry) => {
  let geometries
  if (geometry instanceof Array) {
    geometries = geometry
  } else {
    geometries = [geometry]
  }
  let result = otherGeom3
  for (let i = 0; i < geometries.length; i++) {
    let islast = (i === (geometries.length - 1))
    result = subtractSub(result, geometries[i], islast, islast)
  }
  return result
}

const subtractSub = (otherGeom3, geometry, doRetesselate, doCanonicalize) => {
  let a = new Tree(otherGeom3.polygons)
  let b = new Tree(geometry.polygons)
  a.invert()
  a.clipTo(b)
  b.clipTo(a, true)
  a.addPolygons(b.allPolygons())
  a.invert()
  let result = fromPolygons(a.allPolygons())
  if (doRetesselate) result = retesselate(result)
  if (doCanonicalize) result = canonicalize(result)
  return result
}

subtract.subtractSub = subtractSub
module.exports = subtract
