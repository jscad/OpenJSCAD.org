/**
 * Produce a compact binary representation from the given path.
 * @param {path2} geometry - the path geometry
 * @returns {TypedArray} compact binary representation
 * @alias module:modeling/geometries/path2.toCompactBinary
 */
const toCompactBinary = (geometry) => {
  const points = geometry.points
  const transforms = geometry.transforms
  let color = [-1, -1, -1, -1]
  if (geometry.color) color = geometry.color

  // FIXME why Float32Array?
  const compacted = new Float32Array(1 + 16 + 1 + 4 + (points.length * 2)) // type + transforms + isClosed + color + points data

  compacted[0] = 2 // type code: 0 => geom2, 1 => geom3 , 2 => path2

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

  compacted[17] = geometry.isClosed ? 1 : 0

  compacted[18] = color[0]
  compacted[19] = color[1]
  compacted[20] = color[2]
  compacted[21] = color[3]

  for (let j = 0; j < points.length; j++) {
    const ci = j * 2 + 22
    const point = points[j]
    compacted[ci] = point[0]
    compacted[ci + 1] = point[1]
  }
  // TODO: how about custom properties or fields ?
  return compacted
}

module.exports = toCompactBinary
