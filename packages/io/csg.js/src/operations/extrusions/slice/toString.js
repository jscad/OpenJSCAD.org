const vec3 = require('../../../math/vec3/')

const edgesToString = (edges) => edges.reduce((result, edge) => result += `[${vec3.toString(edge[0])}, ${vec3.toString(edge[1])}], `, '')

const toString = (slice) => `[${edgesToString(slice.edges)}]`

module.exports = toString
