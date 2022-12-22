const test = require('ava')

const entitiesFromSolids = require('./entitiesFromSolids')

test('entitiesFromSolids (various solids)', (t) => {
  const solids = [
    null,
    { sides: [[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]], color: [1, 0, 0, 0.5] },
    { points: [[0, 0], [1, 0], [1, 1]], transforms: [5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2] },
    {
      polygons: [
        { vertices: [[0, 2, 4], [0, 2, 10], [0, 8, 10], [0, 8, 4]] },
        { vertices: [[6, 2, 4], [6, 8, 4], [6, 8, 10], [6, 2, 10]] },
        { vertices: [[0, 2, 4], [6, 2, 4], [6, 2, 10], [0, 2, 10]] },
        { vertices: [[0, 8, 4], [0, 8, 10], [6, 8, 10], [6, 8, 4]] },
        { vertices: [[0, 2, 4], [0, 8, 4], [6, 8, 4], [6, 2, 4]] },
        { vertices: [[0, 2, 10], [6, 2, 10], [6, 8, 10], [0, 8, 10]] }
      ]
    },
    'hi',
    { sides: [] },
    { points: [] },
    { polygons: [] }
  ]
  const options = {
  }
  const entities = entitiesFromSolids(options, solids)
  t.is(entities.length, 3)

  // geom2
  t.deepEqual(entities[0].visuals, {
    drawCmd: 'drawLines',
    show: true,
    transparent: true,
    useVertexColors: true
  })

  // path2
  t.deepEqual(entities[1].visuals, {
    drawCmd: 'drawLines',
    show: true,
    transparent: false,
    useVertexColors: true
  })

  // geom3
  t.deepEqual(entities[2].visuals, {
    drawCmd: 'drawMesh',
    show: true,
    transparent: false,
    useVertexColors: true
  })
})
