import test from 'ava';
import {CSG} from '../csg';
import {CAG} from '../csg';
import {OBJ} from '../helpers/obj-store';

//
// Test suite for CSG Common Shapes
//

test("CSG should produce proper spheres", t => {
  var s1 = CSG.sphere(); // center:[0,0,0],radius:1,resolution:CSG.defaultResolution2D
  var s2 = CSG.sphere({center:[5,5,5],radius:10});
  var s3 = CSG.sphere({center:[0,0,0],radius:10,resolution:36});
  var xv = new CSG.Vector3D([1, 0, 0]);
  var yv = new CSG.Vector3D([0,-1, 0]);
  var zv = new CSG.Vector3D([0, 0, 1]);
  var s4 = CSG.sphere({radius:10,axes:[xv,yv,zv]});

// verify that object structures do not change
  t.deepEqual(s1,OBJ.loadPrevious('csg.s1',s1));
});

test("CSG should produce proper cylinders", t => {
  var c1 = CSG.cylinder(); // start:[0,-1,0],end:[0,1,0],radius:1,resolution:CSG.defaultResolution2D,sectorAngle:360
  var c2 = CSG.cylinder({start:[-5,-5,-5],end:[5,5,5],radius:5});
  var c3 = CSG.cylinder({radiusStart:10,radiusEnd:5,resolution:36});
  var c4 = CSG.cylinder({start:[0,0,-50],end:[0,0,50],radius:10,sectorAngle:360});
});

test("CSG should produce proper rounded cylinders", t => {
  var rc1 = CSG.roundedCylinder(); // start:[0,-1,0],end:[0,1,0],radius:1
});

test("CSG should produce proper cubes", t => {
  var c1 = CSG.cube(); // center:[0,0,0],radius:[1,1,1]
  var c2 = CSG.cube({center:[5,5,5],radius:10});
  var c3 = CSG.cube({corner1:[-5,-5,-5],corner2:[5,5,5]});
});

test("CSG should produce proper rounded cube", t => {
  var rc1 = CSG.roundedCube();
});

test("CSG should produce proper polyhedrons", t => {
  //var p1 = CSG.polyhedron();
});

