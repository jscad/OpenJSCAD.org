const { squaredDistance, vec3 } = require('gl-vec3')
const boundingBox = require('./boundingBox')
/**
  * compute boundingSphere, given positions
  * @param {array} center the center to use (optional).
  * @param {array} positions the array/typed array of positions.
  * for now loosely based on three.js implementation
*/
function boundingSphere (center = [0, 0, 0], positions) {
  if (positions.length === 0) {
    return null
  }

  if (!center) {
    let box = boundingBox(positions)
    // min & max are the box's min & max
    let result = vec3.create()
    center = vec3.scale(result, vec3.add(result, box.min, box.max), 0.5)
  }
  const nested = (Array.isArray(positions) && Array.isArray(positions[0]))

  let maxRadiusSq = 0
  const increment = nested ? 1 : 3
  const max = positions.length
  for (let i = 0; i < max; i += increment) {
    if (nested) {
      maxRadiusSq = Math.max(maxRadiusSq, squaredDistance(center, positions[ i ]))
    } else {
      const position = [positions[i], positions[i + 1], positions[i + 2]]
      maxRadiusSq = Math.max(maxRadiusSq, squaredDistance(center, position))
    }
  }
  return Math.sqrt(maxRadiusSq)
}

/* compute boundingSphere from boundingBox
  for now more or less based on three.js implementation
*/
function boundingSphereFromBoundingBox (center = [0, 0, 0], positions, boundingBox) {
  if (positions.length === 0) {
    return null
  }

  if (!center) {
    // min & max are the box's min & max
    let result = vec3.create()
    center = vec3.scale(result, vec3.add(result, boundingBox[0], boundingBox[1]), 0.5)
  }

  let maxRadiusSq = 0
  for (let i = 0, il = positions.length; i < il; i++) {
    maxRadiusSq = Math.max(maxRadiusSq, squaredDistance(center, positions[ i ]))
  }
  return Math.sqrt(maxRadiusSq)
}

module.exports = boundingSphere//{boundingSphere, boundingSphereFromBoundingBox}
