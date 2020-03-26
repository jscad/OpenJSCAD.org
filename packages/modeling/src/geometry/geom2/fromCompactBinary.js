// FIXME: how about custom properties or fields ?
/**
 *
 * @param {*} data
 * @returns {Float32Array} compacted data
 */
const geom2FromCompactBinary = data => {
  const geom = require('./create')()
  // geom.isRetesselated = !!data[1]
  geom.transforms = new Float32Array(data.slice(1, 17))

  for (let i = 17; i < data.length; i += 4) { // stride of 4
    const vDat = data.slice(i, i + 4)
    geom.sides.push([[vDat[0], vDat[1]], [vDat[2], vDat[3]]])
  }
  return geom
}

module.exports = geom2FromCompactBinary
