import test from 'ava'
import { cube } from './primitives3d'
import { clone } from './clone'

test('clone', t => {
  const obs = clone(cube())
  const expFirstPoly = {
    vertices: [ { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -1, _y: -0, _z: -0 }, w: -0 }
  }

  const expLastPoly = { vertices: [ { pos: { _x: 0, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 0, _z: 1 } },
      { pos: { _x: 1, _y: 1, _z: 1 } },
      { pos: { _x: 0, _y: 1, _z: 1 } } ],
    shared: { color: null },
  plane: { normal: { _x: 0, _y: -0, _z: 1 }, w: 1 } }

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.polygons.length, 6)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})
