const test = require('tape')
const computeBounds = require('./computeBounds')

test('computeBounds (geometry only)', t => {
  t.plan(1)
  const input = {
    geometry: {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4]
    }
  }

  const expBounds = {
    dia: 5.745432971379113,
    center: [-5, -0.4000000059604645, 2.5],
    min: [-10, -2.8, 1],
    max: [0, 2, 4],
    size: [10, 4.8, 3]
  }

  const bounds = computeBounds(input)

  t.equal(bounds, expBounds)
})

test('computeBounds (with transforms)', t => {
  t.plan(1)
  const input = {
    geometry: {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4]
    },
    transforms: {
      sca: [1, 1, 1]
    }
  }

  const expBounds = {
    dia: 5.745432971379113,
    center: [-5, -0.4000000059604645, 2.5],
    min: [-10, -2.8, 1],
    max: [0, 2, 4],
    size: [10, 4.8, 3]
  }

  const bounds = computeBounds(input)

  t.equal(bounds, expBounds)
})

test('computeBounds (non default scale)', t => {
  t.plan(1)
  const input = {
    geometry: {
      positions: [0, 2, 1, -10, 2, 1, -2.4, -2.8, 4]
    },
    transforms: {
      sca: [1.2, 0.7, -1]
    }
  }

  const expBounds = {
    dia: 9.415252306303229,
    center: [-6, -0.2800000011920929, -2.5],
    min: [-12, -1.9599999999999997, -1],
    max: [0, 1.4, -4],
    size: [12, 3.3599999999999994, -3]
  }

  const bounds = computeBounds(input)

  t.equal(bounds, expBounds)
})
