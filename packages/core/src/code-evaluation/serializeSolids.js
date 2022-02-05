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

  // NOTE: JSON.stringify was used at some point, but was removed because it was no longer needed
  // for postMessage JavaScript engines now use an optimized structured clone alg.
  // which should be at least as fast as JSON.stringify
  solids = solids.map((object) => {
    // apply the transforms before serializing
    if (geom2.isA(object)) geom2.toSides(object)
    if (geom3.isA(object)) geom3.toPolygons(object)
    if (path2.isA(object)) path2.toPoints(object)
    return object
  })
  return solids
}

module.exports = serializeSolids
