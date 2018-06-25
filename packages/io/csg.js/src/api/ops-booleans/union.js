const CSG = require('../../core/CSG')
const Tree = require('../../core/trees')

const canonicalize = require('../../core/utils/canonicalize')
const retesselate = require('../../core/utils/retesellate')
const {bounds} = require('../../core/utils/csgMeasurements')

const {fromFakeCSG} = require('../../core/CAGFactories')
const {toCSGWall} = require('../../core/CAGToOther')
const {isShape3} = require('../../core/utils/typeChecks')

const toArray = require('../../core/utils/toArray')
const {flatten, areAllShapesTheSameType} = require('../../core/utils')

// FIXME should this be lazy ? in which case, how do we deal with 2D/3D combined
// TODO we should have an option to set behaviour as first parameter
/** union/ combine the given shapes
 * @param {Object(s)|Array} objects - objects to combine : can be given
 * - one by one: union(a,b,c) or
 * - as an array: union([a,b,c])
 * @returns {CSG} new CSG object, the union of all input shapes
 *
 * @example
 * let unionOfSpherAndCube = union(sphere(), cube())
 */
/**
   * Return a new CSG solid representing the space in either this solid or
   * in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
   * @example
   * let C = union(A, B)
   * @example
   * +-------+            +-------+
   * |       |            |       |
   * |   A   |            |       |
   * |    +--+----+   =   |       +----+
   * +----+--+    |       +----+       |
   *      |   B   |            |       |
   *      |       |            |       |
   *      +-------+            +-------+
*/
function union (...inputs) {
  const shapes = flatten(toArray(inputs))
  const allIdenticalType = areAllShapesTheSameType(shapes)
  if (!allIdenticalType) {
    throw new Error('you cannot do unions of 2d & 3d shapes, please extrude the 2d shapes or flatten the 3d shapes')
  }
  const is3d = isShape3(shapes[0])
  const unionFn = is3d ? union3d : union2d
  return shapes.length > 1 ? unionFn(shapes) : shapes[0]
}

const union3d = function (solids) {
  let csgs = solids
  let i
  // combine csg pairs in a way that forms a balanced binary tree pattern
  for (i = 1; i < csgs.length; i += 2) {
    csgs.push(unionSub(csgs[i - 1], csgs[i]))
  }
  return canonicalize(retesselate(csgs[i - 1]))
}

// FIXME: double check this algorithm
const union2d = function (solids) {
  let cags = solids
  let i
  cags[0] = retesselate(toCSGWall(cags[0], -1, 1))
  // combine csg pairs in a way that forms a balanced binary tree pattern
  for (i = 1; i < cags.length; i += 2) {
    const current = retesselate(toCSGWall(cags[i], -1, 1))
    const previous = cags[i - 1]
    cags.push(unionSub(previous, current, false, false))
  }
  return canonicalize(fromFakeCSG(cags[i - 1]))
}

const unionSub = function (otherCsg, csg, doRetesselate, doCanonicalize) {
  if (!mayOverlap(otherCsg, csg)) {
    return unionForNonIntersecting(otherCsg, csg)
  } else {
    let a = new Tree(otherCsg.polygons)
    let b = new Tree(csg.polygons)
    a.clipTo(b, false)

          // b.clipTo(a, true); // ERROR: this doesn't work
    b.clipTo(a)
    b.invert()
    b.clipTo(a)
    b.invert()

    let newpolygons = a.allPolygons().concat(b.allPolygons())
    let result = CSG.fromPolygons(newpolygons)
    result.properties = otherCsg.properties._merge(csg.properties)
    if (doRetesselate) result = retesselate(result)
    if (doCanonicalize) result = canonicalize(result)
    return result
  }
}

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = function (otherCsg, csg) {
  let newpolygons = otherCsg.polygons.concat(csg.polygons)
  let result = CSG.fromPolygons(newpolygons)
  result.properties = otherCsg.properties._merge(csg.properties)
  result.isCanonicalized = otherCsg.isCanonicalized && csg.isCanonicalized
  result.isRetesselated = otherCsg.isRetesselated && csg.isRetesselated
  return result
}

  /** returns true if there is a possibility that the two solids overlap
   * returns false if we can be sure that they do not overlap
   * NOTE: this is critical as it is used in UNIONs
   * @param  {CSG} csg
   */
const mayOverlap = function (otherCsg, csg) {
  if ((otherCsg.polygons.length === 0) || (csg.polygons.length === 0)) {
    return false
  } else {
    let mybounds = bounds(otherCsg)
    let otherbounds = bounds(csg)
    if (mybounds[1].x < otherbounds[0].x) return false
    if (mybounds[0].x > otherbounds[1].x) return false
    if (mybounds[1].y < otherbounds[0].y) return false
    if (mybounds[0].y > otherbounds[1].y) return false
    if (mybounds[1].z < otherbounds[0].z) return false
    if (mybounds[0].z > otherbounds[1].z) return false
    return true
  }
}

union.unionSub = unionSub
module.exports = union
