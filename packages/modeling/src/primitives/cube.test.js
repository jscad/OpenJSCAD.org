const test = require('ava')

const geom3 = require('../geometries/geom3')

const { cube } = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('cube (defaults)', (t) => {
  const obs = cube()
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 6)
})

test('cube (options)', (t) => {
  // test size
  const obs = cube({ size: 7 })
  const pts = geom3.toPoints(obs)
  const exp = [
    [[-3.5, -3.5, -3.5], [-3.5, -3.5, 3.5], [-3.5, 3.5, 3.5], [-3.5, 3.5, -3.5]],
    [[3.5, -3.5, -3.5], [3.5, 3.5, -3.5], [3.5, 3.5, 3.5], [3.5, -3.5, 3.5]],
    [[-3.5, -3.5, -3.5], [3.5, -3.5, -3.5], [3.5, -3.5, 3.5], [-3.5, -3.5, 3.5]],
    [[-3.5, 3.5, -3.5], [-3.5, 3.5, 3.5], [3.5, 3.5, 3.5], [3.5, 3.5, -3.5]],
    [[-3.5, -3.5, -3.5], [-3.5, 3.5, -3.5], [3.5, 3.5, -3.5], [3.5, -3.5, -3.5]],
    [[-3.5, -3.5, 3.5], [3.5, -3.5, 3.5], [3.5, 3.5, 3.5], [-3.5, 3.5, 3.5]]
  ]

  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})
