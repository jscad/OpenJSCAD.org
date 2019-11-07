const test = require('ava')

const { create, clone, fromPoints, toEdges } = require('./index')

test('slice: clone() should return a new slice with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.not(ret1, org1)

  const org2 = fromPoints([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const ret2 = clone(org2)
  t.not(ret2, org2)
  t.deepEqual(toEdges(ret2), toEdges(org2))
})

test('slice: clone() with two params should update a slice with same values', (t) => {
  const org1 = create()
  const out1 = create()
  const ret1 = clone(out1, org1)
  t.not(out1, org1)
  t.not(ret1, org1)
  t.is(ret1, out1)

  t.deepEqual(toEdges(ret1), toEdges(org1))

  const org2 = fromPoints([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const out2 = create()
  const ret2 = clone(out2, org2)
  t.not(out2, org2)
  t.not(ret2, org2)
  t.is(ret2, out2)

  t.deepEqual(toEdges(ret2), toEdges(org2))
})
