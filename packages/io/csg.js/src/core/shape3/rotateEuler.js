const mat4 = require('../math/mat4')
// const vec3 = require('../math/vec3')
const transform = require('./tranform')

const rotateEulerAngles = (alpha, beta, gamma, position, shape3) => {
  position = position || [0, 0, 0]

  let Rz1 = mat4.fromZRotation(alpha)
  let Rx = mat4.fromXRotation(beta)
  let Rz2 = mat4.fromZRotation(gamma)
  let T = mat4.fromTranslation(position)

  const transformMatrix = mat4.multiply(
    mat4.multiply(
      mat4.multiply(Rz2, Rx),
      Rz1
    ),
    T
  )
  // Rz2.multiply(Rx).multiply(Rz1).multiply(T)
  return transform(transformMatrix, shape3)
}

module.exports = rotateEulerAngles
