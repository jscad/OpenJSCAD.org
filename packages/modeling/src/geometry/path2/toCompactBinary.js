// FIXME: how about custom properties or fields ?

/**
 * Produce a compact binary representation from the given path.
 * @param {path2} geometry - the path
 * @returns {Array} compact binary representation, array
 * @alias module:modeling/geometry/path2.toCompactBinary
 */
const path2ToCompactBinary = geom => {
  const polysFlat = []
  polysFlat.push(2) // type code: 0 => geom2, 1 => geom3 , 2 => path2
  polysFlat.push(geom.isClosed ? 1 : 0)
  polysFlat.push(...geom.transforms)
  geom.points.forEach(p => {
    polysFlat.push(...p)
  })
  const compacter = new Float32Array(polysFlat)
  // typeFlag (1 float) + isRetesselatedFlag (1 float) + transforms (16 floats) + polygons data (variable length)
  return compacter
}

module.exports = path2ToCompactBinary
