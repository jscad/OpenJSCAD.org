const test = require('ava')
const { clone, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec4: clone() with one param should create a new vec4 with same values', (t) => {
  const vec1 = fromValues(0, 0, 0, 0)
  const ret1 = clone(vec1)
  t.not(ret1, vec1)
  t.true(compareVectors(vec1, [0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0]))

  const vec2 = fromValues(1, 2, 3, 4)
  const ret2 = clone(vec2)
  t.not(ret2, vec2)
  t.true(compareVectors(vec2, [1, 2, 3, 4]))
  t.true(compareVectors(ret2, [1, 2, 3, 4]))

  const vec3 = fromValues(-1, -2, -3, -4)
  const ret3 = clone(vec3)
  t.not(ret3, vec3)
  t.true(compareVectors(vec3, [-1, -2, -3, -4]))
  t.true(compareVectors(ret3, [-1, -2, -3, -4]))
})
