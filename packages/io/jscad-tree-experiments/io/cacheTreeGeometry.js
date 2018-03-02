// experimental output using compactBinary
const fs = require('fs')

const cacheTreeGeometry = (treeGeometry) => {
  const cachePath = './cache'
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath)
  }
  const serialize = require('serialize-to-js').serialize
  /* results.forEach(function (result) {
  }) */
  const compactBinary = csg.toCompactBinary()
  const compactOutput = serialize(compactBinary)
  fs.writeFileSync('compactBinary.js', 'compactBinary=' + compactOutput)
  // output as stl
  // const output = serializer.serialize(csg, {binary: true})
  // writeOutput('foo.stl', output)
}

module.exports = cacheTreeGeometry
