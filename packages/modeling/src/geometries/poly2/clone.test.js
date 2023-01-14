import test from 'ava'

import { create, clone } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('poly2: clone() should return a new poly2 with same values', (t) => {
  const org1 = create()
  const ret1 = clone(org1)
  t.true(comparePoints(ret1.points, org1.points))
  t.not(ret1, org1)

  const org2 = create([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  const ret2 = clone(org2)
  t.true(comparePoints(ret2.points, org2.points))
  t.not(ret2, org2)
})
