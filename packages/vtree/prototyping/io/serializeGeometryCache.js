// experimental output using compactBinary
const fs = require('fs')
const serialize = require('serialize-to-js').serialize

const serializeGeometryCache = (cache) => {
  const cachePath = './cache'
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath)
  }
  const data = {}
  Object.keys(cache).map(function (key) {
    data[key] = cache[key]// .toCompactBinary()
  })
  /* results.forEach(function (result) {
  }) */
  const compactBinary = data
  const compactOutput = serialize(compactBinary)
  const output = 'compactBinary=' + compactOutput

  return output
  // fs.writeFileSync('compactBinary.js', )
}

module.exports = serializeGeometryCache
