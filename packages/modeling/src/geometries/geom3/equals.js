const mat4 = require('../../maths/mat4')
const poly3 = require('../poly3')

const equals = (first, second) => {
  if (first.isRetesselated !== second.isRetesselated) {
    return false
  }
  if (!mat4.equals(first.transforms, second.transforms)) {
    return false
  }
  if (first.polygons.length !== second.polygons.length) {
    return false
  }
  for (let i = 0; i < first.polygons.length; i++) {
    const p1 = first.polygons[i]
    const p2 = second.polygons[i]
    if (!poly3.equals(p1, p2)) {
      return false
    }
  }

  return true
}

module.exports = equals
