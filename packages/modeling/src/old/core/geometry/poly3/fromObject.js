const vert3 = require('')
const plane = require('')

// create from an untyped object with identical property names:
const fromObject = obj => {
  return {
    vertices: obj.vertices.map(vertex => vert3.fromObject(vertex)),
    plane: plane.fromObject(obj.plane)
  }
}

module.exports = fromObject
