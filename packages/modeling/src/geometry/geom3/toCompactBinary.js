// FIXME: how about custom properties or fields ?

/**
 * Return the given geometry in compact binary representation.
 * @param {geom3} geometry - the geometry
 * @return {Array} compact binary representation, array
 * @alias module:modeling/geometry/geom3.toCompactBinary
 */
const geom3ToCompactBinary = geom => {
  let polysFlat = []
  polysFlat.push(1) // type code: 0 => geom2, 1 => geom3 , 2 => path2
  polysFlat.push(geom.isRetesselated ? 1 : 0)
  polysFlat.push(...geom.transforms)
  // TODO: triangulate first !!
  geom.polygons.forEach(p => {
    polysFlat.push(...p.plane)
    for (let i = 0; i < p.vertices.length; i += 1) {
      polysFlat.push(...p.vertices[i])
    }
  })
  const compacter = new Float32Array(polysFlat)
  // typeFlag (1 float) + isRetesselatedFlag (1 float) + transforms (16 floats) + polygons data (variable length)
  return compacter
}

module.exports = geom3ToCompactBinary
