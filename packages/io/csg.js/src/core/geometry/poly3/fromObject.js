const vert3 = require('')
const plane = require('')

// create from an untyped object with identical property names:
const fromObject = obj => {
  return {
    vertices: obj.vertices.map(vertex => vert3.fromObject(vertex)),
    shared: Polygon3.Shared.fromObject(obj.shared),
    plane: plane.fromObject(obj.plane)// FIXME: use plane structure, vec4, plane class?
  }
}

module.exports = fromObject
