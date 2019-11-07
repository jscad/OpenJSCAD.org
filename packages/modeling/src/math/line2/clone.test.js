const test = require('ava')
const { create, clone, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: clone() should return a new line2 with same values', (t) => {
  const org1 = fromValues(0, 0, 0)
  const obs1 = clone(org1)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.not(obs1, org1)

  const org2 = fromValues(1, 2, 3)
  const obs2 = clone(org2)
  t.true(compareVectors(obs2, [1, 2, 3]))
  t.not(obs2, org2)

  const org3 = fromValues(-1, -2, -3)
  const obs3 = clone(org3)
  t.true(compareVectors(obs3, [-1, -2, -3]))
  t.not(obs3, org3)
})

test('line2: clone() with two params should update a line2 with same values', (t) => {
  const line1 = create()
  const org1 = fromValues(0, 0, 0)
  const ret1 = clone(line1, org1)
  t.true(compareVectors(line1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))
  t.not(ret1, org1)

  const line2 = create()
  const org2 = fromValues(1, 2, 3)
  const ret2 = clone(line2, org2)
  t.true(compareVectors(line2, [1, 2, 3]))
  t.true(compareVectors(ret2, [1, 2, 3]))
  t.not(ret2, org2)

  const line3 = create()
  const org3 = fromValues(-1, -2, -3)
  const ret3 = clone(line3, org3)
  t.true(compareVectors(line3, [-1, -2, -3]))
  t.true(compareVectors(ret3, [-1, -2, -3]))
  t.not(ret3, org3)
})
