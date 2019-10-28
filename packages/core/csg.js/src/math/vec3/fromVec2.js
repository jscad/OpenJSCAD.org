const fromValues = require('./fromValues')

// extend to a 3D vector by adding a z coordinate:
const fromVector2 = (vec2, z = 0) => {
  return fromValues(vec2[0], vec2[1], z)
}

module.exports = fromVector2
