import * as mplane from '../../maths/plane/index.js'

export const plane = (polygon) => {
  if (!polygon.plane) {
    polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices)
  }
  return polygon.plane
}
