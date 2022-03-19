const test = require('ava')

const { geom3 } = require('../../geometries')

const { cube, torus } = require('../../primitives')

const { scission, union } = require('./index')

test('scission: scission of one or more geom3 objects produces expected geometry', (t) => {
  const geometry1 = geom3.create()
  const geometry2 = cube({ size: 5 })
  const geometry3 = cube({ size: 5, center: [5, 5, 5] })

  // scission of one object
  const result1 = scission(geometry1)
  t.is(result1.length, 0) // empty geometry, no pieces

  // scission of three objects
  const result2 = scission(geometry1, geometry2, geometry3)
  t.is(result2.length, 3)
  t.is(result2[0].length, 0)
  t.is(result2[1].length, 1)
  t.notThrows(() => geom3.validate(result2[1][0]))
  t.is(result2[2].length, 1)
  t.notThrows(() => geom3.validate(result2[2][0]))
})

test('scission: scission of complex geom3 produces expected geometry', (t) => {
  const geometry1 = torus({ outerRadius: 40, innerRadius: 5, outerSegments: 16, innerSegments: 16 })
  const geometry2 = torus({ outerRadius: 20, innerRadius: 5, outerSegments: 16, innerSegments: 16 })
  const geometry3 = union(geometry1, geometry2)

  const pc1 = geom3.toPolygons(geometry1).length
  const pc2 = geom3.toPolygons(geometry2).length
  const pc3 = geom3.toPolygons(geometry3).length

  t.is(pc1, 512)
  t.is(pc2, 512)
  t.is(pc3, 512) // due to retessellate

  const result1 = scission(geometry3)
  t.is(result1.length, 2)
  t.notThrows.skip(() => geom3.validate(result1[0]))
  t.notThrows.skip(() => geom3.validate(result1[1]))

  const rc1 = geom3.toPolygons(result1[0]).length
  const rc2 = geom3.toPolygons(result1[1]).length

  t.is(rc1, 256)
  t.is(rc2, 256)
})
