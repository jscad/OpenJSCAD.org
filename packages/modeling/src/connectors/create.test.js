import test from 'ava'

import { create } from './index.js'

import { compareVectors } from '../../test/helpers/index.js'

test('connector: create() should return a connector with initial values', (t) => {
  const obs = create()

  const point = [0, 0, 0]
  const axis = [0, 0, 1]
  const normal = [1, 0, 0]

  t.true(compareVectors(obs.point, point))
  t.true(compareVectors(obs.axis, axis))
  t.true(compareVectors(obs.normal, normal))
})
