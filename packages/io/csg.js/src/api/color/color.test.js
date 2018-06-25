const test = require('ava')
const cuboid = require('./primitives/cuboid')
const sphere = require('./primitives/spheroid')
const square = require('./primitives/rectangle')
const circle = require('./primitives/circle')

const color = require('./color')
const rgbToHsl = require('./rgbToHsl')
const hslToRgb = require('./hslToRgb')
const rgbToHsv = require('./rgbToHsv')
const hsvToRgb = require('./hsvToRgb')
const hexToRgb = require('./hexToRgb')
const rgbToHex = require('./rgbToHex')
const colorNameToRgb = require('./colorNameToRgb')

test('colorNameToRgb', t => {
  const c1 = colorNameToRgb('black')
  const e1 = [0 / 255, 0 / 255, 0 / 255]
  t.deepEqual(c1, e1)

  const c2 = colorNameToRgb('yellowgreen')
  const e2 = [154 / 255, 205 / 255, 50 / 255]
  t.deepEqual(c2, e2)

  // const c3 = colorNameToRgb('jscad')
})

test('rgbToHsl', t => {
  const obs = rgbToHsl(1, 0, 0)
  const expColor = [0, 1, 0.5]

  t.deepEqual(obs, expColor)
})

test('hslToRgb', t => {
  const obs = hslToRgb(0, 1, 0)
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('rgbToHsv', t => {
  const obs = rgbToHsv(1, 0, 0.5)
  const expColor = [0.9166666666666666, 1, 1]

  t.deepEqual(obs, expColor)
})

test('hsvToRgb', t => {
  const obs = hsvToRgb(0, 0.2, 0)
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('hexToRgb', t => {
  const obs = hexToRgb('#000000')
  const expColor = [0, 0, 0]

  t.deepEqual(obs, expColor)
})

test('rgbToHex', t => {
  const html = rgbToHex(1, 0, 0.5)
  const expHtml = '#ff007f'

  t.deepEqual(html, expHtml)
})

test('color (rgb, on 3d objects)', t => {
  const obs = color([1, 0, 0], cuboid(), sphere())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (rgb, on 2d objects)', t => {
  const obs = color([1, 0, 0], square(), circle())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})

test('color (rgba, on 3d objects)', t => {
  const obs = color([1, 0, 0, 0.5], cuboid(), sphere())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (rgba, on 2d objects)', t => {
  const obs = color([1, 0, 0, 0.5], square(), circle())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})

test('color (rgba, on array of 3D objects)', t => {
  const obs = color([1, 0, 0, 0.5], [cuboid(), sphere()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (rgba, on array of 2d objects)', t => {
  const obs = color([1, 0, 0, 0.5], [square(), circle()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})

test('color (by name, on 3d objects)', t => {
  var obs = color('red', cuboid())
  var expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('green', cuboid(), sphere())
  expColor = { color: [ 0, 128 / 255, 0, 1 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)

  obs = color('blue', cuboid(), sphere(), cuboid())
  expColor = { color: [ 0, 0, 1, 1 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (by name, on 2d objects)', t => {
  const obs = color('red', square(), circle())
  const expColor = { color: [ 1, 0, 0, 1 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})

test('color (by name and alpha, on 3d objects)', t => {
  var obs = color('red', 0.5, cuboid())
  var expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs.polygons[0].shared, expColor)
  t.deepEqual(obs.polygons[obs.polygons.length - 1].shared, expColor)

  obs = color('green', 0.8, cuboid(), sphere())
  expColor = { color: [ 0, 128 / 255, 0, 0.8 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)

  obs = color('blue', 0.2, cuboid(), sphere(), cuboid())
  expColor = { color: [ 0, 0, 1, 0.2 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (by name and alpha, on 2d objects)', t => {
  const obs = color('red', 0.1, square(), circle())
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})

test('color (by name and alpha, on array of 3d objects)', t => {
  const obs = color('red', 0.7, [cuboid(), sphere()])
  const expColor = { color: [ 1, 0, 0, 0.7 ] }

  t.deepEqual(obs[0].polygons[0].shared, expColor)
  t.deepEqual(obs[1].polygons[obs[1].polygons.length - 1].shared, expColor)
})

test.failing('color (by name and alpha, on array of 2d objects)', t => {
  const obs = color('red', 0.5, [square(), circle()])
  const expColor = { color: [ 1, 0, 0, 0.5 ] }

  t.deepEqual(obs[0].sides[0].shared, expColor)
  t.deepEqual(obs[1].sides[obs[1].sides.length - 1].shared, expColor)
})
