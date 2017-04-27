import test from 'ava'
import {CSG} from '../csg'
import {OBJ} from './helpers/obj-store'
import {assertSameGeometry} from './helpers/asserts'

// Testing common shape generation can only be done by comparing
// with previously human validated shapes. It would be trivially
// rewriting the generation code to test it with code instead.

function isValid (t, name, csg) {
  var expected = OBJ.loadPrevious('csg-shapes.' + name, csg)
  assertSameGeometry(t, csg, expected)
}

test('CSG.cube creates a cube', t => {
  isValid(t, 'c1', CSG.cube(/* center:[0,0,0],radius:[1,1,1] */))
  isValid(t, 'c2', CSG.cube({center: [5, 5, 5], radius: 10}))
  isValid(t, 'c3', CSG.cube({'corner1': [-5, -5, -5], 'corner2': [5, 5, 5]}))
})

test('CSG.sphere creates a sphere', t => {
  isValid(t, 's1', CSG.sphere(/* center:[0,0,0],radius:1,resolution:CSG.defaultResolution2D */))
  // var s2 = CSG.sphere({center:[5,5,5],radius:10});
  // var s3 = CSG.sphere({center:[0,0,0],radius:10,resolution:36});
  // var xv = new CSG.Vector3D([1, 0, 0]);
  // var yv = new CSG.Vector3D([0,-1, 0]);
  // var zv = new CSG.Vector3D([0, 0, 1]);
  // var s4 = CSG.sphere({radius:10,axes:[xv,yv,zv]});
})

test('CSG.cylinder creates a cylinder', t => {
  isValid(t, 'cy1', CSG.cylinder(/* start:[0,-1,0],end:[0,1,0],radius:1,resolution:CSG.defaultResolution2D,sectorAngle:360 */))
  isValid(t, 'cy2', CSG.cylinder({start: [-5, -5, -5], end: [5, 5, 5], radius: 5}))
  isValid(t, 'cy3', CSG.cylinder({radiusStart: 10, radiusEnd: 5, resolution: 36}))
  isValid(t, 'cy4', CSG.cylinder({start: [0, 0, -50], end: [0, 0, 50], radius: 10, sectorAngle: 360}))
})

test.todo('CSG should produce proper rounded cylinders')
test.todo('CSG should produce proper elliptic cylinders')
test.todo('CSG should produce proper rounded cube')
test.todo('CSG should produce proper polyhedrons')
