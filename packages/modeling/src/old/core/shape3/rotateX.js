const transform = require('./transform')
const mat4 = require('../../math/mat4')

/** return a clone of the input shape, rotated along the X axis
 * the clone's geometry still points to the original's, but the transforms are changed
 * @param  {float} degrees the amount of rotation along the X axis, in degrees
 * @param  {Shape3} shape the original shape
 * @returns {Shape3} the rotated shape
 */
const rotateX = (deg, shape) => transform(mat4.fromXRotation(deg), shape)

module.exports = rotateX
