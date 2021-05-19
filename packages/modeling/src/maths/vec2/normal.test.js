const test = require('ava')
const { create, normal } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: normal() with two params should update a vec2 with correct values', (t) => {
  const out1 = create()
  const ret1 = normal(out1, [0, 0])
  t.true(compareVectors(out1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))
  t.is(out1, ret1)

  const out2 = create()
  const ret2 = normal(out2, [1, 2])
  t.true(compareVectors(out2, [-2, 1], 1e-15))
  t.true(compareVectors(ret2, [-2, 1], 1e-15))
  t.is(out2, ret2)

  const out3 = create()
  const ret3 = normal(out3, [-1, -2])
  t.true(compareVectors(out3, [2, -1], 1e-15))
  t.true(compareVectors(ret3, [2, -1], 1e-15))
  t.is(out3, ret3)

  const out4 = create()
  const ret4 = normal(out4, [-1, 2])
  t.true(compareVectors(out4, [-2, -1], 1e-15))
  t.true(compareVectors(ret4, [-2, -1], 1e-15))
  t.is(out4, ret4)
})
