
const {IsFloat} = require('../utils')

/** Class Vector3D
 * Represents a 3D vector with X, Y, Z coordinates.
 * @constructor
 *
 * @example
 * fromVarious(1, 2, 3);
 * fromVarious([1, 2, 3]);
 * fromVarious({ x: 1, y: 2, z: 3 });
 * fromVarious(1, 2); // assumes z=0
 * fromVarious([1, 2]); // assumes z=0
 */
function fromVarious (...params) {
  let out = new Float32Array(3)
  if (params.length === 3) {
    out[0] = parseFloat(x)
    out[1] = parseFloat(y)
    out[2] = parseFloat(z)
  } else if (params.length === 2) {
    out[0] = parseFloat(x)
    out[1] = parseFloat(y)
    out[2] = 0
  }else {
    var ok = true
    if (arguments.length === 1) {
      if (typeof (x) === 'object') {
        if (x instanceof Vector3D) {
          out[0] = x._x
          out[1] = x._y
          out[2] = x._z
        } else if (x instanceof Vector2D) {
          out[0] = x._x
          out[1] = x._y
          out[2] = 0
        } else if (x instanceof Array) {
          if ((x.length < 2) || (x.length > 3)) {
            ok = false
          } else {
            out[0] = parseFloat(x[0])
            out[1] = parseFloat(x[1])
            if (x.length === 3) {
              out[2] = parseFloat(x[2])
            } else {
              out[2] = 0
            }
          }
        } else if (('x' in x) && ('y' in x)) {
          out[0] = parseFloat(x.x)
          out[1] = parseFloat(x.y)
          if ('z' in x) {
            out[2] = parseFloat(x.z)
          } else {
            out[2] = 0
          }
        } else if (('_x' in x) && ('_y' in x)) {
          out[0] = parseFloat(x._x)
          out[1] = parseFloat(x._y)
          if ('_z' in x) {
            out[2] = parseFloat(x._z)
          } else {
            out[2] = 0
          }
        } else ok = false
      } else {
        var v = parseFloat(x)
        out[0] = v
        out[1] = v
        out[2] = v
      }
    } else ok = false
    if (ok) {
      if ((!IsFloat(out[0])) || (!IsFloat(out[1])) || (!IsFloat(out[2]))) ok = false
    } else {
      throw new Error('wrong arguments')
    }
  }
}

module.exports = fromVarious
