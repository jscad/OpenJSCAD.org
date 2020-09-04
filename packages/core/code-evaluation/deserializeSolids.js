const { geometries } = require('@jscad/modeling')

const uncompactGeom2 = geometries.geom2.fromCompactBinary
const uncompactGeom3 = geometries.geom3.fromCompactBinary
const uncompactPath2 = geometries.path2.fromCompactBinary

/*
 * Deserialize the given solids/objects from web worker message content.
 * @param {Array} solids - list of solids to deserialize
 * @return {Array} list of geometries / objects
 */
const deserializeSolids = (solids) => solids.map((solid) => {
  if (!solid) return solid // handle passing of null / undefined
  // if (solid[0] === 0) { // Geom2
  //   return uncompactGeom2(solid)
  // } else if (solid[0] === 1) { // Geom3
  //   return uncompactGeom3(solid)
  // } else if (solid[0] === 2) { // Path2
  //   return uncompactPath2(solid)
  // }
  return JSON.parse(solid)
})


module.exports = deserializeSolids
