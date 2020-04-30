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
