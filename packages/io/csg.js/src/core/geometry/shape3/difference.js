const fromPolygons = require('./fromPolygons')
const retesselate = require('./retesellate')
const canonicalize = require('./canonicalize')
/**
   * Return a new CSG solid representing space in this solid but
   * not in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
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
const subtract = function (otherCsg, csg) {
  let csgs
  if (csg instanceof Array) {
    csgs = csg
  } else {
    csgs = [csg]
  }
  let result = otherCsg
  for (let i = 0; i < csgs.length; i++) {
    let islast = (i === (csgs.length - 1))
    result = subtractSub(result, csgs[i], islast, islast)
  }
  return result
}

const subtractSub = function (otherCsg, csg, doRetesselate, doCanonicalize) {
  let a = new Tree(otherCsg.polygons)
  let b = new Tree(csg.polygons)
  a.invert()
  a.clipTo(b)
  b.clipTo(a, true)
  a.addPolygons(b.allPolygons())
  a.invert()
  let result = fromPolygons(a.allPolygons())
  // FIXME: what to do with properties ????
  // result.properties = otherCsg.properties._merge(csg.properties)
  if (doRetesselate) result = retesselate(result)
  if (doCanonicalize) result = canonicalize(result)
  return result
}

module.exports = subtract
