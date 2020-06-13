const test = require('ava')

const { primitives } = require('@jscad/modeling')

const serializer = require('../index.js')

test('serialize objects to stl (binary)', (t) => {
  const object1 = primitives.cube()
  const observed = serializer.serialize({ binary: true }, object1)

  // TODO: VERY shallow testing ... improve
  t.deepEqual(observed[0].byteLength, 80)
  t.deepEqual(observed[1].byteLength, 4)
  t.deepEqual(observed[2].byteLength, 600)
})
