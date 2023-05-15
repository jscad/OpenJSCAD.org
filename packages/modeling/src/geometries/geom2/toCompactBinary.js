/**
 * Produces a compact binary representation from the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {TypedArray} compact binary representation
 * @alias module:modeling/geometries/geom2.toCompactBinary
 */
export const toCompactBinary = (geometry) => {
  const transforms = geometry.transforms
  let color = [-1, -1, -1, -1]
  if (geometry.color) color = geometry.color

  // Compute array size
  let size = 21
  geometry.outlines.forEach((outline) => {
    size += 2 * outline.length + 1
  })

  // FIXME why Float32Array?
  const compacted = new Float32Array(size) // type + transforms + color + points

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

  let index = 21
  geometry.outlines.forEach((outline) => {
    compacted[index++] = outline.length
    outline.forEach((point) => {
      compacted[index++] = point[0]
      compacted[index++] = point[1]
    })
  })

  // TODO: how about custom properties or fields ?
  return compacted
}
