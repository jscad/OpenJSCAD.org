const test = require('ava')

const { line } = require('./index')

const path2 = require('../geometries/path2')

const comparePoints = require('../../test/helpers/comparePoints')

test('line (defaults)', (t) => {
  const exp = [[0, 0], [1, 1], [-3, 3]]
  const geometry = line([[0, 0], [1, 1], [-3, 3]])
  const obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.deepEqual(obs.length, 3)
  t.true(comparePoints(obs, exp))
})
