import test from 'ava'
import {CAG} from '../csg'
import {OBJ} from './helpers/obj-store'

//
// Test suite for CAG Common Shapes
//

test('CAG should produce proper circles', t => {
  var initCache = true

  var c1 = CAG.circle() // center:[0,0],radius:1,resolution:defaultResolution2D
  var c2 = CAG.circle({center: [10, 10]})
  var c3 = CAG.circle({radius: 10})
  var c4 = CAG.circle({resolution: 4})

// verify that object structures do not change
  t.deepEqual(c1, OBJ.loadPrevious('cag.c1', c1))
  t.deepEqual(c2, OBJ.loadPrevious('cag.c2', c2))
  t.deepEqual(c3, OBJ.loadPrevious('cag.c3', c3))
  t.deepEqual(c4, OBJ.loadPrevious('cag.c4', c4))
})

test('CAG should produce proper ellipses', t => {
  var initCache = true

  var e1 = CAG.ellipse() // center:[0,0],radius:[1,1],resolution:defaultResolution2D
  var e2 = CAG.ellipse({center: [10, 10]})
  var e3 = CAG.ellipse({radius: [10, 10]})
  var e4 = CAG.ellipse({resolution: 4})

// verify that object structures do not change
  t.deepEqual(e1, OBJ.loadPrevious('cag.e1', e1))
  t.deepEqual(e2, OBJ.loadPrevious('cag.e2', e2))
  t.deepEqual(e3, OBJ.loadPrevious('cag.e3', e3))
  t.deepEqual(e4, OBJ.loadPrevious('cag.e4', e4))
})

test('CAG should produce proper rectangles', t => {
  var initCache = true

  var r1 = CAG.rectangle() // center: [0,0],radius[1,1]
  var r2 = CAG.rectangle({center: [10, 10]})
  var r3 = CAG.rectangle({radius: [10, 10]})
  var r4 = CAG.rectangle({corner1: [10, 10], corner2: [-10, -10]})

// verify that object structures do not change
  t.deepEqual(r1, OBJ.loadPrevious('cag.r1', r1))
  t.deepEqual(r2, OBJ.loadPrevious('cag.r2', r2))
  t.deepEqual(r3, OBJ.loadPrevious('cag.r3', r3))
  t.deepEqual(r4, OBJ.loadPrevious('cag.r4', r4))
})

test('CAG should produce proper rounded rectangles', t => {
  var initCache = true

  var rr1 = CAG.roundedRectangle() // center:[0,0],radius:[1,1],roundradius:0.2,resolution:defaultResolution2D
  var rr2 = CAG.roundedRectangle({center: [10, 10]})
  var rr3 = CAG.roundedRectangle({radius: [10, 10]})
  var rr4 = CAG.roundedRectangle({corner1: [10, 10], corner2: [-10, -10]})
  var rr5 = CAG.roundedRectangle({radius: [10, 10], roundradius: 2, resolution: 4})
  var rr6 = CAG.roundedRectangle({radius: [16, 8], roundradius: 2})

// verify that object structures do not change
  t.deepEqual(rr1, OBJ.loadPrevious('cag.rr1', rr1))
  t.deepEqual(rr2, OBJ.loadPrevious('cag.rr2', rr2))
  t.deepEqual(rr3, OBJ.loadPrevious('cag.rr3', rr3))
  t.deepEqual(rr4, OBJ.loadPrevious('cag.rr4', rr4))
  t.deepEqual(rr5, OBJ.loadPrevious('cag.rr5', rr5))
  t.deepEqual(rr6, OBJ.loadPrevious('cag.rr6', rr6))
})
