// Normals are directional vectors with component values from 0 to 1.0, requiring specialized comparision
// This EPS is derived from a serieas of tests to determine the optimal precision for comparing coplanar polygons,
// as provided by the sphere primitive at high segmentation
// This EPS is for 64 bit Number values
const NEPS = 1e-13

/**
 * Compare two normals (unit vectors) for equality.
 * @param {vec3} a - normal a
 * @param {vec3} b - normal b
 * @returns {Boolean} true if a and b are (about) equal
 */
const aboutEqualNormals = (a, b) => (Math.abs(a[0] - b[0]) <= NEPS && Math.abs(a[1] - b[1]) <= NEPS && Math.abs(a[2] - b[2]) <= NEPS)

module.exports = aboutEqualNormals
