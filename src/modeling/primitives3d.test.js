import test from 'ava'
import { cube, sphere, geodesicSphere, cylinder, torus, polyhedron } from './primitives3d'

/* FIXME : not entirely sure how to deal with this, but for now relies on inspecting
output data structures: we should have higher level primitives ...*/

test('cube (defaults)', t => {
  const obs = cube()
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 1, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 1 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 1 } }

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, single parameter)', t => {
  const obs = cube(2)
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 2 } },
      { pos: { _x: 2, _y: 0, _z: 2 } },
      { pos: { _x: 2, _y: 2, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 2 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 2 } }

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 1, _z: 1})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, single value, object parameter)', t => {
  const obs = cube({size: 2})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 2 } },
      { pos: { _x: 2, _y: 0, _z: 2 } },
      { pos: { _x: 2, _y: 2, _z: 2 } },
      { pos: { _x: 0, _y: 2, _z: 2 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 2 } }

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 1, _z: 1})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, array value, object parameter)', t => {
  const obs = cube({size: [2, 1, 3]})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 3 } },
      { pos: { _x: 0, _y: 1, _z: 3 } },
      { pos: { _x: 0, _y: 1, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 3 } },
      { pos: { _x: 2, _y: 0, _z: 3 } },
      { pos: { _x: 2, _y: 1, _z: 3 } },
      { pos: { _x: 0, _y: 1, _z: 3 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 3 } }

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 1.5})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (standard size, custom center(booleans), object parameter)', t => {
  const obs = cube({size: 1, center: [false, true, false]})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: -0.5, _z: 0 } },
      { pos: { _x: 0, _y: -0.5, _z: 1 } },
      { pos: { _x: 0, _y: 0.5, _z: 1 } },
      { pos: { _x: 0, _y: 0.5, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0, _y: -0.5, _z: 1 } },
      { pos: { _x: 1, _y: -0.5, _z: 1 } },
      { pos: { _x: 1, _y: 0.5, _z: 1 } },
      { pos: { _x: 0, _y: 0.5, _z: 1 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 1 } }

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0, _z: 0.5})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (standard size, rounded)', t => {
  const obs = cube({round: true})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0.09999999999999998, _y: 0, _z: 0.09999999999999998 } },
      { pos: { _x: 0.029289321881345254,
          _y: 0.0292893218813452,
      _z: 0.09999999999999998 } },
      { pos: { _x: 0.04999999999999999,
          _y: 0.04999999999999993,
      _z: 0.029289321881345254 } },
      { pos: { _x: 0.09999999999999998,
          _y: 0.0292893218813452,
      _z: 0.029289321881345254 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0.3574067443365931,
        _y: -0.8628562094610168,
      _z: -0.3574067443365933 },
    w: -0.07148134886731874 }
  }

  const expPoly5 = { vertices: [ { pos: { _x: 0.8999999999999998, _y: 0.09999999999999998, _z: 0 } },
      { pos: { _x: 0.9000000000000005,
          _y: 0.0292893218813452,
      _z: 0.029289321881345254 } },
      { pos: { _x: 0.09999999999999998,
          _y: 0.0292893218813452,
      _z: 0.029289321881345254 } },
      { pos: { _x: 0.09999999999999998, _y: 0.09999999999999998, _z: 0 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0, _y: -0.3826834323650898, _z: -0.9238795325112868 },
  w: -0.03826834323650884 } }

  t.deepEqual(obs.properties.sphere.center, {_x: 0.09999999999999998, _y: 0.09999999999999998, _z: 0.09999999999999998})
  t.deepEqual(obs.properties.roundedCube.center, {pos: {_x: 0.5, _y: 0.5, _z: 0.5}})
  t.deepEqual(obs.polygons.length, 62)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('sphere (defaults)', t => {
  const obs = sphere()
  const expFirstPoly = {
    vertices: [ { pos: { _x: 1, _y: 0, _z: 0 } },
      { pos: { _x: 0.9807852804032304, _y: -0.19509032201612825, _z: 0 } },
      { pos: { _x: 0.9619397662556434, _y: -0.19134171618254486, _z: -0.19509032201612825 } },
      { pos: { _x: 0.9807852804032304, _y: 0, _z: -0.19509032201612825 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.9904383506609418, _y: -0.09754966309535142, _z: -0.09754966309535128 },
  w: 0.9904383506609418 } }

  const expPoly511 = { vertices: [
      { pos: { _x: 6.005577771483276e-17, _y: 1.1945836920083923e-17, _z: 1 } },
      { pos: { _x: 0.19509032201612833,_y: 4.778334768033559e-17, _z: 0.9807852804032304 } },
      { pos: { _x: 0.19134171618254492, _y: 0.03806023374435672, _z: 0.9807852804032304 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.09801257320997024, _y: 0.009653395882096847, _z: 0.9951383559288144 },
  w: 0.9951383559288144 } }

  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
  t.deepEqual(obs.polygons.length, 512)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[511], expPoly511)
})

test('sphere (geodesic)', t => {
  const obs = sphere({type: 'geodesic'})
  const expFirstPoly = {
    vertices: [
      { pos: { _x: 0.9376113117392494, _y: 0, _z: -0.3476852428542286 } },
      { pos: { _x: 0.8659842041673648, _y: -0.1875222783339947, _z: -0.46358036332554414 } },
      { pos: { _x: 0.850650911463407, _y: 0, _z: -0.5257309452814002 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.8962330678097445, _y: -0.07179554325990238, _z: -0.4377347234711329 },
  w: 0.9925121659689756 } }

  const expPoly499 = { vertices: [
      { pos: { _x: 0, _y: -0.5257309452814002, _z: -0.850650911463407 } },
      { pos: { _x: 0.11589509083138601, _y: -0.6511026416595388, _z: -0.7500891133359788 } },
      { pos: { _x: -0.11589509083138601, _y: -0.6511026416595388, _z: -0.7500891133359788 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0, _y: -0.6256977990747257, _z: -0.7800655512410763 },
  w: 0.9925121675324735 } }

  t.deepEqual(obs.polygons.length, 500)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[499], expPoly499)
})

test('sphere (custom radius , resolution, center)', t => {
  const obs = sphere({r: 2, fn: 10, center: [true, true, false]})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 2, _y: 0, _z: 2 } },
      { pos: { _x: 1.618033988749895, _y: -1.1755705045849463, _z: 2 } },
      { pos: { _x: 1.4012585384440737, _y: -1.0180739209102545, _z: 1 } },
      { pos: { _x: 1.7320508075688774, _y: 0, _z: 1 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.9216023954604601,
        _y: -0.29944677038053147,
      _z: -0.24694261760621833 },
  w: 1.3493195557084836 } }

  const expPoly59 = { vertices: [ { pos: { _x: 9.907600726170914e-17, _y: 7.19829327805997e-17, _z: 4 } },
      { pos: { _x: 1.0000000000000002, _y: 2.449293598294707e-16, _z: 3.732050807568877 } },
      { pos: { _x: 0.8090169943749475, _y: 0.5877852522924735, _z: 3.732050807568877 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.2579086818975185,
        _y: 0.08379961057797093,
      _z: 0.9625283045546582 },
  w: 3.850113218218633 } }

  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 2})
  t.deepEqual(obs.polygons.length, 60)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[59], expPoly59)
})

