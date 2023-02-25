/**
 * All 2D shapes (primitives or the results of operations) can be extruded in various ways.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/extrusions
 * @example
 * import { extrusions } from '@jscad/modeling'
 * const { extrudeFromSlices, extrudeLinear, extrudeRectangular, extrudeRotate, project } = extrusions
 */
export { extrudeFromSlices } from './extrudeFromSlices.js'
export { extrudeLinear } from './extrudeLinear.js'
export { extrudeRectangular } from './extrudeRectangular.js'
export { extrudeRotate } from './extrudeRotate.js'
export { project } from './project.js'
