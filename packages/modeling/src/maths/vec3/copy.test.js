const test = require('ava')
const { create, copy, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: copy() with two params should update a vec3 with same values', (t) => {
  const vec1 = create()
  const org1 = fromValues(0, 0, 0)
  const ret1 = copy(vec1, org1)
  t.true(compareVectors(vec1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))
  t.not(ret1, org1)

  const vec2 = create()
  const org2 = fromValues(1, 2, 3)
  const ret2 = copy(vec2, org2)
  t.true(compareVectors(vec2, [1, 2, 3]))
  t.true(compareVectors(ret2, [1, 2, 3]))
  t.not(ret2, org2)

  const vec3 = create()
  const org3 = fromValues(-1, -2, -3)
  const ret3 = copy(vec3, org3)
  t.true(compareVectors(vec3, [-1, -2, -3]))
  t.true(compareVectors(ret3, [-1, -2, -3]))
  t.not(ret3, org3)
})
