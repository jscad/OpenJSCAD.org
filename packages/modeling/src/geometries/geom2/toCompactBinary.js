/**
 * Produces a compact binary representation from the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {TypedArray} compact binary representation
 * @alias module:modeling/geometries/geom2.toCompactBinary
 */
const toCompactBinary = (geometry) => {
  const sides = geometry.sides
  const transforms = geometry.transforms
  let color = [-1, -1, -1, -1]
  if (geometry.color) color = geometry.color

  // FIXME why Float32Array?
  const compacted = new Float32Array(1 + 16 + 4 + (sides.length * 4)) // type + transforms + color + sides data

  compacted[0] = 0 // type code: 0 => geom2, 1 => geom3 , 2 => path2

  compacted[1] = transforms[0]
  compacted[2] = transforms[1]
  compacted[3] = transforms[2]
  compacted[4] = transforms[3]
  compacted[5] = transforms[4]
  compacted[6] = transforms[5]
  compacted[7] = transforms[6]
  compacted[8] = transforms[7]
  compacted[9] = transforms[8]
  compacted[10] = transforms[9]
  compacted[11] = transforms[10]
  compacted[12] = transforms[11]
  compacted[13] = transforms[12]
  compacted[14] = transforms[13]
  compacted[15] = transforms[14]
  compacted[16] = transforms[15]

  compacted[17] = color[0]
  compacted[18] = color[1]
  compacted[19] = color[2]
  compacted[20] = color[3]

  for (let i = 0; i < sides.length; i++) {
    const ci = i * 4 + 21
    const point0 = sides[i][0]
    const point1 = sides[i][1]
    compacted[ci + 0] = point0[0]
    compacted[ci + 1] = point0[1]
    compacted[ci + 2] = point1[0]
    compacted[ci + 3] = point1[1]
  }
  // TODO: how about custom properties or fields ?
  return compacted
}

module.exports = toCompactBinary
