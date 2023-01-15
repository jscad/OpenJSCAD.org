import * as vec3 from '../../maths/vec3/index.js'

const edgesToString = (edges) =>
  edges.reduce((result, edge) => (
    result += `[${vec3.toString(edge[0])}, ${vec3.toString(edge[1])}], `
  ), '')

/**
 * @param {slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/geometries/slice.toString
 */
export const toString = (slice) => `[${edgesToString(slice.edges)}]`

export default toString
