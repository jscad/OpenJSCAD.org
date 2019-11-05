const test = require('ava')
const Vertex = require('../src/core/math/Vertex3')
const Vector3D = require('../src/core/math/Vector3')
const Polygon = require('../src/core/math/Polygon3')
const {fromPolygons, fromObject} = require('../src/core/CSGFactories')

test('CSG can be created from polygons', t => {
  const vertices = [
    new Vertex(new Vector3D([0, 0, 0])),
    new Vertex(new Vector3D([0, 10, 0])),
    new Vertex(new Vector3D([0, 10, 10]))
  ]
  let polygons = new Polygon(vertices)
  const obsCSG = fromPolygons(polygons)
  t.deepEqual(obsCSG.polygons, polygons)
})

test('CSG can be created from objects', t => {
  const input = {
    polygons: [{
      vertices: [
        {pos: {x: 0, y: 0, z: 0}},
        {pos: {x: 0, y: 10, z: 0}},
        {pos: {x: 0, y: 10, z: 10}}
      ],
      shared: {
        color: [1, 0, 1, 1]
      },
      plane: {
        normal: [10, 1, 1],
        w: 1
      }
    }
    ]
  }
  const obsCSG = fromObject(input)
  t.deepEqual(obsCSG.polygons.length, 1)
})
