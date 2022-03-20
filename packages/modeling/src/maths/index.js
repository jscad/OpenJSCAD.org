/**
 * Maths are computational units for fundamental Euclidean geometry. All maths operate upon array data structures.
 * Note: Maths data structures are considered immutable, so never change the contents directly.
 * @see Most computations are based upon the glMatrix library (glmatrix.net)
 * @module modeling/maths
 * @example
 * const { constants, line2, mat4, vec2, vec3 } = require('@jscad/modeling').maths

 */
module.exports = {
  constants: require('./constants'),
  line2: require('./line2'),
  line3: require('./line3'),
  mat4: require('./mat4'),
  plane: require('./plane'),
  utils: require('./utils'),
  vec2: require('./vec2'),
  vec3: require('./vec3'),
  vec4: require('./vec4')
}
