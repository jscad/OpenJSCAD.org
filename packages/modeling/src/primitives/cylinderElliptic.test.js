const test = require('ava')

const { degToRad } = require('../math/utils')

const geom3 = require('../geometry/geom3')

const { cylinderElliptic } = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('cylinderElliptic (defaults)', t => {
  const obs = cylinderElliptic()
  const pts = geom3.toPoints(obs)

  t.is(pts.length, 36)
})

test('cylinderElliptic (options)', t => {
  // test height
  let obs = cylinderElliptic({ height: 10 })
  let pts = geom3.toPoints(obs)
  let exp = [
    [[0, 0, -5],
      [1, 0, -5],
      [0.8660253882408142, -0.5, -5]],
    [[0.8660253882408142, -0.5, -5],
      [1, 0, -5],
      [1, 0, 5],
      [0.8660253882408142, -0.5, 5]],
    [[0, 0, 5],
      [0.8660253882408142, -0.5, 5],
      [1, 0, 5]],
    [[0, 0, -5],
      [0.8660253882408142, -0.5, -5],
      [0.5, -0.8660253882408142, -5]],
    [[0.5, -0.8660253882408142, -5],
      [0.8660253882408142, -0.5, -5],
      [0.8660253882408142, -0.5, 5],
      [0.5, -0.8660253882408142, 5]],
    [[0, 0, 5],
      [0.5, -0.8660253882408142, 5],
      [0.8660253882408142, -0.5, 5]],
    [[0, 0, -5],
      [0.5, -0.8660253882408142, -5],
      [6.123234262925839e-17, -1, -5]],
    [[6.123234262925839e-17, -1, -5],
      [0.5, -0.8660253882408142, -5],
      [0.5, -0.8660253882408142, 5],
      [6.123234262925839e-17, -1, 5]],
    [[0, 0, 5],
      [6.123234262925839e-17, -1, 5],
      [0.5, -0.8660253882408142, 5]],
    [[0, 0, -5],
      [6.123234262925839e-17, -1, -5],
      [-0.5, -0.8660253882408142, -5]],
    [[-0.5, -0.8660253882408142, -5],
      [6.123234262925839e-17, -1, -5],
      [6.123234262925839e-17, -1, 5],
      [-0.5, -0.8660253882408142, 5]],
    [[0, 0, 5],
      [-0.5, -0.8660253882408142, 5],
      [6.123234262925839e-17, -1, 5]],
    [[0, 0, -5],
      [-0.5, -0.8660253882408142, -5],
      [-0.8660253882408142, -0.5, -5]],
    [[-0.8660253882408142, -0.5, -5],
      [-0.5, -0.8660253882408142, -5],
      [-0.5, -0.8660253882408142, 5],
      [-0.8660253882408142, -0.5, 5]],
    [[0, 0, 5],
      [-0.8660253882408142, -0.5, 5],
      [-0.5, -0.8660253882408142, 5]],
    [[0, 0, -5],
      [-0.8660253882408142, -0.5, -5],
      [-1, -1.2246468525851679e-16, -5]],
    [[-1, -1.2246468525851679e-16, -5],
      [-0.8660253882408142, -0.5, -5],
      [-0.8660253882408142, -0.5, 5],
      [-1, -1.2246468525851679e-16, 5]],
    [[0, 0, 5],
      [-1, -1.2246468525851679e-16, 5],
      [-0.8660253882408142, -0.5, 5]],
    [[0, 0, -5],
      [-1, -1.2246468525851679e-16, -5],
      [-0.8660253882408142, 0.5, -5]],
    [[-0.8660253882408142, 0.5, -5],
      [-1, -1.2246468525851679e-16, -5],
      [-1, -1.2246468525851679e-16, 5],
      [-0.8660253882408142, 0.5, 5]],
    [[0, 0, 5],
      [-0.8660253882408142, 0.5, 5],
      [-1, -1.2246468525851679e-16, 5]],
    [[0, 0, -5],
      [-0.8660253882408142, 0.5, -5],
      [-0.5, 0.8660253882408142, -5]],
    [[-0.5, 0.8660253882408142, -5],
      [-0.8660253882408142, 0.5, -5],
      [-0.8660253882408142, 0.5, 5],
      [-0.5, 0.8660253882408142, 5]],
    [[0, 0, 5],
      [-0.5, 0.8660253882408142, 5],
      [-0.8660253882408142, 0.5, 5]],
    [[0, 0, -5],
      [-0.5, 0.8660253882408142, -5],
      [-1.8369701465288538e-16, 1, -5]],
    [[-1.8369701465288538e-16, 1, -5],
      [-0.5, 0.8660253882408142, -5],
      [-0.5, 0.8660253882408142, 5],
      [-1.8369701465288538e-16, 1, 5]],
    [[0, 0, 5],
      [-1.8369701465288538e-16, 1, 5],
      [-0.5, 0.8660253882408142, 5]],
    [[0, 0, -5],
      [-1.8369701465288538e-16, 1, -5],
      [0.5, 0.8660253882408142, -5]],
    [[0.5, 0.8660253882408142, -5],
      [-1.8369701465288538e-16, 1, -5],
      [-1.8369701465288538e-16, 1, 5],
      [0.5, 0.8660253882408142, 5]],
    [[0, 0, 5],
      [0.5, 0.8660253882408142, 5],
      [-1.8369701465288538e-16, 1, 5]],
    [[0, 0, -5],
      [0.5, 0.8660253882408142, -5],
      [0.8660253882408142, 0.5, -5]],
    [[0.8660253882408142, 0.5, -5],
      [0.5, 0.8660253882408142, -5],
      [0.5, 0.8660253882408142, 5],
      [0.8660253882408142, 0.5, 5]],
    [[0, 0, 5],
      [0.8660253882408142, 0.5, 5],
      [0.5, 0.8660253882408142, 5]],
    [[0, 0, -5],
      [0.8660253882408142, 0.5, -5],
      [1, 2.4492937051703357e-16, -5]],
    [[1, 2.4492937051703357e-16, -5],
      [0.8660253882408142, 0.5, -5],
      [0.8660253882408142, 0.5, 5],
      [1, 2.4492937051703357e-16, 5]],
    [[0, 0, 5],
      [1, 2.4492937051703357e-16, 5],
      [0.8660253882408142, 0.5, 5]]
  ]

  t.is(pts.length, 36)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test startRadius and endRadius
  obs = cylinderElliptic({ startRadius: [1, 2], endRadius: [2, 1] })
  pts = geom3.toPoints(obs)
  exp = [
    [[0, 0, -1],
      [1, 0, -1],
      [0.8660253882408142, -1, -1]],
    [[1, 0, -1],
      [2, 0, 1],
      [0.8660253882408142, -1, -1]],
    [[0, 0, 1],
      [1.7320507764816284, -0.5, 1],
      [2, 0, 1]],
    [[2, 0, 1],
      [1.7320507764816284, -0.5, 1],
      [0.8660253882408142, -1, -1]],
    [[0, 0, -1],
      [0.8660253882408142, -1, -1],
      [0.5, -1.7320507764816284, -1]],
    [[0.8660253882408142, -1, -1],
      [1.7320507764816284, -0.5, 1],
      [0.5, -1.7320507764816284, -1]],
    [[0, 0, 1],
      [1, -0.8660253882408142, 1],
      [1.7320507764816284, -0.5, 1]],
    [[1.7320507764816284, -0.5, 1],
      [1, -0.8660253882408142, 1],
      [0.5, -1.7320507764816284, -1]],
    [[0, 0, -1],
      [0.5, -1.7320507764816284, -1],
      [6.123234262925839e-17, -2, -1]],
    [[0.5, -1.7320507764816284, -1],
      [1, -0.8660253882408142, 1],
      [6.123234262925839e-17, -2, -1]],
    [[0, 0, 1],
      [1.2246468525851679e-16, -1, 1],
      [1, -0.8660253882408142, 1]],
    [[1, -0.8660253882408142, 1],
      [1.2246468525851679e-16, -1, 1],
      [6.123234262925839e-17, -2, -1]],
    [[0, 0, -1],
      [6.123234262925839e-17, -2, -1],
      [-0.5, -1.7320507764816284, -1]],
    [[6.123234262925839e-17, -2, -1],
      [1.2246468525851679e-16, -1, 1],
      [-0.5, -1.7320507764816284, -1]],
    [[0, 0, 1],
      [-1, -0.8660253882408142, 1],
      [1.2246468525851679e-16, -1, 1]],
    [[1.2246468525851679e-16, -1, 1],
      [-1, -0.8660253882408142, 1],
      [-0.5, -1.7320507764816284, -1]],
    [[0, 0, -1],
      [-0.5, -1.7320507764816284, -1],
      [-0.8660253882408142, -1, -1]],
    [[-0.5, -1.7320507764816284, -1],
      [-1, -0.8660253882408142, 1],
      [-0.8660253882408142, -1, -1]],
    [[0, 0, 1],
      [-1.7320507764816284, -0.5, 1],
      [-1, -0.8660253882408142, 1]],
    [[-1, -0.8660253882408142, 1],
      [-1.7320507764816284, -0.5, 1],
      [-0.8660253882408142, -1, -1]],
    [[0, 0, -1],
      [-0.8660253882408142, -1, -1],
      [-1, -2.4492937051703357e-16, -1]],
    [[-0.8660253882408142, -1, -1],
      [-1.7320507764816284, -0.5, 1],
      [-1, -2.4492937051703357e-16, -1]],
    [[0, 0, 1],
      [-2, -1.2246468525851679e-16, 1],
      [-1.7320507764816284, -0.5, 1]],
    [[-1.7320507764816284, -0.5, 1],
      [-2, -1.2246468525851679e-16, 1],
      [-1, -2.4492937051703357e-16, -1]],
    [[0, 0, -1],
      [-1, -2.4492937051703357e-16, -1],
      [-0.8660253882408142, 1, -1]],
    [[-1, -2.4492937051703357e-16, -1],
      [-2, -1.2246468525851679e-16, 1],
      [-0.8660253882408142, 1, -1]],
    [[0, 0, 1],
      [-1.7320507764816284, 0.5, 1],
      [-2, -1.2246468525851679e-16, 1]],
    [[-2, -1.2246468525851679e-16, 1],
      [-1.7320507764816284, 0.5, 1],
      [-0.8660253882408142, 1, -1]],
    [[0, 0, -1],
      [-0.8660253882408142, 1, -1],
      [-0.5, 1.7320507764816284, -1]],
    [[-0.8660253882408142, 1, -1],
      [-1.7320507764816284, 0.5, 1],
      [-0.5, 1.7320507764816284, -1]],
    [[0, 0, 1],
      [-1, 0.8660253882408142, 1],
      [-1.7320507764816284, 0.5, 1]],
    [[-1.7320507764816284, 0.5, 1],
      [-1, 0.8660253882408142, 1],
      [-0.5, 1.7320507764816284, -1]],
    [[0, 0, -1],
      [-0.5, 1.7320507764816284, -1],
      [-1.8369701465288538e-16, 2, -1]],
    [[-0.5, 1.7320507764816284, -1],
      [-1, 0.8660253882408142, 1],
      [-1.8369701465288538e-16, 2, -1]],
    [[0, 0, 1],
      [-3.6739402930577075e-16, 1, 1],
      [-1, 0.8660253882408142, 1]],
    [[-1, 0.8660253882408142, 1],
      [-3.6739402930577075e-16, 1, 1],
      [-1.8369701465288538e-16, 2, -1]],
    [[0, 0, -1],
      [-1.8369701465288538e-16, 2, -1],
      [0.5, 1.7320507764816284, -1]],
    [[-1.8369701465288538e-16, 2, -1],
      [-3.6739402930577075e-16, 1, 1],
      [0.5, 1.7320507764816284, -1]],
    [[0, 0, 1],
      [1, 0.8660253882408142, 1],
      [-3.6739402930577075e-16, 1, 1]],
    [[-3.6739402930577075e-16, 1, 1],
      [1, 0.8660253882408142, 1],
      [0.5, 1.7320507764816284, -1]],
    [[0, 0, -1],
      [0.5, 1.7320507764816284, -1],
      [0.8660253882408142, 1, -1]],
    [[0.5, 1.7320507764816284, -1],
      [1, 0.8660253882408142, 1],
      [0.8660253882408142, 1, -1]],
    [[0, 0, 1],
      [1.7320507764816284, 0.5, 1],
      [1, 0.8660253882408142, 1]],
    [[1, 0.8660253882408142, 1],
      [1.7320507764816284, 0.5, 1],
      [0.8660253882408142, 1, -1]],
    [[0, 0, -1],
      [0.8660253882408142, 1, -1],
      [1, 4.898587410340671e-16, -1]],
    [[0.8660253882408142, 1, -1],
      [1.7320507764816284, 0.5, 1],
      [1, 4.898587410340671e-16, -1]],
    [[0, 0, 1],
      [2, 2.4492937051703357e-16, 1],
      [1.7320507764816284, 0.5, 1]],
    [[1.7320507764816284, 0.5, 1],
      [2, 2.4492937051703357e-16, 1],
      [1, 4.898587410340671e-16, -1]]
  ]

  t.is(pts.length, 48)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test startAngle and endAngle
  obs = cylinderElliptic({ startRadius: [1, 2], endRadius: [2, 1], startAngle: degToRad(90), endAngle: degToRad(270) })
  pts = geom3.toPoints(obs)
  exp = [
  ]

  t.is(pts.length, 28)
  // t.true(comparePolygonsAsPoints(pts, exp))

  // test segments
  obs = cylinderElliptic({ segments: 8 })
  pts = geom3.toPoints(obs)

  t.is(pts.length, 24)
})
