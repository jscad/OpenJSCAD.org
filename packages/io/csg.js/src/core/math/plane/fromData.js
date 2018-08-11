/**
 * Create a new plane from the given data
 * @param  {Array} data - array(4) of normal and w values
 * @returns {Array} a new plane with properly typed values
 */
const fromData = (data) => {
  var out = new Float32Array(4)
  out[0] = data[0]
  out[1] = data[1]
  out[2] = data[2]
  out[3] = data[3]
  return out
}

module.exports = fromData
