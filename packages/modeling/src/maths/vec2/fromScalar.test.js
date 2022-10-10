import test from 'ava'

import { fromScalar, create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: fromScalar() should return a new vec2 with correct values', (t) => {
  const obs1 = fromScalar(create(), 0)
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = fromScalar(obs1, -5)
  t.true(compareVectors(obs2, [-5, -5]))
})
