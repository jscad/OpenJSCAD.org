
const fromPolygons = require('../core/geometry/shape3/fromPolygons')

// not actual implementation, just for testing !!
const cuboid = (width, depth, height) => {
  let result = fromPolygons([
    [
      [0, 4, 6, 2],
      [-1, 0, 0]
    ],
    [
      [1, 3, 7, 5],
      [+1, 0, 0]
    ],
    [
      [0, 1, 5, 4],
      [0, -1, 0]
    ],
    [
      [2, 6, 7, 3],
      [0, +1, 0]
    ],
    [
      [0, 2, 3, 1],
      [0, 0, -1]
    ],
    [
      [4, 5, 7, 6],
      [0, 0, +1]
    ]
  ])
  return result
}
