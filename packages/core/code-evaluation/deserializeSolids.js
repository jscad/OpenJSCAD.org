const { geometries } = require('@jscad/modeling')

/*
 * Deserialize the given solids/objects from web worker message content.
 * @param {Array} solids - list of solids to deserialize
 * @return {Array} list of geometries / objects
 */
const deserializeSolids = (solids) => solids.map((solid) => {
  if (!solid) return solid // handle passing of null / undefined
  return JSON.parse(solid)
})


module.exports = deserializeSolids
