/**
 * Maths are computational units for fundamental Euclidean geometry. All maths operate upon array data structures.
 * Note: Maths data structures are considered immutable, so never change the contents directly.
 * @see Most computations are based upon the glMatrix library (glmatrix.net)
 * @module modeling/maths
 * @example
 * const { constants, line2, mat4, vec2, vec3 } = require('@jscad/modeling').maths
 */
import * as constants from './constants.js'
import * as line2 from './line2/index.js'
import * as line3 from './line3/index.js'
import * as mat4 from './mat4/index.js'
import * as plane from './plane/index.js'
import * as utils from './utils/index.js'
import * as vec2 from './vec2/index.js'
import * as vec3 from './vec3/index.js'
import * as vec4 from './vec4/index.js'

export {
  constants,
  line2,
  line3,
  mat4,
  plane,
  utils,
  vec2,
  vec3,
  vec4
}
