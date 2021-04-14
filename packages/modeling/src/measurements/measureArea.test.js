const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { line, rectangle, cuboid } = require('../primitives')

const { measureArea } = require('./index')

test('measureArea: single objects', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const larea = measureArea(aline)
  const rarea = measureArea(arect)
  const carea = measureArea(acube)

  const p2area = measureArea(apath2)
  const g2area = measureArea(ageom2)
  const g3area = measureArea(ageom3)

  const narea = measureArea(n)
  const oarea = measureArea(o)
  const xarea = measureArea(x)

  t.is(larea, 0)
  t.is(rarea, 4) // 2x2
  t.is(carea, 24) // 2x2x6

  t.is(p2area, 0)
  t.is(g2area, 0)
  t.is(g3area, 0)

  t.is(narea, 0)
  t.is(oarea, 0)
  t.is(xarea, 0)
})

test('measureArea (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid({ size: [10, 20, 40] })
  const o = {}

  let allarea = measureArea(aline, arect, acube, o)
  t.deepEqual(allarea, [0, 200, 2800, 0])

  allarea = measureArea(aline, arect, acube, o)
  t.deepEqual(allarea, [0, 200, 2800, 0])
})
