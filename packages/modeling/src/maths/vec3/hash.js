// Spatial prime constants to prevent hash/integer collisions
const P1 = 73856093
const P2 = 19349663
const P3 = 83492791

/**
 * Generate a safe 32-bit unsigned spatial integer hash for the given vector,
 * using the metrics for epsilon and min values.
 *
 * @param {Vec3} vector - vector to hash
 * @param {Object} metrics - metrics with epsilon, minX, minY, minZ
 * @returns {Number} hash
 * @alias module:modeling/maths/vec3.hash
 */
export const hash = (vector, metrics) => {
  const invSpacing = 1.0 / metrics.epsilon * 10

  // quantize relative to min bounds to keep relative coordinates positive and clean
  const ix = Math.floor((vector[0] - metrics.minX) * invSpacing) | 0
  const iy = Math.floor((vector[1] - metrics.minY) * invSpacing) | 0
  const iz = Math.floor((vector[2] - metrics.minZ) * invSpacing) | 0

  // FNV-1a bitwise mixing (strictly stays inside fast 32-bit integer limits)
  let h = 2166136261
  h = Math.imul(h ^ ix, P1)
  h = Math.imul(h ^ iy, P2)
  h = Math.imul(h ^ iz, P3)
  return (h >>> 0)
}
