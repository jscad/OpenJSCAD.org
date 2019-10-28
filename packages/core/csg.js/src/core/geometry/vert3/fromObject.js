const vec3 = require('../../math/vec3')

// create from an untyped object with identical property names:
const fromObject = function (obj) {
  // var pos = new Vector3D(obj.pos)
  return {
    pos: vec3.fromValues(obj.pos)
  }
}

module.exports = fromObject
