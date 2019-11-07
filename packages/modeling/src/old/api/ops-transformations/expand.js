const {isShape3} = require('../../core/utils/typeChecks')
const {expandedShellOfCAG, expandedShellOfCCSG} = require('./expandedShell')

const contract = function (shape, radius, resolution) {
  let result
  if (isShape3(shape)) {
    result = shape.subtract(expandedShellOfCCSG(shape, radius, resolution))
    result = result.reTesselated()
    result.properties = shape.properties // keep original properties
  } else {
    result = shape.subtract(expandedShellOfCAG(shape, radius, resolution))
  }
  return result
}

/** // FIXME: conflict between API & internal
 * expand/contract an object in 2D/3D space
 * @param {Object} shape a CSG/CAG objects to expand
 * @param {float} radius - the radius to expand by
 * @returns {CSG/CAG} new CSG/CAG object , expanded
 *
 * @example
 * let expandedShape = expand(sphere(), [0.2,15,1])
 */
const expand = function (shape, radius, resolution) {
  let result
  if (isShape3(shape)) {
    result = shape.union(expandedShellOfCCSG(shape, radius, resolution))
    result = result.reTesselated()
    result.properties = shape.properties // keep original properties
  } else {
    result = shape.union(expandedShellOfCAG(shape, radius, resolution))
  }
  return result
}

module.exports = expand
