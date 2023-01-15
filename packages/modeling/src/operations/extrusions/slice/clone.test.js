import test from 'ava'

import { create, clone, fromPoints, toPoints } from './index.js'

test('slice: clone() should return a new slice with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.not(ret1, org1)

  const org2 = fromPoints([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const ret2 = clone(org2)
  t.not(ret2, org2)
  t.deepEqual(toPoints(ret2), toPoints(org2))
})
