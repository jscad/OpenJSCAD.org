/** The resolution of space, currently one hundred nanometers.
 *  This should be 1 / EPS.
 * @default
 */
const spatialResolution = 1e5

/** Epsilon used during determination of near zero distances.
 *  This should be 1 / spacialResolution.
 * @default
 */
const EPS = 1e-5

module.exports = {
  EPS,
  spatialResolution
}
