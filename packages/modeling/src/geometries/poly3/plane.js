const mplane = require('../../maths/plane/')

const plane = (polygon) => {
  if (!polygon.plane) {
    const vertices = polygon.vertices
    polygon.plane = mplane.fromPoints(mplane.create(), vertices[0], vertices[1], vertices[2])
  }
  return polygon.plane
}

module.exports = plane
