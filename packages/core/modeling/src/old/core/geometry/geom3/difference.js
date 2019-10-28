const Tree = require('../trees')

const flatten = require('../../utils/flatten')
const toArray = require('../../utils/toArray')

const fromPolygons = require('./fromPolygons')
const retessellate = require('./retessellate')
const canonicalize = require('./canonicalize')

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
const subtractSub = (otherGeom3, geometry, doRetesselate, doCanonicalize) => {
  const a = new Tree(otherGeom3.polygons)
  const b = new Tree(geometry.polygons)
  a.invert()
  a.clipTo(b)
  b.clipTo(a, true)
  a.addPolygons(b.allPolygons())
  a.invert()
  let result = fromPolygons(a.allPolygons())
  if (doCanonicalize) result = canonicalize(result)
  if (doRetesselate) result = retessellate(result)
  return result
}

const subtract = (...geometries) => {
  geometries = flatten(toArray(geometries))
  if (geometries.length === 0) throw new Error('difference requires one or more geometries')

  let result = geometries.shift()
  for (let i = 0; i < geometries.length; i++) {
    const islast = (i === (geometries.length - 1))
    result = subtractSub(result, geometries[i], islast, islast)
  }
  return result
}

subtract.subtractSub = subtractSub

module.exports = subtract
