const test = require('ava')
const { abs, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: abs() with two params should update a vec2 with correct values', (t) => {
  const vec1 = create()
  const ret1 = abs(vec1, [0, 0])
  t.true(compareVectors(vec1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))
  t.is(vec1, ret1)

  const vec2 = create()
  const ret2 = abs(vec2, [1, 2])
  t.true(compareVectors(vec2, [1, 2]))
  t.true(compareVectors(ret2, [1, 2]))
  t.is(vec2, ret2)

  const vec3 = create()
  const ret3 = abs(vec3, [-1, -2])
  t.true(compareVectors(vec3, [1, 2]))
  t.true(compareVectors(ret3, [1, 2]))
  t.is(vec3, ret3)
})
