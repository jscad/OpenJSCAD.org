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
    'hi'
  ]
  const options = {
  }
  const entities = entitiesFromSolids(options, solids)
  t.is(entities.length, 3)

  // geom2
  t.is(entities[0].type, '2d')
  t.deepEqual(entities[0].transforms, {
    matrix: Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })
  t.deepEqual(entities[0].bounds, {
    dia: 0.7071067811865476,
    center: [0.5, 0.5, 0],
    min: [0, 0, 0],
    max: [1, 1, 0],
    size: [1, 1, 0]
  })
  t.deepEqual(entities[0].visuals, {
    drawCmd: 'drawMesh',
    show: true,
    transparent: true,
    useVertexColors: true
  })

  // path2
  t.is(entities[1].type, '2d')
  t.deepEqual(entities[1].transforms, {
    matrix: Float32Array.from([5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2])
  })
  t.deepEqual(entities[1].bounds, {
    dia: 1.6007810593582121,
    center: [1.25, 1, 0],
    min: [0, 0, 0],
    max: [2.5, 2, 0],
    size: [2.5, 2, 0]
  })
  t.deepEqual(entities[1].visuals, {
    drawCmd: 'drawMesh',
    show: true,
    transparent: false,
    useVertexColors: true
  })

  // geom3
  t.is(entities[2].type, '3d')
  t.deepEqual(entities[2].transforms, {
    matrix: Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })
  t.deepEqual(entities[2].bounds, {
    dia: 5.196152422706632,
    center: [3, 5, 7],
    min: [0, 2, 4],
    max: [6, 8, 10],
    size: [6, 6, 6]
  })
  t.deepEqual(entities[1].visuals, {
    drawCmd: 'drawMesh',
    show: true,
    transparent: false,
    useVertexColors: true
  })
})
