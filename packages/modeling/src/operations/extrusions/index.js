/**
 * All 2D shapes (primitives or the results of operations) can be extruded in various ways.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/extrusions
 * @example
 * const { extrudeHelical, extrudeLinear, extrudeRectangular, extrudeRotate, project, slice } = require('@jscad/modeling').extrusions
 */
module.exports = {
  extrudeFromSlices: require('./extrudeFromSlices'),
  extrudeLinear: require('./extrudeLinear'),
  extrudeRectangular: require('./extrudeRectangular'),
  extrudeRotate: require('./extrudeRotate'),
  extrudeHelical: require('./extrudeHelical'),
  project: require('./project'),
  slice: require('./slice')
}
