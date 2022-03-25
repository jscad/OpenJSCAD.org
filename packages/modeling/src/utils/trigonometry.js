
/*
 * Returns zero if n is within epsilon of zero, otherwise return n
 */
const rezero = (n) => Math.abs(n) < 1e-5 ? 0 : n

/*
 * Return Math.sin but accurate for 90 degree rotations.
 * Fixes rounding errors when sin should be 0.
 * sin(Math.PI) => 0
 * sin(2 * Math.PI) => 0
 */
const sin = (radians) => rezero(Math.sin(radians))

/*
 * Return Math.cos but accurate for 90 degree rotations.
 * Fixes rounding errors when cos should be 0.
 * cos(0.5 * Math.PI) => 0
 * cos(1.5 * Math.PI) => 0
 */
const cos = (radians) => rezero(Math.cos(radians))

module.exports = { sin, cos }
