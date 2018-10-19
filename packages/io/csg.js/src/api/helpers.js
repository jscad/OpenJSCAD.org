const Vertex3 = require('../core/math/Vertex3')
const Vector3 = require('../core/math/Vector3')
const Polygon3 = require('../core/math/Polygon3')

// FIXME: this is to have more readable/less extremely verbose code below
const vertexFromVectorArray = array => {
  return new Vertex3(new Vector3(array))
}

const polygonFromPoints = points => {
  // EEK talk about wrapping wrappers !
  const vertices = points.map(point => new Vertex3(new Vector3(point)))
  return new Polygon3(vertices)
}

// Simplified, array vector rightMultiply1x3Vector
const rightMultiply1x3VectorToArray = (matrix, vector) => {
  const [v0, v1, v2] = vector
  const v3 = 1
  let x = v0 * matrix.elements[0] + v1 * matrix.elements[1] + v2 * matrix.elements[2] + v3 * matrix.elements[3]
  let y = v0 * matrix.elements[4] + v1 * matrix.elements[5] + v2 * matrix.elements[6] + v3 * matrix.elements[7]
  let z = v0 * matrix.elements[8] + v1 * matrix.elements[9] + v2 * matrix.elements[10] + v3 * matrix.elements[11]
  let w = v0 * matrix.elements[12] + v1 * matrix.elements[13] + v2 * matrix.elements[14] + v3 * matrix.elements[15]

  // scale such that fourth element becomes 1:
  if (w !== 1) {
    const invw = 1.0 / w
    x *= invw
    y *= invw
    z *= invw
  }
  return [x, y, z]
}

module.exports = {cagToPointsArray, clamp, rightMultiply1x3VectorToArray, polygonFromPoints}
