const test = require('ava')
const { square } = require('./primitives2d-api')
const { linear_extrude, rotate_extrude, rectangular_extrude } = require('./ops-extrusions')
const { simplifiedPolygon } = require('./test-helpers')

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

  const expFirstPoly = { positions:
  [ [ 3.923141121612922, -0.780361288064513, 1.0000000000000004 ],
      [ 4.000000000000001, 0, 1.0000000000000004 ],
      [ 4.000000000000001, 0, 0 ],
      [ 3.923141121612922, -0.780361288064513, 0 ] ],
    plane:
    { normal: [ -0.9951847266721969, 0.09801714032956071, 0 ],
      w: -3.9807389066887877 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 4.903926402016151, 0.9754516100806419, 1 ],
      [ 4.999999999999999, 1.6653345369377348e-16, 1 ],
      [ 5, 0, 0 ],
      [ 4.903926402016151, 0.9754516100806419, 0 ] ],
    plane:
    { normal: [ 0.9951847266721968, 0.09801714032956149, -0 ],
      w: 4.975923633360985 },
    shared: { color: null, tag: 1612 } }

  t.deepEqual(obs.polygons.length, 132)
  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (custom resolution)', t => {
  const op1 = square()
  const obs = rotate_extrude({fn: 4}, op1.translate([4, 0, 0]))

  const expFirstPoly = { positions:
  [ [ 2.82842712474619, -2.82842712474619, 1 ],
      [ 4, 0, 1 ],
      [ 4, 0, 0 ],
      [ 2.82842712474619, -2.82842712474619, 0 ] ],
    plane:
    { normal: [ -0.9238795325112867, 0.3826834323650898, 0 ],
      w: -3.695518130045147 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 3.53553390593274, 3.5355339059327373, 1 ],
        [ 5, 0, 1 ],
        [ 5, 0, 0 ],
        [ 3.53553390593274, 3.5355339059327373, 0 ] ],
    plane:
    { normal: [ 0.9238795325112867, 0.38268343236508956, -0 ],
      w: 4.619397662556434 },
    shared: { color: null, tag: 1612 } }

  t.deepEqual(obs.polygons.length, 36)
  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (custom angle)', t => {
  const op1 = square()
  const obs = rotate_extrude({angle: 20}, op1.translate([4, 0, 0]))

  const expFirstPoly = { positions:
  [ [ 3.999762020000599, -0.043632365976729495, 1 ],
      [ 4, 0, 1 ],
      [ 4, 0, 0 ],
      [ 3.999762020000599, -0.043632365976729495, 0 ] ],
    plane:
    { normal: [ -0.9999851261394216, 0.00545412687101576, 0 ],
      w: -3.9999405045576863 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 4.716837503949126, -1.6587477087667604, 1 ],
      [ 4.698463103929543, -1.7101007166283435, 1 ],
      [ 4.698463103929543, -1.7101007166283435, 0 ],
      [ 4.716837503949126, -1.6587477087667604, 0 ] ],
    plane:
    { normal: [ 0.9415440651830257, -0.33688985339220645, 0 ],
      w: 4.999925630697108 },
    shared: { color: null, tag: 1612 } }
  t.deepEqual(obs.polygons.length, 192)
  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (custom negative angle)', t => {
  const op1 = square()
  const obs = rotate_extrude({angle: -20}, op1.translate([4, 0, 0]))

  const expFirstPoly = { positions:
  [ [ 4, 0, 1 ],
      [ 3.999762020000599, 0.043632365976729495, 1 ],
      [ 3.999762020000599, 0.043632365976729495, 0 ],
      [ 4, 0, 0 ] ],
    plane:
    { normal: [ -0.9999851261394216, -0.00545412687101576, 0 ],
      w: -3.9999405045576863 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 4.698463103929543, 1.7101007166283435, 1 ],
      [ 4.716837503949126, 1.6587477087667604, 1 ],
      [ 4.716837503949126, 1.6587477087667604, 0 ],
      [ 4.698463103929543, 1.7101007166283435, 0 ] ],
    plane:
    { normal: [ 0.9415440651830257, 0.33688985339220645, 0 ],
      w: 4.999925630697108 },
    shared: { color: null, tag: 1612 } }
  t.deepEqual(obs.polygons.length, 192)
  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (custom negative angle, custom start angle)', t => {
  const op1 = square()
  const obs = rotate_extrude({angle: -20, startAngle: 27}, op1.translate([4, 0, 0]))

  const expFirstPoly = { positions:
  [ [ 3.5640260967534716, -1.815961998958187, 1 ],
      [ 3.583622734655973, -1.7769772355482905, 1 ],
      [ 3.583622734655973, -1.7769772355482905, 0 ],
      [ 3.5640260967534716, -1.815961998958187, 0 ] ],
    plane:
    { normal: [ -0.8934693932653679, 0.4491240845223238, 0 ],
      w: -3.9999405045576863 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 4.96273075820661, -0.6093467170257374, 1 ],
      [ 4.955788690799897, -0.66344438511441, 1 ],
      [ 4.955788690799897, -0.66344438511441, 0 ],
      [ 4.96273075820661, -0.6093467170257374, 0 ] ],
    plane:
    { normal: [ 0.991866697787626, -0.12728100337391368, 0 ],
      w: 4.999925630697108 },
    shared: { color: null, tag: 1612 } }
  t.deepEqual(obs.polygons.length, 192)
  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (custom negative angle, custom start angle, capped points)', t => {
  const op1 = square().translate([-0.5, 0, 0])
  const obs = rotate_extrude({angle: -20, startAngle: 27}, op1)

  const expFirstPoly = { positions:
  [ [ 0.496273075820661, -0.06093467170257374, 0 ],
      [ 0.49557886907998977, -0.06634443851144099, 0 ],
      [ 0.4948256934098351, -0.07174631099558966, 0 ],
      [ 0.49401363843056983, -0.07713964638621444, 0 ],
      [ 0.4931428007686157, -0.08252380293033881, 0 ],
      [ 0.4922132840449458, -0.08789813996717726, 0 ],
      [ 0.49122519886275484, -0.09326201800436731, 0 ],
      [ 0.4901786627942984, -0.09861479879406297, 0 ],
      [ 0.48907380036690284, -0.10395584540887967, 0 ],
      [ 0.4879107430481481, -0.10928452231768229, 0 ],
      [ 0.48668962923022424, -0.11460019546120709, 0 ],
      [ 0.48541060421346405, -0.11990223232750827, 0 ],
      [ 0.48407382018905387, -0.12519000202722072, 0 ],
      [ 0.48267943622092446, -0.13046287536862944, 0 ],
      [ 0.48122761822682364, -0.13572022493253713, 0 ],
      [ 0.4797185389585742, -0.14096142514692075, 0 ],
      [ 0.4781523779815177, -0.14618585236136838, 0 ],
      [ 0.4765293216531485, -0.1513928849212873, 0 ],
      [ 0.4748495631009385, -0.15658190324187476, 0 ],
      [ 0.4731133021993573, -0.1617522898818424, 0 ],
      [ 0.4713207455460892, -0.16690342961688545, 0 ],
      [ 0.4694721064374497, -0.1720347095128884, 0 ],
      [ 0.46756760484300586, -0.17714551899885794, 0 ],
      [ 0.4656074673794018, -0.18223524993957482, 0 ],
      [ 0.4635919272833937, -0.187303296707956, 0 ],
      [ 0.46152122438409704, -0.19234905625711804, 0 ],
      [ 0.45939560507444915, -0.1973719281921336, 0 ],
      [ 0.45721532228189105, -0.20237131484147275, 0 ],
      [ 0.4549806354382716, -0.2073466213281195, 0 ],
      [ 0.4526918104489776, -0.21229725564035656, 0 ],
      [ 0.45034911966129393, -0.21722262870220851, 0 ],
      [ 0.44795284183199663, -0.22212215444353633, 0 ],
      [ 0.44550326209418395, -0.22699524986977337, 0 ],
      [ 0, 0, 0 ] ],
    plane: { normal: [ -0, 0, -1 ], w: -0 },
    shared: { color: null, tag: 1612 } }

  const expLastPoly = { positions:
  [ [ 0.496273075820661, -0.06093467170257374, 1 ],
      [ 0.49557886907998977, -0.06634443851144099, 1 ],
      [ 0.49557886907998977, -0.06634443851144099, 0 ],
      [ 0.496273075820661, -0.06093467170257374, 0 ] ],
    plane:
    { normal: [ 0.991866697787627, -0.12728100337390572, 0 ],
      w: 0.4999925630697108 },
    shared: { color: null, tag: 1612 } }
  t.deepEqual(obs.polygons.length, 98)
  // console.log('first', simplifiedPolygon(obs.polygons[0]))
  // console.log('last', simplifiedPolygon(obs.polygons[obs.polygons.length - 1]))

  t.deepEqual(simplifiedPolygon(obs.polygons[0]), expFirstPoly)
  t.deepEqual(simplifiedPolygon(obs.polygons[obs.polygons.length - 1]), expLastPoly)
})

test('rotate_extrude (invalid overflow setting should throw an exception)', t => {
  const op1 = square().translate([-0.5, 0, 0])
  t.throws(() => {
    rotate_extrude({angle: -20, startAngle: 27, overflow: undefined}, op1)
  }, 'only capping of overflowing points is supported !')
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
  /* console.log(obs.polygons[0])
  console.log(obs.polygons[0].vertices)
  console.log(obs.polygons[obs.polygons.length - 1])
  console.log(obs.polygons[obs.polygons.length - 1].vertices) */
  t.deepEqual(obs.polygons.length, 46)
  t.deepEqual(obs.polygons[0], expFirstPoly)
  t.deepEqual(obs.polygons[obs.polygons.length - 1], expLastPoly)
})
