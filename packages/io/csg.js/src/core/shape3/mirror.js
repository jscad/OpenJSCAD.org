const mat4 = require('../../math/mat4')
const transform = require('./transform')

/** return a clone of the input shape, mirrored by the given plane
 * @param  {Vec4} plane the plane to mirror by
 * @param  {Shape3} shape the shape to mirror
 * @returns {Shape3} the mirrored shape
 */
const mirror = (plane, shape) => transform(mat4.mirror(plane, mat4.create()), shape)

module.exports = mirror
