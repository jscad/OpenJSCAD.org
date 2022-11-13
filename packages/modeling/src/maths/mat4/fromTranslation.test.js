import test from 'ava'

import { fromTranslation, create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('mat4: fromTranslation() should return a new mat4 with correct values', (t) => {
  const obs1 = fromTranslation(create(), [2, 4, 6])
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1]))

  const obs2 = fromTranslation(obs1, [-2, -4, -6])
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, -4, -6, 1]))
})
