const fromPolygons = require('./fromPolygons')
const retesselate = require('./retessellate')
const canonicalize = require('./canonicalize')

const Tree = require('../trees')

/**
   * Return a new Geom3 solid representing space in both this solid and
   * in the given solids.
   * Immutable: Neither this solid nor the given solids are modified.
   * @param {Geom3[]} geometry - list of Geom3 objects
   * @returns {Geom3} new Geom3 object
   * @example
   * let C = A.intersect(B)
   * @example
   * +-------+
   * |       |
   * |   A   |
   * |    +--+----+   =   +--+
   * +----+--+    |       +--+
   *      |   B   |
   *      |       |
   *      +-------+
   */
const intersect = (otherGeom3, ...geometries)  => {
  let result = otherGeom3
  for (let i = 0; i < geometries.length; i++) {
    let islast = (i === (geometries.length - 1))
    result = intersectSub(result, geometries[i], islast, islast)
  }
  return result
}

const intersectSub = (ohterCsg, geometry, doRetesselate, doCanonicalize) => {
  let a = new Tree(ohterCsg.polygons)
  let b = new Tree(geometry.polygons)
  a.invert()
  b.clipTo(a)
  b.invert()
  a.clipTo(b)
  b.clipTo(a)
  a.addPolygons(b.allPolygons())
  a.invert()
  let result = fromPolygons(a.allPolygons())
  if (doRetesselate) result = retesselate(result)
  if (doCanonicalize) result = canonicalize(result)
  return result
}

intersect.intersectSub = intersectSub
module.exports = intersect
