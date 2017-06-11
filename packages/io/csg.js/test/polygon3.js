import test from 'ava'
import {CSG} from '../csg'

function vertexEquals (t, observed, expected) {
  const obs = [observed.pos._x, observed.pos._y, observed.pos._z]
  return t.deepEqual(obs, expected)
}

function vector3Equals (t, observed, expected) {
  const obs = [observed._x, observed._y, observed._z]
  return t.deepEqual(obs, expected)
}

test('CSG.Polygon3 creates a 3d polygon', t => {
  const Vertex3 = CSG.Vertex
  const Vector3 = CSG.Vector3D
  const Polygon = CSG.Polygon

  const vertices = [
    new Vertex3(new Vector3([0, 0, 0])), // you gotta be kidding me ...WAY too complex for what it is
    new Vertex3(new Vector3([0, 10, 0])),
    new Vertex3(new Vector3([0, 10, 10]))
  ]
  const observed = new Polygon(vertices)

  t.deepEqual(observed.vertices.length, 3)
  vertexEquals(t, observed.vertices[0], [0, 0, 0])
  vertexEquals(t, observed.vertices[1], [0, 10, 0])
  vertexEquals(t, observed.vertices[2], [0, 10, 10])
  vector3Equals(t, observed.plane.normal, [1, 0, 0])
})
