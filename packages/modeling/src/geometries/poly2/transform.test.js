import test from 'ava'

import { transform, create } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('poly2: transform() should return a new poly2 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const exp1 = { points: [[0, 0], [1, 0], [1, 1]] }
  const org1 = create([[0, 0], [1, 0], [1, 1]])
  const ret1 = transform(identityMatrix, org1)
  t.true(comparePoints(ret1.points, exp1.points))
  t.not(org1, ret1)

  const x = 1
  const y = 5
  const z = 0
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const exp2 = { points: [[1, 5], [2, 5], [2, 6]] }
  const org2 = create([[0, 0], [1, 0], [1, 1]])
  const ret2 = transform(translationMatrix, org2)
  t.true(comparePoints(ret2.points, exp2.points))
  t.not(org2, ret2)

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const exp3 = { points: [[0, 0], [0, -1], [1, -1]] }
  const org3 = create([[0, 0], [1, 0], [1, 1]])
  const ret3 = transform(rotateZMatrix, org3)
  t.true(comparePoints(ret3.points, exp3.points))
  t.not(org3, ret3)

  const mirrorMatrix = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  const exp4 = { points: [[-1, 1], [-1, 0], [0, 0]] }
  const org4 = create([[0, 0], [1, 0], [1, 1]])
  const ret4 = transform(mirrorMatrix, org4)
  t.true(comparePoints(ret4.points, exp4.points))
  t.not(org4, ret4)
})
