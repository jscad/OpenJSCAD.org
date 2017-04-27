import test from 'ava'
import {CSG} from '../csg'
import {nearlyEqual} from './helpers/nearlyEqual'

test('CSG.Vector2D creation', t => {
  // FAILS const v1 = new CSG.Vector2D()
  const v2 = new CSG.Vector2D(5, 5)
  t.is(v2.x, 5)
  t.is(v2.y, 5)

  const v3 = new CSG.Vector2D([-5, -5])
  t.is(v3.x, -5)
  t.is(v3.y, -5)

  const v4 = new CSG.Vector2D({x: 1, y: -1})
  t.is(v4.x, 1)
  t.is(v4.y, -1)

  const v5 = new CSG.Vector2D(v2)
  t.is(v5.x, 5)
  t.is(v5.y, 5)

  const v6 = CSG.Vector2D.Create(-5, 5)
  t.is(v6.x, -5)
  t.is(v6.y, 5)

  const v7 = CSG.Vector2D.fromAngleRadians(2)
  nearlyEqual(t, v7.x, -0.4161468365, 1e-10)
  nearlyEqual(t, v7.y, 0.9092974268, 1e-10)

  const v8 = CSG.Vector2D.fromAngle(-2)
  nearlyEqual(t, v8.x, -0.4161468365, 1e-10)
  nearlyEqual(t, v8.y, -0.9092974268, 1e-10)

  const v9 = CSG.Vector2D.fromAngleDegrees(45)
  nearlyEqual(t, v9.x, 0.7071067811, 1e-10)
  nearlyEqual(t, v9.y, 0.7071067811, 1e-10)
})

test('CSG.Vector2D operations', t => {
  const v1 = CSG.Vector2D.fromAngleDegrees(45)

  var v2 = v1.clone()
  nearlyEqual(t, v2.x, 0.7071067811, 1e-10)
  nearlyEqual(t, v2.y, 0.7071067811, 1e-10)

  var l = v2.length()
  t.is(l, 1.0)
  l = v2.lengthSquared()
  t.is(l, 1.0)

  var a = v2.angle()
  nearlyEqual(t, a, 0.7853981633, 1e-10)
  a = v2.angleRadians()
  nearlyEqual(t, a, 0.7853981633, 1e-10)
  a = v2.angleDegrees()
  nearlyEqual(t, a, 45.0, 1e-10)

  var v3 = v2.negated()
  nearlyEqual(t, v3.x, -0.7071067811, 1e-10)
  nearlyEqual(t, v3.y, -0.7071067811, 1e-10)

  v3 = v2.unit()
  nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  nearlyEqual(t, v3.y, 0.7071067811, 1e-10)

  v3 = v3.negated().abs()
  nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  nearlyEqual(t, v3.y, 0.7071067811, 1e-10)

  v3 = v2.normal()
  nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  nearlyEqual(t, v3.y, -0.7071067811, 1e-10)

  t.true(v1.equals(v2))

// use the 4 corners
  const c1 = new CSG.Vector2D(5, 0)
  const c2 = new CSG.Vector2D(0, 5)
  const c3 = new CSG.Vector2D(-5, 0)
  const c4 = new CSG.Vector2D(0, -5)

  v2 = c1.dividedBy(2)
  t.is(v2.x, 2.5)
  t.is(v2.y, 0.0)

  v2 = c1.times(5)
  t.is(v2.x, 25.0)
  t.is(v2.y, 0.0)

  v2 = c1.plus(c4)
  t.is(v2.x, 5.0)
  t.is(v2.y, -5.0)

  v2 = c1.minus(c4)
  t.is(v2.x, 5.0)
  t.is(v2.y, 5.0)

  v2 = c1.lerp(c2, 5)
  t.is(v2.x, -20.0)
  t.is(v2.y, 25.0)

  v2 = c1.min(c4)
  t.is(v2.x, 0.0)
  t.is(v2.y, -5.0)

  v2 = c1.max(c4)
  t.is(v2.x, 5.0)
  t.is(v2.y, 0.0)

  var d = c1.dot(c2)
  t.is(d, 0)
  d = c1.dot(c3)
  t.is(d, -25)
  d = c1.dot(c4)
  t.is(d, 0)

  d = c1.distanceTo(c2)
  nearlyEqual(t, d, 7.0710678118, 1e-10)
  d = c1.distanceTo(c3)
  nearlyEqual(t, d, 10.0, 1e-10)
  d = c1.distanceTo(c4)
  nearlyEqual(t, d, 7.0710678118, 1e-10)

  d = c1.distanceToSquared(c2)
  t.is(d, 50.0)
  d = c1.distanceToSquared(c3)
  t.is(d, 100.0)
  d = c1.distanceToSquared(c4)
  t.is(d, 50.0)

  d = c1.cross(c2)
  t.is(d, 25.0)
  d = c1.cross(c3)
  t.is(d, 0.0)
  d = c1.cross(c4)
  t.is(d, -25.0)

/*
  v2 = c1.multiply4x4(matrix4x4)
  v2 = c1.transform(matrix4x4)
 */
})

test('CSG.Vector2D conversions', t => {
  const v1 = new CSG.Vector2D({x: 1, y: -1})

  var s1 = v1.toString()
  t.is(v1.toString(), '(1.00, -1.00)')

  var v3 = v1.toVector3D(5)
  t.is(v3.x, 1)
  t.is(v3.y, -1)
  t.is(v3.z, 5)
})
