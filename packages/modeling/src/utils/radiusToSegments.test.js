const test = require('ava')

const { radiusToSegments } = require('./index')

test('utils: radiusToSegments() should return correct values', (t) => {
  // test defaults
  let segments = radiusToSegments(100.0)
  t.is(segments, 4.0)

  segments = radiusToSegments(100.0, 0, 0)
  t.is(segments, 4.0)

  // test specifying only length or angle
  segments = radiusToSegments(100.0, 2.0, 0)
  t.is(segments, 315)

  segments = radiusToSegments(100.0, 0, Math.PI * 2 / 20.0)
  t.is(segments, 20.0)

  // test minimum length versus minimum angle
  segments = radiusToSegments(100.0, 31, Math.PI * 2 / 20.0)
  t.is(segments, 21.0)

  segments = radiusToSegments(100.0, 32, Math.PI * 2 / 20.0)
  t.is(segments, 20.0)
})
