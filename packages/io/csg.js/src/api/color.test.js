const test = require('ava')
const { cube, sphere, cylinder } = require('./primitives3d-api')
const { square, circle } = require('./primitives2d-api')
const { color, rgb2hsl, hsl2rgb, rgb2hsv, hsv2rgb, html2rgb, rgb2html, css2rgb } = require('./color')

test('css2rgb', t => {
  const c1 = css2rgb('black')
  const e1 = [0 / 255, 0 / 255, 0 / 255]
  t.deepEqual(c1, e1)

  const c2 = css2rgb('yellowgreen')
  const e2 = [154 / 255, 205 / 255, 50 / 255]
  t.deepEqual(c2, e2)

  const c3 = css2rgb('jscad')
})

test('rgb2hsl', t => {
  const obs = rgb2hsl(1, 0, 0)
  const expColor = [0, 1, 0.5]

  t.deepEqual(obs, expColor)
})

test('hsl2rgb', t => {
  const obs = hsl2rgb(0, 1, 0)
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('rgb2hsv', t => {
  const obs = rgb2hsv(1, 0, 0.5)
  const expColor = [0.9166666666666666, 1, 1]

  t.deepEqual(obs, expColor)
})

test('hsv2rgb', t => {
  const obs = hsv2rgb(0, 0.2, 0)
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('html2rgb', t => {
  const obs = html2rgb('#000000')
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('rgb2html', t => {
  const html = rgb2html(1, 0, 0.5)
  const expHtml = '#ff007f'

  t.deepEqual(html, expHtml)
})

test('color (rgb, on 3d objects)', t => {
  const obs = color([1, 0, 0], cube(), sphere())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (rgb, on 2d objects)', t => {
  const obs = color([1, 0, 0], square(), circle())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})

test('color (rgba, on 3d objects)', t => {
  const obs = color([1, 0, 0, 0.5], cube(), sphere())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (rgba, on 2d objects)', t => {
  const obs = color([1, 0, 0, 0.5], square(), circle())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})

test('color (rgba, on array of 3D objects)', t => {
  const obs = color([1, 0, 0, 0.5], [cube(), sphere()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (rgba, on array of 2d objects)', t => {
  const obs = color([1, 0, 0, 0.5], [square(), circle()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})

test('color (by name, on 3d objects)', t => {
  var obs = color('red', cube())
  var expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('green', cube(), sphere())
  expColor = { color: [ 0, 128 / 255, 0, 1 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('blue', cube(), sphere(), cylinder())
  expColor = { color: [ 0, 0, 1, 1 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (by name, on 2d objects)', t => {
  const obs = color('red', square(), circle())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})

test('color (by name and alpha, on 3d objects)', t => {
  var obs = color('red', 0.5, cube())
  var expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('green', 0.8, cube(), sphere())
  expColor = { color: [ 0, 128 / 255, 0, 0.8 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('blue', 0.2, cube(), sphere(), cylinder())
  expColor = { color: [ 0, 0, 1, 0.2 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (by name and alpha, on 2d objects)', t => {
  const obs = color('red', 0.1, square(), circle())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})

test('color (by name and alpha, on array of 3d objects)', t => {
  const obs = color('red', 0.7, [cube(), sphere()])
  const expColor = { color: [ 1, 0, 0, 0.7 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)
})

test.failing('color (by name and alpha, on array of 2d objects)', t => {
  const obs = color('red', 0.5, [square(), circle()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.sides[0].shared, expColor)
  t.deepEqual(obs.sides[obs.sides.length - 1].shared, expColor)
})
