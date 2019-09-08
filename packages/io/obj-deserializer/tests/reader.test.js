const test = require('ava')

const ObjReader = require('../ObjReader.js')

test('reader properly handles commands', function (t) {
  const commands = `
# this is a comment

g
v 1  2   3   
vt -5.000000 5.000000 0.000000
vn 0.000000 0.000000 1.000000
vp 0.210000 3.590000
f 1 2 3 4
g square thing all
`

  // test the reader without asorbing anything
  let reader = new ObjReader()
  t.is(typeof reader, 'object')

  // test asorbing
  let count = 0
  const counter = (reader, command, values) => {
    count++
  }
  reader.absorb('v', counter)
  reader.absorb('f', counter)
  reader.absorb('g', counter)
  reader.write(commands)
  t.is(count, 4)
})
