const test = require('ava')
const { create, clone, fromPoints } = require('./index')

const { comparePolygons } = require('../../../test/helpers/index')

test('poly3: clone() should return a new poly3 with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.true(comparePolygons(ret1, org1))
  t.not(ret1, org1)

  const org2 = fromPoints([[1, 1, 0], [-1, 1, 0], [-1, -1, 0], [1, -1, 0]])
  const ret2 = clone(org2)
  t.true(comparePolygons(ret2, org2))
  t.not(ret2, org2)
})

test('poly3: clone() with two params should update a poly3 with same values', (t) => {
  const org1 = create()
  const out1 = create()
  const ret1 = clone(out1, org1)
  t.true(comparePolygons(org1, out1))
  t.true(comparePolygons(org1, ret1))
  t.not(out1, org1)
  t.not(ret1, org1)
  t.is(ret1, out1)

  const org2 = fromPoints([[1, 1, 0], [-1, 1, 0], [-1, -1, 0], [1, -1, 0]])
  const out2 = create()
  const ret2 = clone(out2, org2)
  t.true(comparePolygons(ret2, org2))
  t.not(out2, org2)
  t.not(ret2, org2)
  t.is(ret2, out2)
})
