const test = require('ava')

const computeBounds = require('./computeBounds')

test('computeBounds (geometry only)', (t) => {
  const input = {
    positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
    transforms: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  const expBounds = {
    center: [-5, -0.3999999165534973, 2.5],
    dia: 5.74543293403176,
    max: [0, 2, 4],
    min: [-10, -2.8, 1],
    size: [10, 4.800000190734863, 3]
  }

  const bounds = computeBounds(input)

  t.deepEqual(bounds, expBounds)
})

test('computeBounds (geometry with translate)', (t) => {
  const input = {
    positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
    transforms: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      6, 6, 0, 1
    ]
  }

  const expBounds = {
    center: [1, 5.599999904632568, 2.5],
    dia: 5.745433008726469,
    max: [6, 8, 4],
    min: [-4, 3.2, 1],
    size: [10, 4.800000190734863, 3]
  }

  const bounds = computeBounds(input)

  t.deepEqual(bounds, expBounds)
})

test('computeBounds (geometry with scale)', (t) => {
  const input = {
    positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
    transforms: [
      10, 0, 0, 0,
      0, 10, 0, 0,
      0, 0, 10, 0,
      0, 0, 0, 1
    ]
  }

  const expBounds = {
    center: [-50, -4, 25],
    dia: 57.4543296888929,
    max: [0, 20, 40],
    min: [-100, -28, 10],
    size: [100, 48, 30]
  }

  const bounds = computeBounds(input)

  t.deepEqual(bounds, expBounds)
})

test('computeBounds (multiple geometries)', (t) => {
  const input = [
    {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
      transforms: [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]
    },
    {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
      transforms: [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        6, 6, 0, 1
      ]
    },
    {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4],
      transforms: [
        10, 0, 0, 0,
        0, 10, 0, 0,
        0, 0, 10, 0,
        0, 0, 0, 1
      ]
    }
  ]

  const expBounds = {
    center: [-47, -4, 20.5],
    dia: 61.3616329639295,
    max: [6, 20, 40],
    min: [-100, -28, 1],
    size: [106, 48, 39]
  }

  const bounds = computeBounds(input)

  t.deepEqual(bounds, expBounds)
})
