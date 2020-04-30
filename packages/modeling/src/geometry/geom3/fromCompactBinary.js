// FIXME: how about custom properties or fields ?
const geom3FromCompactBinary = data => {
  const geom = require('./create')()
  geom.isRetesselated = !!data[1]
  geom.transforms = new Float32Array(data.slice(2, 18))

  for (let i = 18; i < data.length; i += 16) { // stride of 16
    const vDat = data.slice(i + 4, i + 16)
    const vertices = []
    for (let j = 0; j < vDat.length; j += 3) {
      vertices.push([vDat[j], vDat[j + 1], vDat[j + 2]])
    }
    geom.polygons.push({
      plane: data.slice(i, i + 4),
      vertices
    })
  }
  return geom
}

module.exports = geom3FromCompactBinary
