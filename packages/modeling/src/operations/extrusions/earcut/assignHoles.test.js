const test = require('ava')

const geom2 = require('../../../geometries/geom2')
const { subtract, union } = require('../../../operations/booleans')
const square = require('../../../primitives/square')
const assignHoles = require('./assignHoles')

const fromOutlines = (...outlines) => geom2.create(outlines.flatMap((points) =>
  points.map((point, i) => [point, points[(i + 1) % points.length]])
))

// toOutlines moves the first point to the end of each outline.
const rotated = (points) => points.slice(1).concat([points[0]])

test('slice: assignHoles() should return a polygon hierarchy', (t) => {
  const exp1 = [{
    solid: [
      [-3.000013333333334, -3.000013333333334],
      [3.000013333333334, -3.000013333333334],
      [3.000013333333334, 3.000013333333334],
      [-3.000013333333334, 3.000013333333334]
    ],
    holes: [[
      [-1.9999933333333335, 1.9999933333333335],
      [1.9999933333333335, 1.9999933333333335],
      [1.9999933333333335, -1.9999933333333335],
      [-1.9999933333333335, -1.9999933333333335]
    ]]
  }]
  const geometry = subtract(
    square({ size: 6 }),
    square({ size: 4 })
  )
  const obs1 = assignHoles(geometry)
  t.deepEqual(obs1, exp1)
})

test('slice: assignHoles() should keep separated solids and their holes in order', (t) => {
  const solids = [
    [[0, 0], [4, 0], [4, 4], [0, 4]],
    [[10, 0], [14, 0], [14, 4], [10, 4]],
    [[0, 10], [4, 10], [4, 14], [0, 14]]
  ]
  const holes = [
    [[1, 1], [1, 2], [2, 2], [2, 1]],
    [[11, 1], [11, 2], [12, 2], [12, 1]],
    [[1, 11], [1, 12], [2, 12], [2, 11]]
  ]
  const geometry = fromOutlines(solids[0], holes[0], solids[1], holes[1], solids[2], holes[2])
  t.deepEqual(assignHoles(geometry), solids.map((solid, i) => ({
    solid: rotated(solid),
    holes: [rotated(holes[i])]
  })))
})

test('slice: assignHoles() should check containment inside overlapping bounds', (t) => {
  const concave = [[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]]
  const solid = [[2, 2], [4, 2], [4, 4], [2, 4]]
  const hole = [[2.5, 2.5], [2.5, 3.5], [3.5, 3.5], [3.5, 2.5]]
  t.deepEqual(assignHoles(fromOutlines(concave, solid, hole)), [
    { solid: rotated(concave), holes: [] },
    { solid: rotated(solid), holes: [rotated(hole)] }
  ])
})

test('slice: assignHoles() should handle a single solid with multiple holes', (t) => {
  const solid = [[0, 0], [6, 0], [6, 4], [0, 4]]
  const first = [[1, 1], [1, 2], [2, 2], [2, 1]]
  const second = [[4, 1], [4, 2], [5, 2], [5, 1]]
  t.deepEqual(assignHoles(fromOutlines(solid, first, second)), [{
    solid: rotated(solid), holes: [rotated(first), rotated(second)]
  }])
})

test('slice: assignHoles() should handle empty geometry and solids without holes', (t) => {
  t.deepEqual(assignHoles(geom2.create()), [])
  const first = [[0, 0], [1, 0], [1, 1], [0, 1]]
  const second = [[2, 0], [3, 0], [3, 1], [2, 1]]
  t.deepEqual(assignHoles(fromOutlines(first, second)), [
    { solid: rotated(first), holes: [] },
    { solid: rotated(second), holes: [] }
  ])
})

test('slice: assignHoles() should handle nested holes', (t) => {
  const geometry = union(
    subtract(
      square({ size: 6 }),
      square({ size: 4 })
    ),
    subtract(
      square({ size: 10 }),
      square({ size: 8 })
    )
  )
  const obs1 = assignHoles(geometry)

  const exp1 = [
    {
      solid: [
        [-3.0000006060444444, -3.0000006060444444],
        [3.0000006060444444, -3.0000006060444444],
        [3.0000006060444444, 3.0000006060444444],
        [-3.0000006060444444, 3.0000006060444444]
      ],
      holes: [[
        [-2.0000248485333336, 2.0000248485333336],
        [2.0000248485333336, 2.0000248485333336],
        [2.0000248485333336, -2.0000248485333336],
        [-2.0000248485333336, -2.0000248485333336]
      ]]
    },
    {
      solid: [
        [-5.000025454577778, -5.000025454577778],
        [5.000025454577778, -5.000025454577778],
        [5.000025454577778, 5.000025454577778],
        [-5.000025454577778, 5.000025454577778]
      ],
      holes: [[
        [-3.9999763635555556, 3.9999763635555556],
        [3.9999763635555556, 3.9999763635555556],
        [3.9999763635555556, -3.9999763635555556],
        [-3.9999763635555556, -3.9999763635555556]
      ]]
    }
  ]
  t.deepEqual(obs1, exp1)
})
