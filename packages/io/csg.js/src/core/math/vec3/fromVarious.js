const {IsFloat} = require('../../utils/typeChecks')

/**
 * Represents a 3D vector with X, Y, Z coordinates.
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
    out[0] = parseFloat(params[0])
    out[1] = parseFloat(params[1])
    out[2] = parseFloat(params[2])
  } else if (params.length === 2) {
    out[0] = parseFloat(params[0])
    out[1] = parseFloat(params[1])
    out[2] = 0
  } else if (params.length === 1) {
    const x = params[0]
    if (typeof (x) === 'object') {
//      if (x instanceof vec3) {
//        out[0] = x[0]
//        out[1] = x[1]
//        out[2] = x[2]
//      } else if (x instanceof Vector2D) {
//        out[0] = x[0]
//        out[1] = x[1]
//        out[2] = 0
//      } else 
      if (x instanceof Array) {
        out[0] = parseFloat(x[0])
        out[1] = out[0]
        out[2] = out[0]
        if (x.length > 1) {
          out[1] = parseFloat(x[1])
        }
        if (x.length > 2) {
          out[2] = parseFloat(x[2])
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
      }
    } else {
      // non-object so try for primitive
      var v = parseFloat(x)
      out[0] = v
      out[1] = v
      out[2] = v
    }
    // check the results
    if ((!IsFloat(out[0])) || (!IsFloat(out[1])) || (!IsFloat(out[2]))) {
      throw new Error('wrong arguments')
    }
  } else {
    throw new Error('missing arguments')
  }
  return out
}

module.exports = fromVarious
