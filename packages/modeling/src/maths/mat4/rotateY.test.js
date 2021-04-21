const test = require('ava')
const { rotateY, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: rotateY() called with out parameter should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const idn = create()

  const out2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = rotateY(out2, idn, rotation)
  t.true(compareVectors(out2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))
  t.is(out2, ret2)

  const out3 = create()
  const ret3 = rotateY(out3, out3, -rotation)
  t.true(compareVectors(out3, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]))
})
