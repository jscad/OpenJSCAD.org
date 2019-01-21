const transform = require('./transform')
const mat4 = require('../math/mat4')

/** return a clone of the input shape, translated by the given Vec3
 * the clone's geometry still points to the original's, but the transforms are changed
 * @param  {Vec3} scaleVector the Vec3 to translate the input shape by, along x,y,z
 * @param  {Shape3} shape the original shape
 * @returns {Shape3} the rotated shape
 */
const translate = (vector, shape) => transform(shape, mat4.fromTranslation(vector))

module.exports = translate
