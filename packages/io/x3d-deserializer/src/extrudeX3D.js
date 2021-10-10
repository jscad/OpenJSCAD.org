const { extrusions, geometries, maths } = require('@jscad/modeling')

const { mat4, vec3, utils } = maths
const { extrudeFromSlices, slice } = extrusions

const calculateYaxes = (spine) => {
  const slength = spine.length
  const closed = vec3.equals(spine[0], spine[slength - 1])
  const yaxes = []
  for (let i = 0; i < slength; i++) {
    const yaxis = vec3.create()
    if (i === 0) {
      if (closed) {
        vec3.normalize(yaxis, vec3.subtract(yaxis, spine[1], spine[slength - 2]))
        // 1.85 0 0.77 MINUS 1.85 0 -0.77
      } else {
        vec3.normalize(yaxis, vec3.subtract(yaxis, spine[1], spine[0]))
      }
    } else
    if (i === slength - 1) {
      if (closed) {
        vec3.normalize(yaxis, vec3.subtract(yaxis, spine[1], spine[slength - 2]))
      } else {
        vec3.normalize(yaxis, vec3.subtract(yaxis, spine[slength - 1], spine[slength - 2]))
      }
    } else {
      vec3.normalize(yaxis, vec3.subtract(yaxis, spine[i + 1], spine[i - 1]))
    }
    yaxes.push(yaxis)
  }
  return yaxes
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

const calculateZaxis = (z, p, i, n) => {
  const a = vec3.subtract(vec3.create(), n, i)
  const b = vec3.subtract(vec3.create(), p, i)
  return vec3.normalize(z, vec3.cross(z, a, b)) // orthoganal vector to SCP Y (p,i,n)
}

const calculateZaxes = (spine) => {
  const slength = spine.length
  const closed = vec3.equals(spine[0], spine[slength - 1])
  const zaxes = []
  let previousZaxis
  for (let i = 0; i < slength; i++) {
    const zaxis = vec3.create()
    if (i === 0) {
      if (closed) {
        calculateZaxis(zaxis, spine[slength - 2], spine[0], spine[1])
      } else {
        if (slength > 2) calculateZaxis(zaxis, spine[0], spine[1], spine[2])
      }
    } else
    if (i === slength - 1) {
      if (closed) {
        calculateZaxis(zaxis, spine[slength - 2], spine[0], spine[1])
      } else {
        if (slength > 2) calculateZaxis(zaxis, spine[slength - 3], spine[slength - 2], spine[slength - 1])
      }
    } else {
      calculateZaxis(zaxis, spine[i - 1], spine[i], spine[i + 1])
      // from Extrusion.js
      // const a = vec3.subtract(vec3.create(), spine[i + 1], spine[i - 1])
      // const b = vec3.subtract(vec3.create(), spine[i - 1], spine[i])
      // vec3.normalize(zaxis, vec3.cross(zaxis, a, b)) // orthoganal vector to SCP Y (p,i,n)
    }

    if (previousZaxis && vec3.dot(previousZaxis, zaxis) < 0) vec3.negate(zaxis, zaxis)

    zaxes.push(zaxis)

    previousZaxis = zaxis
  }
  // special case #1 - if first zaxis is zero then use first non-zero zaxis
  if (isZeroVector(zaxes[0])) {
    for (let i = 1; i < zaxes.length; i++) {
      if (!isZeroVector(zaxes[i])) {
        zaxes[0] = zaxes[i]
        break
      }
    }
  }
  // special case #2 - if zaxis is zero then use previous zaxis if available
  for (let i = 1; i < zaxes.length; i++) {
    if (isZeroVector(zaxes[i]) && !isZeroVector(zaxes[i - 1])) vec3.clone(zaxes[i], zaxes[i - 1])
  }
  return zaxes
}

const calculateXaxes = (yaxes, zaxes) => {
  const xaxes = []
  for (let i = 0; i < yaxes.length; i++) {
    const xaxis = vec3.create()
    xaxes.push(vec3.normalize(xaxis, vec3.cross(xaxis, yaxes[i], zaxes[i])))
  }
  return xaxes
}

// from fields.js, line 748
const rotationMatrixFromSCP = (out, xaxis, yaxis, zaxis) => {
  out[0] = xaxis[0]
  out[1] = yaxis[0]
  out[2] = zaxis[0]
  out[3] = 0
  out[4] = xaxis[1]
  out[5] = yaxis[1]
  out[6] = zaxis[1]
  out[7] = 0
  out[8] = xaxis[2]
  out[9] = yaxis[2]
  out[10] = zaxis[2]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

const extrudeX3D = (x3dshape) => {
  // console.log(x3dshape)
  let { beginCap, endCap, crossSection, orientations, scales, spine } = Object.assign({}, x3dshape)

  // orientate the crossection for extruding
  if (utils.area(crossSection) < 0) crossSection.reverse()

  // complete scales if necessary
  if (scales.length === 1) {
    scales = spine.map((s) => scales[0]) // all scales are the same
  }

  // complete orientations if necessary
  if (orientations.length === 1) {
    orientations = spine.map((s) => orientations[0]) // all orientations are the same
  }

  // verify everything is ready
  if (spine.length !== scales.length || spine.length !== orientations.length) {
    throw new Error(`invalid X3D specification; spine scale orientaion length must be the same; ${spine.length}`)
  }

  // Create the initial slice
  const initialShape = geometries.geom2.fromPoints(crossSection)
  const initialSlice = slice.fromSides(geometries.geom2.toSides(initialShape))

  // Calculate SCP values
  let yaxes = calculateYaxes(spine)
  // console.log(yaxes)
  let zaxes = calculateZaxes(spine)
  // console.log(zaxes)
  let xaxes = calculateXaxes(yaxes, zaxes)
  // console.log(xaxes)

  // initial Y=0 matrix
  const y0direction = [0, 1, 0]
  const y0matrix = mat4.fromVectorRotation(mat4.create(), vec3.fromValues(0, 0, 1), y0direction)

  // special case - if all Z zaxis are zero then rotate to first Y (and reset)
  const allZero = zaxes.reduce((acc, axis) => acc && isZeroVector(axis), true)
  if (allZero) {
    vec3.subtract(y0direction, spine[1], spine[0])
    mat4.fromVectorRotation(y0matrix, vec3.fromValues(0, 0, 1), y0direction)
    xaxes = xaxes.map((axis) => [1, 0, 0])
    yaxes = yaxes.map((axis) => [0, 1, 0])
    zaxes = zaxes.map((axis) => [0, 0, 1])
  }

  // ...and extrude.
  return extrudeFromSlices({
    numberOfSlices: spine.length,
    capStart: beginCap,
    capEnd: endCap,
    callback: function (progress, count, base) {
      const position = spine[count]
      const scale = vec3.fromVec2(vec3.create(), scales[count], 1.0)
      const orientation = orientations[count]
      const xaxis = xaxes[count]
      const yaxis = yaxes[count]
      const zaxis = zaxes[count]

      const translationMatrix = mat4.fromTranslation(mat4.create(), position)
      const scaleMatrix = mat4.fromScaling(mat4.create(), scale)
      const scpMatrix = rotationMatrixFromSCP(mat4.create(), xaxis, yaxis, zaxis)
      const orientationMatrix = mat4.fromRotation(mat4.create(), orientation[3], orientation)
      const rotationMatrix = mat4.create()
      // ORIENTAION y0, scale, trans, scp, ori
      // ORIENTAION y0, scale, trans, ori, scp
      // NON scale, y0, trans
      // NON scale, y0, scp, ori, trans
      // NON scale, y0, trans, scp, ori
      mat4.multiply(rotationMatrix, y0matrix, rotationMatrix)
      mat4.multiply(rotationMatrix, scpMatrix, rotationMatrix)
      mat4.multiply(rotationMatrix, orientationMatrix, rotationMatrix)
      mat4.multiply(rotationMatrix, translationMatrix, rotationMatrix)

      let newslice = base
      newslice = slice.transform(scaleMatrix, newslice)
      newslice = slice.transform(rotationMatrix, newslice)
      // newslice = slice.transform(translationMatrix, newslice)
      return newslice
    }
  }, initialSlice)
}

module.exports = extrudeX3D
