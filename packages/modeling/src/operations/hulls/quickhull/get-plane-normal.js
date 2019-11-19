const cross = require('../../../math/vec3/cross')
const normalize = require('../../../math/vec3/normalize')
const subtract = require('../../../math/vec3/subtract')

const planeNormal = (out, point1, point2, point3) => {
  let tmp = [0, 0, 0]
  subtract(out, point1, point2)
  subtract(tmp, point2, point3)
  cross(out, out, tmp)
  return normalize(out, out)
}

module.exports = planeNormal
