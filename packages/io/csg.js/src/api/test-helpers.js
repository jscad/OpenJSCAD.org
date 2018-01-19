function vertex3Equals (t, observed, expected) {
  const obs = [observed.pos._x, observed.pos._y, observed.pos._z]
  return t.deepEqual(obs, expected)
}

function vertex2Equals (t, observed, expected) {
  const obs = [observed.pos._x, observed.pos._y]
  return t.deepEqual(obs, expected)
}

function vector3Equals (t, observed, expected) {
  const obs = [observed._x, observed._y, observed._z]
  return t.deepEqual(obs, expected)
}

function sideEquals (t, observed, expected) {
  vertex2Equals(t, observed.vertex0, expected[0], 'vertex0 are not equal')
  vertex2Equals(t, observed.vertex1, expected[1], 'vertex1 are not equal')
}

function shape2dToNestedArray (shape2d) {
  const sides = shape2d.sides.map(function (side) {
    return [side.vertex0.pos._x, side.vertex0.pos._y, side.vertex1.pos._x, side.vertex1.pos._y]
  })
  return sides
}

function shape3dToNestedArray (shape3d) {
  const polygons = shape3d.polygons.map(function (polygon) {
    return polygon.vertices.map(vertex => [vertex.pos._x, vertex.pos._y, vertex.pos._z])
  })
  return polygons
}

function simplifiedPolygon (polygon) {
  const vertices = polygon.vertices.map(vertex => [vertex.pos._x, vertex.pos._y, vertex.pos._z])
  const plane = {normal: [polygon.plane.normal._x, polygon.plane.normal._y, polygon.plane.normal._z], w: polygon.plane.w}
  return {positions: vertices, plane, shared: polygon.shared}
}

function simplifiedCSG (csg) {
  const polygonsData = csg.polygons.map(x => simplifiedPolygon(x).positions)
  return polygonsData
}

function almostEquals (t, observed, expected, precision) {
  t.is(Math.abs(expected - observed) < precision, true)
}

function compareNumbers (a, b, precision) {
  return Math.abs(a - b) < precision
}

function compareVertices (a, b, precision) {
  if ('_w' in a && !('_w' in b)) {
    return false
  }
  const fields = ['_x', '_y', '_z']
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (!compareNumbers(a[field], b[field], precision)) {
      return false
    }
  }
  return true
}

function comparePolygons (a, b, precision) {
    // First find one matching vertice
    // We try to find the first vertice of a inside b
    // If there is no such vertice, then a != b
  if (a.vertices.length !== b.vertices.length || a.vertices.length === 0) {
    return false
  }
  if (a.shared.color && a.shared.color !== b.shared.color) {
    return false
  }
  if (a.shared.tag && a.shared.tag !== b.shared.tag) {
    return false
  }
  if (a.shared.plane && a.shared.plane !== b.shared.plane) {
    return false
  }

  let start = a.vertices[0]
  let index = b.vertices.findIndex(v => {
    if (!v) { return false }
    return v._x === start._x && v._y === start._y && v._z === start._z
  })
  if (index === -1) {
    return false
  }
    // Rearrange b vertices so that they start with the same vertex as a
  let vs = b.vertices
  if (index !== 0) {
    vs = b.vertices.slice(index).concat(b.vertices.slice(0, index))
  }

    // Compare now vertices one by one
  for (let i = 0; i < a.vertices.length; i++) {
    const vertex = a.vertices[i].pos
    const otherVertex = vs[i].pos
    if (!compareVertices(vertex, otherVertex, precision)) {
      return false
    }
    /* if (a.vertices[i]._x !== vs[i]._x ||
            a.vertices[i]._y !== vs[i]._y ||
            a.vertices[i]._z !== vs[i]._z) { return false } */
  }
  return true
}

module.exports = {
  vertex2Equals,
  vertex3Equals,
  vector3Equals,
  sideEquals,
  shape2dToNestedArray,
  simplifiedPolygon,
  simplifiedCSG,

  compareNumbers,
  comparePolygons,
  compareVertices
}
