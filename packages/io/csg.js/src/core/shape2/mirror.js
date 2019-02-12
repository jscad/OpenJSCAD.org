const transform = require('./transform')
const mat4 = require('../../math//mat4')

/** mirror the given shape2 by the given plane
 * @param  {vec4} plane the vec4 / plane to mirror by
 * @param  {shape2} shape the shape to mirror
 */
const mirror = (plane, shape) => transform(mat4.mirror(plane, shape))// Matrix4x4.mirroring(plane), shape2)

module.exports = mirror
