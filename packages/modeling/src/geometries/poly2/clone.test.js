import test from 'ava'

import { create, clone } from './index.js'

import { comparePolygons } from '../../../test/helpers/index.js'

test('poly2: clone() should return a new poly2 with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.true(comparePolygons(ret1, org1))
  t.not(ret1, org1)

  const org2 = create([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const ret2 = clone(org2)
  t.true(comparePolygons(ret2, org2))
  t.not(ret2, org2)
})
