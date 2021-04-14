const { geom2, geom3, path2 } = require('@jscad/modeling').geometries

/*
 * Serialize the given solids/objects into web worker message content.
 * @param {Array} solids - list of solids to serialize
 * @return {Array} web worker message contents
 */
const serializeSolids = (solids) => {
  // NOTE: the use of compactBinary formats was removed due to
  // that lack of support for additional attributes, as well as
  // imcomplete support for transfering objects via web workers
  solids = solids.map((object) => {
    // apply the transforms before serializing
    if (geom2.isA(object)) geom2.toSides(object)
    if (geom3.isA(object)) geom3.toPolygons(object)
    if (path2.isA(object)) path2.toPoints(object)
    return JSON.stringify(object)
  })
  return solids
}


module.exports = serializeSolids
