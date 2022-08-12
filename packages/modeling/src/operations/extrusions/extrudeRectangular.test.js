const test = require('ava')

const { TAU } = require('../../maths/constants')

const { geom2, geom3 } = require('../../geometries')

const { arc, rectangle } = require('../../primitives')

const { extrudeRectangular } = require('./index')

test('extrudeRectangular (defaults)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 44)

  obs = extrudeRectangular({ }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 32)
})

test('extrudeRectangular (chamfer)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ corners: 'chamfer' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 60)

  obs = extrudeRectangular({ corners: 'chamfer' }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 48)
})

test('extrudeRectangular (segments = 8, round)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 84)

  obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 64)
})

test('extrudeRectangular (holes)', (t) => {
  const geometry2 = geom2.create([
    [[15, 15], [-15, 15]],
    [[-15, 15], [-15, -15]],
    [[-15, -15], [15, -15]],
    [[15, -15], [15, 15]],
    [[-5, 5], [5, 5]],
    [[5, 5], [5, -5]],
    [[5, -5], [-5, -5]],
    [[-5, -5], [-5, 5]]
  ])

  const obs = extrudeRectangular({ size: 2, height: 15, segments: 16, corners: 'round' }, geometry2)
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 192)
})
