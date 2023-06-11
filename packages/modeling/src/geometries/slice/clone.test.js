import test from 'ava'

import { create, clone, fromVertices, toVertices } from './index.js'

test('slice: clone() should return a new slice with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.not(ret1, org1)

  const org2 = fromVertices([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const ret2 = clone(org2)
  t.not(ret2, org2)
  t.deepEqual(toVertices(ret2), toVertices(org2))
})
