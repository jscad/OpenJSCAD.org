const serialize = require('serialize-to-js')

const deserializeGeometryCache = (cache) => {
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
  // output as stl
  // const output = serializer.serialize(csg, {binary: true})
  // writeOutput('foo.stl', output)
}

module.exports = deserializeGeometryCache
