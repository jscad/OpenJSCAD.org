const vec3 = require('../../maths/vec3')

const equals = (first, second) => {
  if (first.vertices.length !== second.vertices.length) return false

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
