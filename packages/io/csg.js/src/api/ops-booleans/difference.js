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

module.exports = difference
