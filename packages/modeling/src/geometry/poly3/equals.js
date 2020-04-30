const vec3 = require('../../math/vec3')
const plane = require('../../math/plane')

const equals = (first, second) => {
  if (!plane.equals(first.plane, second.plane)) {
    return false
  }
  for (let i = 0; i < first.vertices.length; i++) {
    const v1 = first.vertices[i]
    const v2 = second.vertices[i]
    if (!vec3.equals(v1, v2)) {
      return false
    }
  }
  return true
}

module.exports = equals
