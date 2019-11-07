const test = require('ava')

const { measureVolume, create, fromPoints } = require('./index')

test('geom3: measureVolume() should return correct values', (t) => {
  const org1 = create()
  const vol1 = measureVolume(org1)
  t.is(vol1, 0)

  // a single polygon, simple triangle
  const polygons = [
    [[5, 5, 5], [5, 15, 5], [5, 15, 15] ]
  ]
  const org2 = fromPoints(polygons)
  const vol2 = measureVolume(org2)
  t.is(vol2, 83.33333333333333)

  // box, bounding the axis
  const box3 = [
    [[-5.0, -5.0, -5.0], [-5.0, -5.0, 5.0], [-5.0, 5.0, 5.0], [-5.0, 5.0, -5.0]],
    [[5.0, -5.0, -5.0], [5.0, 5.0, -5.0], [5.0, 5.0, 5.0], [5.0, -5.0, 5.0]],
    [[-5.0, -5.0, -5.0], [5.0, -5.0, -5.0], [5.0, -5.0, 5.0], [-5.0, -5.0, 5.0]],
    [[-5.0, 5.0, -5.0], [-5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, -5.0]],
    [[-5.0, -5.0, -5.0], [-5.0, 5.0, -5.0], [5.0, 5.0, -5.0], [5.0, -5.0, -5.0]],
    [[-5.0, -5.0, 5.0], [5.0, -5.0, 5.0], [5.0, 5.0, 5.0], [-5.0, 5.0, 5.0]]
  ]
  const org3 = fromPoints(box3)
  const vol3 = measureVolume(org3)
  t.is(vol3, 999.9999999999999)

  // box, non-bounding of axis
  const box4 = [
    [[-15.0, -15.0, -15.0], [-15.0, -15.0, -5.0], [-15.0, -5.0, -5.0], [-15.0, -5.0, -15.0]],
    [[-5.0, -15.0, -15.0], [-5.0, -5.0, -15.0], [-5.0, -5.0, -5.0], [-5.0, -15.0, -5.0]],
    [[-15.0, -15.0, -15.0], [-5.0, -15.0, -15.0], [-5.0, -15.0, -5.0], [-15.0, -15.0, -5.0]],
    [[-15.0, -5.0, -15.0], [-15.0, -5.0, -5.0], [-5.0, -5.0, -5.0], [-5.0, -5.0, -15.0]],
    [[-15.0, -15.0, -15.0], [-15.0, -5.0, -15.0], [-5.0, -5.0, -15.0], [-5.0, -15.0, -15.0]],
    [[-15.0, -15.0, -5.0], [-5.0, -15.0, -5.0], [-5.0, -5.0, -5.0], [-15.0, -5.0, -5.0]]
  ]
  const org4 = fromPoints(box4)
  const vol4 = measureVolume(org4)
  t.is(vol4, 1000.0000000000001)
})
