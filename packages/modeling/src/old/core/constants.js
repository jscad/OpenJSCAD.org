const _CSGDEBUG = false

/** Number of polygons per 360 degree revolution for 2D objects.
 * @default
 */
const defaultResolution2D = 16

/** Number of polygons per 360 degree revolution for 3D objects.
 * @default
 */
const defaultResolution3D = 12

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

/** Epsilon used during determination of near zero areas.
 * @default
 */
const angleEPS = 0.10

/** Epsilon used during determination of near zero areas.
 *  This is the minimal area of a minimal polygon.
 * @default
 */
const areaEPS = 0.50 * EPS * EPS * Math.sin(angleEPS)

const all = 0
const top = 1
const bottom = 2
const left = 3
const right = 4
const front = 5
const back = 6

module.exports = {
  _CSGDEBUG,
  defaultResolution2D,
  defaultResolution3D,
  EPS,
  angleEPS,
  areaEPS,
  all,
  top,
  bottom,
  left,
  right,
  front,
  back,
  spatialResolution
}
