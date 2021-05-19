const test = require('ava')
const { abs, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: abs() with two params should update a vec3 with correct values', (t) => {
  const org1 = create()
  const ret1 = abs(org1, [0, 0, 0])
  t.true(compareVectors(org1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))
  t.is(org1, ret1)

  const org2 = create()
  const ret2 = abs(org2, [1, 2, 3])
  t.true(compareVectors(org2, [1, 2, 3]))
  t.true(compareVectors(ret2, [1, 2, 3]))
  t.is(org2, ret2)

  const org3 = create()
  const ret3 = abs(org3, [-1, -2, -3])
  t.true(compareVectors(org3, [1, 2, 3]))
  t.true(compareVectors(ret3, [1, 2, 3]))
  t.is(org3, ret3)
})
