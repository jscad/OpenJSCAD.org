const test = require('ava')
const { scale, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: scale() with two params should update a vec2 with positive values', (t) => {
  const vec1 = create()
  const ret1 = scale(vec1, [0, 0], 0)
  t.true(compareVectors(vec1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))
  t.is(vec1, ret1)

  const vec2 = create()
  const ret2 = scale(vec2, [1, 2], 3)
  t.true(compareVectors(vec2, [3, 6]))
  t.true(compareVectors(ret2, [3, 6]))
  t.is(vec2, ret2)

  const vec3 = create()
  const ret3 = scale(vec3, [-1, -2], 3)
  t.true(compareVectors(vec3, [-3, -6]))
  t.true(compareVectors(ret3, [-3, -6]))
  t.is(vec3, ret3)
})
