const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { line, rectangle, cuboid } = require('../../primitives')

const { measureBounds } = require('./index')

test('measureBounds (single objects)', t => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let apath2 = path2.create()
  let ageom2 = geom2.create()
  let ageom3 = geom3.create()

  let n = null
  let o = {}
  let x = 'hi'

  let lbounds = measureBounds(aline)
  let rbounds = measureBounds(arect)
  let cbounds = measureBounds(acube)

  let p2bounds = measureBounds(apath2)
  let g2bounds = measureBounds(ageom2)
  let g3bounds = measureBounds(ageom3)

  let nbounds = measureBounds(n)
  let obounds = measureBounds(o)
  let xbounds = measureBounds(x)

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

test('measureBounds (multiple objects)', t => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle({ size: [10, 20] })
  let acube = cuboid()
  let o = {}

  let allbounds = measureBounds(aline, arect, acube, o)
  t.deepEqual(allbounds, [[[10, 10, 0], [15, 15, 0]], [[-5, -10, 0], [5, 10, 0]], [[-1, -1, -1], [1, 1, 1]], [[0, 0, 0], [0, 0, 0]]])
})
