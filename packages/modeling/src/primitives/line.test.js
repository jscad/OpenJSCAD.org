import test from 'ava'

import { path2 } from '../geometries/index.js'

import { line } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('line (defaults)', (t) => {
  const exp = [[0, 0], [1, 1], [-3, 3]]
  const geometry = line([[0, 0], [1, 1], [-3, 3]])
  const obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.deepEqual(obs.length, 3)
  t.true(comparePoints(obs, exp))
})
