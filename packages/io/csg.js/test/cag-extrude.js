import test from 'ava'
import {CSG, CAG} from '../csg'

//
// Test suite for CAG Extrude Functions
//
test('CAG should extrude', t => {
  // test using simple default shapes
  var c1 = CAG.circle()
  var c2 = CAG.ellipse()
  var c3 = CAG.rectangle()
  var c4 = CAG.roundedRectangle()

  var s1 = c1.extrude() // default options
  t.is(s1.toPolygons().length, 66)
  var s2 = c2.extrude() // default options
  t.is(s2.toPolygons().length, 70)
  var s3 = c3.extrude() // default options
  t.is(s3.toPolygons().length, 10)
  var s4 = c4.extrude() // default options
  t.is(s4.toPolygons().length, 74)

  s1 = c1.extrude({offset: [5, 5, 5]})
  t.is(s1.toPolygons().length, 66)
  s1 = c1.extrude({offset: [0, 0, 10], twistangle: 15, twiststeps: 5})
  t.is(s1.toPolygons().length, 322)
  s3 = c3.extrude({offset: [50, 0, 100], twistangle: 45, twiststeps: 10})
  t.is(s3.toPolygons().length, 82)
  s4 = c4.extrude({offset: [0, 10, -100], twistangle: 5, twiststeps: 100})
  t.is(s4.toPolygons().length, 7202)
})

test('CAG should extrudeInPlane', t => {
  // test using simple default shapes
  var c1 = CAG.circle()
  var c2 = CAG.ellipse()
  var c3 = CAG.rectangle()
  var c4 = CAG.roundedRectangle()

  var s1 = c1.extrudeInPlane('X', 'Z', 5)
  t.is(s1.toPolygons().length, 66)
  var s2 = c2.extrudeInPlane('-X', 'Z', 10, {symmetrical: true})
  t.is(s2.toPolygons().length, 70)
  var s3 = c3.extrudeInPlane('-Y', '-Z', 100, {symmetrical: false})
  t.is(s3.toPolygons().length, 10)
  var s4 = c4.extrudeInPlane('Y', '-Z', 20, {symmetrical: true})
  t.is(s4.toPolygons().length, 74)
})

test('CAG should extrudeInOrthonormalBasis', t => {
  // test using simple default shapes
  var c1 = CAG.circle()
  var c2 = CAG.ellipse()
  var c3 = CAG.rectangle()
  var c4 = CAG.roundedRectangle()

  var xy = CSG.OrthoNormalBasis.GetCartesian('X', 'Y')
  var zy = CSG.OrthoNormalBasis.GetCartesian('Z', 'Y')
  var xz = CSG.OrthoNormalBasis.GetCartesian('X', 'Z')
  var mm = CSG.OrthoNormalBasis.GetCartesian('-X', '-Z')

  var s1 = c1.extrudeInOrthonormalBasis(xy, 5)
  t.is(s1.toPolygons().length, 66)
  var s2 = c2.extrudeInOrthonormalBasis(zy, 5, {symmetrical: true})
  t.is(s2.toPolygons().length, 70)
  var s3 = c3.extrudeInOrthonormalBasis(zy, 5, {symmetrical: false})
  t.is(s3.toPolygons().length, 10)
  var s4 = c4.extrudeInOrthonormalBasis(mm, 100, {symmetrical: true})
  t.is(s4.toPolygons().length, 74)
})
