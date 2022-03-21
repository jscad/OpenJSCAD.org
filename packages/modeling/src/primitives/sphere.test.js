const test = require('ava')

const geom3 = require('../geometries/geom3')

const { sphere } = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('sphere (defaults)', (t) => {
  const obs = sphere()
  const pts = geom3.toPoints(obs)

  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 512)
})

test('sphere (options)', (t) => {
  // test radius
  let obs = sphere({ radius: 5, segments: 12 })
  let pts = geom3.toPoints(obs)
  let exp = []
  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 72)
  // t.true(comparePolygonsAsPoints(pts, exp))

  // test segments
  obs = sphere({ segments: 8 })
  pts = geom3.toPoints(obs)
  exp = [
    [[1, 0, 0], [0.7071067811865476, -0.7071067811865475, 0],
      [0.5000000000000001, -0.5, -0.7071067811865475], [0.7071067811865476, 0, -0.7071067811865475]],
    [[0.7071067811865476, 0, 0.7071067811865475], [0.5000000000000001, -0.5, 0.7071067811865475],
      [0.7071067811865476, -0.7071067811865475, 0], [1, 0, 0]],
    [[0.7071067811865476, 0, -0.7071067811865475], [0.5000000000000001, -0.5, -0.7071067811865475], [6.123233995736766e-17, 0, -1]],
    [[6.123233995736766e-17, 0, 1], [0.5000000000000001, -0.5, 0.7071067811865475], [0.7071067811865476, 0, 0.7071067811865475]],
    [[0.7071067811865476, -0.7071067811865475, 0], [6.123233995736766e-17, -1, 0],
      [4.329780281177467e-17, -0.7071067811865476, -0.7071067811865475], [0.5000000000000001, -0.5, -0.7071067811865475]],
    [[0.5000000000000001, -0.5, 0.7071067811865475], [4.329780281177467e-17, -0.7071067811865476, 0.7071067811865475],
      [6.123233995736766e-17, -1, 0], [0.7071067811865476, -0.7071067811865475, 0]],
    [[0.5000000000000001, -0.5, -0.7071067811865475], [4.329780281177467e-17, -0.7071067811865476, -0.7071067811865475],
      [4.329780281177467e-17, -4.329780281177466e-17, -1]],
    [[4.329780281177467e-17, -4.329780281177466e-17, 1],
      [4.329780281177467e-17, -0.7071067811865476, 0.7071067811865475],
      [0.5000000000000001, -0.5, 0.7071067811865475]],
    [[6.123233995736766e-17, -1, 0],
      [-0.7071067811865475, -0.7071067811865476, 0],
      [-0.5, -0.5000000000000001, -0.7071067811865475],
      [4.329780281177467e-17, -0.7071067811865476, -0.7071067811865475]],
    [[4.329780281177467e-17, -0.7071067811865476, 0.7071067811865475],
      [-0.5, -0.5000000000000001, 0.7071067811865475],
      [-0.7071067811865475, -0.7071067811865476, 0],
      [6.123233995736766e-17, -1, 0]],
    [[4.329780281177467e-17, -0.7071067811865476, -0.7071067811865475],
      [-0.5, -0.5000000000000001, -0.7071067811865475],
      [3.749399456654644e-33, -6.123233995736766e-17, -1]],
    [[3.749399456654644e-33, -6.123233995736766e-17, 1],
      [-0.5, -0.5000000000000001, 0.7071067811865475],
      [4.329780281177467e-17, -0.7071067811865476, 0.7071067811865475]],
    [[-0.7071067811865475, -0.7071067811865476, 0],
      [-1, -1.2246467991473532e-16, 0],
      [-0.7071067811865476, -8.659560562354934e-17, -0.7071067811865475],
      [-0.5, -0.5000000000000001, -0.7071067811865475]],
    [[-0.5, -0.5000000000000001, 0.7071067811865475],
      [-0.7071067811865476, -8.659560562354934e-17, 0.7071067811865475],
      [-1, -1.2246467991473532e-16, 0],
      [-0.7071067811865475, -0.7071067811865476, 0]],
    [[-0.5, -0.5000000000000001, -0.7071067811865475],
      [-0.7071067811865476, -8.659560562354934e-17, -0.7071067811865475],
      [-4.329780281177466e-17, -4.329780281177467e-17, -1]],
    [[-4.329780281177466e-17, -4.329780281177467e-17, 1],
      [-0.7071067811865476, -8.659560562354934e-17, 0.7071067811865475],
      [-0.5, -0.5000000000000001, 0.7071067811865475]],
    [[-1, -1.2246467991473532e-16, 0],
      [-0.7071067811865477, 0.7071067811865475, 0],
      [-0.5000000000000001, 0.5, -0.7071067811865475],
      [-0.7071067811865476, -8.659560562354934e-17, -0.7071067811865475]],
    [[-0.7071067811865476, -8.659560562354934e-17, 0.7071067811865475],
      [-0.5000000000000001, 0.5, 0.7071067811865475],
      [-0.7071067811865477, 0.7071067811865475, 0],
      [-1, -1.2246467991473532e-16, 0]],
    [[-0.7071067811865476, -8.659560562354934e-17, -0.7071067811865475],
      [-0.5000000000000001, 0.5, -0.7071067811865475],
      [-6.123233995736766e-17, -7.498798913309288e-33, -1]],
    [[-6.123233995736766e-17, -7.498798913309288e-33, 1],
      [-0.5000000000000001, 0.5, 0.7071067811865475],
      [-0.7071067811865476, -8.659560562354934e-17, 0.7071067811865475]],
    [[-0.7071067811865477, 0.7071067811865475, 0],
      [-1.8369701987210297e-16, 1, 0],
      [-1.29893408435324e-16, 0.7071067811865476, -0.7071067811865475],
      [-0.5000000000000001, 0.5, -0.7071067811865475]],
    [[-0.5000000000000001, 0.5, 0.7071067811865475],
      [-1.29893408435324e-16, 0.7071067811865476, 0.7071067811865475],
      [-1.8369701987210297e-16, 1, 0],
      [-0.7071067811865477, 0.7071067811865475, 0]],
    [[-0.5000000000000001, 0.5, -0.7071067811865475],
      [-1.29893408435324e-16, 0.7071067811865476, -0.7071067811865475],
      [-4.3297802811774677e-17, 4.329780281177466e-17, -1]],
    [[-4.3297802811774677e-17, 4.329780281177466e-17, 1],
      [-1.29893408435324e-16, 0.7071067811865476, 0.7071067811865475],
      [-0.5000000000000001, 0.5, 0.7071067811865475]],
    [[-1.8369701987210297e-16, 1, 0],
      [0.7071067811865474, 0.7071067811865477, 0],
      [0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
      [-1.29893408435324e-16, 0.7071067811865476, -0.7071067811865475]],
    [[-1.29893408435324e-16, 0.7071067811865476, 0.7071067811865475],
      [0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
      [0.7071067811865474, 0.7071067811865477, 0],
      [-1.8369701987210297e-16, 1, 0]],
    [[-1.29893408435324e-16, 0.7071067811865476, -0.7071067811865475],
      [0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
      [-1.1248198369963932e-32, 6.123233995736766e-17, -1]],
    [[-1.1248198369963932e-32, 6.123233995736766e-17, 1],
      [0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
      [-1.29893408435324e-16, 0.7071067811865476, 0.7071067811865475]],
    [[0.7071067811865474, 0.7071067811865477, 0],
      [1, 2.4492935982947064e-16, 0],
      [0.7071067811865476, 1.7319121124709868e-16, -0.7071067811865475],
      [0.4999999999999999, 0.5000000000000001, -0.7071067811865475]],
    [[0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
      [0.7071067811865476, 1.7319121124709868e-16, 0.7071067811865475],
      [1, 2.4492935982947064e-16, 0],
      [0.7071067811865474, 0.7071067811865477, 0]],
    [[0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
      [0.7071067811865476, 1.7319121124709868e-16, -0.7071067811865475],
      [4.329780281177465e-17, 4.3297802811774677e-17, -1]],
    [[4.329780281177465e-17, 4.3297802811774677e-17, 1],
      [0.7071067811865476, 1.7319121124709868e-16, 0.7071067811865475],
      [0.4999999999999999, 0.5000000000000001, 0.7071067811865475]]
  ]
  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 32)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test center
  obs = sphere({ center: [-3, 5, 7], segments: 8 })
  pts = geom3.toPoints(obs)
  exp = [
    [[-2, 5, 7], [-2.2928932188134525, 4.292893218813452, 7],
      [-2.5, 4.5, 6.292893218813452], [-2.2928932188134525, 5, 6.292893218813452]],
    [[-2.2928932188134525, 5, 7.707106781186548], [-2.5, 4.5, 7.707106781186548],
      [-2.2928932188134525, 4.292893218813452, 7], [-2, 5, 7]],
    [[-2.2928932188134525, 5, 6.292893218813452], [-2.5, 4.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.5, 4.5, 7.707106781186548], [-2.2928932188134525, 5, 7.707106781186548]],
    [[-2.2928932188134525, 4.292893218813452, 7], [-3, 4, 7],
      [-3, 4.292893218813452, 6.292893218813452], [-2.5, 4.5, 6.292893218813452]],
    [[-2.5, 4.5, 7.707106781186548], [-3, 4.292893218813452, 7.707106781186548],
      [-3, 4, 7], [-2.2928932188134525, 4.292893218813452, 7]],
    [[-2.5, 4.5, 6.292893218813452], [-3, 4.292893218813452, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3, 4.292893218813452, 7.707106781186548], [-2.5, 4.5, 7.707106781186548]],
    [[-3, 4, 7], [-3.7071067811865475, 4.292893218813452, 7],
      [-3.5, 4.5, 6.292893218813452], [-3, 4.292893218813452, 6.292893218813452]],
    [[-3, 4.292893218813452, 7.707106781186548], [-3.5, 4.5, 7.707106781186548],
      [-3.7071067811865475, 4.292893218813452, 7], [-3, 4, 7]],
    [[-3, 4.292893218813452, 6.292893218813452], [-3.5, 4.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.5, 4.5, 7.707106781186548], [-3, 4.292893218813452, 7.707106781186548]],
    [[-3.7071067811865475, 4.292893218813452, 7], [-4, 5, 7],
      [-3.7071067811865475, 5, 6.292893218813452], [-3.5, 4.5, 6.292893218813452]],
    [[-3.5, 4.5, 7.707106781186548], [-3.7071067811865475, 5, 7.707106781186548],
      [-4, 5, 7], [-3.7071067811865475, 4.292893218813452, 7]],
    [[-3.5, 4.5, 6.292893218813452], [-3.7071067811865475, 5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.7071067811865475, 5, 7.707106781186548], [-3.5, 4.5, 7.707106781186548]],
    [[-4, 5, 7], [-3.707106781186548, 5.707106781186548, 7],
      [-3.5, 5.5, 6.292893218813452], [-3.7071067811865475, 5, 6.292893218813452]],
    [[-3.7071067811865475, 5, 7.707106781186548], [-3.5, 5.5, 7.707106781186548],
      [-3.707106781186548, 5.707106781186548, 7], [-4, 5, 7]],
    [[-3.7071067811865475, 5, 6.292893218813452], [-3.5, 5.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.5, 5.5, 7.707106781186548], [-3.7071067811865475, 5, 7.707106781186548]],
    [[-3.707106781186548, 5.707106781186548, 7], [-3, 6, 7],
      [-3, 5.707106781186548, 6.292893218813452], [-3.5, 5.5, 6.292893218813452]],
    [[-3.5, 5.5, 7.707106781186548], [-3, 5.707106781186548, 7.707106781186548],
      [-3, 6, 7], [-3.707106781186548, 5.707106781186548, 7]],
    [[-3.5, 5.5, 6.292893218813452], [-3, 5.707106781186548, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3, 5.707106781186548, 7.707106781186548], [-3.5, 5.5, 7.707106781186548]],
    [[-3, 6, 7], [-2.2928932188134525, 5.707106781186548, 7],
      [-2.5, 5.5, 6.292893218813452], [-3, 5.707106781186548, 6.292893218813452]],
    [[-3, 5.707106781186548, 7.707106781186548], [-2.5, 5.5, 7.707106781186548],
      [-2.2928932188134525, 5.707106781186548, 7], [-3, 6, 7]],
    [[-3, 5.707106781186548, 6.292893218813452], [-2.5, 5.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.5, 5.5, 7.707106781186548], [-3, 5.707106781186548, 7.707106781186548]],
    [[-2.2928932188134525, 5.707106781186548, 7], [-2, 5, 7],
      [-2.2928932188134525, 5, 6.292893218813452], [-2.5, 5.5, 6.292893218813452]],
    [[-2.5, 5.5, 7.707106781186548], [-2.2928932188134525, 5, 7.707106781186548],
      [-2, 5, 7], [-2.2928932188134525, 5.707106781186548, 7]],
    [[-2.5, 5.5, 6.292893218813452], [-2.2928932188134525, 5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.2928932188134525, 5, 7.707106781186548], [-2.5, 5.5, 7.707106781186548]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 32)
  t.true(comparePolygonsAsPoints(pts, exp))
})
