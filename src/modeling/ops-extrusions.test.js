import test from 'ava'
import { cube } from './primitives3d'
import { square } from './primitives2d'
import { linear_extrude, rotate_extrude, rectangular_extrude } from './ops-extrusions'

test('linear_extrude (height)', t => {
  const op1 = square()
  const obs = linear_extrude({ height: 10 }, op1)

  const expFirstPoly = {
    vertices: [ { pos: { _x: 1, _y: 1, _z: 0 } },
      { pos: { _x: 1, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 0, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: -0, _y: -0, _z: -1 }, w: -0 }
  }

  const expLastPoly = {
    vertices: [ { pos: { _x: 0, _y: 1, _z: 10 } },
      { pos: { _x: 1, _y: 1, _z: 0 } },
      { pos: { _x: 0, _y: 1, _z: 0 } } ],
    shared: { color: null },
    plane: { normal: { _x: 0, _y: 1, _z: 0 }, w: 1 }
  }

  t.deepEqual(obs.polygons.length, 10)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})

test('linear_extrude (height, twist, slices, center)', t => {
  const op1 = square()
  const obs = linear_extrude({ height: 10, twist: 360, slices: 50, center: true }, op1)

  const expFirstPoly = {
    vertices: [ { pos: { _x: 1, _y: 1, _z: -5 } },
      { pos: { _x: 1, _y: 0, _z: -5 } },
      { pos: { _x: 1.1102230246251565e-16, _y: 0, _z: -5 } },
      { pos: { _x: 1.1102230246251565e-16, _y: 1, _z: -5 } } ],
    shared: { color: null },
    plane: { normal: { _x: -0, _y: -0, _z: -1 }, w: 5 }
  }

  const expLastPoly = {
    vertices: [ { pos: { _x: 3.3306690738754696e-16, _y: 1, _z: 5 } },
      { pos: { _x: 1.1174479348787818, _y: 0.8667814677501742, _z: 4.800000000000001 } },
      { pos: { _x: 0.12533323356430387, _y: 0.9921147013144779, _z: 4.800000000000001 } } ],
    shared: { color: null },
    plane: { normal: { _x: 0.12523593496267418, _y: 0.9913445035756271, _z: 0.03939588588188166 },
    w: 1.188323932985035 }
  }

  t.deepEqual(obs.polygons.length, 402)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})

test('rotate_extrude (defaults)', t => {
  const op1 = square()
  const obs = rotate_extrude(op1.translate([4, 0, 0]))

  const expFirstPoly = {
    vertices: [ { pos: { _x: 4, _y: 0, _z: 1 } },
      { pos: { _x: 4, _y: 0, _z: 0 } },
      { pos: { _x: 3.9231411216129217, _y: -0.780361288064513, _z: 0 } },
      { pos: { _x: 3.9231411216129217, _y: -0.780361288064513, _z: 1 } } ],
    shared: { color: null },
    plane: { normal: { _x: -0.9951847266721969, _y: 0.09801714032956071, _z: 0 },
    w: -3.9807389066887877 }
  }

  const expLastPoly = {
    vertices: [ { pos: { _x: 4.903926402016151, _y: 0.9754516100806436, _z: 1 } },
      { pos: { _x: 3.9231411216129213, _y: 0.7803612880645149, _z: 1 } },
      { pos: { _x: 4, _y: 9.797174393178826e-16, _z: 1 } },
      { pos: { _x: 5, _y: 1.2246467991473533e-15, _z: 1 } } ],
    shared: { color: null },
    plane: { normal: { _x: 0, _y: 0, _z: 1 }, w: 1 }
  }

  t.deepEqual(obs.polygons.length, 128)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})

test('rotate_extrude (custom resolution)', t => {
  const op1 = square()
  const obs = rotate_extrude({fn: 4}, op1.translate([4, 0, 0]))

  const expFirstPoly = {
    vertices: [ { pos: { _x: 4, _y: 0, _z: 1 } },
      { pos: { _x: 4, _y: 0, _z: 0 } },
      { pos: { _x: 2.4492935982947064e-16, _y: -4, _z: 0 } },
      { pos: { _x: 2.4492935982947064e-16, _y: -4, _z: 1 } } ],
    shared: { color: null },
    plane: { normal: { _x: -0.7071067811865476, _y: 0.7071067811865475, _z: 0 },
    w: -2.8284271247461903 }
  }

  const expLastPoly = {
    vertices: [ { pos: { _x: -9.184850993605148e-16, _y: 5, _z: 1 } },
      { pos: { _x: -7.347880794884119e-16, _y: 4, _z: 1 } },
      { pos: { _x: 4, _y: 9.797174393178826e-16, _z: 1 } },
      { pos: { _x: 5, _y: 1.2246467991473533e-15, _z: 1 } } ],
    shared: { color: null },
    plane: { normal: { _x: 0, _y: 0, _z: 1 }, w: 1 }
  }

  t.deepEqual(obs.polygons.length, 16)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})

test('rectangular_extrude ', t => {
  const op1 = square()
  const obs = rectangular_extrude([ [10, 10], [-10, 10], [-20, 0], [-10, -10], [10, -10] ], // path is an array of 2d coords
    {w: 1, h: 3, closed: true}, op1)

  const expFirstPoly = {
    vertices: [
      { pos: { _x: -11.207106781186544, _y: 9.5, _z: 0 } },
      { pos: { _x: -10.35355339059327, _y: 10.353553390593275, _z: 0 } },
      { pos: { _x: -10.000000000000002, _y: 10.5, _z: 0 } },
      { pos: { _x: 9.5, _y: 10.5, _z: 0 } },
      { pos: { _x: 9.5, _y: 9.5, _z: 0 } } ],
    shared: { color: null, tag: 1612 },
    plane: { normal: { _x: -0, _y: -0, _z: -1 }, w: -0 }
  }

  const expLastPoly = {
    vertices: [
      { pos: { _x: -9.792893218813454, _y: 9.5, _z: 3 } },
      { pos: { _x: -19.292893218813454, _y: -1.1102230246251565e-16, _z: 0 } },
      { pos: { _x: -9.792893218813454, _y: 9.5, _z: 0 } } ],
    shared: { color: null, tag: 1612 },
    plane: { normal: { _x: 0.7071067811865476, _y: -0.7071067811865476, _z: 0 }, w: -13.642135623730951 }
  }
  /*console.log(obs.polygons[0])
  console.log(obs.polygons[0].vertices)
  console.log(obs.polygons[obs.polygons.length - 1])
  console.log(obs.polygons[obs.polygons.length - 1].vertices)*/
  t.deepEqual(obs.polygons.length, 46)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})
