/**
 * Maths are computational units for fundamental Euclidean geometry. All maths operate upon array data structures.
 * Note: Maths data structures are considered immutable, so never change the contents directly.
 * @see Most computations are based upon the glMatrix library (glmatrix.net)
 * @module modeling/maths
 * @example
 * import { constants, line2, line3, mat4, plane, utils, vec2, vec3, vec4 } from '@jscad/modeling'
 */
export * from './constants.js'
export * as line2 from './line2/index.js'
export * as line3 from './line3/index.js'
export * as mat4 from './mat4/index.js'
export * as plane from './plane/index.js'
export * as vec2 from './vec2/index.js'
export * as vec3 from './vec3/index.js'
export * as vec4 from './vec4/index.js'
export { cos, sin } from './utils/trigonometry.js'
export { area } from './utils/area.js'
