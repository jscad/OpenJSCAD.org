// FIXME: how about custom properties or fields ?

/**
 * Produces a compact binary representation from the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {Array} compact binary representation, an array
 * @alias module:modeling/geometry/geom2.toCompactBinary
 */
const geom2ToCompactBinary = geom => {
  let polysFlat = []
  polysFlat.push(0) // type code: 0 => geom2, 1 => geom3 , 2 => path2
  polysFlat.push(...geom.transforms)
  geom.sides.forEach(s => {
    polysFlat.push(...s[1])
  })
  const compacter = new Float32Array(polysFlat)
  // typeFlag (1 float) + transforms (16 floats) + polygons data (variable length)
  return compacter
}

module.exports = geom2ToCompactBinary
