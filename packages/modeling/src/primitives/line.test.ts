import test from 'ava'

import { line } from './index'

import path2 from '../geometries/path2'

import comparePoints from '../../test/helpers/comparePoints'

test('line (defaults)', (t) => {
  const exp = [[0, 0], [1, 1], [-3, 3]]
  const geometry = line([[0, 0], [1, 1], [-3, 3]])
  const obs = path2.toPoints(geometry)

  t.deepEqual(obs.length, 3)
  t.true(comparePoints(obs, exp))
})