test('cylinder (defaults)', t => {
  const obs = cylinder()
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 1, _y: 0, _z: 0 } },
      { pos: { _x: 0.9807852804032304, _y: -0.19509032201612825, _z: 0 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: -1 }, w: 0 } }

  const expPoly95 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 2.4492935982947064e-16, _z: 1 } },
      { pos: { _x: 0.9807852804032303, _y: 0.19509032201612872, _z: 1 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: 1 }, w: 1 } }

  t.deepEqual(obs.properties.cylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.properties.cylinder.end, {point: {_x: 0,_y: 0,_z: 1},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.polygons.length, 96)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[95], expPoly95)
})

test('cylinder (defaults)', t => {
  const obs = cylinder()
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 1, _y: 0, _z: 0 } },
      { pos: { _x: 0.9807852804032304, _y: -0.19509032201612825, _z: 0 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: -1 }, w: 0 } }

  const expPoly95 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 2.4492935982947064e-16, _z: 1 } },
      { pos: { _x: 0.9807852804032303, _y: 0.19509032201612872, _z: 1 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: 1 }, w: 1 } }

  t.deepEqual(obs.properties.cylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.properties.cylinder.end, {point: {_x: 0,_y: 0,_z: 1},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.polygons.length, 96)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[95], expPoly95)
})

