const transform = require('./transform')
const mat4 = require('../../math/mat4')

/** mirror the given shape2 by the given plane
 * @param  {vec4} plane the vec4 / plane to mirror by
 * @param  {shape2} shape2 the shape to mirror
 */
function mirror (plane, shape2) {
  return transform(mat4.mirror(plane, shape2))// Matrix4x4.mirroring(plane), shape2)
}

module.exports = mirror
