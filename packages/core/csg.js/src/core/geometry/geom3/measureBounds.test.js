const test = require('ava')

const { measureBounds, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('geom3: measureBounds() should return correct values', (t) => {
  const org1 = create()
  const bounds1 = measureBounds(org1)
  t.true(compareVectors(bounds1[0], [0, 0, 0]))
  t.true(compareVectors(bounds1[1], [0, 0, 0]))

  // a single polygon, simple triangle
  const polygons = [
    [[0, 0, 0], [0, 10, 0], [0, 10, 10] ]
  ]
  const org2 = fromPoints(polygons)
  const bounds2 = measureBounds(org2)
  t.true(compareVectors(bounds2[0], [0, 0, 0]))
  t.true(compareVectors(bounds2[1], [0, 10, 10]))

  const box1 = [
    [[-5.0, -5.0, -5.0], [-5.0, -5.0, 5.0], [-5.0, 5.0, 5.0], [-5.0, 5.0, -5.0]],
    [[5.0, -5.0, -5.0], [5.0, 5.0, -5.0], [5.0, 5.0, 5.0], [5.0, -5.0, 5.0]],
    [[-5.0, -5.0, -5.0], [5.0, -5.0, -5.0], [5.0, -5.0, 5.0], [-5.0, -5.0, 5.0]],
    [[-5.0, 5.0, -5.0], [-5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, -5.0]],
    [[-5.0, -5.0, -5.0], [-5.0, 5.0, -5.0], [5.0, 5.0, -5.0], [5.0, -5.0, -5.0]],
    [[-5.0, -5.0, 5.0], [5.0, -5.0, 5.0], [5.0, 5.0, 5.0], [-5.0, 5.0, 5.0]]
  ]
  const org3 = fromPoints(box1)
  const bounds3 = measureBounds(org3)
  t.true(compareVectors(bounds3[0], [-5, -5, -5]))
  t.true(compareVectors(bounds3[1], [5, 5, 5]))
})
