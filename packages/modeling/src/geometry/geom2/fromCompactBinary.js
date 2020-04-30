// FIXME: how about custom properties or fields ?
const fromPoints = require('./fromPoints')
/**
 *
 * @param {*} data
 * @returns {Float32Array} compacted data
 */
const geom2FromCompactBinary = data => {
  // geom.isRetesselated = !!data[1]
  const transforms = new Float32Array(data.slice(1, 17))
  const dat = data.slice(17, data.length)
  const pts = []
  for (let i = 0; i < dat.length; i += 2) {
    pts.push([dat[i], dat[i + 1]])
  }
  const geom = fromPoints(pts)
  geom.transforms = transforms
  return geom
}

module.exports = geom2FromCompactBinary
