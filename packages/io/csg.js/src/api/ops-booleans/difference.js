const CSG = require('../../core/CSG')
const Tree = require('../../core/trees')

const canonicalize = require('../../core/utils/canonicalize')
const retesselate = require('../../core/utils/retesellate')

const {isShape3} = require('../../core/utils/typeChecks')

const {fromFakeCSG} = require('../../core/CAGFactories')
const {toCSGWall} = require('../../core/CAGToOther')
const toArray = require('../../core/utils/toArray')
const {flatten, areAllShapesTheSameType} = require('../../core/utils')

/** difference/ subtraction of the given shapes ie:
 * cut out C From B From A ie : a - b - c etc
 * @param {Object(s)|Array} objects - objects to subtract
 * can be given
 * - one by one: difference(a,b,c) or
 * - as an array: difference([a,b,c])
 * @returns {CSG} new CSG object, the difference of all input shapes
 *
 * @example
 * let differenceOfSpherAndCube = difference(sphere(), cube())
 */
function difference (...inputs) {
  const shapes = flatten(toArray(inputs))
  const allIdenticalType = areAllShapesTheSameType(shapes)
  if (!allIdenticalType) {
    throw new Error('you cannot do subtractions of 2d & 3d shapes, please extrude the 2d shapes or flatten the 3d shapes')
  }
  const is3d = isShape3(shapes[0])
  const subtractFn = is3d ? subtract3d : subtract2d
  return shapes.length > 1 ? subtractFn(shapes[0], shapes.slice(1)) : shapes[0]
}

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
const subtract3d = function (otherCsg, csg) {
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

const subtract2d = function (ohterCag, cag) {
  let cags
  if (cag instanceof Array) {
    cags = cag
  } else {
    cags = [cag]
  }
  let result = toCSGWall(ohterCag, -1, 1)
  cags.map(function (cag) {
    result = subtractSub(result, toCSGWall(cag, -1, 1), false, false)
  })
  result = retesselate(result)
  result = canonicalize(result)
  result = fromFakeCSG(result)
  result = canonicalize(result)
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
  let result = CSG.fromPolygons(a.allPolygons())
  result.properties = otherCsg.properties._merge(csg.properties)
  if (doRetesselate) result = retesselate(result)
  if (doCanonicalize) result = canonicalize(result)
  return result
}

module.exports = difference
