const test = require('ava')

const { geom2, geom3 } = require('../../geometries')

const { arc, rectangle } = require('../../primitives')

const { extrudeRectangular } = require('./index')

test('extrudeRectangular (defaults)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: Math.PI / 2, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ }, geometry1)
  let pts = geom3.toPoints(obs)
  t.is(pts.length, 50)

  obs = extrudeRectangular({ }, geometry2)
  pts = geom3.toPoints(obs)
  t.is(pts.length, 40)
})

test('extrudeRectangular (chamfer)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: Math.PI / 2, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ corners: 'chamfer' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.is(pts.length, 42)

  obs = extrudeRectangular({ corners: 'chamfer' }, geometry2)
  pts = geom3.toPoints(obs)
  t.is(pts.length, 32)
})

test('extrudeRectangular (segments = 8, round)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: Math.PI / 2, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.is(pts.length, 56)

  obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry2)
  pts = geom3.toPoints(obs)
  t.is(pts.length, 40)
})

test('extrudeRectangular (holes)', (t) => {
  const geometry2 = geom2.create([
    [[15.00000, 15.00000], [-15.00000, 15.00000]],
    [[-15.00000, 15.00000], [-15.00000, -15.00000]],
    [[-15.00000, -15.00000], [15.00000, -15.00000]],
    [[15.00000, -15.00000], [15.00000, 15.00000]],
    [[-5.00000, 5.00000], [5.00000, 5.00000]],
    [[5.00000, 5.00000], [5.00000, -5.00000]],
    [[5.00000, -5.00000], [-5.00000, -5.00000]],
    [[-5.00000, -5.00000], [-5.00000, 5.00000]]
  ])

  const obs = extrudeRectangular({ size: 2, height: 15, segments: 16, corners: 'round' }, geometry2)
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 122)
})
