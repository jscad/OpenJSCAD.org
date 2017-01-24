import test from 'ava';
import {CSG} from '../csg';
import {CAG} from '../csg';
import {OBJ} from '../helpers/obj-store';

//
// Test suite for CAG Common Shapes
//

test("CAG should produce proper circles", t => {
  var initCache = true;

  var c1 = CAG.circle(); // center:[0,0],radius:1,resolution:defaultResolution2D
  var c2 = CAG.circle({center: [10,10]});
  var c3 = CAG.circle({radius: 10});
  var c4 = CAG.circle({resolution: 4});

  if (initCache) OBJ.save('cag.c1',c1);
  t.deepEqual(c1,OBJ.load('cag.c1'));
  if (initCache) OBJ.save('cag.c2',c2);
  t.deepEqual(c2,OBJ.load('cag.c2'));
  if (initCache) OBJ.save('cag.c3',c3);
  t.deepEqual(c3,OBJ.load('cag.c3'));
  if (initCache) OBJ.save('cag.c4',c4);
  t.deepEqual(c4,OBJ.load('cag.c4'));
});

test("CAG should produce proper ellipses", t => {
  var initCache = true;

  var e1 = CAG.ellipse(); // center:[0,0],radius:[1,1],resolution:defaultResolution2D
  var e2 = CAG.ellipse({center: [10,10]});
  var e3 = CAG.ellipse({radius: [10,10]});
  var e4 = CAG.ellipse({resolution: 4});

  if (initCache) OBJ.save('cag.e1',e1);
  t.deepEqual(e1,OBJ.load('cag.e1'));
  if (initCache) OBJ.save('cag.e2',e2);
  t.deepEqual(e2,OBJ.load('cag.e2'));
  if (initCache) OBJ.save('cag.e3',e3);
  t.deepEqual(e3,OBJ.load('cag.e3'));
  if (initCache) OBJ.save('cag.e4',e4);
  t.deepEqual(e4,OBJ.load('cag.e4'));
});

test("CAG should produce proper rectangles", t => {
  var initCache = true;

  var r1 = CAG.rectangle(); // center: [0,0],radius[1,1]
  var r2 = CAG.rectangle({center: [10,10]});
  var r3 = CAG.rectangle({radius: [10,10]});
  var r4 = CAG.rectangle({corner1: [10,10],corner2: [-10,-10]});

  if (initCache) OBJ.save('cag.r1',r1);
  t.deepEqual(r1,OBJ.load('cag.r1'));
  if (initCache) OBJ.save('cag.r2',r2);
  t.deepEqual(r2,OBJ.load('cag.r2'));
  if (initCache) OBJ.save('cag.r3',r3);
  t.deepEqual(r3,OBJ.load('cag.r3'));
  if (initCache) OBJ.save('cag.r4',r4);
  t.deepEqual(r4,OBJ.load('cag.r4'));
});

test("CAG should produce proper rounded rectangles", t => {
  var initCache = true;

  var rr1 = CAG.roundedRectangle(); // center:[0,0],radius:[1,1],roundradius:0.2,resolution:defaultResolution2D
  var rr2 = CAG.roundedRectangle({center: [10,10]});
  var rr3 = CAG.roundedRectangle({radius: [10,10]});
  var rr4 = CAG.roundedRectangle({corner1: [10,10],corner2: [-10,-10]});
  var rr5 = CAG.roundedRectangle({radius: [10,10],roundradius: 2,resolution: 4});
  var rr6 = CAG.roundedRectangle({radius: [16,8],roundradius: 2});

  if (initCache) OBJ.save('cag.rr1',rr1);
  t.deepEqual(rr1,OBJ.load('cag.rr1'));
  if (initCache) OBJ.save('cag.rr2',rr2);
  t.deepEqual(rr2,OBJ.load('cag.rr2'));
  if (initCache) OBJ.save('cag.rr3',rr3);
  t.deepEqual(rr3,OBJ.load('cag.rr3'));
  if (initCache) OBJ.save('cag.rr4',rr4);
  t.deepEqual(rr4,OBJ.load('cag.rr4'));
  if (initCache) OBJ.save('cag.rr5',rr5);
  t.deepEqual(rr5,OBJ.load('cag.rr5'));
  if (initCache) OBJ.save('cag.rr6',rr6);
  t.deepEqual(rr6,OBJ.load('cag.rr6'));
});
