const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { line, rectangle, cuboid } = require('../../primitives')

const { measureBounds } = require('./index')

test('measureBounds (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lbounds = measureBounds(aline)
  const rbounds = measureBounds(arect)
  const cbounds = measureBounds(acube)

  const p2bounds = measureBounds(apath2)
  const g2bounds = measureBounds(ageom2)
  const g3bounds = measureBounds(ageom3)

  const nbounds = measureBounds(n)
  const obounds = measureBounds(o)
  const xbounds = measureBounds(x)

  t.deepEqual(lbounds, [[10, 10, 0], [15, 15, 0]])
  t.deepEqual(rbounds, [[-1, -1, 0], [1, 1, 0]])
  t.deepEqual(cbounds, [[-1, -1, -1], [1, 1, 1]])

  t.deepEqual(p2bounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(g2bounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(g3bounds, [[0, 0, 0], [0, 0, 0]])

  t.deepEqual(nbounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(obounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(xbounds, [[0, 0, 0], [0, 0, 0]])
})

test('measureBounds (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid()
  const o = {}

  const allbounds = measureBounds(aline, arect, acube, o)
  t.deepEqual(allbounds, [[[10, 10, 0], [15, 15, 0]], [[-5, -10, 0], [5, 10, 0]], [[-1, -1, -1], [1, 1, 1]], [[0, 0, 0], [0, 0, 0]]])
})
