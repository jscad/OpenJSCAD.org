const { maths } = require('@jscad/modeling')

const rotationMatrixFromVectors = (srcVector, targetVector) => {
  // From https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
  srcVector = maths.vec3.normalize(srcVector)
  targetVector = maths.vec3.normalize(targetVector)

  const axis = maths.vec3.cross(targetVector, srcVector)
  const cosA = maths.vec3.dot(targetVector, srcVector)
  const k = 1 / (1 + cosA)

  return maths.mat4.fromValues(
    (axis[0] * axis[0] * k) + cosA, (axis[1] * axis[0] * k) - axis[2], (axis[2] * axis[0] * k) + axis[1], 0,
    (axis[0] * axis[1] * k) + axis[2], (axis[1] * axis[1] * k) + cosA, (axis[2] * axis[1] * k) - axis[0], 0,
    (axis[0] * axis[2] * k) - axis[1], (axis[1] * axis[2] * k) + axis[0], (axis[2] * axis[2] * k) + cosA, 0,
    0, 0, 0, 1
  )
}

const isZeroVector = (vector) => {
  if ((vector[0] + 0) === 0) {
    if ((vector[1] + 0) === 0) {
      if ((vector[2] + 0) === 0) {
        return true
      }
    }
  }
  return false
}

const calculateSCPTransforms = (spine, orientations, scales) => {
  const slength = spine.length

  if (scales.length === 1) {
    scales = spine.map((s) => scales[0]) // all scales are the same
  }

  if (orientations.length === 1) {
    orientations = spine.map((s) => orientations[0]) // all orientations are the same
  }

  // verify everything is ready
  if (!(scales.length >= spine.length && orientations.length >= slength)) {
    return []
  }

  // calculate SCP (spine-aligned cross-section planes)
  const closed = maths.vec3.equals(spine[0], spine[slength - 1])

  // calculate the rotation from the SPINE (point) and X/Y/Z axis
  let planeYRotation
  const calculateRotation = (s, x, y, z) => {
    // console.log('calculateRotation',s,x,y,z)
    if (planeYRotation) {
      const matrix = maths.mat4.fromTranslation(s)
      return maths.mat4.multiply(matrix, matrix, planeYRotation)
    }
    return maths.mat4.fromValues(
      x[0], x[1], x[2], 0,
      y[0], y[1], y[2], 0,
      z[0], z[1], z[2], 0,
      s[0], s[1], s[2], 1
    )
  }

  const calculateYaxis = (y, a, b) => {
    // console.log('calculateYaxis',a,b)
    return maths.vec3.normalize(y, maths.vec3.subtract(y, b, a)) // directional vector from A to B
  }

  const calculateZaxis = (z, p, i, n) => {
    // console.log('calculateZaxis',p,i,n)
    if (p === undefined) return maths.vec3.clone(z, [0, 0, 0])
    if (n === undefined) return maths.vec3.clone(z, [0, 0, 0])
    const a = maths.vec3.subtract(n, i)
    const b = maths.vec3.subtract(p, i)
    return maths.vec3.normalize(maths.vec3.cross(z, a, b)) // orthoganal vector to plane (p,i,n)
  }

  // this is a very ugly fallback to a poor specification
  // all that is needed is the base directional vector of the initial plane
  // then this silliness is unnecessary
  // the result of 20 years of no progress
  const calculatePlaneYRotation = () => {
    if (!planeYRotation) {
      const direction = maths.vec3.subtract(spine[1], spine[0])
      planeYRotation = rotationMatrixFromVectors([0, 1, 0], direction)
    }
  }

  let previousZaxis
  const calculateMatrixAt = (index) => {
    // console.log('calculateMatrixAt',index,closed)
    const numpoints = spine.length

    const yaxis = [0, 0, 0]
    const zaxis = [0, 0, 0]
    const xaxis = [0, 0, 0]

    if (index === 0) {
      // special X/Y calculations
      if (closed) {
        calculateYaxis(yaxis, spine[numpoints - 2], spine[1])
        calculateZaxis(zaxis, spine[numpoints - 2], spine[0], spine[1])
      } else {
        calculateYaxis(yaxis, spine[0], spine[1])
        calculateZaxis(zaxis, spine[2], spine[1], spine[0])
      }
    } else {
      if (index === (numpoints - 1)) {
        // special X/Y calculations
        if (closed) {
          calculateYaxis(yaxis, spine[numpoints - 2], spine[1])
          calculateZaxis(zaxis, spine[numpoints - 2], spine[0], spine[1])
        } else {
          calculateYaxis(yaxis, spine[numpoints - 2], spine[numpoints - 1])
          calculateZaxis(zaxis, spine[numpoints - 3], spine[numpoints - 2], spine[numpoints - 1])
        }
      } else {
        calculateYaxis(yaxis, spine[index - 1], spine[index + 1])
        calculateZaxis(zaxis, spine[index - 1], spine[index], spine[index + 1])
      }
    }
    if (previousZaxis && maths.vec3.dot(previousZaxis, zaxis) < 0) maths.vec3.negate(zaxis, zaxis)

    if (isZeroVector(yaxis)) yaxis[1] = 1 // use Y axis
    if (isZeroVector(zaxis)) {
      if (previousZaxis) maths.vec3.clone(zaxis, previousZaxis) // use the last calculate
      // fall back to ugliness
      calculatePlaneYRotation()
    } else {
      previousZaxis = zaxis // initial
    }

    maths.vec3.cross(xaxis, yaxis, zaxis)

    const matrix = calculateRotation(spine[index], xaxis, yaxis, zaxis)

    // rotate to desired orientation
    const orientation = orientations[index]
    maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(orientation[3], orientation))

    // scale to desired size
    const scale = scales[index]
    maths.mat4.scale(matrix, [scale[0], 1, scale[1]], matrix)

    return matrix
  }

  const transforms = spine.map((point, index) => calculateMatrixAt(index))

  return transforms
}

module.exports = calculateSCPTransforms