test('cylinder (custom radius, height, center, resolution)', t => {
  const obs = cylinder({r: 2, h: 10, center: [true, true, false], fn: 10})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 2, _y: 0, _z: 0 } },
      { pos: { _x: 1.618033988749895, _y: -1.1755705045849463, _z: 0 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: -1 }, w: 0 } }

  const expPoly29 = { vertices: [ { pos: { _x: 0, _y: 0, _z: 10 } },
      { pos: { _x: 2, _y: 4.898587196589413e-16, _z: 10 } },
      { pos: { _x: 1.6180339887498945, _y: 1.1755705045849467, _z: 10 } } ],
    shared: { color: null, tag: 296 },
  plane: { normal: { _x: 0, _y: 0, _z: 1 }, w: 10 } }

  t.deepEqual(obs.properties.cylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.properties.cylinder.end, {point: {_x: 0,_y: 0,_z: 10},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 1,_y: 0,_z: 0}})
  t.deepEqual(obs.polygons.length, 30)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[29], expPoly29)
})

test('cylinder (custom double radius, rounded)', t => {
  const obs = cylinder({r1: 2, r2: 3, round: true})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 1 } },
      { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 1 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.09801714032956071, _y: 0.9951847266721969, _z: 0 },
  w: 0.9951847266721969 } }

  const expPoly543 = { vertices: [ { pos: { _x: -1.1945836920083923e-17, _y: 6.005577771483276e-17, _z: 2 } },
      { pos: { _x: -4.778334768033559e-17, _y: 0.19509032201612833, _z: 1.9807852804032304 } },
      { pos: { _x: -0.03806023374435672, _y: 0.19134171618254492, _z: 1.9807852804032304 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0.009653395882096847, _y: 0.09801257320997024, _z: 0.9951383559288144 },
  w: 1.9902767118576288 } }

  t.deepEqual(obs.properties.roundedCylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.properties.roundedCylinder.end, {point: {_x: 0,_y: 0,_z: 1},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.polygons.length, 544)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[543], expPoly543)
})

test('cylinder (custom double diameter, rounded)', t => {
  const obs = cylinder({d1: 1, d2: 1.5, round: true})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 1 } },
      { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 1 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.09801714032956071, _y: 0.9951847266721969, _z: 0 },
  w: 0.9951847266721969 } }

  const expPoly543 = { vertices: [ { pos: { _x: -1.1945836920083923e-17, _y: 6.005577771483276e-17, _z: 2 } },
      { pos: { _x: -4.778334768033559e-17, _y: 0.19509032201612833, _z: 1.9807852804032304 } },
      { pos: { _x: -0.03806023374435672, _y: 0.19134171618254492, _z: 1.9807852804032304 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0.009653395882096847, _y: 0.09801257320997024, _z: 0.9951383559288144 },
  w: 1.9902767118576288 } }

  t.deepEqual(obs.properties.roundedCylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.properties.roundedCylinder.end, {point: {_x: 0,_y: 0,_z: 1},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.polygons.length, 544)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[543], expPoly543)
})

test('cylinder (custom double diameter, rounded, start, end)', t => {
  const obs = cylinder({d1: 1, d2: 1.5, round: true, start: [0, 0, 0], end: [0, 0, 10]})
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 10 } },
      { pos: { _x: 0.19509032201612825, _y: 0.9807852804032304, _z: 10 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.0980171403295607, _y: 0.9951847266721968, _z: 0 },
  w: 0.9951847266721968 } }

  const expPoly543 = { vertices: [ { pos: { _x: -1.1945836920083923e-17, _y: 6.005577771483276e-17, _z: 11 } },
      { pos: { _x: -4.778334768033559e-17, _y: 0.19509032201612833, _z: 10.98078528040323 } },
      { pos: { _x: -0.03806023374435672, _y: 0.19134171618254492, _z: 10.98078528040323 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: -0.009653395882096847, _y: 0.09801257320997024, _z: 0.9951383559288144 },
  w: 10.946521915216959 } }

  t.deepEqual(obs.properties.roundedCylinder.start, {point: {_x: 0,_y: 0,_z: 0},axisvector: {_x: 0,_y: 0,_z: -1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.properties.roundedCylinder.end, {point: {_x: 0,_y: 0,_z: 10},axisvector: {_x: 0,_y: 0,_z: 1},normalvector: {_x: 0,_y: 1,_z: 0}})
  t.deepEqual(obs.polygons.length, 544)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[543], expPoly543)
})

