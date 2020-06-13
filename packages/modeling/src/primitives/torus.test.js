const test = require('ava')

const geom3 = require('../geometry/geom3')

const { torus } = require('./index')

// const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('torus (defaults)', (t) => {
  const obs = torus()
  const pts = geom3.toPoints(obs)

  t.is(pts.length, 2048) // 32 * 32 * 2 (polys/segement) = 2048
})

test('torus (options)', (t) => {
  let obs = torus({ innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8 })
  let pts = geom3.toPoints(obs)
  t.is(pts.length, 64) // 4 * 8 * 2 (polys/segment) = 64

  obs = torus({ outerRadius: 5, innerSegments: 32, outerSegments: 72, startAngle: Math.PI / 4, outerRotation: Math.PI / 2 })
  pts = geom3.toPoints(obs)
  t.is(pts.length, 1154)
})
