import * as plane from '../../maths/plane/index.js'
import * as vec3 from '../../maths/vec3/index.js'

/**
 * Calculate the plane of the given slice.
 * NOTE: The slice (and all points) are assumed to be planar from the beginning.
 * @param {slice} slice - the slice
 * @returns {plane} the plane of the slice
 * @alias module:modeling/geometries/slice.calculatePlane
 *
 * @example
 * let myplane = calculatePlane(slice)
 */
export const calculatePlane = (slice) => {
  if (slice.contours < 1) throw new Error('slices must have at least one contour to calculate a plane')

  // find the midpoint of the slice, which will lie on the plane by definition
  const midpoint = vec3.create()
  let n = 0 // number of points
  slice.contours.forEach((part) => {
    part.forEach((point) => {
      vec3.add(midpoint, midpoint, point)
      n++
    })
  })
  vec3.scale(midpoint, midpoint, 1 / n)

  // find the farthest edge from the midpoint, which will be on an outside edge
  let farthestPart
  let farthestBefore
  let farthestPoint
  let distance = 0
  slice.contours.forEach((part) => {
    let prev = part[part.length - 1]
    part.forEach((point) => {
      // make sure that the farthest edge is not a self-edge
      if (!vec3.equals(prev, point)) {
        const d = vec3.squaredDistance(midpoint, point)
        if (d > distance) {
          farthestPart = part
          farthestBefore = prev
          farthestPoint = point
          distance = d
        }
      }
      prev = point
    })
  })

  // find the after point
  let farthestAfter
  let prev = farthestPart[farthestPart.length - 1]
  for (let i = 0; i < farthestPart.length; i++) {
    const point = farthestPart[i]
    if (!vec3.equals(prev, point) && vec3.equals(prev, farthestPoint)) {
      farthestAfter = point
      break
    }
    prev = point
  }

  return plane.fromPoints(plane.create(), farthestBefore, farthestPoint, farthestAfter)
}
