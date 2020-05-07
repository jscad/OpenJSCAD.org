const test = require('ava')

const geom3 = require('../geometry/geom3')

const {torus} = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('torus (defaults)', t => {
  const obs = torus()
  const pts = geom3.toPoints(obs)

  t.is(pts.length, 2048) // 32 * 32 * 2 (polys/segement) = 2048
})

test('torus (custom inner circle, customer outer circle)', t => {
  const obs = torus({innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8})
  const pts = geom3.toPoints(obs)
  const exp = [
  ]
  t.is(pts.length, 64) // 4 * 8 * 2 (polys/segment) = 64
  //t.true(comparePolygonsAsPoints(pts, exp))
})
