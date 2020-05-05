/**
 * Create a new path from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {path2} a new path
 * @alias module:modeling/geometry/path2.fromCompactBinary
 */
const path2FromCompactBinary = data => {
  const geom = require('./create')()
  geom.isClosed = !!data[1]
  geom.transforms = new Float32Array(data.slice(2, 18))
  for (let i = 18; i < data.length; i += 2) { // stride of 4
    geom.points.push(new Float32Array([data[i], data[i + 1]]))
  }
  return geom
}

module.exports = path2FromCompactBinary
