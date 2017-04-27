import test from 'ava'
import {comparePolygons} from './helpers/asserts'

test('comparePolygons on same single vertex', t => {
  let a = {vertices: [{_x: 0, _y: 0, _z: 0}]}
  t.true(comparePolygons(a, a))
})

test('comparePolygons on different vertices', t => {
  let a = {vertices: [{_x: 0, _y: 0, _z: 0}]}, b = {vertices: [{_x: 1, _y: 1, _z: 1}]}
  t.false(comparePolygons(a, b))
})

test('comparePolygons on same polygon', t => {
  let a = {vertices: [
        {_x: 0, _y: 0, _z: 0},
        {_x: 1, _y: 1, _z: 1},
        {_x: -1, _y: 1, _z: 1}
  ]}
  t.true(comparePolygons(a, a))
})

test('comparePolygons on same polygon with different vertice order', t => {
  let a = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1},
            {_x: -1, _y: 1, _z: 1}
    ]},
    b = {vertices: [
            {_x: -1, _y: 1, _z: 1},
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1}
    ]}
  t.true(comparePolygons(a, b))
})

test('comparePolygons on different polygon with same vertice', t => {
  let a = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1},
            {_x: -1, _y: 1, _z: 1}
    ]},
    b = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: -1, _y: 1, _z: 1},
            {_x: 1, _y: 1, _z: 1}
    ]}
  t.false(comparePolygons(a, b))
})
