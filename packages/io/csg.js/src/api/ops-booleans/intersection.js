const {isShape3} = require('../../core/utils/typeChecks')
const CSG = require('../../core/CSG')
const Tree = require('../../core/trees')

const canonicalize = require('../../core/utils/canonicalize')
const retesselate = require('../../core/utils/retesellate')
const {fromFakeCSG} = require('../../core/CAGFactories')
const {toCSGWall} = require('../../core/CAGToOther')
const toArray = require('../../core/utils/toArray')
const {flatten, areAllShapesTheSameType} = require('../../core/utils')

/** intersection of the given shapes: ie keep only the common parts between the given shapes
 * @param {Object(s)|Array} objects - objects to intersect
 * can be given
 * - one by one: intersection(a,b,c) or
 * - as an array: intersection([a,b,c])
 * @returns {CSG} new CSG object, the intersection of all input shapes
 *
 * @example
 * let intersectionOfSpherAndCube = intersection(sphere(), cube())
 */
function intersection (...inputs) {
  const shapes = flatten(toArray(inputs))
  const allIdenticalType = areAllShapesTheSameType(shapes)
  if (!allIdenticalType) {
    throw new Error('you cannot do intersections of 2d & 3d shapes, please extrude the 2d shapes or flatten the 3d shapes')
  }
  const is3d = isShape3(shapes[0])
  const intersectFn = is3d ? intersect3d : intersect2d
  return shapes.length > 1 ? intersectFn(shapes[0], shapes.slice(1)) : shapes[0]
}

  /**
   * Return a new CSG solid representing space in both this solid and
   * in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
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
const intersect3d = function (otherCsg, csg) {
  let csgs
  if (csg instanceof Array) {
    csgs = csg
  } else {
    csgs = [csg]
  }
  let result = otherCsg
  for (let i = 0; i < csgs.length; i++) {
    let islast = (i === (csgs.length - 1))
    result = intersectSub(result, csgs[i], islast, islast)
  }
  return result
}

const intersect2d = function (otherCag, cag) {
  let cags
  if (cag instanceof Array) {
    cags = cag
  } else {
    cags = [cag]
  }
  let r = toCSGWall(otherCag, -1, 1)
  cags.map(function (cag) {
    r = intersectSub(r, toCSGWall(cag, -1, 1), false, false)
  })
  r = retesselate(r)
  r = canonicalize(r)
  r = fromFakeCSG(r)
  r = canonicalize(r)
  return r
}

const intersectSub = function (ohterCsg, csg, doRetesselate, doCanonicalize) {
  let a = new Tree(ohterCsg.polygons)
  let b = new Tree(csg.polygons)
  a.invert()
  b.clipTo(a)
  b.invert()
  a.clipTo(b)
  b.clipTo(a)
  a.addPolygons(b.allPolygons())
  a.invert()
  let result = CSG.fromPolygons(a.allPolygons())
  result.properties = ohterCsg.properties._merge(csg.properties)
  if (doRetesselate) result = retesselate(result)
  if (doCanonicalize) result = canonicalize(result)
  return result
}

module.exports = intersection
// FIXME: sort of a hack for extrusionUtils => _toPlanePolygons
intersection.intersectSub = intersectSub
