import test from 'ava'
import { cube, sphere, geodesicSphere, cylinder, torus, polyhedron } from './primitives3d'

/* FIXME : not entirely sure how to deal with this, but for now relies on inspecting
output data structures: we should have higher level primitives ...*/

test('cube (defaults)', t => {
  const obs = cube()
  const expPoly0 = {
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
  t.deepEqual(obs.polygons[0], expPoly0)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, single parameter)', t => {
  const obs = cube(2)
  const expPoly0 = {
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
  t.deepEqual(obs.polygons[0], expPoly0)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, single value, object parameter)', t => {
  const obs = cube({size: 2})
  const expPoly0 = {
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
  t.deepEqual(obs.polygons[0], expPoly0)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (custom size, array value, object parameter)', t => {
  const obs = cube({size: [2, 1, 3]})
  const expPoly0 = {
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
  t.deepEqual(obs.polygons[0], expPoly0)
  t.deepEqual(obs.polygons[5], expPoly5)
})

test('cube (standard size, custom center(booleans), object parameter)', t => {
  const obs = cube({size: 1, center: [false, true, false]})
  const expPoly0 = {
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
  t.deepEqual(obs.polygons[0], expPoly0)
  t.deepEqual(obs.polygons[5], expPoly5)
})





// console.log(obs.polygons[5])
