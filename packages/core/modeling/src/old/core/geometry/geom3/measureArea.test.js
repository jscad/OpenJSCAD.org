const test = require('ava')

const { measureArea, create, fromPoints } = require('./index')

test('geom3: measureArea() should return correct values', (t) => {
  const org1 = create()
  const area1 = measureArea(org1)
  t.is(area1, 0)

  // a single polygon, simple triangle
  const polygons = [
    [[0, 0, 0], [0, 10, 0], [0, 10, 10] ]
  ]
  const org2 = fromPoints(polygons)
  const area2 = measureArea(org2)
  t.is(area2, 50)

  const box1 = [
    [[-5.0, -5.0, -5.0], [-5.0, -5.0, 5.0], [-5.0, 5.0, 5.0], [-5.0, 5.0, -5.0]],
    [[5.0, -5.0, -5.0], [5.0, 5.0, -5.0], [5.0, 5.0, 5.0], [5.0, -5.0, 5.0]],
    [[-5.0, -5.0, -5.0], [5.0, -5.0, -5.0], [5.0, -5.0, 5.0], [-5.0, -5.0, 5.0]],
    [[-5.0, 5.0, -5.0], [-5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, -5.0]],
    [[-5.0, -5.0, -5.0], [-5.0, 5.0, -5.0], [5.0, 5.0, -5.0], [5.0, -5.0, -5.0]],
    [[-5.0, -5.0, 5.0], [5.0, -5.0, 5.0], [5.0, 5.0, 5.0], [-5.0, 5.0, 5.0]]
  ]
  const org3 = fromPoints(box1)
  const area3 = measureArea(org3)
  t.is(area3, 600)
})
