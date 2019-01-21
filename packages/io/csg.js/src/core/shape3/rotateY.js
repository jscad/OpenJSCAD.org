
const transform = require('./transform')
const mat4 = require('../math/mat4')

/** return a clone of the input shape, rotated along the Y axis
 * the clone's geometry still points to the original's, but the transforms are changed
 * @param  {float} degrees the amount of rotation along the Y axis, in degrees
 * @param  {Shape3} shape the original shape
 * @returns {Shape3} the rotated shape
 */
const rotateY = (deg, shape) => transform(mat4.fromYRotation(deg), shape)

module.exports = rotateY
