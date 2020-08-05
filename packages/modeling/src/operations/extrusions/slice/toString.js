const vec3 = require('../../../maths/vec3')

const edgesToString = (edges) =>
  edges.reduce((result, edge) => (
    result += `[${vec3.toString(edge[0])}, ${vec3.toString(edge[1])}], `
  ), '')

/**
 * @param {slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/extrusions/slice.toString
 */
const toString = (slice) => `[${edgesToString(slice.edges)}]`

module.exports = toString
