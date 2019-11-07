const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { line, rectangle, cuboid } = require('../../primitives')

const { measureArea } = require('./index')

test('measureArea: single objects', (t) => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let apath2 = path2.create()
  let ageom2 = geom2.create()
  let ageom3 = geom3.create()

  let n = null
  let o = {}
  let x = 'hi'

  let larea = measureArea(aline)
  let rarea = measureArea(arect)
  let carea = measureArea(acube)

  let p2area = measureArea(apath2)
  let g2area = measureArea(ageom2)
  let g3area = measureArea(ageom3)

  let narea = measureArea(n)
  let oarea = measureArea(o)
  let xarea = measureArea(x)

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

test('measureArea (multiple objects)', t => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle({ size: [10, 20] })
  let acube = cuboid({ size: [10, 20, 40] })
  let o = {}

  let allarea = measureArea(aline, arect, acube, o)
  t.deepEqual(allarea, [0, 200, 2800, 0])
})
