const test = require('ava')
const create = require('./create')

test('geom2: hull() should create a convex hull around multiple shapes', t => {
  const geom1 = create()
  t.deepEqual(geom1.sides, [])
  t.deepEqual(geom1.isCanonicalized, false)
})
