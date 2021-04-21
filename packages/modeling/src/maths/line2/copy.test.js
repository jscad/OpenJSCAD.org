const test = require('ava')
const { create, copy, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: copy() with two params should update a line2 with same values', (t) => {
  const line1 = create()
  const org1 = fromValues(0, 0, 0)
  const ret1 = copy(line1, org1)
  t.true(compareVectors(line1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))
  t.not(ret1, org1)

  const line2 = create()
  const org2 = fromValues(1, 2, 3)
  const ret2 = copy(line2, org2)
  t.true(compareVectors(line2, [1, 2, 3]))
  t.true(compareVectors(ret2, [1, 2, 3]))
  t.not(ret2, org2)

  const line3 = create()
  const org3 = fromValues(-1, -2, -3)
  const ret3 = copy(line3, org3)
  t.true(compareVectors(line3, [-1, -2, -3]))
  t.true(compareVectors(ret3, [-1, -2, -3]))
  t.not(ret3, org3)
})