test('torus (defaults)', t => {
  const obs = torus()
  const expFirstPoly = {
    vertices: [ { pos: { _x: 5, _y: 0, _z: 0 } },
      { pos: { _x: 4.923879532511287, _y: 0, _z: 0.3826834323650898 } },
      { pos: { _x: 4.829268567965809, _y: -0.96060124356625, _z: 0.3826834323650898 } },
      { pos: { _x: 4.903926402016152, _y: -0.9754516100806412, _z: 0 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.9762410328686745, _y: -0.09615134934208372, _z: 0.19418641498107 },
  w: 4.881205164343372 } }

  const expLastPoly = { vertices: [
      { pos: { _x: 4.8292685679658085, _y: 0.9606012435662521, _z: -0.3826834323650904 } },
      { pos: { _x: 4.903926402016151, _y: 0.9754516100806436, _z: -2.4492935982947064e-16 } },
      { pos: { _x: 5, _y: 1.2246467991473533e-15, _z: -2.4492935982947064e-16 } },
      { pos: { _x: 4.923879532511286, _y: 1.2060026617754226e-15, _z: -0.3826834323650904 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.9762410328686743, _y: 0.09615134934208412, _z: -0.19418641498107084 },
  w: 4.881205164343371 } }

  t.deepEqual(obs.polygons.length, 512)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[511], expLastPoly)
})

test('torus (custom all)', t => {
  const obs = torus({ro: 5, ri: 3, fni: 4, fno: 5, roti: 45 })
  const expFirstPoly = {
    vertices: [
      { pos: { _x: 7.121320343559643, _y: 0, _z: 2.1213203435596424 } },
      { pos: { _x: 2.8786796564403576, _y: 0, _z: 2.121320343559643 } },
      { pos: { _x: 0.8895609352015057, _y: -2.7377870455838957, _z: 2.121320343559643 } },
      { pos: { _x: 2.200609008547969, _y: -6.77277811736764, _z: 2.1213203435596424 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 1.0467283057891832e-16, _y: -7.604926294228414e-17, _z: 1 },
  w: 2.1213203435596433 } }

  const expLastPoly = { vertices: [
      { pos: { _x: 2.2006090085479673, _y: 6.77277811736764, _z: -2.1213203435596433 } },
      { pos: { _x: 2.2006090085479677, _y: 6.772778117367642, _z: 2.121320343559642 } },
      { pos: { _x: 7.121320343559644, _y: 1.7442204328886494e-15, _z: 2.121320343559642 } },
      { pos: { _x: 7.121320343559642, _y: 1.744220432888649e-15, _z: -2.1213203435596433 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.8090169943749473, _y: 0.5877852522924731, _z: -3.307826833076618e-16 },
  w: 5.76126918032779 } }

  t.deepEqual(obs.polygons.length, 20)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[19], expLastPoly)
})

test('polyhedron (points & triangles)', t => {
  const obs = polyhedron({
    points: [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ], // the apex point
    triangles: [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ] // two triangles for square base
  })
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 10 } },
  { pos: { _x: 10, _y: -10, _z: 0 } },
  { pos: { _x: 10, _y: 10, _z: 0 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.7071067811865475, _y: 0, _z: 0.7071067811865475 },
  w: 7.071067811865475 } }

  const expLastPoly = { vertices: [ { pos: { _x: -10, _y: 10, _z: 0 } },
  { pos: { _x: 10, _y: -10, _z: 0 } },
  { pos: { _x: -10, _y: -10, _z: 0 } } ],
      shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0, _y: 0, _z: -1 }, w: 0 } }

  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expLastPoly)
})


test('polyhedron (points & polygons)', t => {
  const obs = polyhedron({
    points: [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ], // the apex point
    polygons: [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ] // two triangles for square base
  })
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 10 } },
  { pos: { _x: 10, _y: -10, _z: 0 } },
  { pos: { _x: 10, _y: 10, _z: 0 } } ],
    shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0.7071067811865475, _y: 0, _z: 0.7071067811865475 },
  w: 7.071067811865475 } }

  const expLastPoly = { vertices: [ { pos: { _x: -10, _y: 10, _z: 0 } },
  { pos: { _x: 10, _y: -10, _z: 0 } },
  { pos: { _x: -10, _y: -10, _z: 0 } } ],
      shared: { color: null, tag: 296 },
    plane: { normal: { _x: 0, _y: 0, _z: -1 }, w: 0 } }

  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[5], expLastPoly)
})
