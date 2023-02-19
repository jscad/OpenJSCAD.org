import { squaredDistance, vec3 } from 'gl-vec3'

import boundingBox from './boundingBox.js'

/*
 * compute diameter of the bounding sphere for the given (geometry) positions
 * @param {vec3} center - the center of the geometry
 * @param {array} positions - the array/typed array of positions.
 * for now loosely based on three.js implementation
 */
export const boundingSphere = (center, positions) => {
  if (positions.length === 0) {
    return null
  }

  if (!center) {
    const box = boundingBox(positions)
    // min & max are the box's min & max
    const result = vec3.create()
    center = vec3.scale(result, vec3.add(result, box.min, box.max), 0.5)
  }
  const nested = (Array.isArray(positions) && Array.isArray(positions[0]))

  let maxRadiusSq = 0
  const increment = nested ? 1 : 3
  const max = positions.length
  for (let i = 0; i < max; i += increment) {
    if (nested) {
      maxRadiusSq = Math.max(maxRadiusSq, squaredDistance(center, positions[i]))
    } else {
      const position = [positions[i], positions[i + 1], positions[i + 2]]
      maxRadiusSq = Math.max(maxRadiusSq, squaredDistance(center, position))
    }
  }
  return Math.sqrt(maxRadiusSq)
}
