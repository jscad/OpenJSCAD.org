const fs = require('fs')
const path = require('path')
const test = require('ava')

const deserializer = require('../index.js')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('deserialize simple amf file to jscad script', function (t) {
  const inputPath = path.resolve(samplesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('poly3.fromPoints', observed), 12)
  t.is(countOf('polygon.color', observed), 12)
  t.is(countOf('geom3.create', observed), 1)
})

test('deserialize amf file with materials to jscad script', function (t) {
  const inputPath = path.resolve(samplesPath, 'amf/cube-with-hole.amf')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('poly3.fromPoints', observed), 144)
  t.is(countOf('polygon.color', observed), 144)
  t.is(countOf('geom3.create', observed), 1)
})
