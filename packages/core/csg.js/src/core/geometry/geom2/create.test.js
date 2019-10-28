const test = require('ava')
const create = require('./create')

test('geom2: create() should return a new empty geometry', t => {
  const geom1 = create()
  t.deepEqual(geom1.sides, [])
  t.deepEqual(geom1.isCanonicalized, false)
})
