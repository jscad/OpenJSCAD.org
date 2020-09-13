const { geometries } = require('@jscad/modeling')

/*
 * Serialize the given solids/objects into web worker message content.
 * @param {Array} solids - list of solids to serialize
 * @return {Array} web worker message contents
 */
const serializeSolids = (solids) => solids.map((object) => {
  // NOTE: the use of compactBinary formats was removed due to
  // that lack of support for additional attributes, as well as
  // imcomplete support for transfering objects via web workers
  return JSON.stringify(object)
})


module.exports = serializeSolids
