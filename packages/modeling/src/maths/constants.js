/**
 * Epsilon used during determination of near zero distances.
 * This should be 1 / spacialResolution.
 * @default
 * @alias module:modeling/maths.EPS
 */
export const EPS = 1e-5

/**
 * Smaller epsilon used for measuring near zero distances.
 * @default
 * @alias module:modeling/maths.NEPS
 */
export const NEPS = 1e-13
// NEPS is derived from a series of tests to determine the optimal precision
// for comparing coplanar polygons, as provided by the sphere primitive at high
// segmentation. NEPS is for 64 bit Number values.

/**
 * The TAU property represents the ratio of the circumference of a circle to its radius.
 * Approximately 6.28318530717958647692
 * @default
 * @example
 * const { TAU } = require('@jscad/modeling').maths.constants
 */
export const TAU = Math.PI * 2
